const express = require('express');
const cors = require('cors')
const userRouter = require('./users/user.routes');
const authRouter = require('./auth/auth.routes');
const visitRouter = require('./visitors/visit.routes');
const routerErrorHandler = require('./middleware/error.routes');
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { options } = require('./utils/swagger')
require('dotenv').config()

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
app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerJSDoc(options))
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/visits', visitRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)))
routerErrorHandler(app)

console.log(
    `SWAGGER HOST: : http://localhost:${process.env.PORT}/docs`
)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(process.env.DOMAIN)
});