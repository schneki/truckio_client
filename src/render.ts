import * as THREE from "three"
import {Client} from "./client"
import {camera, scene, clients} from "./global"
import {my_id} from "./socket"


let renderer = new THREE.WebGLRenderer( {antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


export function animate() {
  requestAnimationFrame(animate);

  if(Object.keys(clients).length > 0) { 
    let client = clients[my_id];
    client.mesh.add(camera);
    camera.position.y = 1;
    camera.position.x = -1;
  }


  for (let key in clients) {
    let client: Client = clients[key];
    client.animate();
  }

  renderer.render(scene,camera);
}
