import { Method } from "../http-method.type";


export class CRequest
{
    headerData:Record<string | number,string>={};
    requestType:String="json";
    dataObj:any=null;
    accesstoken:any=null;
    link:String="";
    method:Method='get';

    token(accesstoken:any):CRequest
    {
        this.accesstoken=accesstoken;
        return this;
    }

    get(url:String):CRequest
    {
        this.method="get";
        this.url(url);
        return this;
    }
    post(url:String):CRequest
    {
        this.method="post";
        this.url(url);
        return this;
    }
    put(url:String):CRequest
    {
        this.method="put";
        this.url(url);
        return this;
    }
    patch(url:String):CRequest
    {
      this.method="patch";
        this.url(url);
        return this;
    }
    delete(url:String):CRequest
    {
        this.method="delete";
        this.url(url);
        return this;
    }
    header(key:string,value:any):CRequest
    {
        this.headerData[key]=value;
        return this;
    }
    private url(link:String)
    {
        this.link=link;
    }
    json(data:any):CRequest
    {
        this.headerData['Content-Type']="application/json";
        this.requestType="json";
        this.dataObj=data;
        return this;
    }
    form(data:any):CRequest
    {
        this.headerData['Content-Type']="multipart/form-data";
        this.requestType="form-data";
        this.dataObj=data;
        return this;
    }
    text(data:any):CRequest
    {
        this.requestType="text";
        this.headerData['Content-Type']="application/txt";

        this.dataObj=data;
        return this;
    }
    xml(data:any):CRequest
    {
        this.requestType="xml";
        this.headerData['Content-Type']="application/xml";
        this.dataObj=data;
        return this;
    }
    serializeDataToUrl():String
    {
        let endpoint=this.link.toString();
        if (this.dataObj) {
            let req: String = '';
            for (const key in this.dataObj) {
              req += `${key}=${this.dataObj[key]}&`;
            }
            endpoint +="?" + req;
        }
        return endpoint;
    }
    toJSON()
    {
        return JSON.parse(JSON.stringify(this.dataObj));
    }

    toFormData()
    {
        let formData:FormData=new FormData();
        if(this.dataObj.constructor===({}).constructor)
        {
            for(let key in this.dataObj)
            {
                formData.append(key,this.dataObj[key]);
            }
        }
        else if(this.dataObj.constructor===([]).constructor)
        {
            for(let i=0;i<this.dataObj.length;i++)
            {
                formData.append(i.toString(),this.dataObj[i])
            }
        }
        else
        {
            formData.append("data",this.dataObj);
        }
        return formData;
    }

    toString()
    {
        let data={};
        if(this.requestType=="form-data") data= this.toFormData();
        if(this.requestType=="json") data =this.toJSON();
        return {
            url:this.link.toString(),
            method:this.method,
            headers:this.headerData,
            data,
            requestType:this.requestType
        }
    }
    getData()
    {
        if(this.method=="get") return "";
        if(this.method=="post") return this.toJSON()
    }
    getParam()
    {
        if(this.method=="post") return "";
        if(this.method=="get") return this.dataObj
    }
}
