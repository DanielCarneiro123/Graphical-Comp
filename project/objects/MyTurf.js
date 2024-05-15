import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySingleGrass } from './MySingleGrass.js';

export class MyTurf extends CGFobject {
    constructor(scene, numGrasses) {
        super(scene);
        this.numGrasses = numGrasses;
        this.grassPositions = [];
        this.grassRotations = []; 
        this.grasses = [];
        this.initGrasses();
    }

    initGrasses() {
        for (let i = 0; i < this.numGrasses; i++) {
            let x = Math.random() * 4 - 2; 
            let z = Math.random() * 4 - 2; 
            let y = Math.random() * 0.1;
            let rotation = Math.random() * Math.PI * 2;

            this.grassPositions.push([x, y, z]);
            this.grassRotations.push(rotation);

            let grass = new MySingleGrass(this.scene);
            this.grasses.push(grass);
        }
    }

    display() {
        for (let i = 0; i < this.grasses.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.grassPositions[i][0], this.grassPositions[i][1], this.grassPositions[i][2]);
            this.scene.rotate(this.grassRotations[i], 0, 1, 0); 
            this.grasses[i].display();
            this.scene.popMatrix();
        }
    }
}
