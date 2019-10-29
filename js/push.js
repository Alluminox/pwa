// Push notifications com Firebase
const messaging = firebase.messaging();

const verifyCurrentToken = (token) => {
    if ( token ) return token;
    else Promise.reject('No token avaidable!');
}

// 1-A Peço permição
messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(verifyCurrentToken)
    .then(console.log);


messaging.getToken()
    .then(verifyCurrentToken)
    .then(console.log)
    .catch(err => console.warning('ERROR!', err));