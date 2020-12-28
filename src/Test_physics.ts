// physics test
// https://doc.babylonjs.com/how_to/using_the_physics_engine
// install ammojs:   npm install kripken/ammo.js
// install cannon:   npm install cannon

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';

export class Test_physics extends BaseGame 
{
    myscene : Model3D;

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = Utils.createCamera(new BABYLON.Vector3(0, 2, 20), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        Utils.createText();

        this.initPhysics();

    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);

        if(this.firstTime)
        {
            if(this.physicsReady)
            {
                this.firstTime=false;
                this.myscene = Model3D.load("physics/scene1.babylon", this.scene);
            }
            return;
        }

    }

}
