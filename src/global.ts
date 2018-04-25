declare function require(x: any): any;

import * as THREE from "three"
import {Client} from "./client"
const dat: any = require("dat.gui");

export var clients: { [id: string] : Client; } = {};
export var camera: THREE.PerspectiveCamera;
export var scene: THREE.Scene;
export let gui = new dat.default.GUI({width:300});



camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 100);

scene = new THREE.Scene();

let loader = new THREE.JSONLoader();
//loader.load('./assets/tree.json', function(geometry) {
  //  let material = new THREE.MeshNormalMaterial();
  // let mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);
//});
