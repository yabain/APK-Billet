import { YMoneyCode } from "../../enums/money.enum";
import { YEntity } from "../yentity";

export class YSetPrice extends YEntity
{
    price:Number=0;
    label:String="";
    description:String="";
    moneyCode:YMoneyCode=YMoneyCode.XAF;
}