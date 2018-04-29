import {Serializable} from "./util";
import * as THREE from "three";

export class Map implements Serializable<Map> {
  size_x: number = 0;
  size_z: number = 0;
  trees: Array<Array<boolean>> = [[]];
  loaded: boolean = false;

  deserialize(input: any): Map {
    this.size_x = input.size_x;
    this.size_z = input.size_z;
    this.trees = input.trees; 
    return this;
  }

  create_trees(scene: THREE.Scene): void {
    for(let x=0; x<this.trees.length; x++) {
      for(let z=0; z<this.trees[x].length; z++) {
        if(this.trees[x][z]) {
          let geometry = new THREE.BoxGeometry(1,4,1);
          let material = new THREE.MeshNormalMaterial();
          let mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = x;
          mesh.position.z = z;
          mesh.position.y = 1;
          scene.add(mesh);
        }

      }
    } 
  }
}
