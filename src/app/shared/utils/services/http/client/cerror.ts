
import { CRequest } from "./crequest";
import { CResponse } from "./cresponse";

export class CError
{
    
    request:CRequest=new CRequest();
    response:CResponse=new CResponse();
    message:String="";
}
