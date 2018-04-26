import * as THREE from "three"
import {handle_socket} from "./socket/socket"
import {Ground} from "./ground"
import {render} from "./render"
import {enable} from "./input"
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

  render(renderer, scene, camera, clients);
  handle_socket(clients);

  enable();
}

main();


