import * as THREE from "three"
import {start} from "./socket"
import {Ground} from "./ground"
import {animate} from "./render"
import {logic} from "./logic"
import {camera, scene} from "./global"
import {enable} from "./input"




function init() {
  let ground = new Ground();
  scene.add(ground.grid);
}





init()
enable()
setInterval(logic, 10)
animate()
start()


