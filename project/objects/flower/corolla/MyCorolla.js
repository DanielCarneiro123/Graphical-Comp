import { CGFobject, CGFappearance } from '../../../../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from './MyReceptacle.js';
import { MyCone } from '../../../polygons/MyCone.js';

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

        this.cone = new MyCone(this.scene, 20);
        this.initMaterials();

    }

    initMaterials(){
        this.coneMaterial = new CGFappearance(this.scene);
        this.coneMaterial.setAmbient(0.0, 1.0, 0.0, 1);
        this.coneMaterial.setDiffuse(0.0, 1.0, 0.0, 1);
        this.coneMaterial.setSpecular(0.0, 1.0, 0.0, 1);
        this.coneMaterial.setShininess(10.0);
        this.coneMaterial.loadTexture('images/stem4.jpg');
        this.coneMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(10.0);

        
        let angle = 2 * Math.PI / this.nrPetals;

        this.scene.pushMatrix()

            this.scene.translate(0, 0.5, 0)
            this.scene.rotate(-Math.PI/2, 1, 0, 0)
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

        this.scene.popMatrix()

        
        this.scene.pushMatrix()
            this.coneMaterial.apply();
            this.scene.scale(this.receptacleRadius * 0.8, 0.5, this.receptacleRadius * 0.8);
            this.cone.display();

        this.scene.popMatrix()


        this.scene.pushMatrix()
            appearance.apply();

            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.5);
            this.receptacle.display();

        this.scene.popMatrix()
    }
}
