/*
GR  ground point (objektin alakohta)
CB  collision shape (box)

*/

import 'babylonjs-loaders';
import * as BABYLON from 'babylonjs';
import { Scene } from 'babylonjs/scene';
import { Vector3, PhysicsEngine } from 'babylonjs';
import { Mesh } from 'babylonjs/Meshes/mesh';

let models =  new Map<string, Model3D>(); // set(k,v), has(k), get(k), delete(k)
let allLoaded: boolean = false;
let modelDir = "assets/";
let _counter = 0; // id added to name

export class Model3D 
{
    meshes: BABYLON.AbstractMesh[] = [];
    loaded = false;
    floorY = 0;

    public static setDir(dir: string) 
    {
        modelDir = dir;
    }

    public static load(fileName: string, scene: Scene, pos?: Vector3, rot?: Vector3, scale?: Vector3, visible? : boolean) 
    {
        allLoaded = false;
        let model = new Model3D();
        models.set(modelDir + fileName, model);

        BABYLON.SceneLoader.ImportMesh("", modelDir, fileName, scene, (meshes_) => 
            {
                let phys = false;
                let physicsRoot=null;

                for (let q = 0; q < meshes_.length; q++) 
                {
                    if(visible!=null && visible==false)
                        meshes_[q].isVisible = false;

                    if(meshes_[q].name.includes("CB")) // collision box
                    {
                        phys = true;
                        meshes_[q].isVisible = false;
                    }

                    if(meshes_[q].name.includes("GR")) // (ground/feet y)
                    {
                        //console.log(" Y= "+ meshes_[q].position.y);
                        model.floorY = meshes_[q].position.y;
                        meshes_[q].isVisible = false;
                        continue;
                    }
                }

                if(phys) physicsRoot = new BABYLON.Mesh("", scene);

                for (let q = 0; q < meshes_.length; q++) 
                {
                    model.meshes.push(meshes_[q]);

                    if (pos != null) 
                    {
                        model.meshes[q].position = pos;
                        model.meshes[q].position.y += model.floorY;
                    }
                    if (rot != null) model.meshes[q].rotation = rot;
                    //if (scale != null) model.meshes[q].scaling = scale;
                    //console.log(" +added " + meshes_[q].name);
                    
                    if(phys)
                    {
                        // meshit physicRoottiin
                        if(!meshes_[q].name.includes("CB")) // collision box
                            physicsRoot.addChild(meshes_[q]);
                        else
                        {
                            var boxCollider = BABYLON.Mesh.CreateBox("bc", 2, scene);
                            boxCollider.isVisible = false;
                            boxCollider.physicsImpostor = new BABYLON.PhysicsImpostor(boxCollider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
                            physicsRoot.addChild(boxCollider);
                        }
                    }
                }

                if(phys)
                {
                    let mass_ = 0;

                    physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(physicsRoot, 
                        BABYLON.PhysicsImpostor.NoImpostor, { mass: mass_ }, scene);
                    if (pos != null) 
                    {
                        pos.y += 1;
                        pos.y += model.floorY;
                        physicsRoot.position = pos;
                    }
                    if(rot != null) physicsRoot.rotation = rot;
                    if(scale !=  null) physicsRoot.scaling = scale;

                }

                model.loaded = true;
            });
        return model;
    }


    /** 
     * Loads model.
    */
    public static load_orig(fileName: string, scene: Scene, pos?: Vector3, rot?: Vector3, scale?: Vector3, visible? : boolean) 
    {
        allLoaded = false;
        let model = new Model3D();
        models.set(modelDir + fileName, model);

        BABYLON.SceneLoader.ImportMesh("", modelDir, fileName, scene, (meshes_) => 
            {
                // eti GR (ala y)
                for (let q = 0; q < meshes_.length; q++) 
                {
                    if(meshes_[q].name.includes("GR"))
                    {
                        //console.log(" Y= "+ meshes_[q].position.y);
                        model.floorY = meshes_[q].position.y;
                        meshes_[q].isVisible = false;
                        break;
                    }
                }

                for (let q = 0; q < meshes_.length; q++) 
                {
                    model.meshes.push(meshes_[q]);
                    if (pos != null) 
                    {
                        model.meshes[q].position = pos;
                        model.meshes[q].position.y += model.floorY;
                    }
                    if (rot != null) model.meshes[q].rotation = rot;
                    //if (scale != null) model.meshes[q].scaling = scale;
                    //console.log(" +added " + meshes_[q].name);

                    if(visible!=null && visible==false)
                        meshes_[q].isVisible = false;

                    if(meshes_[q].name.includes("CB"))
                        meshes_[q].isVisible = false;
                }
                model.loaded = true;
            });
        return model;
    }

    public static createCloned(name: string, scene: Scene, pos: Vector3[], rot?: Vector3[], scale?: Vector3[])
    {
        for (let i = 0; i < pos.length; i++) 
        {
            _counter++;
            let newModel = new Model3D();
            let model = models.get(modelDir + name);
            let node=new BABYLON.Node(modelDir + name + _counter, scene);

            for (let q = 0; q < model.meshes.length; q++) 
            {
                newModel.meshes.push( model.meshes[q].clone(model.meshes[q].name+q, node) );

                if (pos != null) newModel.meshes[q].position = pos[i];
                if (rot != null) newModel.meshes[q].rotation = rot[i];
                
                // NOTE jos skaalataan collision obua, ohjelma kräshää (assert)
                if(!newModel.meshes[q].name.includes("CB"))
                    if (scale != null) newModel.meshes[q].scaling = scale[i];
            
                if(newModel.meshes[q].name.includes("CB") || newModel.meshes[q].name.includes("GR"))
                    newModel.meshes[q].isVisible=false;
                else newModel.meshes[q].isVisible=true;
            }
        }
    }

    /**
     * kloonataan vain CB obut (fysiikkamoottoria varten)
     */
    public static createCB(name: string, scene: Scene, pos: Vector3[], rot?: Vector3[]) //, scale?: Vector3[])
    {
        for (let i = 0; i < pos.length; i++) 
        {
            _counter++;
            let newModel = new Model3D();
            let model = models.get(modelDir + name);
            let node=new BABYLON.Node(modelDir + name + _counter, scene);

            let c = -1;
            for (let q = 0; q < model.meshes.length; q++) 
            {
                if(model.meshes[q].name.includes("CB")==false) continue;
                else c++;

                newModel.meshes.push( model.meshes[q].clone(model.meshes[q].name+q, node) );

                if (pos != null) newModel.meshes[c].position = pos[i];
                if (rot != null) newModel.meshes[c].rotation = rot[i];

                // NOTE jos skaalataan collision obua, ohjelma kräshää (assert)
                //if (scale != null) newModel.meshes[c].scaling = scale[i];

                newModel.meshes[c].isVisible=false;
            }
        }
    }

    public static createInstanced(name: string, scene: Scene, pos: Vector3[], rot?: Vector3[], scale?: Vector3[])
    {
        let model = models.get(modelDir + name);

        for (let i = 0; i < pos.length; i++) 
        {
            for (let q = 0; q < model.meshes.length; q++) 
            {
                var ni = (<Mesh>model.meshes[q]).createInstance("i" + i)
                ni.position = pos[i];
                if(rot!=null) ni.rotation = rot[i];
                if(scale!=null) ni.scaling = scale[i];

                if(model.meshes[q].name.includes("CB") || model.meshes[q].name.includes("GR"))
                    ni.isVisible=false;
            }
        }
    }

    public static cleanAll() 
    {
        models.clear();
    }

    public static isLoaded(): boolean 
    {
        if (allLoaded == true) return true;

        let ok = true;
        let v = Array.from(models.values());
        for(let i=0; i<v.length; i++) 
        {
            if (v[i].loaded == false) 
            {
                ok = false;
                break;
            }
        }
        allLoaded = ok;
        return ok;
    }

    public static getLoadedCount()
    {
        let c = 0;
        let v = Array.from(models.values());
        for(let i=0; i<v.length; i++) 
        {
            if (v[i].loaded) 
                c++;
        }
        return c;
    }

    public static getAllModel3D(): Model3D[] 
    {
        //console.log(" >>>mlen=" +models.length);
        return Array.from(models.values());
    }

    public setVisible(visible: boolean)
    {
        //console.log(" >>>vis " + this.meshes.length);
        for (let q = 0; q < this.meshes.length; q++)
            this.meshes[q].isVisible = visible;
    }

}
