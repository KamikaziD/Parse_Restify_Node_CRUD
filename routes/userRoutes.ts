import restify from 'restify';
import UserController from '../controller/userController';

module.exports = (server: restify.Server) => {
    server.get('/api/user/', UserController.getAllUsers);
    server.get('/api/user/:id', UserController.getUserById);
    server.post('/api/user/', UserController.createUser);
    server.put('/api/user/:id', UserController.updateUser);
    server.del('/api/user/:id', UserController.deleteUser);
};