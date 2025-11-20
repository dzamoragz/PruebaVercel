// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type: 'http',
                scheme: 'bearer',
                bearerFormat:'JWT'
            },
        },
    },
    security:[
        {
            bearerAuth:[],
        }
    ]
  },
  apis: ['./routes/*.js'], // Ruta donde Swagger busca tus endpoints
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger listo en: http://localhost:${port}/api-docs`);
}

module.exports = { swaggerDocs };
