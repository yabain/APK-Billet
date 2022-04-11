import { UserType } from "../../enums";
import { YParticipant } from "./yparticipant";

export class YEventManager extends YParticipant
{
    userType:UserType=UserType.EVENT_MANAGER_USER;
}