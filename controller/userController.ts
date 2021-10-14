import restify from 'restify';
import Parse from 'parse/node';
import httpStatusCode from '../constants/http_status_code';
import { objectLength } from '../utils/functions';

class UserControllers {
    static async getAllUsers(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            const Person = Parse.Object.extend('Person');
            const query = new Parse.Query(Person);

            await query.findAll().then((data) => {
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
                res.send({ success: true, message: "All users retrieved successfully", allUsersList}).status(httpStatusCode.OK);
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

            res.json({ success: true, message: "User found successfully", user}).status(httpStatusCode.FOUND);
        
        } catch (err) {
            res.status(httpStatusCode.NOT_FOUND);
            next(err);
        }
    };

    static async createUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            const data = req.body;
            const { name, age, livingCity } = req.body
        
            const Person = Parse.Object.extend('Person');
                    
            const person = new Person();

            function setUser(){
                try { 
                    person.set("name", name);
                    person.set("age", age);
                    person.set("livingCity", livingCity);
        
                } catch (e) {
                    res.status(httpStatusCode.SERVER_ERROR);
                    res.json({ success: false, message: "Error setting user" });
                    next(e);
        
                };      
            };

            //<---VALIDATE DATA--->
            if (!data || objectLength(data) == 0) {
                return next(new Error);
            }

            if (!name) {
                return next(res.json({"err": "No name provided"}) && console.error("No name provided"));
            }

            if (!age) {
                return next(res.json({"err": "No age provided"}) && console.error("No age provided"));
            }

            if (!livingCity) {
                return next(res.json({"err": "No city provided"}) && console.error("No city provided"));
            }
            //<---RUN FUNCTION THEN SAVE--->
            try { 
                await setUser(); 
                await person.save();
                res.json({ success: true, message: "User has been added", data}).status(httpStatusCode.CREATED);

            } catch (err) {
                res.json({ success: false, message: "An error occurred" }).status(httpStatusCode.SERVER_ERROR);
                next(err); 
            }


        } catch (err) {
            res.json({ success: false, message: "An error occurred" }).status(httpStatusCode.SERVER_ERROR);
            next(err); 
        }
    };

    static async updateUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            let { id } = req.params;
            let { name, age, livingCity } = req.body;

            const User = Parse.Object.extend('Person');
            const user = new User()

            user.set("id", id);        
            user.set("name", name);
            user.set("age", age);
            user.set("livingCity", livingCity);

            const updatedUser = await user.save()

            res.json({ success: true, message: "User updated successfully", updatedUser }).status(httpStatusCode.OK);

        } catch (err) {
            res.json({ success: false, message: "An error occurred" }).status(httpStatusCode.SERVER_ERROR);
            next(err); 
        }
    };

    static async deleteUser(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {   
            let objectId = req.params.id;

            const Person = Parse.Object.extend('Person');
            const query = new Parse.Query(Person);
            console.log(objectId)

            const currentUser = await query.get(objectId);
            await currentUser.destroy();

            res.json({ success: true, message: "User was deleted" }).status(httpStatusCode.OK);

        } catch (err) {
            res.json({ success: false, message: "Unable to delete user" }).status(httpStatusCode.SERVER_ERROR);
            next(err); 
        }
    };

};

export default UserControllers;