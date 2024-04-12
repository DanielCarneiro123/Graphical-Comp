import { CGFobject, CGFappearance } from '../../../../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from './MyReceptacle.js';

export class MyCorolla extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor) {
        super(scene)
        this.nrPetals = nrPetals
        this.petal = new MyPetal(this.scene, corollaRadius)
        this.receptacle = new MyReceptacle(this.scene, receptacleRadius)
        this.petalColor = petalColor
        this.receptacleColor = receptacleColor
    }

    display() {

        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(100);
        appearance.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], 1); 

        let angle = 2 * Math.PI / this.nrPetals;
        for (let i = 0; i < this.nrPetals; i++) {
            this.scene.pushMatrix()
            
            appearance.apply();
            this.scene.rotate(i * angle, 0, 0, 1)
            this.scene.translate(0, 0.6, 0)
            
            this.petal.display()
            
            this.scene.popMatrix()
        }

        this.scene.pushMatrix()

        appearance.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1); 
        appearance.apply();

        this.receptacle.display();

        this.scene.popMatrix()
    }
}