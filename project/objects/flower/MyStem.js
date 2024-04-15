import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyCylinder } from "../../polygons/MyCylinder.js";

export class MyStem extends CGFobject {
    constructor(scene, slices, cylinderNumber, radius, height) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.cylinderNumber = cylinderNumber;
        this.initMaterials();
        this.cylinder = new MyCylinder(this.scene, 20, 2);
        this.initHeights(cylinderNumber, height);
    }   

    initHeights(cylinderNumber, height) {
        this.heights = [];
        let max = height;
        for (let i = 0; i < cylinderNumber; i++) {
            let randomHeight = Math.random() * max;
            max -= randomHeight;
            this.heights.push(randomHeight);
        }
    }

    initMaterials() {
        let appearance = new CGFappearance(this.scene);
        appearance.setAmbient(0.3, 0.3, 0.3, 1);
        appearance.setSpecular(0.6, 0.6, 0.6, 1);
        appearance.setShininess(10.0);
        appearance.setDiffuse(0, 1, 0, 1);
        this.appearance = appearance

        let appearance2 = new CGFappearance(this.scene);
        appearance2.setAmbient(0.3, 0.3, 0.3, 1);
        appearance2.setSpecular(1, 0.6, 0.6, 1);
        appearance2.setShininess(10.0);
        appearance2.setDiffuse(1, 0, 0, 1)
        this.appearance2 = appearance2
    }

    display() {


        let offset = 0;

        for (let i = 0; i < this.cylinderNumber; i++) {
            this.scene.pushMatrix();
                if (i % 2 == 0) this.appearance2.apply(); else this.appearance.apply();
                this.scene.translate(0, offset, 0);
                this.scene.scale(this.radius, this.heights[i], this.radius);
                this.cylinder.display();
                offset += this.heights[i];
            this.scene.popMatrix();
        }


        console.log("\n\n\n\n\n")
       
    }
   
}