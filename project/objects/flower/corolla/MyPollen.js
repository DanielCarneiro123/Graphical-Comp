import { CGFobject, CGFappearance, CGFtexture } from '../../../../lib/CGF.js';
import { MySphere } from '../../../polygons/MySphere.js';

export class MyPollen extends CGFobject {
	constructor(scene) {
		super(scene);
		this.sphere = new MySphere(this.scene, 16, 8);
        this.initMaterials();
	}
	
    initMaterials() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(new CGFtexture(this.scene, 'images/pollen.jpg'));
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.appearance.setSpecular(0.1, 0.1, 0.1, 1);
    }

	display() {
        this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(0.2, 0.3, 0.2);
            this.sphere.display();
        this.scene.popMatrix();
	}
}

