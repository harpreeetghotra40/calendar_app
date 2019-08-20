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

function signUpRequestOptions(name, email, password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name,
                email,
                password
            }
        })
    }
    return requestOptions;
}

class Authentication {
    // Very helpful:
    // https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
    fromLocalStorage = () => {
        const item = localStorage.getItem('currentUser');
        if ((item === null) || (item === undefined) ) {
            console.log('No cached login creds.');
            return null;
        }
        console.log(item);
        const parsed = JSON.parse(item);
        console.warn(parsed);
        return parsed;
    }

    clearLocalStorage = () => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear
        localStorage.clear();
    }


    login = (username, password) => {
        const requestOptions = loginRequestOptions(username, password);
        fetch("http://localhost:3000/login", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.errors === undefined) {
                    console.assert(response.jwt !== undefined)
                    localStorage.setItem('currentUser', JSON.stringify(response.jwt))
                }
                return response;
            })
}

    signup = (name, username, password) => {
        const requestOptions = signUpRequestOptions(name, username, password);
        return fetch("http://localhost:3000/users", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.errors === undefined) {
                    localStorage.setItem('currentUser', JSON.stringify(response.jwt))
                }
                return response;
            })
    }
}

export default Authentication;