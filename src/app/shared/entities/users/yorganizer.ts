import { UserType } from "../../enums";
import { YParticipant } from "./yparticipant";
import { YUser } from "./yuser";

export class YOrganizer extends YParticipant
{
    userType:UserType=UserType.ORGANIZER_USER;
}