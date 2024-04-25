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
        this.initCylinders(cylinderNumber, radius);

        this.leaf = new MyLeaf(this.scene)

        console.log("The heights are: ", this.heights)
        console.log("The missallignments are: ", this.missallignments)
        console.log("The final is: ", this.final)

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
        this.heights = this.heights.sort().reverse();
    }

    initMisallignments(cylinderNumber, radius) {
        this.missallignments = []
        let offset_x = 0;
        let offset_z = 0;

        for (let i = 0; i < cylinderNumber - 1; i++) {
            let randomAngle = Math.random() * 2 * Math.PI;
            let randomRadius = Math.random(radius/2, radius) * 1.5;
            let x = Math.cos(randomAngle) * randomRadius;
            let z = Math.sin(randomAngle) * randomRadius;
            x = Math.round(x * 100) / 100
            z = Math.round(z * 100) / 100
            this.missallignments.push([x, 1, z])
            offset_x += x;
            offset_z += z;
        }
        
        let angles = [Math.PI / 6, Math.PI / 5, Math.PI / 4, Math.PI / 3];
        let randomIndex = Math.floor(Math.random() * angles.length);
        this.angle = angles[randomIndex];
        let x = Math.cos(this.angle);
        let z = Math.sin(this.angle);
        this.missallignments.push([x, 1, z])
        offset_x += x;
        offset_z += z;
        this.final = [offset_x * this.radius - this.radius / 2, this.height - this.radius, offset_z * this.radius - this.radius / 2]
    }


    initCylinders(cylinderNumber) {
        this.cylinders = []
        for (let i = 0; i < cylinderNumber; i++) {
            this.cylinders.push(new MyCylinder(this.scene, this.slices, 1, this.missallignments[i]))
        }
    }

    display() {

        let offset = [0, 0, 0];
       
        for (let i = 0; i < this.cylinderNumber; i++) {
            this.scene.pushMatrix();
                this.scene.scale(this.radius, 1, this.radius)
                this.scene.translate(...offset);
                if (i > 0) {
                    this.scene.pushMatrix();
                        this.scene.scale(1/this.radius * 0.15, 0.06, 1/this.radius * 0.15)
                        this.scene.translate(this.radius, 0, 0)
                        if (i % 2) this.scene.rotate(Math.PI, 0, 1, 0)
                        this.scene.rotate(Math.PI/3, 1, 0, 0)
                        this.leafAppearance.apply();
                        this.leaf.display();
                    this.scene.popMatrix();
                }

                this.scene.pushMatrix();
                    this.stemAppearance.apply();
                    this.scene.scale(1, this.heights[i], 1);
                    this.cylinders[i].display();
                    offset = [offset[0] + this.missallignments[i][0] , offset[1] + this.heights[i], offset[2] + this.missallignments[i][2]];
                this.scene.popMatrix();
                
            this.scene.popMatrix();

        }

    }
   
}