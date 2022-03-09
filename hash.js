import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

import { Hash } from './saltAndHash.js';

const hasher = new Hash();

const app = express();
const jsonParser = bodyParser.json();

app.post('/createusers', jsonParser, async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        res.sendStatus(400);
    }
    const hashedPassword = hasher.generateHash(password);
    const split = '@split@';
    const data = userName + split + hashedPassword;

    fs.appendFile("C:/SkyCamp/hashPasword/database.txt", data, function(error){
        if(error) throw error;
    });
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Listener was started on port 3000');
});