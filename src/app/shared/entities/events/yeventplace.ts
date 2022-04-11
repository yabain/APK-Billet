import { YEventPlateState } from "../../enums";
import { YEntity } from "../yentity";

export class YEventPlace extends YEntity
{
    name:String="";
    description:String="";
    lat:Number=0;
    long:Number=0;
    country:String="";
    city:String="";
    state:YEventPlateState=YEventPlateState.OPEN_AND_FREE;    
}