import { UserType } from "../../enums";
import { YEntity } from "../yentity";

export class YUser extends YEntity
{
    username:String="";
    firstName:String="";
    lastName:String=""
    sexe:String="";
    email:String="";
    photoUrl:String="assets/img/img/user.jpeg";
    password:String="";
    phoneNumber:String="";
    city:String="";
    country:String="";
    about:String=""
    userType:UserType=UserType.SIMPLE_USER;
    websiteLink:String="";
    facebook_link:String=""
    tweeter_link:String=""
    instagram_link:String="";
    tiktok_link:String="";
}