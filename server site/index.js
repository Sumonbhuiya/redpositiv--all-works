const express = require('express')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

// connect mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e8ysq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // declare database
        const database = client.db('redPositive_service');
        const formDataCollection = database.collection('users_data');

        // save data
        app.post('/user_data', async (req, res) => {
            const userData = req.body;
            const result = await formDataCollection.insertOne(userData);
            res.json(result)
        })

        // get all data
        app.get('/user_data', async (req, res) => {
            const cursor = formDataCollection.find({});
            const usersInfo = await cursor.toArray();
            res.json(usersInfo);
        })

        // get single data
        app.get('/user_data/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await formDataCollection.findOne(query);
            res.send(user);
        })

        // update data
        app.put('/user_data/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    phone: updatedUser.phone,
                    email: updatedUser.email,
                    hobbies: updatedUser.hobbies
                },
            };
            const result = await formDataCollection.updateOne(filter, updateDoc, options)
            res.json(result)
        })

        // delete data
        app.delete('/user_data/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await formDataCollection.deleteOne(query);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Redpositive service backend developer server is running ...');
})

app.listen(port, () => {
    console.log('Server running...', port)
})