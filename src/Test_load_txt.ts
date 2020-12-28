// load txt

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';

export class Test_load_txt extends BaseGame
{
    txt : string;

    costructor() {}

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -100), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        
        Utils.createText();


        BABYLON.Tools.LoadFile("./assets/text.txt", (data) => 
        {
            this.txt = data.toString();
        });
       
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);

        // if data isnt available yet, return
        if(this.txt == undefined) return;

        
        console.log(this.txt);

    }

}
