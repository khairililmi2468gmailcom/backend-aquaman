require('dotenv').config();
const Hapi = require('@hapi/hapi');
const loadModel = require('./services/loadModel');
const routes = require('./routes/index');
const db = require('./db2');

(async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    try {
        const model = await loadModel();
        server.app.model = model;
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Failed to load model:', error.message);
        process.exit(1);
    }

    server.route(routes);

    try {
        await server.start();
        console.log(`Server start at: ${server.info.uri}`);
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
})();