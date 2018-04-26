import {send_move} from "./socket/socket"

export interface Keys {
  left: boolean;
  right: boolean;
  boost: boolean;
}

let keys = {left: false, right: false, boost: false};

export function enable() {

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      //      clients[my_id].keys.left = true;
      if(!keys.left) {
        keys.left = true;
        send_move(keys);
      }
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d") {
      //clients[my_id].keys.right = true;
      if(!keys.right) {
        keys.right = true;
        send_move(keys);
      }
    }
    if (event.key == "," || event.keyCode) {
      //clients[my_id].keys.boost = true;
      if(!keys.boost) {
        keys.boost = true;
        send_move(keys);
      }
    }
  })

  document.addEventListener("keyup", (event:KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      //clients[my_id].keys.left = false;
      keys.left = false;
      send_move(keys);
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d"){
      //clients[my_id].keys.right = false;
      keys.right = false;
      send_move(keys);
    }
    if (event.key == ",") {
      //clients[my_id].keys.boost = false;
      keys.boost = false;
      send_move(keys);
    }
  })
}
