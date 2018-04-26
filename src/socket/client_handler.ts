import {Client} from "../client"

export function handle_client(data: any, clients: {[id:number]: Client}) {
  clients[data.id] = new Client().deserialize(data);

  let client = clients[data.id];
  let delay_ms = Date.now() - client.creation_time;
  let delay_step = delay_ms * (client.speed/10);
  client.z += delay_step

  console.log("delay: " +delay_ms);
}

