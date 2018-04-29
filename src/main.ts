import * as THREE from "three"
import {handle_socket} from "./socket/socket"
import {Ground} from "./ground"
import {render, start_logic} from "./render"
import {Client} from "./client"
import {Map} from "./map_handler"
import {Skybox} from "./skybox"


function main() {

  console.log(Math.sin(-0.6));
  
  let renderer = new THREE.WebGLRenderer( {antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 500);
  let scene = new THREE.Scene();

  let ground = new Ground();
  scene.add(ground.grid); 

  let skybox = new Skybox();
  skybox.create_mesh(scene);

  var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3 );
  scene.add( ambientLight );


  let clients: { [id: number]: Client } = {};
  let map = {};

  handle_socket(clients, map, (my_id: number) => {
    render(renderer, scene, camera, my_id, clients, map);
  });

  //start_logic(clients, Date.now());

  
}

main();


