import { CGFobject } from '../../../../lib/CGF.js';
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from './MyReceptacle.js';
import { MyCone } from '../../../polygons/MyCone.js';

export class MyCorolla extends CGFobject {
    constructor(scene, nrPetals, corollaRadius, receptacleRadius, petalColor, receptacleColor, coneColor, petalAngle, maxAngle, minAngle, receptacleAppearance, coneAppearance, petalAppearance) {
        super(scene)
        this.nrPetals = nrPetals
        this.receptacleRadius = receptacleRadius
        
        this.coneAppearance = coneAppearance
        this.petalAppearance = petalAppearance
        this.receptacleAppearance = receptacleAppearance
        
        this.petalColor = petalColor
        this.receptacleColor = receptacleColor
        this.coneColor = coneColor

        this.petal = new MyPetal(this.scene, corollaRadius - receptacleRadius, petalAngle, maxAngle, minAngle)
        this.receptacle = new MyReceptacle(this.scene, receptacleRadius)
        this.cone = new MyCone(this.scene, 20);
        
        this.randomsAngles = [];
        for (let i = 0; i < nrPetals; i++) {
            this.randomsAngles.push((Math.random() * (maxAngle - minAngle) + minAngle) * Math.PI / 180);        
        }

    }

    initColors(petalColor, receptacleColor, coneColor) {
        this.petalAppearance.setAmbient(petalColor[0], petalColor[1], petalColor[2], 1.0);
        this.petalAppearance.setDiffuse(petalColor[0], petalColor[1], petalColor[2], 1.0);
        this.petalAppearance.setSpecular(petalColor[0], petalColor[1], petalColor[2], 1.0);

        this.receptacleAppearance.setAmbient(receptacleColor[0], receptacleColor[1], receptacleColor[2], 1.0);
        this.receptacleAppearance.setDiffuse(receptacleColor[0], receptacleColor[1], receptacleColor[2], 1.0);
        this.receptacleAppearance.setSpecular(receptacleColor[0], receptacleColor[1], receptacleColor[2], 1.0);

        this.coneAppearance.setAmbient(coneColor[0], coneColor[1], coneColor[2], 1.0);
        this.coneAppearance.setDiffuse(coneColor[0], coneColor[1], coneColor[2], 1.0);
        this.coneAppearance.setSpecular(coneColor[0], coneColor[1], coneColor[2], 1.0);
    }

    display() {
        this.initColors(this.petalColor, this.receptacleColor, this.coneColor)
        let angle = 2 * Math.PI / this.nrPetals;

        this.scene.pushMatrix()
            this.petalAppearance.apply()
            this.scene.translate(0, 0.5, 0)
            this.scene.rotate(-Math.PI/2, 1, 0, 0)

            for (let i = 0; i < this.nrPetals * 2; i++) {
                this.scene.pushMatrix()
                    
                    this.scene.rotate(i * angle, 0, 0, 1)
                    this.scene.translate(0, this.receptacleRadius - 0.1, 0)
                    
                    this.scene.pushMatrix()
                        this.scene.rotate(this.randomsAngles[i], 1, 0, 0);
                        this.petal.display()
                    this.scene.popMatrix()

                    this.scene.pushMatrix()  
                        this.scene.translate(0, -0.1, 0)  
                        this.scene.rotate(this.randomsAngles[i] - Math.PI/6, 1, 0, 0);
                        this.petal.display()
                    this.scene.popMatrix()  
                this.scene.popMatrix()
            }

          

        this.scene.popMatrix()

        
        this.scene.pushMatrix()
            this.coneAppearance.apply();
            this.scene.scale(this.receptacleRadius * 0.9, 0.6, this.receptacleRadius * 0.9);
            this.cone.display();
        this.scene.popMatrix()


        this.scene.pushMatrix()
            this.receptacleAppearance.apply()
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(0, 0, 0.62);
            this.receptacle.display();

        this.scene.popMatrix()
    }
}
