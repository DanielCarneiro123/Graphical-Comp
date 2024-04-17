import {CGFobject, CGFappearance} from '../../../../lib/CGF.js';
import { MyCylinder } from "../../../polygons/MyCylinder.js";
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, cylinderNumber, radius, height, minHeight, maxHeight) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.height = height;
        this.cylinderNumber = cylinderNumber;
        this.initMaterials();
        this.initHeights(cylinderNumber, height, minHeight, maxHeight);
        this.initMisallignments(cylinderNumber, radius);
        this.initLeafPositions(cylinderNumber);
        this.initCylinders(cylinderNumber, radius);
        this.leaf = new MyLeaf(this.scene)
    }   

    initHeights(cylinderNumber, height, minHeight, maxHeight) {
        this.heights = [];
        let max = height;
        for (let i = 0; i < cylinderNumber - 1; i++) {
            let randomHeight = Math.random() * (maxHeight - minHeight) + minHeight;
            randomHeight = Math.min(randomHeight, max);
            max -= randomHeight;
            this.heights.push(randomHeight);
        }

        this.heights.push(max); 

        console.log(this.heights)
    }

    initMisallignments(cylinderNumber, radius) {
        this.missallignments = []
        for (let i = 0; i < cylinderNumber; i++) {
            let randomAngle = Math.random() * 2 * Math.PI;
            let randomRadius = Math.random(radius/2, radius);
            let x = Math.cos(randomAngle) * randomRadius;
            let z = Math.sin(randomAngle) * randomRadius;
            x = Math.round(x * 100) / 100
            z = Math.round(z * 100) / 100
            this.missallignments.push([x, 1, z])
        }
    }

    initLeafPositions(cylinderNumber) {
        this.leafPositions = []
        for (let i = 0; i < cylinderNumber; i++) {
            let randomAngleY = Math.random() * Math.PI - Math.PI/2;
            if (i % 2 == 0) randomAngleY += Math.PI;
            this.leafPositions.push(randomAngleY)
        }
    }


    initCylinders(cylinderNumber) {
        this.cylinders = []
        for (let i = 0; i < cylinderNumber; i++) {
            this.cylinders.push(new MyCylinder(this.scene, this.slices, 20, this.missallignments[i]))
        }
    }


    initMaterials() {
        this.stemMaterial = new CGFappearance(this.scene);
        this.stemMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.stemMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.stemMaterial.setShininess(10.0);
        this.stemMaterial.loadTexture('images/stem4.jpg');
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leafMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leafMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leafMaterial.setShininess(10.0);
        this.leafMaterial.loadTexture('images/leaf.jpg');
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        
        let offset = [0, 0, 0];
        
        // display cylinders
        for (let i = 0; i < this.cylinderNumber; i++) {
            this.scene.pushMatrix();
                this.scene.scale(this.radius, 1, this.radius)
                this.scene.translate(...offset);

                if (i > 0) {
                    this.scene.pushMatrix();
                        this.scene.rotate(this.leafPositions[i], 0, 1, 0)
                        this.scene.pushMatrix()
                            this.scene.scale(1/this.radius, 1, 1/this.radius);
                            this.scene.translate(this.radius, 0, 0)
                            this.leafMaterial.apply();
                            this.leaf.display();
                        this.scene.popMatrix();
                    this.scene.popMatrix();
                }

                this.scene.pushMatrix();
                    this.stemMaterial.apply();
                    this.scene.scale(1, this.heights[i], 1);
                    this.cylinders[i].display();
                    offset = [offset[0] + this.missallignments[i][0], offset[1] + this.heights[i], offset[2] + this.missallignments[i][2]];
                this.scene.popMatrix();
            this.scene.popMatrix();

        }

    }
   
}