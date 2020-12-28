/*
jigsaw game  v0.2

NOTES:
* drag'n'drop


*/

import * as BABYLON from 'babylonjs';
import { Utils } from './Utils';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Raycast } from './Raycast';
import { Vector3 } from 'babylonjs';

export class Test_jigsaw_game_02 extends BaseGame
{
    camera : BABYLON.FreeCamera;
    jigsawModel : Model3D;
    selected = -1;
    drag = false;
    pressedCount = 0;

    origCoords : Vector3[]=[];

    costructor() { }

    createScene() 
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 4, -0.01), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), this.scene);

        this.jigsawModel = Model3D.load("jigsaw/jigsaw4.babylon", this.scene);
        
        Utils.createText();
    }

    update(deltaTime: number) 
    {
        //Utils.writeDebug(this.scene, deltaTime);

        if(this.firstTime)
        {
            this.firstTime=false;
            for(let q=0; q< this.jigsawModel.meshes.length; q++)
            {
                let mesh = this.jigsawModel.meshes[q];
                let v = new Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
                this.origCoords.push(v); // save orig coord

                // keep first block at its original place (left bottom)
                if(q > 0)
                {
                    mesh.position.x = Math.random()*3-1.5;
                    mesh.position.z = Math.random()*3-1.5;
                    mesh.position.y = q*0.01; // avoid z-fighting

                    // rotate block -TODO
                    //let r = Math.floor(Math.random() * 4);
                    //mesh.rotation = new Vector3(0, Utils.deg2rad(r * 90), 0);
                }

                if(q==0) mesh.position.y = 0.001; // first block (already in place)
                if(q==25) mesh.position.y = 0; // back plane

            }
            this.origCoords.pop(); // discard last one (back plane), not needed
        }

        if(BaseGame.mouseDown)
        {
            this.pressedCount++;
            if(this.pressedCount==1)
            {
                //jos hiiren alla obu, valitse se ja drag=true
                for(let q=0; q< this.jigsawModel.meshes.length; q++)
                {
                    if(q==25) // back plane
                        continue;

                    let mesh = this.jigsawModel.meshes[q];
                    if(Raycast.checkHit(this.scene, mesh))
                    {
                        this.selected = q;
                        this.drag = true;

                        break;
                    }
                }    
            }
        }
        else 
        {
            this.pressedCount=0;

            // if some object selected, drop it
            if(this.selected != -1)
            {
                console.log("block dropped at "+this.scene.pointerX+" "+this.scene.pointerY);

                // check if block is its original place
                let block = this.jigsawModel.meshes[this.selected];
                let xd = block.position.x - this.origCoords[this.selected].x;
                let zd = block.position.z - this.origCoords[this.selected].z;
                let len = Math.sqrt(xd*xd + zd*zd);

                //console.log("len = "+len);

                if(len<0.10) // close enough
                {
                    //console.log("  --close enough--- ");
                    block.position.x = this.origCoords[this.selected].x;
                    block.position.z = this.origCoords[this.selected].z;
                    block.position.y = 0.001;
                }

                this.selected = -1;
                this.drag=false;
            }
        }

        if(this.drag)
        {
            console.log("dragging "+this.selected);

            Raycast.pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            let block = this.jigsawModel.meshes[this.selected];
            block.position.x = Raycast.pickResult.pickedPoint.x;
            block.position.z = Raycast.pickResult.pickedPoint.z;

        }

    }
}
