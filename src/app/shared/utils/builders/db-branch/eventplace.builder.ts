import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfPlaces():string
{
    return `${DbBranch.places}`
}

export function getBranchOfPlace(placeID:YEntityID):string
{
    return `${getBranchOfPlaces()}/${placeID.toString()}`
}