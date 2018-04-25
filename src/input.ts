import {clients} from "./global"
import {my_id, send_move} from "./socket"

export interface Keys {
  left: boolean;
  right: boolean;
  boost: boolean;
}

let keys = {left: false, right: false, boost: false};

export function enable() {

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      clients[my_id].keys.left = true;
      if(!keys.left) {
        send_move(clients[my_id].keys);
        keys.left = true;
      }
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d") {
      clients[my_id].keys.right = true;
      if(!keys.right) {
        send_move(clients[my_id].keys);
        keys.right = true;
      }
    }
    if (event.key == "," || event.keyCode) {
      clients[my_id].keys.boost = true;
      if(!keys.boost) {
        send_move(clients[my_id].keys);
        keys.boost = true;
      }
    }
  })

  document.addEventListener("keyup", (event:KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      clients[my_id].keys.left = false;
      keys.left = false;
      send_move(clients[my_id].keys);
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d"){
      clients[my_id].keys.right = false;
      keys.right = false;
      send_move(clients[my_id].keys);
    }
    if (event.key == ",") {
      clients[my_id].keys.boost = false;
      keys.boost = false;
      send_move(clients[my_id].keys);
    }
  })
}
