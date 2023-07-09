const express = require("express");
const router = express.Router();
const fs = require("fs");


function routes(app) {


 
  var FCM = require("fcm-node");
  var serverKey = "AAAADCh5CqA:APA91bG1QT_WrfLf3xae9Htje9IZpqN2_WoeIsIpdaDpOA0h4SWCW76piG3EHluAzkv7ZT26XL2YIjwf8P-YwSqmd7dks-A3GozumePHM2apVpzWYEvbAr5IHtqAGQ3E-v-UjzEgSuDu"; //put your server key here
  var fcm = new FCM(serverKey);

  router.get("/send-notification-test", async (req, res) => {
    try {
      var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: "e89SyW3oQXemPXBCh5z_dR:APA91bGEjtUZhNFo82dRDhOvSUIv4ah8nN_DCOVU7_mQqFjdfCAhy_MePgwaFxlHt-ls9KtbLvZ4qe2ouTRkoZo5GVm6Uo9IU5EHOsEKnUtl_8Uy3a-YNCKG4V5trPUoOd3FmI8dgxXp",
        collapse_key: "com.jinsypcode.InterandinaExpo",
        "experienceId": "@williams008/InterandinaExpo",

        notification: {
          title: "Title  2",
          body: "Body of your push notification",
          experienceId: "@williams008/InterandinaExpo",
        }
      };

      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err);
        } else {
          console.log("Successfully sent with response: ", response);
          res.send(response);
        }
      });
    } catch (error) {
      console.log("error", error);
      res.send(error);
    }


  });

  router.post("/send", async (req, res) => {
    console.log("hola ");
    res.send("enviando hola");
  });

  return router;
}

module.exports = routes;
