import * as THREE from "three"


export class Ground {
  grid: THREE.GridHelper;


  public texture_test() {
    let plane_geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100,100,1);
    let texture = new THREE.TextureLoader().load("concretia_1.jpg");
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10,10);
    let plane_material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}); 
    let plane = new THREE.Mesh(plane_geometry, plane_material);
    plane.position.y = -1;
    plane.rotation.set(-1,0,0);

  }

  constructor() {
    this.grid = new THREE.GridHelper(100,100);
  }
}
