import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "src/app/services/socket.service";
import Peer from "simple-peer";

@Component({
  selector: "app-vc",
  templateUrl: "./vc.component.html",
  styleUrls: ["./vc.component.css"],
})
export class VcComponent implements OnInit {
  @ViewChild("remoteVideo") remoteVideoRef: any;
  @ViewChild("localVideo") localVideoRef: any;

  private userid: string = "";
  private localStream: any;
  private playing: boolean = false;
  private streamRecieved: boolean = false;
  callerStream: any;
  myStream;
  myId;
  callerSignal;
  callerInfo;
  incomingCall;

  constructor(
    private route: ActivatedRoute,
    public socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService.initSocket();
    this.startUserMedia();
    this.socketService.onEvent("myId").subscribe((id) => {
      this.myId = id;
      console.log(" this.myId: ", this.myId);
    });

    this.socketService.onEvent("hey").subscribe((data) => {
      console.log("incomingCall:hey ", data);
      this.incomingCall = true;
      this.callerInfo = data.from;
      this.callerSignal = data.signal;
    });
  }

  get users() {
    return this.socketService.activeUsers;
  }
  isStreamAvailable;
  startUserMedia(config?: any): void {
    let mediaConfig = {
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
      audio: true,
    };

    if (config) {
      mediaConfig = config;
    }

    const n = <any>navigator;
    n.getUserMedia =
      n.getUserMedia ||
      n.webkitGetUserMedia ||
      n.mozGetUserMedia ||
      n.msGetUserMedia;
    n.getUserMedia(
      mediaConfig,
      (stream: MediaStream) => {
        this.myStream = stream;
        this.localVideoRef.nativeElement.srcObject = this.myStream;
      },
      (err) => {
        this.isStreamAvailable = false;
        console.error(err);
      }
    );
  }

  call(userId): void {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          // {
          //   urls: "stun:numb.viagenie.ca",
          //   username: "sultan1640@gmail.com",
          //   credential: "98376683",
          // },
          // {
          //   urls: "turn:numb.viagenie.ca",
          //   username: "sultan1640@gmail.com",
          //   credential: "98376683",
          // },
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
      stream: this.myStream,
    });

    peer.on("signal", (data) => {
      console.log("signal: call ", data);
      this.socketService.emitEvent("callUser", {
        signalData: data,
        from: this.myId,
        userToCall: userId,
      });
    });

    peer.on("stream", (stream) => {
      console.log("stream:from -> remotestream ", stream);
      this.remoteVideoRef.nativeElement.srcObject = stream;
      this.callerStream = stream;
    });

    this.socketService.onEvent("callAccepted").subscribe((signal) => {
      console.log("signal: ", signal);
      peer.signal(signal);
    });
  }

  acceptCall(): void {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: this.myStream,
    });
    this.incomingCall = false;

    peer.on("signal", (data) => {
      console.log("data: remote", data);
      this.socketService.emitEvent("acceptCall", {
        signal: data,
        to: this.callerInfo,
      });
    });

    peer.on("stream", (stream) => {
      console.log("stream:remote ", stream);
      this.remoteVideoRef.nativeElement.srcObject = stream;
      this.callerStream = stream;
    });

    peer.signal(this.callerSignal);
  }
}
