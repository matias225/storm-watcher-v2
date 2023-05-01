importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/9.2.0/firebase-app-compat.js');
// importScripts('/__/firebase/9.2.0/firebase-messaging-compat.js');
// importScripts('/__/firebase/init.js');

firebase.initializeApp({
    apiKey: "AIzaSyC4ippkkPWHIrZZmcrJAF7yaXZ5NLn2Nm0",
    authDomain: "stormapp-2ff78.firebaseapp.com",
    projectId: "stormapp-2ff78",
    storageBucket: "stormapp-2ff78.appspot.com",
    messagingSenderId: "828220165537",
    appId: "1:828220165537:web:84d68191d38e3edce50fe0",
});

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('push', function(event) {
  console.log('Service Worker received push notification in foreground', event);
  // Mostrar una notificación push personalizada en primer plano
  const data = event.data.json();
  const { title, body } = data.notification;
  const options = {
    body: body,
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
    .then((result) => {
      console.log('Notification shown in foreground', result);
    }).catch((error) => {
      console.log('Error showing notification in foreground:', error);
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked in foreground', event);
  event.notification.close();
  // Agregar aquí cualquier acción que se deba realizar al hacer clic en la notificación
  event.waitUntil(clients.openWindow('https://stormapp-2ff78.web.app/'));
});


// // self.addEventListener('push', (event) => {
// //   const data = event.data.json();
// //   const title = data.notification.title;
// //   const options = {
// //     body: data.notification.body,
// //     icon: data.notification.icon
// //   };

// //   event.waitUntil(self.registration.showNotification(title, options));
// // });

// // self.addEventListener('notificationclick', function(event) {
// //   console.log('Notificación clickeada:', event.notification);
// //   event.notification.close();
// //   // Abre la URL asociada con la notificación
// //   event.waitUntil(clients.openWindow('https://localhost:3000/alerts'));
// // });   


