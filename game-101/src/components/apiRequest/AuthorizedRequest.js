import * as React from "react";

const API_ENDPOINT = "http://localhost:4000"

export async function GetAuthorizedResponse(location, httpMethod, sendData) {
  console.log("Requesting " + location + " with " + httpMethod + " method");
    // TODO: Get the User Token and User ID
    var user_id = "63328bb4baba9a98fcd41bdf";
    var userToken = "123456";

    // String replace the User ID
    location = location.replace("{user_id}", user_id);

    // Fetch the result
    return await fetch(API_ENDPOINT + location, {
        method: httpMethod,
        headers: {
          Authorization: user_id + ":" + userToken
        },
      })
        .then((res) => res.text())
        .then((result) => {
          let final_data = JSON.parse(result);
          return final_data;
        })
        .catch((err) => {
          console.log(err.message);
        });
}