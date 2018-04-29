import * as THREE from "three";

export class Skybox {

  create_mesh(scene: THREE.Scene): void {
    let texture_path = "assets/hw_nightsky/nightsky";
    let image_type = ".png";
    let size = 250;

    var geometry = new THREE.CubeGeometry( size, size, size );
    var cubeMaterials = [
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_ft"+image_type ),
        side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_bk"+image_type ),
        side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_up"+image_type ),
        side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_dn"+image_type ),
        side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_rt"+image_type ),
        side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ 
        map: new THREE.TextureLoader().load( texture_path+"_lf"+image_type ),
        side: THREE.DoubleSide }),
    ];

    var cube = new THREE.Mesh( geometry, cubeMaterials );
    cube.position.x = size/2;
    cube.position.z = size/2;

    scene.add(cube);

  }
}

