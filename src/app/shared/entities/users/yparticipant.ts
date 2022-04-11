import { UserType } from "../../enums";
import { YUser } from "./yuser";

export class YParticipant extends YUser
{
    userType:UserType=UserType.PARTICIPANT_USER;
}