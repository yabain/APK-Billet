import { YEntityID } from "../yentityid";
import { YNotification } from "./ynotification";

export class YEventInvitation extends YNotification
{
    eventID:YEntityID=new YEntityID()
}