import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, FreeCamera } from 'babylonjs';
import { Raycast } from './Raycast';
import * as Ammo from 'ammo.js';

export class Test_Benchmark extends BaseGame 
{
    camera : FreeCamera;
    models = ["box", "tree1", "tree2", "mushroom", "comp"];

    costructor() { }

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = Utils.createCamera(new BABYLON.Vector3(0, 5, 40), this.scene);

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        let physicsPlugin = new BABYLON.AmmoJSPlugin(true, Ammo);
        let gravityVector = new BABYLON.Vector3(0, -9.81, 0);
        this.scene.enablePhysics(gravityVector, physicsPlugin);

        this.loadModels();

        Utils.createText();
        this.initKeys();
    }

    loadModels()
    {
        Model3D.setDir("assets/models/");
        Model3D.load("ground2.babylon", this.scene);

        for(let i=0; i<5; i++)
        {
            if(i<4) Model3D.setDir("assets/models/");
            else Model3D.setDir("assets/blocks/");
            Model3D.load(this.models[i] + ".babylon", this.scene, null, null, null, false);
        }
    }

    createMap()
    {
        let AREA = 30;

        let i = 3; // mushroom DEBUG

        //for(let i=0; i<5; i++)
        {
            if(i<4) Model3D.setDir("assets/models/");
            else Model3D.setDir("assets/blocks/");

            let poss = [];
            let rots = [];
            let scales = [];
            for(let q=0; q<10; q++)
            {
                let x = Math.random() * AREA - AREA/2;
                let z = Math.random() * AREA - AREA/2;

                let y = Raycast.getY(this.scene, x, z);
                if(y<0) continue; // ei veden alle

                let pos = new Vector3(x, y, z);
                poss.push(pos);

                let rot = new Vector3(0, Math.random()*10, 0);
                rots.push(rot);
                
                let sc = 0.2;
                if(i==3) sc=0.05; // mushroom
                let scl = new Vector3(sc,sc,sc);
                scales.push(scl);

                // TAPA1: ladataan joka model uudelleen
                Model3D.load(this.models[i] + ".babylon", this.scene, pos, rot, scl);
            }

            // TAPA2: instanssit
            //Model3D.createInstanced(this.models[i] + ".babylon", this.scene, poss, rots, scales);
            //Model3D.createCB(this.models[i] + ".babylon", this.scene, poss, rots);

            // TAPA3: kloonit
            //Model3D.createCloned(this.models[i] + ".babylon", this.scene, poss, rots, scales);
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

    cnt = 0;
    checkKeys(inputMap: { [x: string]: boolean; })
    {
        let objs = ["box", "tree1", "tree2"];

        let AREA = 30;

        if(inputMap["q"])
        {
            Model3D.setDir("assets/models/");

            this.cnt++;
            this.cnt%=3;
            let x = Math.random() * AREA - AREA/2;
            let z = Math.random() * AREA - AREA/2;
            let pos = new Vector3(x, 10, z);
            
            Model3D.load(objs[this.cnt] + ".babylon", this.scene, pos);
        }
    }

}
