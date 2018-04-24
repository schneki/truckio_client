import * as THREE from "three"
import {Client} from "./client"
import {camera, scene, clients} from "./global"


let renderer = new THREE.WebGLRenderer( {antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


export function animate() {
  requestAnimationFrame(animate);

  for (let key in clients) {
    let client: Client = clients[key];
    client.animate();
  }

  renderer.render(scene,camera);
}
