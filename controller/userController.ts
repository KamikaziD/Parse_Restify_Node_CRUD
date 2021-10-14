import restify from 'restify';
import Parse from 'parse/node';
import httpStatusCode from '../constants/http_status_code';
import { JSONParser } from 'formidable';

class UserControllers {
    static getAllUsers(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            const Person = Parse.Object.extend('Person');
            const query = new Parse.Query(Person);
            //const allUsersList = query.findAll();

            query.findAll().then((data) => {
                let allUsersList = [];

                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const user = data[i];
                        const visibleContent = {
                            "id": user.id,
                            "name": user.get("name"),
                            "age": user.get("age"),
                            "livingCity": user.get("livingCity"),
                        };

                        allUsersList.push(visibleContent);

                    }
                }
                res.send({"AllUsers": allUsersList}).status(httpStatusCode.OK);
            });

        } catch(err) {
            res.status(httpStatusCode.SERVER_ERROR);
            next();
        };
    };

    static async getUserById(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            const Person = Parse.Object.extend('Person');
            const query = new Parse.Query(Person);
            console.log(req.params.id)
            query.equalTo('objectId', req.params.id);
            
            const user = await query.find();

            res.json({user}).status(httpStatusCode.FOUND);
            // await query.find()
            
            // .then((data) => {
            //     let userById = [];

            //     if (data.length > 0) {
            //         const user = data[0];
            //         const visibleContent = {
            //             "id": user.id,
            //             "name": user.get("name"),
            //             "age": user.get("age"),
            //             "livingCity": user.get("livingCity"),
            //         };
            //         userById.push(visibleContent)
            //     };
            //     res.send(userById).status(httpStatusCode.FOUND);
            // });
        } catch (err) {
            res.status(httpStatusCode.NOT_FOUND);
            next(err);
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