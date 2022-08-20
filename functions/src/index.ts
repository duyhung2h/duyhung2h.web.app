/* eslint-disable */

// The Cloud Functions for Firebase SDK
// to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

export const helloWorld = functions.https.onRequest(
  (request: any, response: any) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  }
);
