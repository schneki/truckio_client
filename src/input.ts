import {send_move} from "./socket/socket"
import {Client} from "./client"

export interface Keys {
  id: number;
  left: boolean;
  right: boolean;
  boost: boolean;
}

let keys = {id: 0, left: false, right: false, boost: false};

export function enable(clients: {[id:number]: Client}, id: number) {

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      if(!keys.left) {
        clients[id].keys.left = true;
        keys.left = true;
        send_move(clients[id].keys);
      }
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d") {
      if(!keys.right) {
        clients[id].keys.right = true;
        keys.right = true;
        send_move(clients[id].keys);
      }
    }
    if (event.key == "," || event.keyCode) {
      if(!keys.boost) {
        keys.boost = true;
        send_move(keys);
      }
    }
  })

  document.addEventListener("keyup", (event:KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      clients[id].keys.left = false;
      keys.left = false;
      send_move(clients[id].keys);
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d"){
      clients[id].keys.right = false;
      keys.right = false;
      send_move(clients[id].keys);
    }
    if (event.key == ",") {
      keys.boost = false;
      send_move(keys);
    }
  })
}
