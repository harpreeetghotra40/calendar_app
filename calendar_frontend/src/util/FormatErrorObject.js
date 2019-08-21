function formatErrors(errorObject) {
    console.log(errorObject);

    // const eachError = errorObject.errors.join(', ');
    // const errorsInErrorObject = errorObject.errors;
    const error = errorObject.errors;
    // const messages = errorObject.message.join(', ');
    return `primary error: ${error},\n\tdetails: "${errorObject.message}"`
}

function primaryError(errorObject) {
    // console.log(formatErrors);
    const errorsInErrorObject = errorObject.errors;
    if (errorsInErrorObject.constructor == Object) {
        return Object.keys(errorsInErrorObject).map(key => {return `'${key}: ${errorsInErrorObject[key]}'`}).join(' ')
    }
    const error = errorsInErrorObject.errors;
    return error;
}

export default formatErrors;
export {primaryError};
