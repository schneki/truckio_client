import {Client} from "../client";

export function handle_close(id: number, clients: {[id:number]: Client}) {
  clients[id].should_remove = true;
}
