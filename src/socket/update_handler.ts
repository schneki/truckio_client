import {Client} from "../client";

export function handle_update(data: any, clients: {[id:number]: Client}) {
  for(let key in data) {
    let k = parseInt(key);
    let client_data = new Client().deserialize(data[key]);
    let client = clients[k];

    client.update_time = client_data.update_time;

    let delay_ms = Date.now() - client.update_time;


    client.x = client_data.x;
    client.z = client_data.z;
    console.log("position:" + client.x + ": " + client.z);
    client.angle = client_data.angle;
  }

}
