import {handle_client} from "./client_handler";
import {handle_client_list} from "./client_list_handler";
import {handle_move} from "./move_handler";
import {handle_close} from "./close_handler";
import {handle_update} from "./update_handler";
import * as THREE from "three";
import {Client} from "../client";
import {Keys, enable} from "../input";
import {Map} from "../map_handler";


let socket: WebSocket;
let my_id: number;

export function handle_socket(clients: { [id: number]: Client }, map: {[id:number]:Map}, 
  callback: (x: number) => void) {

  socket = new WebSocket("ws://192.168.0.14:5012", "protocolOne");

  let client_list_requested = false;
  socket.onopen = event => {

    socket.onmessage = event => {
      let parsed = JSON.parse(event.data);
      switch(parsed.t) {
        case "client": {
          handle_client(parsed.data, clients);

          //request client list
          if(!client_list_requested) {
            my_id = parseInt(parsed.id);
            enable(clients, my_id);
            callback(my_id);
            socket.send(JSON.stringify({"t":"client_list"}));
            client_list_requested = true;
          }
          break;
        }
        case "map": {
          //          map[0] = new Map().deserialize(parsed.data);
          //map[0].loaded = true;
          break;
        }
        case "col": {
          clients[parsed.data.id].paused = true;
          if(parsed.data.id == my_id) {
            if(window.confirm("Do you want to respawn")) {
              socket.send(JSON.stringify({"t":"respawn"}));
            }
          }
          break;

        }
        case "respawn": {
          clients[parsed.data.id].paused = false;
          clients[parsed.data.id].deserialize(parsed.data);
          break;

        }
        case "client_list": {
          handle_client_list(parsed.data, clients);
          break;
        }
        case "update": {
          handle_update(parsed.data, clients);
          break;
        }
        case "move": {
          handle_move(my_id, parsed.data, clients);
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
  keys.id = my_id;
  keys.time = Date.now();
  socket.send(JSON.stringify({"t":"move", "time": Date.now(), "data": keys}))
}
