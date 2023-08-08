const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Set up Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up Handlebars as the view engine

// Route to the home page
app.get('/', (req, res) => {
    // Connect to MongoDB
    MongoClient.connect(uri, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.render('index', { error: 'Error connecting to MongoDB' });
            return;
        }

        const db = client.db('your_database'); // Replace with your database name
        db.listCollections().toArray((err, collections) => {
            if (err) {
                console.error('Error listing collections:', err);
                res.render('index', { error: 'Error listing collections' });
                return;
            }

            client.close();
            res.render('index', { collections });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
