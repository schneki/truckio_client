import * as THREE from "three"
import {Client} from "./client"






let last_time = Date.now();
export let delta = 0;
let interval = 1000.0/60.0;


export function render(renderer: THREE.Renderer, 
  scene: THREE.Scene, 
  camera: THREE.PerspectiveCamera,
  clients: {[id:number]:Client}) 
{

  let my_id = 0;
  let is_init = false;

  function animate() {
    delta += (Date.now() - last_time) / interval;
    last_time = Date.now();

    while(delta >= 1.0) { 

      //check for delete request
      for( let key in clients) {
        if(clients[key].should_remove) {
          clients[key].remove(scene);
          delete clients[key];
        }
      }



      for (let key in clients) {
        let client: Client = clients[key];
        client.movement();
      
      //check if mesh is created
        if (client.mesh_loaded) {
          client.animate();
          //init camera
          if(!is_init) {
            my_id = client.id;
            client.mesh.add(camera);
            camera.position.y = 2;
            is_init = true;
          }
        } else if(!client.mesh_exists) {
          client.create_mesh(scene); 
        }

      }
      delta-=1;
    }
    requestAnimationFrame( animate );
    renderer.render(scene,camera);
  }


  //start game loop
  animate();
}

