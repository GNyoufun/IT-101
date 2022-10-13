import * as React from "react";

const API_ENDPOINT = "http://localhost:4000"

export async function GetLoginResponse(username, password) {
  try {
    var response = await fetch(API_ENDPOINT + "/users/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "username": username,
        "password": password
      },
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return response;
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

export async function GetAuthorizedResponse(location, httpMethod, sendData) {
  //console.log("Requesting " + location + " with " + httpMethod + " method and data " + sendData);
  // TODO: Redirect back to login
  let user_id = localStorage.getItem("user_id");
  let user_token = localStorage.getItem("user_token");
  

  // String replace the User ID
  location = location.replace("{user_id}", user_id);

  try {
    // Fetch the result and only attach the body if the data is not null
    const response = await fetch(API_ENDPOINT + location, {
      method: httpMethod,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': user_id + ":" + user_token,
        'Content-Type': 'application/json'
      },
      body: sendData
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    return response;
  }
  catch (error) {
    console.log(error);
    return error;
  }
        // .then((res) => res.text())
        // .then((result) => {
        //   // Check the response code
        //   if (result.status === 200) {
        //     // Return the response data
        //     let final_data = JSON.parse(result);
        //     return final_data;
        //   } else {
        //     // Return an error
        //     return "Error";
        //   }
        // })
        // .catch((err) => {
        //   console.log(err.message);
        // });
}