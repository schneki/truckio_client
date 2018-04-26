import {Client} from "../client";
export function handle_move(id: number, data: any, clients: {[id:number]: Client}) {
  clients[id].keys.left = data.left;
  clients[id].keys.right = data.right;
}
