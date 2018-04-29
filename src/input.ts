import {send_move} from "./socket/socket"
import {Client} from "./client"

export interface Keys {
  time: number;
  id: number;
  left: boolean;
  right: boolean;
  boost: boolean;
}

let keys = {id: 0, time: 0, left: false, right: false, boost: false};

export function enable(clients: {[id:number]: Client}, id: number) {

  document.addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      if(!keys.left) {
        clients[id].temp_keys.left = true;
        keys.left = true;
      }
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d") {
      if(!keys.right) {
        clients[id].temp_keys.right = true;
        keys.right = true;
      }
    }
    if (event.key == "," || event.keyCode) {
      if(!keys.boost) {
        clients[id].temp_keys.boost = true;
        keys.boost = true;
      }
    }

    if (event.key == "a" || event.key == "e" || event.key == ",") {
      send_move(clients[id].temp_keys);
    }
  })

  document.addEventListener("keyup", (event:KeyboardEvent) => {
    if (event.key == "a" || event.key == "ArrowLeft") {
      clients[id].temp_keys.left = false;
      keys.left = false;
    }
    if (event.key == "e" || event.key == "ArrowRight" || event.key == "d"){
      clients[id].temp_keys.right = false;
      keys.right = false;
    }
    if (event.key == ",") {
      clients[id].temp_keys.boost = false;
      keys.boost = false;
    }
    if (event.key == "a" || event.key == "e" || event.key == ",") {
      send_move(clients[id].temp_keys);
    }
  })
}
