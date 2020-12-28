// clock

import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';
import { Vector3 } from 'babylonjs';

export class Test_clock extends BaseGame 
{
    mmesh: BABYLON.AbstractMesh[] = [];
    loaded = false;

    costructor() { }

    createScene() 
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 15, -1), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);

        let _this = this;

        BABYLON.SceneLoader.ImportMesh("", "assets/clock/", "clock.babylon", this.scene,
            function (meshes) 
            {
                for (let q = 0; q < meshes.length; q++) 
                {
                    _this.mmesh.push(meshes[q]);
                    console.log("added " + meshes[q].name);
                }
                _this.loaded = true;

            });

        //Utils.createText();
    }

    update(deltaTime: number) 
    {
        //Utils.writeDebug(this.scene, deltaTime);

        if (this.loaded == false) return;

        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        if (h >= 12) h -= 12;

        let hrlen= Utils.deg2rad(m / 60 * (360 / 12));
        let degh = Utils.deg2rad(h / 12 * 360) + hrlen;
        let degm = Utils.deg2rad(m / 60 * 360);
        let degs = Utils.deg2rad(s / 60 * 360);

        this.mmesh[0].rotation = new Vector3(0, degh, 0); // h
        this.mmesh[2].rotation = new Vector3(0, degm, 0); // m
        this.mmesh[3].rotation = new Vector3(0, degs, 0); // s

        //console.log(h,m,s, degh,degm,degs);
    }


}
