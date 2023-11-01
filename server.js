// ahujashaurya13          HMj7D5zk9FcMger3
import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://ahujashaurya13:HMj7D5zk9FcMger3@cluster0.4j5lqvw.mongodb.net/?retryWrites=true&w=majority`

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// API Endpoints
app.get('/', (req, res) => res.status(200).send("HELLO CLEVER PROGRAMMERS!!!"));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    // savinf request body in a variable

    Cards.create(dbCard)
        .then(data => {
            res.status(201).send(data);
            // status 201 means successfully created and then we send back the data
        })
        .catch(err => {
            res.status(500).send(err);
            // set the status to 500, which means internal server error and then send the error back 
        });
});

// this syntax bcuz .create and .find functions no longer accept callback functions 

app.get('/tinder/cards', (req, res) => {
    Cards.find()
        .then(data => {
            res.status(200).send(data);
        // set the status to 500, which means internal server error and then send the error back
        })
        .catch(err => {
            res.status(500).send(err);
        // if(err) {
        //     res.status(500).send(err)
        //     // set the status to 500, which means internal server error and then send the error back
        // } else {
        //     res.status(200).send(data)
        // }
    })
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));