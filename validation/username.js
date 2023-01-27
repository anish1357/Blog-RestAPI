
//!error message if regex fails
const errMessage =
  "userName should only contains english alphabets or numbers!";

  /**
  * Function to test the following regex  
  * The regular expression pattern checks for a string that starts with an alphabet and can contain alphabets, numbers, and underscores. 
  * The length of the string should be between 5 and 30 characters.
  * @param username username for the user 
  * @return true or false
  */
const test = (name) => {
  const regex = /^[A-Za-z][A-Za-z0-9_]{4,29}$/;
  if (typeof name !== "string" || !regex.test(name)) {
    return false;
  }
  return true;
};

module.exports.errMessage = errMessage;
module.exports.validator = test;
