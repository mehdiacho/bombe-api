const options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        info: {
            title: 'Bombe Med API',
            version: '1.0.0',
            description: 'Medical Inventory Management Express API',
        },
        servers: [
            {
                url: 'http://localhost:8383', // Replace with your API's URL
                description: 'Development server',
            },
        ],
    },
    apis: [`./server.js`, './schemas.js'], // Replace with the filename of your main Express.js app
};



module.exports = options;
