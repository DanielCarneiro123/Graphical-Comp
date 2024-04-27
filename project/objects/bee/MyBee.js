import { CGFobject, CGFappearance } from "../../../lib/CGF.js";
import { MySphere } from "../../polygons/MySphere.js";
import { MyHead } from "./head/MyHead.js";

export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);
    this.sphere = new MySphere(this.scene, 50, 50);
    this.head = new MyHead(this.scene);

  }

  display() {

    this.head.display();
    
  }
}
