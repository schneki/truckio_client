import * as THREE from "three"
import {Client} from "./client"

export var clients: { [id: string] : Client; } = {};
export var camera: THREE.PerspectiveCamera;
export var scene: THREE.Scene;



camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 500);
camera.position.z = 1;
camera.position.y = 20;
camera.lookAt(0,0,0);

scene = new THREE.Scene();
