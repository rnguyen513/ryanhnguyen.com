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
        //const deleteaaa = await coll.deleteMany({});

        if (req.method == "POST") {
            //POST request, push to database

            //check if user has access
            if (!req.body.key || String(req.body.key) != String(process.env.DB_CODE)) {
                console.log("incorrect db_key");
                console.log(process.env.DB_CODE);
                return res.status(401).send({
                    message: "Error: wrong password!"
                })
            }

            //check if data is valid
            if (req.body.name == "" || typeof req.body.due != "number" || typeof req.body.importance != "number") {
                console.log("invalid request");
                return res.status(400).send({
                    message: "Error: malformed request!"
                })
            }

            //check if pushing to db or request to delete from db
            if (req.body.reqType == "delete") {
                //delete
                try {
                    const result = await coll.deleteOne({_id:req.body._id});

                    //return success
                    res.json({"success":`${req.body.name} has been deleted`});
                }
                catch (e) {
                    res.json({"error":`${e}`});
                }

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
            //console.log(result.insertedId);

            //fetch new reminder list and return to client
            const reminders = await coll
                .find({})
                .sort({importance: -1})
                //.limit(20)
                .toArray();

            res.json(reminders)
        }
        else {
            //GET request, so only fetch and return reminders
            //get reminders
            const reminders = await coll
                .find({})
                .sort({importance: -1})
                //.limit(20)
                .toArray();
            
            res.json(reminders);
        }
    }
    catch (e) {
        console.error(e);
    }
};