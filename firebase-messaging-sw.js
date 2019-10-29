importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '<ID_HERE>'
});


const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
    console.log(payload);
    return self.ServiceWorkerRegistration.showNotification({}, {});
});