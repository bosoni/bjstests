import * as BABYLON from 'babylonjs';
import { BaseGame } from './BaseGame';

let actions : BaseAction[] = [];

export class BaseAction
{
    init() 
    {
        console.log("baseaction init()");
    }

    update(deltaTime : number) 
    {
        console.log("baseaction update()");
    }
}

export class StateManager 
{
    static add(action : BaseAction) 
    {
        actions.push(action);
        action.init();

        console.log(action + " added. len="+actions.length);
    }
    
    static remove(action : BaseAction) 
    {
        for(let q=0; q<actions.length; q++)
        {
            if(actions[q] == action)
            {
                actions.splice(q, 1); // delete item
                console.log(action + " removed. len="+actions.length);
                break;
            }
        }
    }

    static update(deltaTime : number) 
    {
        for(let q=0; q<actions.length; q++)
        {
            actions[q].update(deltaTime);
        }
    }
}
