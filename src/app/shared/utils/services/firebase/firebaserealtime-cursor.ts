import { ActionStatus } from "../../actionstatus";

export class FirebaseRealTimeCursor {
    baseRef:any;
    lastKey:any;
    lastValue:any;
    pageSize:number=0;

    constructor(baseRef, pageSize,private keyObserved) {
       this.baseRef = baseRef;
       this.lastKey = null;
       this.lastValue = null;
       this.pageSize = pageSize;
    }
    
    next():Promise<ActionStatus<any>> 
    {
      let ref = this.baseRef;
      
      if( this.lastValue !== null ) {
         // a previous page has been loaded so get the next one using the previous value/key
         // we have to start from the current cursor so add one to page size
         ref = ref.startAt(this.lastValue, this.lastKey).limitToFirst(this.pageSize+1);
      }
      else {
         // this is the first page
         ref = ref.limitToFirst(this.pageSize);
      }
      
      return new Promise<ActionStatus<any>>((resolve,reject)=>{
        let result:ActionStatus<any>=new ActionStatus()
        ref.once('value')
        .then(snap => {
            const keys = [];
            const data = []; // store data in array so it's ordered
            
            snap.forEach(ss => {
               data.push(ss.val());
               keys.push(ss.key);
            });
                   
            if( this.lastValue !== null ) {
              // skip the first value, which is actually the cursor
              keys.shift();
              data.shift();
            }
     
            // store the last loaded record
            if( data.length ) {
              const last = data.length - 1;
              this.lastKey = keys[last];
              this.lastValue = data[last][this.keyObserved];
            }
            result.result=data;
            resolve(result)
            
            // return data;
          })
        .catch((error)=>{
            result.code = ActionStatus.UNKNOW_ERROR;
            result.apiCode = error.code;
            result.message = error.message;
            reject(result);
        });
      })
    }
 }