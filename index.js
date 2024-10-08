const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')
require('dotenv').config();

require('./database/server');
const routes = require('./routes/index');  

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition:{
        info: {
            title: "Book API",
            version: '1.0.0'
        },
    },
    apis: ['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api', routes);  

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
