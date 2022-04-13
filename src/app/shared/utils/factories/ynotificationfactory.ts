import { YEventInvitation, YNotification } from "../../entities/notifications";
import { YNotificationType } from "../../enums";

export class YNotificationFactory
{
    static getInstanceOf(notificationEntity:Record<string|number,any>):YNotification
    {
        switch(notificationEntity.notifType)
        {
            case YNotificationType.SIMPLE_NOTIFICATION:
                return new YNotification();

            case YNotificationType.EVENT_INVITATION_NOTIFICATION:
                return new YEventInvitation();
        }

        return null;
    }
}