const express = require('express');
const cors = require('cors')
const userRouter = require('./src/user/user.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())  //permitir jsaon 
app.use(express.urlencoded({ extended: true })) //analizar datos de formularios con estructura de anidamiento
app.use(cors()); //solicitudes desde cualquier origen
app.disable("x-powered-by"); //evitar poner en conocimiento que se usa express

app.get('/', (req, res) => { 
    res.json({
        api: 'API',
        state: 'Up and Running',
        version: '1.0.1'
      })
});

app.use('/user',userRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});