import * as functions from "firebase-functions";
import * as cors from 'cors';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


const corsHandler = cors({ origin: true })

export const helloWorld = functions.https.onRequest(
    async(req: any, res: any) => {
        corsHandler(req, res, async () => {
            
          });
          console.log('hello')
          res.send(['words'])
});