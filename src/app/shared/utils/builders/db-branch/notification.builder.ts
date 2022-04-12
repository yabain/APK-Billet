import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfNotifications():string
{
    return `${DbBranch.notifications}`
}

export function getBranchOfNotification(notificaitonID:YEntityID):string
{
    return `${getBranchOfNotifications()}/${notificaitonID.toString()}`
}