import * as THREE from "three"
import {start} from "./socket"
import {Ground} from "./ground"
import {animate, logic} from "./render"
import {camera, scene} from "./global"
import {enable} from "./input"




function init() {
  let ground = new Ground();
  scene.add(ground.grid);
}





init()
enable()
animate()
start()


