const express = require('express');
const cors = require('cors')
const userRouter = require('./users/user.routes');
const authRouter = require('./auth/auth.routes');
const visitRouter = require('./visitors/visit.routes');
const routerErrorHandler = require('./middleware/error.routes');
// const { swaggerDocs: V1SwaggerDocs } = require('./utils/swagger')

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

app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/visits',visitRouter)
routerErrorHandler(app)
// V1SwaggerDocs(app, process.env.PORT)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});