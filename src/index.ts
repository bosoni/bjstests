import 'babylonjs-loaders';
import { BaseGame } from './BaseGame';
import { SceneManager } from './SceneManager';

import { Test_Dict_Map } from './Test_Dict_Map';
import { Test_load_txt } from './Test_load_txt';

import { Test_0 } from './Test_0';
import { Test_snow } from './Test_snow';
import { Test_sprites } from './Test_sprites';
import { Test_menu } from './Test_menu';

import { Test_loadModel } from './Test_loadModel';
import { Test_loadGLTF } from './Test_loadGLTF';
import { Test_instancing } from './Test_instancing';
import { Test_cloning } from './Test_cloning';

import { Test_rendertexture } from './Test_renderTexture';
import { Test_materials } from './Test_materials';
import { Test_physics } from './Test_physics';
import { Test_Benchmark } from './Test_Benchmark';

import { Test_clock } from './Test_clock';
import { Test_crushem_game } from './Test_crushem_game';
import { Test_toot_game } from './Test_toot_game';
import { Test_jigsaw_game } from './Test_jigsaw_game';
import { Test_jigsaw_game_02 } from './Test_jigsaw_game_02';

window.addEventListener('DOMContentLoaded', () => 
{ 
    let canvas: HTMLCanvasElement;
    canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
    BaseGame.setCanvas(canvas);

    let game : BaseGame;

    //game = new Test_Dict_Map();
    //game = new Test_load_txt();
    
    //game = new Test_0(); // template
    
    // 2D
    //game = new Test_snow();
    //game = new Test_sprites();
    //game = new Test_menu();

    // 3D
    game = new Test_loadModel();
    //game = new Test_loadGLTF(); //   x ei toimi
    //game = new Test_instancing();
    //game = new Test_cloning();

    //game = new Test_physics();


    // allaolevat EI TOIMI.  does not work TODO FIX
    //game = new Test_rendertexture();
    //game = new Test_materials();
    //game = new Test_Benchmark();
    
    // ---
    //game = new Test_clock();
    //game = new Test_crushem_game();
    //game = new Test_toot_game();
    //game = new Test_jigsaw_game();
    //game = new Test_jigsaw_game_02();


    if(true)
        SceneManager.change(game); // creates scene, starts loops etc
    else
    {
        // if not using SceneManager, set these manually
        //game.createScene();
        //game.startLoop();
    }

});
