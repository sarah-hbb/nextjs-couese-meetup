// api/new-meetup
// POST /api/new-meetup

//******** THIS FILE WILL NOT BE RENDERED. Next.js knows if its a file in api folder (api route) and its a special type of file*/

import { MongoClient } from "mongodb";

async function handler(req, res) {
    // req and res should be define as parameter
  if (req.method === "POST") {
    const data = req.body;

    //Connect to our Mongodb data base. connect method returns a promise so we use it with async
    const client = await MongoClient.connect(
      "mongodb+srv://sarah-habibi:HoTcOlD68@cluster0.ckqkq1e.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollections = db.collection("meetups");
    const result = await meetupsCollections.insertOne(data);
    console.log(result);

    // close the database connection
    client.close();
    // 201 indicates that sth was inserted successfully
    res.status(201).json({message: 'meetup inserted!'})

  }
}

export default handler;
