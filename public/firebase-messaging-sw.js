importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC4ippkkPWHIrZZmcrJAF7yaXZ5NLn2Nm0",
  authDomain: "stormapp-2ff78.firebaseapp.com",
  projectId: "stormapp-2ff78",
  storageBucket: "stormapp-2ff78.appspot.com",
  messagingSenderId: "828220165537",
  appId: "1:828220165537:web:84d68191d38e3edce50fe0",
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.notification.title;
  const options = {
    body: data.notification.body,
    icon: data.notification.icon
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

