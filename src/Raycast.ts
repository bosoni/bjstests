import * as BABYLON from 'babylonjs';
import { Vector3 } from 'babylonjs';
import { Utils } from './Utils';

export class Raycast
{
    public static pickResult : BABYLON.PickingInfo = null;

    public static checkHit(scene : BABYLON.Scene, mesh: BABYLON.Mesh | BABYLON.AbstractMesh) : boolean
    {
        this.pickResult = scene.pick(scene.pointerX, scene.pointerY);

        if(this.pickResult!=null && this.pickResult.hit) 
        {
            if(this.pickResult.pickedMesh == mesh)
                return true;
        }
        return false;
    }

    public static getY(scene : BABYLON.Scene, x : number, z : number) : number
    {
        let YC = 1000;
        let ray = new BABYLON.Ray(new Vector3(x, YC, z), Vector3.Down(), YC*2);

        this.pickResult = scene.pickWithRay(ray);

        if(this.pickResult!=null && this.pickResult.hit)
        {
            let l = YC - this.pickResult.distance;
            //console.log("y = " + l);

            return l;
        }

        console.log(" getY() failed ");
        return 0;

    }
    
}
