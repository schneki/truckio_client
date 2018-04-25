import { Keys } from "./input"
import * as THREE from "three"

export class Client {
  keys: Keys = {left: false, right: false, boost: false}
  mesh: THREE.Mesh;

  constructor(public id: number, public x: number, public z: number, public angle: number,
              public speed: number, public rotation_speed: number) {
    let geometry = new THREE.BoxGeometry(0.5,0.5,1);
    let material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(geometry, material);
  }

  public movement() {
    if(this.keys.left) { this.angle += this.rotation_speed }
    if(this.keys.right) { this.angle -= this.rotation_speed }

    let speed = this.keys.boost ? this.speed*2 : this.speed;
    
    this.x += Math.sin(-this.angle) * speed;
    this.z -= Math.cos(-this.angle) * speed;
  }

  public animate() {
    this.mesh.rotation.y = this.angle;
    this.mesh.position.x = this.x
    this.mesh.position.z = this.z
  }

  public set_keys(keys: any) {
    this.keys = keys;
  }

  public set_values(x: number, z: number, angle: number) {
    this.x = x;
    this.z = z;
    this.angle = angle;
  }
}
