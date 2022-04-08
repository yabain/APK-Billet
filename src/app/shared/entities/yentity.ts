import { YEntityID } from "./yentityid";

export class YEntity
{
    public id:YEntityID=new YEntityID();
    hydrate(entity: Record<string | number,any>):void
    {
        for(const key of Object.keys(entity))
        {
            if(Reflect.has(this,key))
            {
                if( (this[key] instanceof YEntity) || (this[key] instanceof YEntityID) ) this[key].hydrate(entity[key])
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
            else r[k]=Reflect.get(this,k);
        }
        return r;
    }
}