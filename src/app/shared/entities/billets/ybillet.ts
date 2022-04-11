import { YBilletState, YBuyBilletState } from "../../enums";
import { YEntity } from "../yentity";
import { YEntityID } from "../yentityid";

export class YBillet extends YEntity
{
    eventID:YEntityID=new YEntityID();
    participantID:YEntityID=new YEntityID();
    buyDate:String=new Date().toISOString();
    buyState:YBuyBilletState=YBuyBilletState.WAITING_PAYEMENT;
    state:YBilletState=YBilletState.RESERVED;
}