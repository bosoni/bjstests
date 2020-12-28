/*
näppäilypeli

5 nappia, paina niitä syttymisjärjestyksessä.

*/

import * as BABYLON from 'babylonjs';
import { Utils } from './Utils';
import { BaseGame } from './BaseGame';
import { Plane2D } from './Plane2D';
import { Raycast } from './Raycast';
import { StandardMaterial, Color3 } from 'babylonjs';

export class Test_toot_game extends BaseGame 
{
    WAITTIME = 30;
    counter = this.WAITTIME;

    score : number = 0;
    jono : number[] = [];

    buttons : Plane2D[] = [];
    camera : BABYLON.FreeCamera;

    costructor() { }

    createScene() 
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0.1, 2), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), this.scene);

        let bg = new Plane2D();
        bg.load("assets/toot/bg.png", this.scene, 2,2);
        
        for(let q=0; q<5; q++)
        {
            let tmp : Plane2D;
            tmp = new Plane2D();
            tmp.load("assets/toot/button.png", this.scene, 1,1);

            this.buttons.push(tmp);

            // TODO parempi kaava
            tmp.plane.position.x = -0.5 + q * 0.3;
            tmp.plane.position.y = 0;
            tmp.plane.position.z = 0.1;
            tmp.plane.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
        }

        Utils.createText();
       
    }

    update(deltaTime: number) 
    {
        Utils.label.text = "";
        //Utils.writeDebug(this.scene, deltaTime);
        Utils.label.text += "\nScore: " + this.score + "   (len)="+this.jono.length;

        for(let q=0; q<5; q++)
        {
            if(this.buttons[q].isLoaded()==false) continue;
        }

        this.counter--;

        // reset orig values
        if(this.counter == 10)
        {
            for(let q=0; q<5; q++)
            {
                let S = 0.2;
                this.buttons[q].plane.scaling = new BABYLON.Vector3(S,S,S);

                let mat : StandardMaterial;
                mat = <StandardMaterial> this.buttons[q].plane.material;
                mat.diffuseColor = new Color3(0.4, 0.4, 0.6);
            }
        }

        if(this.counter == 0)
        {
            this.counter = this.WAITTIME;

            let rnd =  Math.floor(Math.random() * 5);
            this.jono.splice(0, 0, rnd); // laita ekaks
            //console.log(">> "+this.jono);

            // muuta napin väriä
            let mat : StandardMaterial;
            mat = <StandardMaterial> this.buttons[rnd].plane.material;
            mat.diffuseColor = new Color3(1,0,2);

            let S = 0.22;
            this.buttons[rnd].plane.scaling = new BABYLON.Vector3(S,S,S);
        }

        let pressed = -1;
        if(BaseGame.clicked)
        for(let q=0; q<5; q++)
        {
            let tmp : Plane2D = this.buttons[q];
            if(Raycast.checkHit(this.scene, tmp.plane))
            {
                pressed = q;
                Raycast.pickResult=null;

                let S = 0.18;
                this.buttons[pressed].plane.scaling = new BABYLON.Vector3(S,S,S);

                if(pressed!=-1)
                {
                    if(pressed==this.jono.pop())
                    {
                        this.score++;

                        if(this.WAITTIME>15) this.WAITTIME--;
                    }
                    else
                    {
                        // väärä
                        console.log(" TÖÖT! GAME OVER!  score = " + this.score);
                        this.score = 0;
                        this.jono = [];

                        for(let q=0; q<5; q++)
                        {
                            let S = 0.02;
                            this.buttons[q].plane.scaling = new BABYLON.Vector3(S,S,S);
                        }
                        this.WAITTIME = 30;
                        this.counter = this.WAITTIME;
                    }
                }

                break;
            }
        }

    }
}
