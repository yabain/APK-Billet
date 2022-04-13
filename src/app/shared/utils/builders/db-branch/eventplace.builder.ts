import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfEventPlaces():string
{
    return `${DbBranch.places}`
}

export function getBranchOfEventPlace(placeID:YEntityID):string
{
    return `${getBranchOfEventPlaces()}/${placeID.toString()}`
}