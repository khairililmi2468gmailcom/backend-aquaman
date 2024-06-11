const questionRoutes = require('./question');
const answerRoutes = require('./answer');
const predictRoutes = require('./predict');
const dictionaryRoutes = require('./dictionary');

const routes = [{
    method: 'GET',
    path: '/aquamate',
    handler: (request, h) => {
        return "aquamate backend";
    }
},
...predictRoutes,
...questionRoutes,
...answerRoutes,
...dictionaryRoutes
];

module.exports = routes;