import { YMoneyCode, YSetPriceType } from "../../enums";
import { YEntity } from "../yentity";

export class YSetPrice extends YEntity
{
    price:Number=0;
    label:String="";
    description:String="";
    moneyCode:YMoneyCode=YMoneyCode.XAF;
    type:YSetPriceType=YSetPriceType.NORMAL;
}