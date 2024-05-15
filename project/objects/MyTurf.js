import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySingleGrass } from './MySingleGrass.js';
import { MyMovement } from "../animation/MyMovement.js";

export class MyTurf extends CGFobject {
    constructor(scene, numGrasses) {
        super(scene);
        this.numGrasses = numGrasses;
        this.grassAngle = Math.PI/8;
        this.grassPositions = [];
        this.grassRotations = []; 
        this.grasses = [];
        this.movement = new MyMovement(-0.5, 0.5, 0.5, true, true);
        this.speed = 0;
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
                this.scene.rotate(this.grassAngle*Math.random(), 0, 0, 1); 
                this.grasses[i].display();
            this.scene.popMatrix();
        }
    }

    update(elapsedTime, scaleFactor, speedFactor) {

        this.scale = scaleFactor;
    
        if (speedFactor !== this.lastSpeedFactor && this.speed != 0) {
            this.speed += (speedFactor - this.lastSpeedFactor);
            this.lastSpeedFactor = speedFactor;
        }
    
        this.movement.updateGrass(elapsedTime, {speed: this.speed, grassAngle: this.grassAngle})

        this.updateParameters()
    }
    
    updateParameters() {
        this.grassAngle = this.movement.grassAngle
    }

}
