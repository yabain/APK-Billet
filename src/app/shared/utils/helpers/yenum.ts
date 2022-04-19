export class YEnumUtil
{
    static getListOfKey(enumName)
    {
        return Object.keys(enumName)
    }

    static getListOfValue(enumName)
    {
        return Object.values(enumName)
    }
}