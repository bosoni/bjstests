import * as BABYLON from 'babylonjs';

export class Plane2D
{
    plane : BABYLON.Mesh;
    data : any = 0;

    load(texname : string, scene : BABYLON.Scene, width : number, height : number)
    {
        this.plane = BABYLON.MeshBuilder.CreatePlane("myPlane", {width, height}, scene);

        var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.backFaceCulling = false;
        myMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        myMaterial.diffuseTexture = new BABYLON.Texture(texname, scene);
        
        //myMaterial.useAlphaFromDiffuseTexture = true;
        myMaterial.diffuseTexture.hasAlpha=true;
        
        this.plane.material=myMaterial;
    }

    isLoaded() : boolean
    {
        return this.plane.material != null;
    }
}
