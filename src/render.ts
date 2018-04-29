import * as THREE from "three"
import {Client} from "./client"
import {Map} from "./map_handler"


export function start_logic(clients: {[id:number]:Client}, last_time: number) {

  let interval = 10;
  let delta = 0;

  function logic() {
    delta += Date.now() - last_time;
    last_time = Date.now();

    while(delta >= interval) {


      delta -= interval;
    }
  }
  setInterval(logic, 1);
}



export function render(renderer: THREE.Renderer, 
  scene: THREE.Scene, 
  camera: THREE.PerspectiveCamera,
  my_id: number,
  clients: {[id:number]:Client},
  map: {[id:number]:Map}) 
{

  let is_init = false;
  let map_init = false;
  let last_time = Date.now();

  function update() {
    let delta = Date.now() - last_time;
    last_time = Date.now();
    let seconds_passed = delta/1000;
    for(let key in clients) {
        clients[key].movement(seconds_passed);
      }
  }

  function render() {

    //check for delete request
    for( let key in clients) {
      if(clients[key].should_remove) {
        clients[key].remove(scene);
        delete clients[key];
      }
    }

      
    for(let key in map) {
      let m = map[key];
      if(!map_init) {
        console.log("happens");
        m.create_trees(scene);
        map_init = true;
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
          camera.position.z = 5;
          is_init = true;
        }
      } else if(!client.mesh_exists) {
        client.create_mesh(scene); 
      }

    }
    renderer.render(scene,camera);
  }

  function animate() {
    requestAnimationFrame( animate );
    update()
    render()
  }


  animate();
}




