// load models once, use instances
// https://doc.babylonjs.com/how_to/how_to_use_instances

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, FreeCamera } from 'babylonjs';

export class Test_instancing extends BaseGame 
{
    camera : FreeCamera;
    models = ["box", "tree1", "tree2", "mushroom", "comp"];

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = Utils.createCamera(new BABYLON.Vector3(0, 5, 30), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        this.loadModels();

        Utils.createText();
        
    }

    loadModels()
    {
        Model3D.setDir("assets/models/");
        for(let i=0; i<5; i++)
        {
            // visible=false ettei rendata 0,0,0 kohtaan (createMapissa annetaan vasta paikkatiedot)
            Model3D.load(this.models[i] + ".babylon", this.scene, null, null, null, false);
        }
    }

    createMap()
    {
        let AREA = 100;
        Model3D.setDir("assets/models/");

        for(let i=0; i<5; i++)
        {
            let poss = [];
            for(let q=0; q<100; q++)
            {
                let x = Math.random() * AREA - AREA/2;
                let y = 0;
                let z = Math.random() * AREA - AREA/2;

                let pos = new Vector3(x,y,z);
                poss.push(pos);
            }
            
            Model3D.createInstanced(this.models[i] + ".babylon", this.scene, poss);
        }
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);
        Utils.label.text += "\ncampos: " + this.camera.position.x.toPrecision(3) + " " + 
            this.camera.position.y.toPrecision(3) + " " + this.camera.position.z.toPrecision(3) + " ";

        if(this.firstTime==true)
        {
            this.firstTime=false;

            this.createMap();
            this.camera.setTarget(new Vector3(0, 3, -100));
        }

    }

}
