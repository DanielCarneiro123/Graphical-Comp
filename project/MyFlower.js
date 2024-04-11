import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCorolla } from "./MyCorolla.js";
import { MyStem } from "./MyStem.js";


export class MyFlower extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, stemRadius, stemHeight, petalColor, receptacleColor, stemColor) {
        super(scene)
        this.corolla = new MyCorolla(this.scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor)
        this.stem = new MyStem(this.scene, 20, stemRadius, stemHeight, stemColor)
    }

    display() {
        this.scene.pushMatrix()
        this.scene.translate(0, 5 + 1, 0)
        this.corolla.display();
        this.scene.popMatrix()

        this.scene.pushMatrix()
        
        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(100);
        appearance.setDiffuse(this.stemColor[0], this.stemColor[1], this.stemColor[2], 1); 
        appearance.apply();
        this.stem.display();
        this.scene.popMatrix()
    }
}