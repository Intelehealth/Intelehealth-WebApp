import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { environment } from "../../environments/environment";

export interface Notification {
  from: string;
  peerid: string;
}

@Injectable()
export class SocketService {
  public socket: any;
  public activeUsers = [];
  private peerConnections: RTCPeerConnection[] = [];

  constructor() {}

  public initSocket() {
    this.socket = io(environment.socketURL, {
      query: localStorage.socketQuery,
    });

    this.onEvent("allUsers").subscribe((data) => {
      const users = Object.keys(data);
      this.activeUsers = users;
    });
  }

  public emitEvent(action, data) {
    this.socket.emit(action, data);
  }

  public onEvent(action) {
    return new Observable<any>((observer) => {
      this.socket.on(action, (data) => observer.next(data));
    });
  }

  // public get peer() {
  //   return this.getPeerConnection(this.socket.id);
  // }

  // public get remotePeerConnection() {
  //   return this.getPeerConnection(this.remoteSocketId);
  // }

  public remoteSocketId;
  peer;
  remotePeerConnection;
  public call(to, data): void {
    const options = { ...data, to };
    this.socket.emit("call", options);
  }

  public async acceptOffer(data) {
    console.log("acceptOffer: ");
    // this.remoteSocketId = data.id;
    console.log("this.socket.id: ", this.socket.id);
    this.peer = this.getPeerConnection(this.socket.id);
    await this.peer.setRemoteDescription(new RTCSessionDescription(data.offer));

    this.remotePeerConnection = this.getPeerConnection(this.socket.id);
    await this.remotePeerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );

    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(answer));

    this.socket.emit("answer", {
      answer,
      to: data.id,
    });
  }

  public async answerReceipt(data) {
    console.log("answerReceipt: ");
    // const peerConnection = this.getPeerConnection(data.id);
    const peerConnection = this.peer;
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
    console.log("peerConnection: ", peerConnection);

    // navigator.getUserMedia(
    //   { video: true, audio: true },
    //   (stream) => {
    //     const localVideo = document.getElementById("localVideo");
    //     if (localVideo) {
    //       localVideo["srcObject"] = stream;
    //     }

    //     stream
    //       .getTracks()
    //       .forEach((track) => peerConnection.addTrack(track, stream));
    //   },
    //   (error) => {
    //     console.warn(error.message);
    //   }
    // );
  }

  async makeOffer(to, stream) {
    console.log("makeOffer: ");
    // const peerConnection = this.getPeerConnection(to);
    const peerConnection = this.peer;
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
    const options: RTCOfferOptions = {
      offerToReceiveVideo: true,
      offerToReceiveAudio: true,
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    this.call(to, { offer });
  }

  getPeerConnection(id): RTCPeerConnection {
    if (this.peerConnections[id]) {
      return this.peerConnections[id];
    }
    const iceServers: any = [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      // { urls: "stun:stun2.l.google.com:19302" },
      // { urls: "stun:stun3.l.google.com:19302" },
      // { urls: "stun:stun4.l.google.com:19302" },
    ];

    const peerConnection = new RTCPeerConnection({ iceServers });
    this.peerConnections[id] = peerConnection;

    peerConnection.onnegotiationneeded = () => {
      // console.log("Need negotiation:", id);
    };

    // peerConnection.ontrack = ({ streams: [stream] }) => {
    //   const vc = document.getElementsByClassName("remoteVideo")[0];
    //   vc["srcObject"] = stream;
    // };

    peerConnection.onsignalingstatechange = () => {
      // console.log(
      //   "ICE signaling state changed to:",
      //   peerConnection.signalingState,
      //   "for client",
      //   id
      // );
    };

    return peerConnection;
  }
}
