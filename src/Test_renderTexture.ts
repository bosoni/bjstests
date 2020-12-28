// render to texture
// https://doc.babylonjs.com/how_to/how_to_use_rendertargettexture_and_multiple_passes

// KESKEN ---


import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, Material } from 'babylonjs';

export class Test_rendertexture extends BaseGame 
{
    tmpmodel : Model3D;
    renderTexture : BABYLON.RenderTargetTexture;

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = Utils.createCamera(new BABYLON.Vector3(5, 2, 10), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        this.createMap();

        Utils.createText();


        this.renderTexture = new BABYLON.RenderTargetTexture("render", 512, this.scene, true);
        
// TODO



    }

    createMap()
    {
        for(let x=0;x<10;x++)
            for(let y=0;y<10;y++)
            {
                const MUL = 2.2;
                this.tmpmodel = Model3D.load("box.babylon", this.scene, new Vector3(x*MUL, 0, y*MUL));
                
            }
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);




    }

}
