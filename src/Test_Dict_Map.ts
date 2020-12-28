import { BaseGame } from './BaseGame';
import { FreeCamera } from 'babylonjs';

export class Test_Dict_Map extends BaseGame 
{
    camera : FreeCamera;

    costructor() { }

    createScene()
    {
        //this.scene = new BABYLON.Scene(BaseGame.engine);

        let t = new Map<string, string>(); // set(k,v), has(k), get(k), delete(k)
        t.set("eka", "moi");
        t.set("vit", "moi2");
        t.set("jou", "moi3");
        if(t.has("eka")) console.log(" löyty e ");
        if(t.has("vit")) console.log(" löyty v ");
        if(t.has("jou")) console.log(" löyty j ");

        let values = Array.from(t.values());

        for(let i=0; i<values.length; i++) 
            console.log("> "+values[i]);

        t.clear();
        
    }

    update(deltaTime: number)
    {
    }
}
