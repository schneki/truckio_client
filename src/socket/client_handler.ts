import {Client} from "../client"

export function handle_client(data: any, clients: {[id:number]: Client}) {
  clients[data.id] = new Client().deserialize(data);
}

