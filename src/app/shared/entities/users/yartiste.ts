import { YEntityID } from "../yentityid";
import { YUser } from "./yuser";

export class YArtiste extends YUser
{
    artistType:String[]=[];
    bio:String="";
    eventsID:YEntityID[]=[];

    hydrateEventsIDList(entity:String[]):YEntityID[]
    {
        return entity.map((id)=>{
            let eid=new YEntityID();
            eid.setId(id);
            return eid;
        })
    }
}