import { 
    YUser , 
    YPlateformAdmin, 
    YParticipant, 
    YOrganizer,
    YEventManager
} from "../../entities/users";

import { UserType } from "../../enums";

export class YUserFactory
{
    static getInstanceOf(userEntity:Record<string|number,any>):YUser
    {
        switch(userEntity.userType)
        {
            case UserType.SIMPLE_USER:
                return new YUser();

            case UserType.PLATEFORM_ADMIN_USER:
                return new YPlateformAdmin();

            case UserType.PARTICIPANT_USER:
                return new YParticipant();
                
            case UserType.ORGANIZER_USER:
                return new YOrganizer();
            
            case UserType.EVENT_MANAGER_USER:
                return new YEventManager()
        }
    }
}