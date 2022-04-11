import { UserType } from "../../enums";
import { YUser } from "./yuser";

export class YPlateformAdmin extends YUser
{
    userType:UserType=UserType.PLATEFORM_ADMIN_USER;
}