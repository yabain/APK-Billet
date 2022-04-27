import { YString } from "../utils/helpers";
import { YEntityID } from "./yentityid";


export class YEntity
{
    id:YEntityID=new YEntityID();          
    createdDate=(new Date()).getTime();

    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(Reflect.has(this,key))
            {
                if( (this[key] instanceof YEntity) || (this[key] instanceof YEntityID) ) this[key].hydrate(entity[key])
                else if(this[key] instanceof Array)
                {
                    let functionName=`hydrate${YString.capitalize(key)}List`;
                    if(typeof this[functionName]=="function") Reflect.set(this,key,this[functionName](entity[key])) 
                    else Reflect.set(this,key,entity[key]);
                }
                else Reflect.set(this,key,entity[key]);
            }
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k of Object.keys(this))
        {
            if( (this[k] instanceof YEntity) || (this[k] instanceof YEntityID) ) r[k]=this[k].toString();
            else if(this[k] instanceof Array)
            {
                r[k]=this[k].map((entity)=>{
                    if( (entity instanceof YEntity) || (entity instanceof YEntityID) ) return entity.toString()
                    return entity
                })
            }
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}