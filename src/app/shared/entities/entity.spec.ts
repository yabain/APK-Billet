//Test des entités

import { YArtiste, YUser } from "./users"
import { YEntityID } from "./yentityid";

describe('Test Entities',()=>{
    let user:YArtiste;
    beforeEach(()=>{
        user=new YArtiste();
        user.firstName="Cédric";
        user.lastName="Nguendap";
    });

    it("#toString.firstName should return correct value (stringify)",()=>{
        expect(user.toString().firstName).toEqual("Cédric");
    })    

    it('#toString should contains event previously add',()=>{
        let newEventID=new YEntityID();
        newEventID.setId("eventid1234");
        user.eventsID.push(newEventID);
        expect(user.toString().eventsID).toContain("eventid1234")
    })

    it("#hydrate add eventid",()=>{
        user.hydrate({
            eventsID:["eventid1234"]
        });
        let newEventID=new YEntityID();
        newEventID.setId("eventid1234");

        expect(user.eventsID).toHaveSize(1);
        expect(user.eventsID[0].toString()).toEqual("eventid1234")
    });
})