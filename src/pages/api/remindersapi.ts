import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import {nextCsrf} from "next-csrf";
import { getCsrfToken } from "next-auth/react";
//import {cookies} from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function RemindAPIReq(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("live_rnguyencom");
        const coll = db.collection("reminders");
        const history = db.collection("history");

        //console.log("req", await req);
        //const csrf = req.cookies.get("next-auth.csrf-token")?.value.split("|")[0];
        const csrf = req.cookies["next-auth.csrf-token"]?.split("|")[0];
        //console.log(csrf);
        // if (!csrf) {
        //     console.log("abort");
        //     return res.status(400).send({
        //         message: "no csrf loser"
        //     });
        // }

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
            // if (!req.body.key || String(req.body.key) != String(process.env.DB_CODE)) {
            //     console.log("incorrect db_key");
            //     //console.log(process.env.DB_CODE);
            //     return res.status(401).send({
            //         message: "Error: wrong password!"
            //     });
            // }

            if (!csrf) {
                console.log("abort");
                return res.status(400).send({
                    message: "no csrf loser"
                });
            }

            //check if data is valid
            if (req.body.name == "" || typeof req.body.due != "string" || typeof req.body.importance != "number") {
                console.log("invalid request:", req.body.name, typeof req.body.due, req.body.importance);
                return res.status(400).send({
                    message: "Error: malformed request!"
                });
            }

            //check if pushing to db or request to delete from db
            if (req.body.reqType == "DELETE") {
                //delete
                try {
                    //console.log(req.body._id);

                    const target = await coll.findOne({_id: new ObjectId(req.body._id)});

                    if (!target || target == null) return res.status(400).send({
                        message: `reminder with id ${req.body._id} does not exist!`
                    });

                    console.log(req.body.authorEmail, "trying to delete", target.authorEmail);

                    if (target.authorEmail != req.body.authorEmail) {
                        return res.status(400).send({
                            message: `You don't have access to delete ${target.author}'s reminder!`
                        })
                    }

                    const duplicateDoc = {
                        name: req.body.name,
                        author: req.body.author,
                        authorEmail: req.body.authorEmail,
                        created: req.body.created,
                        due: req.body.due,
                        importance: req.body.importance,
                        color: req.body.color,
                        _id: new ObjectId(req.body._id)
                    }

                    const duplicate = await history.insertOne(duplicateDoc);
                    const result = await coll.deleteOne(target);

                    //return success
                    //res.json({"success":`${req.body.name} has been deleted`});
                }
                catch (e) {
                    res.json({"error":`${e}`});
                }
            }
            else if (req.body.reqType == "PUSH") {
                //insert NOT delete
                const doc = {
                    name: req.body.name,
                    author: req.body.author,
                    authorEmail: req.body.authorEmail,
                    created: new Date(Date.now()),
                    /*due: req.body.due+104340000,&*/
                    due: new Date(req.body.due),
                    importance: req.body.importance,
                    color: req.body.color
                }
    
                const result = await coll.insertOne(doc);
                //console.log(result.insertedId);
            }
        }

        //regardless if POST or GET, always return updated list
        const reminders = await coll
            .find({})
            .sort({importance: -1})
            .toArray();

        res.json(reminders);
    }
    catch (e) {
        console.error(e);
    }
};