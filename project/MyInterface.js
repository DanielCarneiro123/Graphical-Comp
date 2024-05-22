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
        this.gui.add(this.scene, 'displayTerrain').name("Terrain");
        this.gui.add(this.scene, 'displayEarth').name("Earth");
        this.gui.add(this.scene, 'displayGarden').name("Garden");
        this.gui.add(this.scene, 'displayRockSet').name("Rock Set");
        this.gui.add(this.scene, 'displayBee').name("Bee");
        this.gui.add(this.scene, 'displayHive').name("Hive");
        this.gui.add(this.scene, 'displayTurf').name('Turf');
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.5, 80).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).onChange(this.scene.updateSpeedFactor.bind(this.scene)).name('Speed Factor');
        var garden = this.gui.addFolder('Garden')
        garden.add(this.scene, 'gardenRows', 1, 8, 1).name('Garden Rows').onChange(this.scene.updateGarden.bind(this.scene));
        garden.add(this.scene, 'gardenCols', 1, 8, 1).name('Garden Cols').onChange(this.scene.updateGarden.bind(this.scene));
        this.initKeys();
        this.initKeys();
        return true;
    }
    
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keycode) {
        return this.activeKeys[keycode] || false;
    }
    
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keycode) {
        return this.activeKeys[keycode] || false;
    }
}