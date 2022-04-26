import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfBillets():string
{
    return `${DbBranch.event_billets}`
}

export function getBranchOfBillet(billetID:YEntityID):string
{
    return `${getBranchOfBillets()}/${billetID.toString()}`
}