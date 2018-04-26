import * as THREE from "three"
import {Client} from "./client"







export function start_logic(clients: {[id:number]:Client}, last_time: number) {

  let interval = 10;
  let delta = 0;

  function logic() {
    delta += Date.now() - last_time;
    last_time = Date.now();

    while(delta >= interval) {

      for(let key in clients) {
        clients[key].movement();
      }

      delta -= interval;
    }
  }
  setInterval(logic, 0);
}


export function render(renderer: THREE.Renderer, 
  scene: THREE.Scene, 
  camera: THREE.PerspectiveCamera,
  my_id: number,
  clients: {[id:number]:Client}) 
{

  let is_init = false;

  function animate() {
    requestAnimationFrame( animate );

    //check for delete request
    for( let key in clients) {
      if(clients[key].should_remove) {
        clients[key].remove(scene);
        delete clients[key];
      }
    }



    for (let key in clients) {
      let client: Client = clients[key];
    
    //check if mesh is created
      if (client.mesh_loaded) {
        client.animate();
        //init camera
        if(!is_init) {
          clients[my_id].mesh.add(camera);
          camera.position.y = 2;
          is_init = true;
        }
      } else if(!client.mesh_exists) {
        client.create_mesh(scene); 
      }

    }
    renderer.render(scene,camera);
  }


  animate();
}




