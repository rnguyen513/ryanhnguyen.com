import clientPromise from "../../../lib/mongodb";

export default async (req:any, res:any) => {
    try {
        const client = await clientPromise;
        const db = client.db("live_rnguyencom");
        const coll = db.collection("reminders");

        /* insert
        const doc = {name: "TESTINSERT",
        author: "Ryan Nguyen",
        created: Date.now(),
        due: Date.now() + 5000,
        importance: 10};

        const result = await coll.insertOne(doc);
        console.log(result.insertedId);
        */

        //delete!!!
        //const result = await coll.deleteMany({name: "TESTINSERT"})

        //get reminders
        const reminders = await coll
            .find({})
            .sort({due: -1})
            .limit(20)
            .toArray();
        
        res.json(reminders);
    }
    catch (e) {
        console.error(e);
    }
};