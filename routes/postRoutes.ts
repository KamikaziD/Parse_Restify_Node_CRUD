import restify from 'restify';
import PostControllers from '../controller/postController';

module.exports = (server: restify.Server) => {
    server.post('/api/posts/', PostControllers.addNewPost);
};