import { CGFobject } from '../../../lib/CGF.js';
import { MyCorolla } from "./corolla/MyCorolla.js";
import { MyStem } from "./stem/MyStem.js";


export class MyFlower extends CGFobject {
    constructor(scene, nrPetals, nrCylinder, 
            corollaRadius, receptacleRadius, stemRadius, stemHeight, 
            petalAngle, maxAngle, minAngle, 
            leafAppearance, stemAppearance, receptacleAppearance, petalAppearance) {
        super(scene)
        this.corolla = new MyCorolla(this.scene, nrPetals, corollaRadius, receptacleRadius, petalAngle, maxAngle, minAngle, receptacleAppearance, stemAppearance, petalAppearance)
        this.stem = new MyStem(this.scene, 8, nrCylinder, stemRadius, stemHeight, stemHeight/6, stemHeight/3, leafAppearance, stemAppearance)
        this.stemRadius = stemRadius
    }

    display() {
        
        this.scene.pushMatrix()
        
        this.scene.rotate(-Math.PI/4, 0, 1, 0)

        this.scene.pushMatrix()
            this.scene.translate(...this.stem.final)
            this.scene.pushMatrix()
                this.scene.rotate(Math.PI / 4, 0, 1, 0)
                this.scene.rotate(this.stem.angle, 1, 0, 0)
                this.corolla.display();
            this.scene.popMatrix()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
            this.stem.display();
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
}
