import * as THREE from "three"
import {Client} from "./client"
import {camera, scene, clients} from "./global"
import {my_id} from "./socket"


let renderer = new THREE.WebGLRenderer( {antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



let initialized = false;

let delay = 1000;

let last_time = Date.now();
export let delta = 0;
let interval = 1000.0/60.0;



export function animate() {
  

  requestAnimationFrame( animate );


    delta += (Date.now() - last_time) / interval;
    last_time = Date.now();

    while(delta >= 1.0) { 
      for (let key in clients) {
        let client: Client = clients[key];
        client.movement();
        client.animate();
      }
      delta-=1;
    }

  renderer.render(scene,camera);
}

export function logic() {
  //  while(true) {

}
