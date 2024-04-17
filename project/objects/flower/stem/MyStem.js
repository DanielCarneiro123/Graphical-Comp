import { CGFobject } from '../../../../lib/CGF.js';
import { MyCylinder } from "../../../polygons/MyCylinder.js";
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
    constructor(scene, slices, cylinderNumber, radius, height, minHeight, maxHeight, leafAppearance, stemAppearance, leafColor, stemColor) {
        super(scene);
        
        this.slices = slices;
        this.radius = radius;
        this.height = height;

        this.cylinderNumber = cylinderNumber;
        this.leafAppearance = leafAppearance;
        this.stemAppearance = stemAppearance;

        this.leafColor = leafColor;
        this.stemColor = stemColor;

        this.initHeights(cylinderNumber, height, minHeight, maxHeight);
        this.initMisallignments(cylinderNumber, radius);
        this.initLeafPositions(cylinderNumber);
        this.initCylinders(cylinderNumber, radius);

        this.leaf = new MyLeaf(this.scene)

    }   

    initColors(leafColor, stemColor) {
        this.leafAppearance.setAmbient(leafColor[0], leafColor[1], leafColor[2], 1);
        this.leafAppearance.setDiffuse(leafColor[0], leafColor[1], leafColor[2], 1);
        this.leafAppearance.setSpecular(leafColor[0], leafColor[1], leafColor[2], 1);

        this.stemAppearance.setAmbient(stemColor[0], stemColor[1], stemColor[2], 1);
        this.stemAppearance.setDiffuse(stemColor[0], stemColor[1], stemColor[2], 1);
        this.stemAppearance.setSpecular(stemColor[0], stemColor[1], stemColor[2], 1);
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
    }

    initMisallignments(cylinderNumber, radius) {
        this.missallignments = []
        this.final = [0, 1, 0]
        for (let i = 0; i < cylinderNumber; i++) {
            let randomAngle = Math.random() * 2 * Math.PI;
            let randomRadius = Math.random(radius/2, radius);
            let x = Math.cos(randomAngle) * randomRadius;
            let z = Math.sin(randomAngle) * randomRadius;
            x = Math.round(x * 100) / 100
            z = Math.round(z * 100) / 100
            this.missallignments.push([x, 1, z])
            this.final = [this.final[0] + x, 1, this.final[2] + z]
        }
        this.final = [this.final[0] * this.radius,  this.height - this.radius, this.final[2] * this.radius - this.radius]
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

    display() {

        this.initColors(this.leafColor, this.stemColor);

        let offset = [0, 0, 0];
        
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
                            this.leafAppearance.apply();
                            this.leaf.display();
                        this.scene.popMatrix();
                    this.scene.popMatrix();
                }

                this.scene.pushMatrix();
                    this.stemAppearance.setAmbient(0.1, 0.1, 0.1, 1);
                    this.stemAppearance.apply();
                    
                    this.scene.scale(1, this.heights[i], 1);
                    this.cylinders[i].display();
                    offset = [offset[0] + this.missallignments[i][0] , offset[1] + this.heights[i], offset[2] + this.missallignments[i][2]];
                this.scene.popMatrix();
            this.scene.popMatrix();

        }

    }
   
}