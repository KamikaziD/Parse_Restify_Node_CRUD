import restify from 'restify';
import Parse from 'parse/node';
import httpStatusCode from '../constants/http_status_code';
import { objectLength } from '../utils/functions';

class PostControllers {
    static async addNewPost(
        req: restify.Request,
        res: restify.Response,
        next: restify.Next
    ) {
        try {
            const data = req.body;
            const { title, msgBody, userId } = req.body;

            const Post = Parse.Object.extend('Person');
            const post = new Post();

            function setPost(){
                try {
                    post.set(title);
                    post.set(msgBody);
                    post.set(userId);

                } catch (err) {
                    res.status(httpStatusCode.SERVER_ERROR);
                    res.json({ success: false, message: "Error setting user" });
                    next(err);
                }
            };

            //<---VALIDATE DATA--->
            if (!data || objectLength(data) == 0) {
                return next(new Error);
            };

            if (!title) {
                return next(res.json({"err": "No title provided"}) && console.error("No title provided"));
            };

            if (!msgBody) {
                return next(res.json({"err": "No message provided"}) && console.error("No message provided"));
            };

            if (!userId) {
                return next(res.json({"err": "No userId provided"}) && console.error("No userId provided"));
            };

            //<---RUN FUNCTION THEN SAVE--->
            try { 
                await setPost(); 
                await post.save();
                res.json({ success: true, data: data}).status(httpStatusCode.CREATED);

            } catch (err) {
                res.json({ success: false, message: "An error occurred" }).status(httpStatusCode.SERVER_ERROR);
                next(err); 
            }



        } catch (err) {

        }
    }
};

export default PostControllers;