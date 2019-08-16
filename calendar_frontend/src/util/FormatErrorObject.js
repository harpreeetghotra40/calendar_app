function formatErrors(errorObject) {
    console.log(errorObject);

    const eachError = Object.keys(errorObject.errors).map(key => {
        return `${key}: "${errorObject.errors[key].join(', ')}"`
    });
    return `primary error: ${errorObject.message},\n\tdetails: "${eachError}"`
}

export default formatErrors;
