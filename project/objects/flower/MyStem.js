import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyCylinder } from "../../polygons/MyCylinder.js";

export class MyStem extends CGFobject {
    constructor(scene, slices, cylinderNumber, radius, height) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.cylinderNumber = cylinderNumber;
        this.randomHeights = [];
        this.randomMisalignments = []
        let max = height;
        for (let i = 0; i < cylinderNumber - 1 ; i++) {
            let random = Math.random() * max;
            max = max - random
            this.randomHeights.push(random);
            this.randomMisalignments.push(2);
        }
        this.randomHeights.push(max)
        this.cylinder = new MyCylinder(this.scene, 20, 2);

        console.log(this.randomHeights)
        console.log(this.height)
    }   

    display() {

        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(10.0);
        appearance.setDiffuse(0, 1, 0, 1);


        let appearance2 = new CGFappearance(this.scene);
        appearance2.setAmbient(0.3, 0.3, 0.3, 1);
        appearance2.setSpecular(1, 0.6, 0.6, 1);
        appearance2.setShininess(10.0);
        appearance2.setDiffuse(1, 0, 0, 1)


        let offset = 0;
        let i = 0;
        while (i < this.cylinderNumber) {
            this.scene.pushMatrix()
                if (i % 2 == 0) {
                    appearance.apply();
                } else {
                    appearance2.apply();
                }
                
                this.scene.scale(this.radius, this.randomHeights[i], this.radius)
                
               this.scene.translate(i*2, 2, i*2)
                console.log("height:", this.randomHeights[i], "offset:", offset)                
                this.cylinder.display();
                
            this.scene.popMatrix()
            offset += this.randomHeights[i]
            i++;

        }


        console.log("\n\n\n\n\n")
       
    }
   
}