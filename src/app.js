import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import TasksRoutes from './routes/tasks.routes';


const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middleware
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan('dev')); //ver peticiones por consola
app.use(express.json()); //resp json
app.use(express.urlencoded({extended: false}));

//routes
app.get('/', (req,res) => {
    res.json({message: 'Bienvenido a la app'});
})

app.use('/api/tasks', TasksRoutes);

export default app;