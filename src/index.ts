// NPM Packages
const restify = require('restify');


//Custom Packages
import { initParse } from '../modules/init_parse';
import { config } from '../constants/constants';

const server = restify.createServer();

server.listen(config.SERVER_PORT, function() {
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.jsonp());
    
    //Routes
    

    require('../routes/userRoutes')(server);
    require('../routes/postRoutes')(server);

    initParse(
        config.APP_ID,
        config.JAVASCRIPT_KEY,
        config.MASTER_KEY,
        config.SERVER_URL
    );
    console.log('server listening on port ' + config.SERVER_PORT);
});

server.on('SIGINT', () => {
    server.close(() => {
        process.exit();
    });
});

