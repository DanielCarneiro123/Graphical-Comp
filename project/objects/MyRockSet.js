import { MyRock } from './MyRock.js';
import { CGFobject } from '../../../lib/CGF.js';

export class MyRockSet extends CGFobject {
    constructor(scene, numLayers, rocksPerLayer, baseRadius = 0.5, panorama = false) {
        super(scene);
        this.numLayers = numLayers;
        this.rocksPerLayer = rocksPerLayer;
        this.baseRadius = baseRadius;
        this.panorama = panorama;
        this.rocks = [];
        this.generateRocks();
    }

    generateRocks() {
        const topRadius = 0.1; 
        const baseRadius = this.baseRadius; 
        const radiusIncrement = (baseRadius - topRadius) / this.numLayers; 

        for (let layer = 0; layer < this.numLayers; layer++) {
            const radius = baseRadius - layer * radiusIncrement; 
            const numRocksInLayer = this.rocksPerLayer * (this.numLayers - layer); 

            for (let i = 0; i < numRocksInLayer; i++) {
                const numSlices = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
                const numStacks = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
                const posX = Math.random() * 3 * Math.PI * radius; 
                const posY = layer * 1.5 / this.numLayers; 
                const posZ = Math.random() * 3 * Math.PI * radius; 
                const rotationY = Math.random() * Math.PI * 2;

                this.rocks.push(new MyRock(this.scene, numSlices, numStacks, this.baseRadius, posX, posY, posZ, rotationY));
            }
        }
    }
    
    display() {
        for (let i = 0; i < this.rocks.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.rocks[i].posX, this.rocks[i].posY, this.rocks[i].posZ); 
            this.scene.rotate(this.rocks[i].rotationY, 0, 1, 0); 
            this.rocks[i].display();
            this.scene.popMatrix();
        }
    }
}
