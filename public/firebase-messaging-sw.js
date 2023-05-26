importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');
// // Import and configure the Firebase SDK
// // These scripts are made available when the app is served or deployed on Firebase Hosting
// // If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/9.19.1/firebase-app-compat.js');
// importScripts('/__/firebase/9.19.1/firebase-messaging-compat.js');
// importScripts('/__/firebase/init.js');

firebase.initializeApp({
  apiKey: "AIzaSyDWco6HXJ4pnhngz8UOcyrtiUdwwWjrEe8",
  authDomain: "stormwatcher-73cb7.firebaseapp.com",
  projectId: "stormwatcher-73cb7",
  storageBucket: "stormwatcher-73cb7.appspot.com",
  messagingSenderId: 189145899682,
  appId: "1:189145899682:web:48b16b1ed868d192006dfb"
});

const messaging = firebase.messaging();

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

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked in foreground', event.notification);
  event.notification.close();
  // Agregar aquí cualquier acción que se deba realizar al hacer clic en la notificación
  event.waitUntil(clients.openWindow('https://stormwatcher-73cb7.web.app/'));
});
