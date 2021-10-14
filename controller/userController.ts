import restify from 'restify';
import Parse from 'parse/node';
import httpStatusCode from '../constants/http_status_code';

class UserControllers {
    static getAllUsers(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            console.log('getAllUsers');
        } catch (err) {

        }
    };

    static getUserById(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            console.log('getUserById');
        } catch (err) {

        }
    };

    static createUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            console.log('createUser');
        } catch (err) {

        }
    };

    static updateUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            console.log('updateUser')
        } catch (err) {

        }
    };

    static deleteUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {   
            console.log('deleteUser')
        } catch (err) {

        }
    };

};

export default UserControllers;