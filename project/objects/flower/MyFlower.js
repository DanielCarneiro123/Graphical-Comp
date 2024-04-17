import { CGFobject, CGFappearance } from '../../../lib/CGF.js';
import { MyCorolla } from "./corolla/MyCorolla.js";
import { MyStem } from "./stem/MyStem.js";


export class MyFlower extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, stemRadius, stemHeight, petalColor, receptacleColor, stemColor, petalAngle, maxAngle, minAngle) {
        super(scene)
        this.corolla = new MyCorolla(this.scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor, petalAngle, maxAngle, minAngle)
        this.stem = new MyStem(this.scene, 20, 5, stemRadius, stemHeight, stemHeight/6, stemHeight/4)
        this.stemColor = stemColor
    }

    display() {

        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1);
        appearance.setSpecular(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1);
        appearance.setShininess(100);
        appearance.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1); 
        /*
        this.scene.pushMatrix()
            this.scene.translate(0, 5 + 1, 0)
            this.corolla.display();
        this.scene.popMatrix()
*/
        this.scene.pushMatrix()
            appearance.apply();
            this.stem.display();
        this.scene.popMatrix()
    }
}
