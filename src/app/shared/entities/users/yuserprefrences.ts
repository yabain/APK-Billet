import { YLanguageCode, YMoneyCode } from "../../enums";
import { YEntity } from "../yentity";

export class YUserPreferences extends YEntity
{
    lang:YLanguageCode=YLanguageCode.FR;
    moneyCode:YMoneyCode=YMoneyCode.XAF
}