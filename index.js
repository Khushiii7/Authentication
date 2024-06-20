import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import './config/database.js';
dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/auth' , authRoutes);
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, ()=> {
    console.log("Server is running on port " + PORT);
})
