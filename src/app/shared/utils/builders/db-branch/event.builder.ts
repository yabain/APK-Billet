import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfEvents():string
{
    return `${DbBranch.events}`
}

export function getBranchOfEvent(entityID:YEntityID):string
{
    return `${getBranchOfEvents()}/${entityID.toString()}`
}

export function getBranchOfEventDetail(entityID:YEntityID):string
{
    return `${getBranchOfEvent(entityID)}/${DbBranch.event_details}`
}

export function getBranchOfBilletsEvent(entityID:YEntityID):string
{
    return `${getBranchOfEvent(entityID)}/${DbBranch.billets}`
}

export function getBranchOfBilletEvent(eventID:YEntityID,billetID:YEntityID):string
{
    return `${getBranchOfBilletsEvent(eventID)}/${billetID.toString()}`
}

export function getBranchOfEventOrganizers(eventID:YEntityID):string
{
    return `${getBranchOfEvent(eventID)}/${DbBranch.organizers}`
}

export function getBranchOfEventOrganizer(eventID:YEntityID,organizeID:YEntityID):string
{
    return `${getBranchOfEventOrganizers(eventID)}/${organizeID.toString()}`
}

