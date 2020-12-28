import { GameUtils } from './Game-utils';
import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';
import { Vector3, Scene } from 'babylonjs';

var BabylonNative = false;

export class Utils
{
    static label: GUI.TextBlock;

    static createText()
    {
        let guiTexture = GameUtils.createGUI();

        let rect1 = new GUI.Rectangle();
        rect1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rect1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        rect1.width = "400px";
        rect1.height = "100px";
        rect1.cornerRadius = 1;
        rect1.thickness = 1;
        rect1.color = "black";
        rect1.background = "white";
        guiTexture.addControl(rect1);
        
        this.label = new GUI.TextBlock();
        this.label.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.label.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        rect1.addControl(this.label);
    }

    static writeDebug(scene, deltaTime)
    {
        if (Model3D.isLoaded()==false)
        {
            Utils.label.text = "Loading..." + Model3D.getLoadedCount() + "/" + Model3D.getAllModel3D().length;
            console.log("Loading..." + Model3D.getLoadedCount() + "/" + Model3D.getAllModel3D().length);
        }
        else
            Utils.label.text = "FPS: " + BaseGame.engine.getFps().toPrecision(4) + 
            "   ms: " + deltaTime.toPrecision(4) + 
            "\nmouse coords: " + scene.pointerX +" "+ scene.pointerY;
            if(BaseGame.mouseDown)
                Utils.label.text += "\nmousebutton: " + BaseGame.mouseButton;
    }

    /**
    * Creates camera and it points to up, set ASDW keys.
    */
    static createCamera(pos: Vector3, scene: Scene)
    {
        let camera = new BABYLON.FreeCamera("camera", pos, scene);
        camera.setTarget(BABYLON.Vector3.Up());
        camera.keysUp.push(87);    // W
        camera.keysDown.push(83);  // S
        camera.keysLeft.push(65);  // A
        camera.keysRight.push(68); // D

        if(BabylonNative==false) camera.attachControl(BaseGame.canvas, false);

        //BaseGame.engine.isPointerLock = true;

        return camera;
    }

    /// radian = degree * π/180
    static deg2rad(degree: number): number 
    {
        return degree * Math.PI / 180;
    }

    /// degree = radian * 180/π
    static rad2deg(rad : number) : number
    {
        return rad * 180/Math.PI;
    }

    // https://doc.babylonjs.com/resources/save_babylon
    static objectUrl : string;
    static saveScene(filename : string, scene : BABYLON.Scene) 
    {
        if(this.objectUrl) window.URL.revokeObjectURL(this.objectUrl);

        let serializedScene = BABYLON.SceneSerializer.Serialize(scene);

        let strScene = JSON.stringify(serializedScene);

        if (filename.toLowerCase().lastIndexOf(".babylon") !== filename.length - 8 || filename.length < 9)
            filename += ".babylon";

        let blob = new Blob ( [ strScene ], { type : "octet/stream" } );

        // turn blob into an object URL; saved as a member, so can be cleaned out later
        this.objectUrl = (window.webkitURL || window.URL).createObjectURL(blob);

        let link = window.document.createElement('a');
        link.href = this.objectUrl;
        link.download = filename;
        let click = document.createEvent("MouseEvents");
        click.initEvent("click", true, false);
        link.dispatchEvent(click);          
    }
}
