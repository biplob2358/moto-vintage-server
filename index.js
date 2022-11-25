const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yjf8p4x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollection = client.db('motoVintage').collection('categories');
        const productsCollection = client.db('motoVintage').collection('products');
        const bookingsCollection = client.db('motoVintage').collection('bookings');
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        });
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        });
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id }
            const products = await productsCollection.find(query).toArray();
            res.send(products)
        });

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })

    }
    finally {

    }

}
run().catch(console.log);


app.get('/', async (req, res) => {
    res.send('Moto Vintage server running');
});

app.listen(port, () => console.log(`Moto Vintage rinning on ${port}`))