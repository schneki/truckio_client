import { Keys } from "./input"
import * as THREE from "three"

export class Client {
  keys: Keys = {left: false, right: false}
  mesh: THREE.Mesh;

  constructor(private id: number, private x: number, private z: number, private angle: number) {
    let geometry = new THREE.BoxGeometry(0.2,0.2,0.5);
    let material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
  }

  public movement() {
    if(this.keys.left) { this.angle += 0.01 }
    if(this.keys.right) { this.angle -= 0.01 }
    
    this.x += Math.sin(-this.angle) * 0.01;
    this.z -= Math.cos(-this.angle) * 0.01;
  }

  public animate() {
    this.mesh.rotation.y = this.angle;
    this.mesh.position.x = this.x
    this.mesh.position.z = this.z
  }

  public set_keys(keys: any) {
    this.keys = keys;
  }
}
