import { YEventInvitation, YNotification } from "../../entities/notifications";
import { YEventUpdateStateNotification } from "../../entities/notifications/yeventupdatestatenotification";
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
            case YNotificationType.EVENT_UPDATE_STATE_NOTIFICATION:
                return new YEventUpdateStateNotification()
        }

        return null;
    }
}