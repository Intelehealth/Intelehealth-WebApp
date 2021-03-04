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
  private socket: any;
  public peer: any;

  constructor() {
    this.socket = io(environment.socketURL);
    console.log('this.socket: ', this.socket.id);
    this.peer = this.socket.id;
  }

  public users(token: string): Observable<[string]> {
    return new Observable((observer) => {
      this.socket.emit("users");

      this.socket.on("users", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public join(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on("join", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public leave(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on("leave", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public call(callee: string): void {
    this.socket.emit("call", "username", callee);
  }

  /**
   * Notify each time you receive a call from server
   */
  public subscribe(): Observable<Notification> {
    return new Observable((observer) => {
      this.socket.on("notify", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public login(username: string): Observable<any> {
    return new Observable((observer) => {
      let peerid = this.peer;
      this.socket.emit("login", username, peerid);

      this.socket.on("login", (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  public sendMessage(message: string, username: string) {
    this.socket.emit("add-message", message, username);
  }

  public sendPrivatMessage(message: string, username: string) {
    this.socket.to(username).emit("chat message", message, username);
  }

  public getMessages() {
    let observable = new Observable((observer: any) => {
      this.socket.on("message", (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public getPrivatMessages() {
    let observable = new Observable((observer: any) => {
      this.socket.on("message1", (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  public getUsername() {
    return this.socket;
  }
}
