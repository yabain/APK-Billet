import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfUsers():string
{
    return `${DbBranch.users}`
}

export function getBranchOfUser(userID:YEntityID):string
{
    return `${getBranchOfUsers()}/${userID.toString()}`;
}

export function getBranchOfUserProfil(userID:YEntityID):string
{
    return `${getBranchOfUser(userID)}/${DbBranch.profil}`
}

export function getBranchOfPreferenceUser(userID:YEntityID):string
{
    return `${getBranchOfUser(userID)}/${DbBranch.preference}`
}

export function getBranchOfUserEventsOrganize(userID:YEntityID):string
{
    return `${getBranchOfUser(userID)}/${DbBranch.organize}`
}

export function getBranchOfUserNotifications(userID:YEntityID):string
{
    return `${getBranchOfUser(userID)}/${DbBranch.notifications}`
}

export function getBranchOfSendUserNotifications(userID:YEntityID):string
{
    return `${getBranchOfUserNotifications(userID)}/${DbBranch.send_notification}`
}

export function getBranchOfReceiveUserNotification(userID:YEntityID)
{
    return  `${getBranchOfUserNotifications(userID)}/${DbBranch.receive_notification}`
}


export function getBranchOfBilletsUser(userID:YEntityID):string
{
    return `${getBranchOfUser(userID)}/${DbBranch.billets}`
}
