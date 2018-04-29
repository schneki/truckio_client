import {Client} from "../client";
export function handle_move(my_id: number, data: any, clients: {[id:number]: Client}) {
  //if(data.id != my_id) {
    clients[data.id].temp_keys.time = data.time;
    clients[data.id].temp_keys.left = data.left;
    clients[data.id].temp_keys.right = data.right;
    clients[data.id].temp_keys.boost = data.boost;
    clients[data.id].keys = clients[data.id].temp_keys;
  // }
}
