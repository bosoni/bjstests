// material tests

// note:
//  koska meshit ladataan asynkronisesti, materiaalit voi vaihtaa vasta myöhemmin.
//  ensin pitää tsekata että meshit on latautunut.

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, Material, StandardMaterial } from 'babylonjs';

export class Test_materials extends BaseGame 
{
    tmpmodel : Model3D;

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = Utils.createCamera(new BABYLON.Vector3(5, 2, 10), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        this.createMap();

        Utils.createText();
        
    }

    createMap()
    {
        Model3D.setDir("assets/models/");
        for(let x=0;x<10;x++)
            for(let y=0;y<10;y++)
            {
                const MUL = 4;
                let pos = new Vector3(x*MUL, 0, y*MUL)
                
                //EI TOIMI
                this.tmpmodel = Model3D.load("box.babylon", this.scene, pos);
                
                // TOIMII
                //this.tmpmodel = Model3D.load_orig("box.babylon", this.scene, pos);

            }
    }

    getMaterial() : Material
    {
        let r  = Math.random();
        let g  = Math.random();
        let b  = Math.random();
        let myMaterial = new BABYLON.StandardMaterial("myMaterial", this.scene);

        myMaterial.alpha = Math.random();
        myMaterial.diffuseColor = new BABYLON.Color3(r, g, b);
        myMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        myMaterial.ambientColor = new BABYLON.Color3(0.2, 0.2, 0.2);

        let em=0.1;
        myMaterial.emissiveColor = new BABYLON.Color3(em, em, em);

        let str = "";
        let rnd = Math.floor(Math.random() * 5);
        if(rnd==0) str = "textures/bg1.png";
        if(rnd==1) str = "textures/dirt.png";
// TODO  lataa randomisti texture

        return myMaterial;
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);

        // create random material colors
        if(this.firstTime==true)
        {
            this.firstTime=false;
            for (let q = 0; q < Model3D.getAllModel3D().length; q++)            
                Model3D.getAllModel3D()[q].meshes[0].material = this.getMaterial();
        }

    }

}
