import { Entity } from "./entity";

export class CustomFile extends Entity
{
    name:string="";
    lastModified:string="";
    size:number=0.0;
    type:string="";
    data:any="";
    link:String="";
    getExtention()
    {
        if(this.name.split(".").length==0) return "";
        return this.name.split(".")[this.name.split(".").length-1]
    }

    override toString(): Record<string | number, any> {
        return {
            ...super.toString(),
            name:this.name,
            lastModified:this.lastModified,
            size:this.size,
            type:this.type,
            data:this.data,
            link:this.link
        }
    }
}