import clientPromise from "../../../lib/mongodb";

export default async function RemindAPIReq(req:any, res:any) {
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

        if (req.method == "POST") {
            //POST request, push to database

            //check if user has access
            if (!req.body.key || String(req.body.key) != String(process.env.DB_CODE)) {
                console.log("incorrect db_key");
                console.log(process.env.DB_CODE);
                res.json({"error":"abort! invalid db_code"});
                return;
            }

            //check if data is valid
            if (req.body.reminder == "" || typeof req.body.due != "number" || typeof req.body.importance != "number") {
                console.log("invalid request");
                res.json({"error":"abort! invalid name, due date, or importance"});
                return;
            }

            const doc = {
                name: req.body.name,
                author: "Ryan Nguyen",
                created: Date.now(),
                due: req.body.due,
                importance: req.body.importance
            }

            const result = await coll.insertOne(doc);
            console.log(result.insertedId);

            //fetch new reminder list and return to client
            const reminders = await coll
                .find({})
                .sort({due: -1})
                //.limit(20)
                .toArray();

            res.json(reminders)
        }
        else {
            //GET request, so only fetch and return reminders
            //get reminders
            const reminders = await coll
                .find({})
                .sort({due: -1})
                //.limit(20)
                .toArray();
            
            res.json(reminders);
        }
    }
    catch (e) {
        console.error(e);
    }
};