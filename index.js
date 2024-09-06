import express from "express";
import cors from "cors";
import path from 'path';

import db from "./database/db.js"

import pruebaRouter from './routes/routes.js'

const app=express();

app.use(cors())
app.use(express.json())
app.use('/prueba', pruebaRouter)

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});


try {
    await db.authenticate()
    console.log('conexión exitosa')
} catch (error) {
    console.log(`El error de la conexión es: ${error}`)
}


app.listen(8000,()=>{
    console.log('server UP running in http://localhost:8000/');
})