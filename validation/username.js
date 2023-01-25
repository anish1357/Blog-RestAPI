const errMessage = "userName should only contains english alphabets or numbers!";

const test = (name) => {
    const regex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
    if (typeof name !== "string" || !regex.test(name)) {
        return false;
    }
    return true;
};

module.exports.errMessage = errMessage;
module.exports.validator = test;