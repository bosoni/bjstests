// template

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';

export class Test_0 extends BaseGame
{
    costructor() {}

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = Utils.createCamera(new BABYLON.Vector3(0, 2, 10), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        

        Utils.createText();
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);

        if(this.firstTime)
        {
            this.firstTime=false;
        }

    }

    checkKeys(inputMap: { [x: string]: boolean; })
    {
        if(inputMap["a"] || inputMap["ArrowLeft"])
        {
        }

    }

}
