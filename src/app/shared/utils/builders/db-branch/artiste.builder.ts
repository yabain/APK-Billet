import { YEntityID } from "src/app/shared/entities";
import { DbBranch } from "./db-branch.enum";

export function getBranchOfArtistes():string
{
    return `${DbBranch.artistes}`
}

export function getBranchOfArtiste(artisteID:YEntityID):string
{
    return `${getBranchOfArtistes()}/${artisteID.toString()}`
}