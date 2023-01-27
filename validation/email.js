//!error message if regex fails
const errMessage = "The email-id is invalid!";


  /**
  * Function to test the following regex  
  * This is a regular expression pattern that can be used to validate email addresses.
  * @param email email for the user 
  * @return true or false
  */
const check = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email !== "string" || !regex.test(email)) {
    return false;
  }
  return true;
};

module.exports.errMessage = errMessage;
module.exports.validator = check;
