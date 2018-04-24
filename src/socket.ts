import {clients, scene} from "./global"
import {Client} from "./client"
import {Keys} from "./input"

export let my_id: number;
export let initialized = false;

let socket: WebSocket;

export function start() {
  socket = new WebSocket("ws://localhost:5012", "protocolOne");

  socket.onopen = event => {


    socket.onmessage = event => {
      let parsed = JSON.parse(event.data);
      let t = parsed.t;
      let id = parsed.id;
      console.log(id);
      let data = parsed.data;
      switch(t) {
        case "client": {
          let client = new Client(id, data.x, data.z, 0)
          clients[id] = client;
          scene.add(client.mesh);

          if(!initialized) {
            my_id = id;
            socket.send(JSON.stringify({"t":"client_list"}));
            initialized = true;
          }
          break;
        }
        case "client_list": {
            for (let key in data) {
              console.log(data[key]);
              let client = new Client(data[key].id, data[key].x, data[key].z, data[key].angle)
              clients[data[key].id] = client;
              scene.add(client.mesh);
            }
              break;
        }
        case "move": {
          if (id != my_id) {
            clients[id].keys.left = data.left;
            clients[id].keys.right = data.right;
          }
          break;
        }
        case "close": {
          console.log("closing");
          scene.remove(clients[id].mesh);
          delete clients[id];
          break;
        }
        default: {}
      }
    }
  };
}


export function send_move(keys: Keys) {
  console.log(keys);
  socket.send(JSON.stringify({"t":"move", "data": keys}))
}
