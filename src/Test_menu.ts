/*
menu test

lataa 3d model jossa planeilla tehty menu
    start about exit

*/

import * as BABYLON from 'babylonjs';
import { Utils } from './Utils';
import { BaseGame } from './BaseGame';
import { Raycast } from './Raycast';
import { Model3D } from './Model3D';
import { SceneManager } from './SceneManager';
import { Test_clock } from './Test_clock';
import { Test_snow } from './Test_snow';

export class Test_menu extends BaseGame 
{
    camera : BABYLON.FreeCamera;
    raycast : Raycast;

    tmpmodel : Model3D;

    costructor() { }

    createScene() 
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1.5, -0.01), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);

        Utils.createText();
       
        this.raycast = new Raycast();

        Model3D.setDir("assets/menu/");
        this.tmpmodel = Model3D.load("menu.babylon", this.scene);

    }

    dispose()
    {
        console.log(" -menu dispose ");
    }

    update(deltaTime: number) 
    {
        Utils.writeDebug(this.scene, deltaTime);

        if(BaseGame.clicked)
        for (let q = 0; q < this.tmpmodel.meshes.length; q++) 
        {
            let tmpmesh = this.tmpmodel.meshes[q];

            if(Raycast.checkHit(this.scene, tmpmesh))
            {
                Raycast.pickResult=null;

                console.log("clicked  "+tmpmesh.name);
                if(tmpmesh.name == "start")
                {
                    SceneManager.change(new Test_clock());
                }
                else if(tmpmesh.name == "about")
                {
                    SceneManager.change(new Test_snow());
                }
                else if(tmpmesh.name == "exit")
                {
                    console.log("exit pressed");
                }

                return;
            }
        }

    }
}
