import {handle_client} from "./client_handler";
import {handle_client_list} from "./client_list_handler";
import {handle_move} from "./move_handler";
import {handle_close} from "./close_handler";
import * as THREE from "three";
import {Client} from "../client";
import {Keys, enable} from "../input";


let socket: WebSocket;
let my_id: number;

export function handle_socket(clients: { [id: number]: Client } , callback) {
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
            my_id = parsed.id;
            enable(clients, my_id);
            callback(my_id);
            socket.send(JSON.stringify({"t":"client_list"}));
            client_list_requested = true;
          }
          break;
        }
        case "client_list": {
          handle_client_list(parsed.data, clients);
          break;
        }
        case "update": {
          for(let key in parsed.data) {
            let k = parseInt(key);
            let client_data = new Client().deserialize(parsed.data[key]);
            let client = clients[k];


            client.update_time = client_data.update_time;

            let delay_ms = Date.now() - client.update_time;
            let delay_step = delay_ms * (client.speed/10);
            //client.z += delay_step


            //console.log(client.z - client_data.z);


            client.x = client_data.x;
            client.z = client_data.z;
            client.angle = client_data.angle;
          }
          break;
        }
        case "move": {
          console.log(parsed.data);
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
  socket.send(JSON.stringify({"t":"move", "time": Date.now(), "data": keys}))
}
