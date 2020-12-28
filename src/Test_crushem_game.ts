// crush'em

/*
    keskipiste on ikkunan keskellä.
    ruudun koko = 2x2
             = -1 -> 1 

*/

import * as BABYLON from 'babylonjs';
import { Utils } from './Utils';
import { BaseGame } from './BaseGame';
import { Plane2D } from './Plane2D';
import { Raycast } from './Raycast';
import { StandardMaterial } from 'babylonjs';

export class Test_crushem_game extends BaseGame 
{
    MAXBUGS = 10;
    c = this.MAXBUGS;
    score = 0;

    bugs : Plane2D[] = [];
    camera : BABYLON.FreeCamera;

    costructor() { }

    createScene() 
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 2), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        let bgt = new Plane2D();
        bgt.load("assets/crushem/bg.png", this.scene, 2,2);

        for(let q=0; q<this.MAXBUGS; q++)
        {
            let tmp : Plane2D;
            tmp = new Plane2D();

            let r = Math.random();
            if(r < 0.5) tmp.load("assets/crushem/spider.png", this.scene, 1,1);
            else tmp.load("assets/crushem/koppis.png", this.scene, 1,1);

            this.bugs.push(tmp);

            tmp.plane.position.x = Math.random()*2 - 1;
            tmp.plane.position.y = Math.random()*2 - 1;
            tmp.plane.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
            tmp.plane.rotation=new BABYLON.Vector3(0,0,  Math.random() * Math.PI);
        }

        Utils.createText();
       
    }

    update(deltaTime: number) 
    {
        Utils.label.text = "";
        //Utils.writeDebug(this.scene, deltaTime);
        Utils.label.text += "Score: " + this.score;

        for(let q=0; q<this.MAXBUGS; q++)
        {
            if(this.bugs[q].isLoaded()==false)
                continue;
        }

        let SPD = deltaTime * 0.06;
        for(let q=0; q<this.MAXBUGS; q++)
        {
            let tmp : Plane2D = this.bugs[q];
            if(tmp.data==999) continue;
            

            let r = tmp.plane.rotation.z;
            let dx = SPD * Math.sin(r);
            let dy = SPD * Math.cos(r);
            tmp.plane.position.x -= dx;
            tmp.plane.position.y += dy;

            if(tmp.plane.position.x < -1 || 
                tmp.plane.position.x > 1 ||
                tmp.plane.position.y < -1 ||
                tmp.plane.position.y > 1) 
            {
                tmp.plane.isVisible = false;
                this.c--;
                tmp.data = 999;
                return;
            }

            if(BaseGame.clicked)
            if(Raycast.checkHit(this.scene, tmp.plane))
            {
                this.c--;
                this.score++;

                tmp.data = 999;

                let mat : StandardMaterial;
                mat = <StandardMaterial> tmp.plane.material;
                mat.diffuseTexture = new BABYLON.Texture("assets/crushem/splat.png", this.scene);

                mat.useAlphaFromDiffuseTexture = true;
                mat.diffuseTexture.hasAlpha=true;
            }

        }
    }
}
