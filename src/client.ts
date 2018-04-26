import * as THREE from "three"
import { Keys } from "./input"
import {Serializable} from "./util"

export class Client implements Serializable<Client> {
  keys: Keys = {left: false, right: false, boost: false}
  mesh: THREE.Mesh;
  public id: number;
  public x: number;
  public z: number;
  public angle: number;
  public speed: number;
  public rotation_speed: number;
  public should_remove: boolean = false;
  public mesh_exists: boolean = false;
  public mesh_loaded: boolean = false;

  public create_mesh(scene: THREE.Scene) {
    let loader = new THREE.JSONLoader();
    this.mesh_exists = true;

    console.log("mesh created");


    //to access this in the callback
    let client = this;
    loader.load('./assets/truck.json', function(geometry) {
      let material = new THREE.MeshNormalMaterial();
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 1;
      client.mesh = mesh;
      scene.add(client.mesh);
      client.mesh_loaded = true;
    });
  }

  public remove(scene: THREE.Scene) {
    console.log("remove mesh");
    scene.remove(this.mesh);
  }

  public movement() {
    if(this.keys.left) { this.angle += this.rotation_speed }
    if(this.keys.right) { this.angle -= this.rotation_speed }

    let speed = this.keys.boost ? this.speed*2 : this.speed;
    
    this.x += (Math.sin(-this.angle) * speed);
    this.z -= (Math.cos(-this.angle) * speed);
  }

  public animate() {
    this.mesh.rotation.y = this.angle;
    this.mesh.position.x = this.x
    this.mesh.position.z = this.z

  }

  public deserialize(input: any): Client {
    this.id = input.id;
    this.x = input.x;
    this.z = input.z;
    this.angle = input.angle;
    this.speed = input.speed;
    this.rotation_speed = input.rotation_speed;
    return this;
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
