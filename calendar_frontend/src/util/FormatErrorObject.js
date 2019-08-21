function formatErrors(errorObject) {
    console.log(errorObject);

    // const eachError = errorObject.errors.join(', ');
    const errorsInErrorObject = errorObject.errors;
    const error = errorsInErrorObject.errors;
    const messages = errorsInErrorObject.message.join(', ');
    return `primary error: ${error},\n\tdetails: "${messages}"`
}

function primaryError(errorObject) {
    console.log(formatErrors);
    const errorsInErrorObject = errorObject.errors;
    const error = errorsInErrorObject.errors;
    return error;
}

export default formatErrors;
export {primaryError};
