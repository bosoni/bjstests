import * as BABYLON from 'babylonjs';
import { Model3D } from './Model3D';
import * as Ammo from 'ammo.js';
//import * as Cannon from 'cannon';

let VERSION = "0.20.0922"; // year month day

export class BaseGame 
{
    public static clicked = false;
    public static mouseDown = false;
    public static mouseButton = 0;

    public static canvas: HTMLCanvasElement;
    public static engine: BABYLON.Engine;

    protected scene: BABYLON.Scene;

    protected firstTime = true;
    protected physicsReady = true;

    constructor() {}

    /**
     * Call only once.
     * @param canvas 
     */
    public static setCanvas(canvas: HTMLCanvasElement)
    {
		console.log("powered by babylonjs v4.1");
		console.log("bsat v" + VERSION);

        BaseGame.canvas = canvas;
        BaseGame.engine = new BABYLON.Engine(canvas, true);

        window.addEventListener("contextmenu", (evt) => { evt.preventDefault(); });

        // the canvas/window resize event handler
        window.addEventListener("resize", () => { BaseGame.engine.resize(); });

        // When click event is raised
        window.addEventListener("click", () => { BaseGame.clicked = true; });

        canvas.addEventListener("pointermove", () => {  });
        canvas.addEventListener("pointerup", () => { BaseGame.mouseDown = false; });
        canvas.addEventListener("pointerdown", (e) => {
            //console.log(" button:" + e.button);
            BaseGame.mouseDown = true;
            e.preventDefault();
            this.mouseButton = e.button;
        });
    }

    /**
     * Starts update and render loops
     */ 
    startLoop(curScene: BaseGame) 
    {
        let ready = false;

        // run the render loop
        BaseGame.engine.runRenderLoop(() => 
        {
            if(ready==false)
            {
                curScene.createScene();
                console.log("D: scene changed.");
                ready = true;
                return;
            }
            if(Model3D.isLoaded()==false)
            {
                console.log("D: loading..." + Model3D.getLoadedCount() + "/" + Model3D.getAllModel3D().length);
                return;
            }

            let deltaTime: number = (1 / BaseGame.engine.getFps());
            this.update(deltaTime);

            this.scene.render();

            BaseGame.clicked = false;
        });
    }

    /**
     * Stops update and render loops
     */
    stopLoop()
    {
        BaseGame.engine.stopRenderLoop();
        this.scene.dispose();
    }

    /**
     * Register input listeners.
     */
    initKeys()
    {
        let scene = this.scene;

        // Keyboard events
        let inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        // Game/Render loop
        scene.onBeforeRenderObservable.add(() =>
        {
            this.checkKeys(inputMap);
        });
    }

    /**
     * Check keys (override this method).
     * @param inputMap 
     * 
     * Remember to call this.initKeys() in createScene()
     */
    checkKeys(inputMap: { [x: string]: boolean; }) {}

    createScene() {}
    update(deltaTime : number) {}
    dispose() {}

    // https://forum.babylonjs.com/t/cannon-oimo-ammo-typescript-webpack-example-please/10011/10
    initPhysics()
    {
        this.physicsReady = false;
        Ammo().then((Ammo: any) => {
            let physicsPlugin = new BABYLON.AmmoJSPlugin(true, Ammo);
            let gravityVector = new BABYLON.Vector3(0, -9.81, 0);
            this.scene.enablePhysics(gravityVector, physicsPlugin);
            this.physicsReady = true;
        });

        //let physicsPlugin = new BABYLON.CannonJSPlugin(true, 2, Cannon);
        //this.physicsReady = true;

    }

}
