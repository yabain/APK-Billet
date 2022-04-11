import { YNotificationType } from "../../enums";
import { YEntity } from "../yentity";
import { YEntityID } from "../yentityid";

export class YNotification extends YEntity
{
    userID:YEntityID=new YEntityID();
    text:String="";
    notifType:YNotificationType=YNotificationType.SIMPLE_NOTIFICATION
}