import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-vc",
  templateUrl: "./vc.component.html",
  styleUrls: ["./vc.component.css"],
})
export class VcComponent implements OnInit {
  @ViewChild("remoteVideo") remoteVideoRef: any;
  @ViewChild("localVideo") localVideoRef: any;

  private peer: any;
  private userid: string = "";
  private localStream: any;
  private playing: boolean = false;

  private messages1: any = [];
  private message1: string;
  private connection: any;

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {}
  type = "client";

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get("type");
    this.initiateCall();

    this.connection = this.socketService
      .getPrivatMessages()
      .subscribe((message1) => {
        console.log(message1);
        this.messages1.push(message1);
      });
  }

  initiateCall() {
    console.log("this.type: ", this.type);
  }

  call() {
    this.playing = true;
    this.socketService.call(this.userid);
    let localVideo = this.localVideoRef.nativeElement;
    let n = <any>navigator;
    let self = this;
    n.getUserMedia =
      n.getUserMedia ||
      n.webkitGetUserMedia ||
      n.mozGetUserMedia ||
      n.msGetUserMedia;
    n.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        // ref to close
        self.localStream = stream;
        localVideo.srcObject = stream;
        localVideo.play();
      });
  }

  sendPrivateMessage() {
    this.socketService.sendPrivatMessage(this.message1, this.userid);
    this.message1 = "";
  }
}
