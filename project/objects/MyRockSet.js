import {CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject{
    constructor(scene, numRocks, maxSlices, maxStacks, minRadius, maxRadius) {
        super(scene);
        this.numRocks = numRocks;
        this.maxSlices = maxSlices;
        this.maxStacks = maxStacks;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.rocks = [];

        this.createRocks();
    }

    createRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            const slices = Math.floor(Math.random() * this.maxSlices) + 1;
            const stacks = Math.floor(Math.random() * this.maxStacks) + 1;
            const radius = Math.random() * (this.maxRadius - this.minRadius) + this.minRadius;

            const rock = new MyRock(this.scene, slices, stacks, radius);
            this.rocks.push(rock);
        }
    }

    display() {
        for (let i = 0; i < this.numRocks; i++) {
            this.rocks[i].display();
        }
    }
}
