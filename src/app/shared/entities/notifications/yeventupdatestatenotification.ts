import { YNotificationType } from "../../enums";
import { YEntityID } from "../yentityid";
import { YNotification } from "./ynotification";

export class YEventUpdateStateNotification extends YNotification
{
    eventID:YEntityID=new YEntityID();
    notifType: YNotificationType=YNotificationType.EVENT_UPDATE_STATE_NOTIFICATION;
}