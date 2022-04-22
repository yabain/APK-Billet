import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";


export function getBranchOfUsersProfil():string
{
    return `${DbBranch.users_profil}`;
}

export function getBranchOfUserProfil(userID:YEntityID):string
{
    return `${getBranchOfUsersProfil()}/${userID.toString()}`
}

export function getBranchOfUsersPreference():string
{
    return `${DbBranch.users_preference}`
}

export function getBranchOfUserPreference(userID:YEntityID):string
{
    return `${getBranchOfUsersPreference()}/${userID.toString()}`
}

export function getBranchOfUserEventsOrganize(userID:YEntityID):string
{
    return `${DbBranch.users_organizers}/${userID.toString()}`
}

export function getBranchOfNotifications(userID:YEntityID):string
{
    return `${DbBranch.notifications}`
}

