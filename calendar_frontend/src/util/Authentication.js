

function loginRequestOptions(username, password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }
    return requestOptions;
}

class Authentication {
    // Very helpful:
    // https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
    fromLocalStorage = () => {
        const item = localStorage.getItem('currentUser');
        if (item === null) {
            console.log('No cached login creds.');
            return item;
        }
        const parsed = JSON.parse(item);
        console.warn(parsed);
        return parsed;
    }



    login = (username, password) => {
        const requestOptions = loginRequestOptions(username, password);
        fetch("http://localhost:3000/login", requestOptions)
            .then(response => {
                console.log(JSON.stringify(response))
                debugger;
            })
    }
}

export default Authentication;