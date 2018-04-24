
import {Client} from "./client"
import {clients} from "./global"

export function logic() {
  for (let key in clients) {
    let client: Client = clients[key];
    client.movement()
  }
}
