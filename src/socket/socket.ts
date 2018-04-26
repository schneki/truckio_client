import {handle_client} from "./client_handler";
import {handle_client_list} from "./client_list_handler";
import {handle_move} from "./move_handler";
import {handle_close} from "./close_handler";
import * as THREE from "three";
import {Client} from "../client";
import {Keys} from "../input";


let socket: WebSocket;

export function handle_socket(clients: { [id: number]: Client } ) {
  socket = new WebSocket("ws://192.168.0.14:5012", "protocolOne");

  socket.onopen = event => {

    socket.onmessage = event => {
      let parsed = JSON.parse(event.data);
      switch(parsed.t) {
        case "client": {
          handle_client(parsed.data, clients);
          break;
        }
        case "client_list": {
          handle_client_list(parsed.data, clients);
          break;
        }
        case "update": {
          break;
        }
        case "move": {
          handle_move(parsed.id, parsed.data, clients);
          break;
        }
        case "close": {
          handle_close(parsed.id, clients);
          break;
        }
        default: {}
      }
    }
  };
}

export function update_clients() {
  socket.send(JSON.stringify({"t":"client_list"}));
}


export function send_move(keys: Keys) {
  //console.log(keys);
  socket.send(JSON.stringify({"t":"move", "time": Date.now(), "data": keys}))
}
