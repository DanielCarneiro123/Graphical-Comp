import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../polygons/MySphere.js';

export class MyHive extends CGFobject {
    constructor(scene, hiveAppearance) {
        super(scene);
        this.sphere = new MySphere(scene, 20, 20);
        this.hiveAppearance = hiveAppearance;
    }

    display() {
        this.scene.pushMatrix();
            this.hiveAppearance.apply();
            this.scene.pushMatrix();
                this.scene.scale(0.5, 0.3, 0.5);
                this.sphere.display();
                this.scene.translate(0, 6.5, 0);
                this.sphere.display();
            this.scene.popMatrix();
            this.scene.translate(0, 0.15, 0);
            this.scene.pushMatrix();
                this.scene.scale(0.7, 0.3, 0.7);
                this.sphere.display();
                this.scene.translate(0, 5.5, 0);
                this.sphere.display();
            this.scene.popMatrix();
            this.scene.translate(0, 0.3, 0);
            this.scene.pushMatrix();
                this.scene.scale(0.9, 0.5, 0.9);
                this.sphere.display();
                this.scene.translate(0, 2, 0);
                this.sphere.display();
            this.scene.popMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.pushMatrix();
                this.scene.scale(1.2, 0.7, 1.2);
                this.sphere.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    }

}