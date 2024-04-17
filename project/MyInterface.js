import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display normals");
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        var displayGroup = this.gui.addFolder("Display object");

        displayGroup.add(this.scene, 'displayInfinitePanorama').name("Display infinite panorama");
        displayGroup.add(this.scene, 'displayFlower').name("Display flower");
        displayGroup.add(this.scene, 'displayGarden').name("Display garden");
        displayGroup.add(this.scene, 'displayTerrain').name("Display terrain");
        displayGroup.add(this.scene, 'displayEarth').name("Display earth");

        var garden = this.gui.addFolder('Garden')
        garden.add(this.scene, 'gardenRows', 1, 8, 1).name('Garden Rows').onChange(this.scene.updateGarden.bind(this.scene));
        garden.add(this.scene, 'gardenCols', 1, 8, 1).name('Garden Cols').onChange(this.scene.updateGarden.bind(this.scene));

        return true;
    }
}