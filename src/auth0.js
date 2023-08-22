import auth0 from "auth0-js"
import { removeClass } from "./functions";
const axios = require('axios');

export const tokenRequestOptions = {
  url: 'https://dev-2iqc2hla88m6e0te.us.auth0.com/oauth/token',
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: "E2suCdEKu6oIJOfljaIDA4Zw1rvcV1lb",
    client_secret: 'tzwssfl7aNjZ6PT7X0q2KA_fvXa8F1sI6LdsnFqYoNP4ICAB6glTOLugE5PD42DZ',
    audience: 'https://dev-2iqc2hla88m6e0te.us.auth0.com/api/v2/'
  })
};

export const webAuth = new auth0.WebAuth({
  domain: 'dev-2iqc2hla88m6e0te.us.auth0.com',
  clientID: 'E2suCdEKu6oIJOfljaIDA4Zw1rvcV1lb'
});

export const getAuth0AccessToken = (setState) => {
  let token = ""
  axios.request(tokenRequestOptions).then((response) => {
    // console.log(response.data);
    token = response.data.access_token
    if (setState) { setState(response.data.access_token) }
    return response.data.access_token
  }).catch((error) => {
    // console.error(error);
  });

  return token

}

export const getAllUsers = async (token) => {
  // auth0 management api 
  const req = await fetch("https://dev-2iqc2hla88m6e0te.us.auth0.com/api/v2/users", {
    method: "GET",
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  }).catch((err) => {
    // console.log(err)
  })

  const users = await req.json();
  // console.log(users)
  return users;
}

export const createAccount = (email, password, username, setNotification, dispatch) => {
  webAuth.signup({
    connection: "Username-Password-Authentication",
    email: email,
    password: password,
    username: username,
  
  },

    (error) => {
      // console.log(error)

      if (error) {
        // console.log(error)
        error.code == "invalid_signup" && setNotification({ type: "sign up error", display: true, message: "account already exists" })
        setTimeout(() => {
          setNotification({ type: "reset", display: false, message: null })
          removeClass("#portal", "portal-blur")
        }, 1500)
        error.code !== "invalid_signup" && dispatch({ type: "checkAccountAvailablity", value: true })

        // console.log('Something went wrong: ' + error.message)
      }
      else {
        dispatch({ type: "checkAccountAvailablity", value: true })
        //  console.log("account availablity has been checked");

      }
      // display error modal if the error condition is true 
    })
}



  // take the user_id , email, name , set them as the author_id , email , username fields in the sanity document 

