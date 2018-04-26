import * as THREE from "three"
import {handle_socket} from "./socket/socket"
import {Ground} from "./ground"
import {render, start_logic} from "./render"
import {Client} from "./client"


function main() {
  
  let renderer = new THREE.WebGLRenderer( {antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 100);
  let scene = new THREE.Scene();

  let ground = new Ground();
  scene.add(ground.grid); 

  let clients: { [id: number]: Client } = {};

  handle_socket(clients, (my_id: number) => {
    render(renderer, scene, camera, my_id, clients);
  });
  start_logic(clients, Date.now());
}

main();


