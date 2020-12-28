// draw sprites, move player

import { GameUtils } from './Game-utils';
import { Utils } from './Utils';
import * as BABYLON from 'babylonjs';
import { Color4, Vector3 } from 'babylonjs';
import { BaseGame } from './BaseGame';

class MySprite
{
    sprite : BABYLON.Sprite = null;
    animPlaying = false;

    init(sprite : BABYLON.Sprite)
    {
        this.sprite = sprite;
        let x = Math.random() * 2 - 1;
        let y = Math.random() * 2 - 1;
        this.sprite.position = new Vector3(x,y, 0);
    }
}

export class Test_sprites extends BaseGame
{
    spriteManager : BABYLON.SpriteManager;

    sprites : MySprite[] = [];
    player : MySprite;

    costructor() {}

    createScene()
    {
        this.scene = new BABYLON.Scene(BaseGame.engine);
        this.scene.clearColor = new Color4(0,0,0,1);

        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -10), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        let skybox = GameUtils.createSkybox("skybox", "assets/textures/skybox/TropicalSunnyDay", this.scene);
        let ground = GameUtils.createGround(this.scene);

        let MAX_CHARACTERS = 10;
        this.spriteManager = new BABYLON.SpriteManager("smgr","assets/textures/Run.png", MAX_CHARACTERS, {width: 64, height: 64}, this.scene);
        for(let q=0; q<MAX_CHARACTERS; q++)
        {
            let tmp = new MySprite();
            tmp.init(new BABYLON.Sprite("obj" + q, this.spriteManager));

            if(q>0)
            {
                let s = tmp.sprite;
                s.position.y = 2;
                s.size = Math.random() + 0.5;
                s.angle = Math.random() * Math.PI;
            }
            
            this.sprites.push(tmp);
        }
        this.player = this.sprites[0];
        this.player.sprite.position.y = 0;

        Utils.createText();
        this.initKeys();
    }

    update(deltaTime: number)
    {
        Utils.writeDebug(this.scene, deltaTime);

        
    }

    checkKeys(inputMap: { [x: string]: boolean; })
    {
        let SPD = 0.05;
        let move=false;
        if(inputMap["a"] || inputMap["ArrowLeft"])
        {
            this.player.sprite.position.x -= SPD
            this.player.sprite.invertU = false;
            move=true;
        } 
        if(inputMap["d"] || inputMap["ArrowRight"])
        {
            this.player.sprite.position.x += SPD
            this.player.sprite.invertU = true;
            move=true;
        }

        if(move)
        {
            if(!this.player.animPlaying)
            {
                this.player.animPlaying=true;
                this.player.sprite.playAnimation(0, 8, true, 100, null);
            }
        }
        else
        {
            this.player.animPlaying=false;
            this.player.sprite.stopAnimation();
            this.player.sprite.cellIndex=3;  //44;
        } 

    }

}
