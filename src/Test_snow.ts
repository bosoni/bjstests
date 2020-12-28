// snow

import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import { BaseGame } from './BaseGame';

let AREA = 30;

class BaseSprite
{
    sprite : BABYLON.Sprite = null;

    constructor(sprite : BABYLON.Sprite)
    {
        this.sprite = sprite;
    }

    initPos()
    {
        
        let x = Math.random() * AREA - AREA/2;
        let y = AREA
        this.sprite.position = new Vector3(x,y, 0);
    }    
}
class MySprite extends BaseSprite
{
    dx : number;
    dy : number;

    init()
    {
        this.dx = Math.random() * 0.2 - 0.1;
        this.dy = Math.random() * -0.1 - 0.1;
        this.initPos();
    }

    update()
    {
        this.sprite.position.x += this.dx;
        this.sprite.position.y += this.dy;

        if(this.sprite.position.y < -AREA)
        {
            this.sprite.position.x = Math.random() * AREA - AREA/2;
            this.sprite.position.y = AREA;
        }
    }

}

export class Test_snow extends BaseGame
{
    MAX = 500;
    sManager : BABYLON.SpriteManager
    sprites : MySprite [] = [];

    costructor() {}

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);

        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -100), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        
        this.sManager = new BABYLON.SpriteManager("smgr","assets/textures/snow.png", this.MAX, {width: 16, height: 16}, this.scene);
        
        //Utils.createText();
    }

    update(deltaTime: number)
    {
        //Utils.writeDebug(this.scene, deltaTime);

        if(this.sprites.length<this.MAX)
        {
            let tmp =  new MySprite(new BABYLON.Sprite("s", this.sManager));
            tmp.init();
            this.sprites.push(tmp);
        }

        for(let q=0;q<this.sprites.length;q++)
        {
            this.sprites[q].update();
        }

    }

}
