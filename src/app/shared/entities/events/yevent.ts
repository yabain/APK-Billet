import { YEventState, YEventSubType, YEventType } from "../../enums";
import { YEntity } from "../yentity";
import { YEntityID } from "../yentityid";
import { YEventPlace } from "./yeventplace";
import { YSetPrice } from "./ysetprice";
import { YUniqueCode } from "./yuniquecode";

export class YEvent extends YEntity
{
    name:String="";
    startDate:String="";
    endDate:String="";
    state:YEventState=YEventState.DRAFT_STATE;
    description:String="";
    imgUrl:String="";
    uniqueCode:YUniqueCode=new YUniqueCode();
    prices:YSetPrice[]=[];
    ownerID:YEntityID=new YEntityID();
    organizerListID:YEntityID[]=[];
    type:YEventType=YEventType.SHOWBIZZ;
    place:YEntityID=new YEntityID();
    subType:YEventSubType=YEventSubType.SHOWBIZZ_CONCERT;

    hydrateOwnerIDList(entityList)
    {
        entityList.map((entity)=>{
            let newOwnerID = new YEntityID();
            newOwnerID.setId(entity);
            return newOwnerID;
        })
    }

    hydratePricesList(entityList)
    {
        entityList.map((entity)=>{
            let price = new YSetPrice();
            price.hydrate(entity);
            return price;
        })
    }
}