export class YString
{
    static capitalize(str:String):String
    {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
}