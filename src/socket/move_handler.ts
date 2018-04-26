import {Client} from "../client";
export function handle_move(my_id: number, data: any, clients: {[id:number]: Client}) {
  if(data.id != my_id) {
    clients[data.id].keys.left = data.left;
    clients[data.id].keys.right = data.right;
  }
}
