// load models

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, FreeCamera } from 'babylonjs';

export class Test_loadModel extends BaseGame 
{
    camera : FreeCamera;
    models = ["box", "tree1", "tree2", "mushroom", "comp"];

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = Utils.createCamera(new BABYLON.Vector3(0, 5, 30), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        Utils.createText();

        this.createMap();
        this.camera.setTarget(new Vector3(0, 3, -100));

    }

    createMap()
    {
        Model3D.setDir("assets/models/");

        let AREA = 50;
        for(let x=0; x<300; x++)
        {
            let pos = new Vector3(Math.random() * AREA - AREA/2, 0, Math.random() * AREA - AREA/2);
            let rnd = Math.floor(Math.random() * 5);
            Model3D.load(this.models[rnd] + ".babylon", this.scene, pos);
        }
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);
        Utils.label.text += "\ncampos: " + this.camera.position.x.toPrecision(3) + " " + 
            this.camera.position.y.toPrecision(3) + " " + this.camera.position.z.toPrecision(3) + " ";

    }

}
