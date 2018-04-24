import {clients} from "./global"
import {my_id, send_move} from "./socket"

export interface Keys {
  left: boolean;
  right: boolean;
}

let keys = {left: false, right: false};

export function enable() {

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "a") {
      clients[my_id].keys.left = true;
      if(!keys.left) {
        send_move(clients[my_id].keys);
        keys.left = true;
      }
    }
    if (event.key == "e") {
      clients[my_id].keys.right = true;
      if(!keys.right) {
        send_move(clients[my_id].keys);
        keys.right = true;
      }
    }
  })

  document.addEventListener("keyup", (event:KeyboardEvent) => {
    if (event.key == "a") {
      clients[my_id].keys.left = false;
      keys.left = false;
      send_move(clients[my_id].keys);
    }
    if (event.key == "e") {
      clients[my_id].keys.right = false;
      keys.right = false;
      send_move(clients[my_id].keys);
    }
  })
}
