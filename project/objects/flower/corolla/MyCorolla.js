import { CGFobject, CGFappearance } from '../../../../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from './MyReceptacle.js';

export class MyCorolla extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor, petalAngle, maxAngle, minAngle) {
        super(scene)
        this.nrPetals = nrPetals
        this.petal = new MyPetal(this.scene, corollaRadius - receptacleRadius, petalColor, petalAngle, maxAngle, minAngle)
        this.receptacle = new MyReceptacle(this.scene, receptacleRadius)
        this.petalColor = petalColor
        this.receptacleColor = receptacleColor
        this.receptacleRadius = receptacleRadius
        this.randomsAngles = [];
        for (let i = 0; i < nrPetals; i++) {
            this.randomsAngles.push((Math.random() * (maxAngle - minAngle) + minAngle) * Math.PI / 180);        
        }
    }

    display() {

        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(10.0);

        
        let angle = 2 * Math.PI / this.nrPetals;

        for (let i = 0; i < this.nrPetals; i++) {
            this.scene.pushMatrix()
            
            this.scene.rotate(i * angle, 0, 0, 1)
            
            this.scene.translate(0, this.receptacleRadius - 0.2, 0)
            
            this.scene.pushMatrix()
            this.scene.rotate(this.randomsAngles[i], 1, 0, 0);
            this.petal.display()
            this.scene.popMatrix()
            
            this.scene.popMatrix()
        }

        
        this.scene.pushMatrix()

        appearance.setDiffuse(this.receptacleColor[0], this.receptacleColor[1], this.receptacleColor[2], 1); 
        appearance.apply();

        this.receptacle.display();

        this.scene.popMatrix()
    }
}