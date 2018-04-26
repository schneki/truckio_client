import {Client} from "../client";

export function handle_client_list(data: any, clients: {[id:number]: Client}) {
  console.log(data);
  for (let key in data) {
    clients[data[key].id] = new Client().deserialize(data[key]);
  }
  console.log(clients);
}
