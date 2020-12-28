import { BaseGame } from './BaseGame';
import { Model3D } from './Model3D';

let curScene : BaseGame = null;

export class SceneManager 
{
    static change(scene: BaseGame) 
    {
        if(curScene!=null)
        {
            curScene.stopLoop();
            curScene.dispose();
            curScene=null;
        }

        Model3D.cleanAll();

        curScene = scene;
        curScene.startLoop(curScene);
    }

}
