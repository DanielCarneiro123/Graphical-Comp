import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyCorolla } from "./corolla/MyCorolla.js";
import { MyStem } from "./stem/MyStem.js";


export class MyFlower extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, stemRadius, stemHeight, petalColor, receptacleColor, stemColor, petalAngle, maxAngle, minAngle) {
        super(scene)
        this.corolla = new MyCorolla(this.scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor, petalAngle, maxAngle, minAngle)
        this.stem = new MyStem(this.scene, 20, 4, stemRadius, stemHeight, stemHeight/6, stemHeight/4)
    }

    display() {
        this.scene.pushMatrix()
            this.scene.translate(...this.stem.final)
            this.scene.pushMatrix()
                this.scene.rotate(Math.PI/3, 1, 0, 0)
                this.corolla.display();
            this.scene.popMatrix()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
            this.stem.display();
        this.scene.popMatrix()
    }
}
