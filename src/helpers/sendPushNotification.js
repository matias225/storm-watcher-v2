import { messaging } from "../firebase/firebaseConfig";
import { getToken } from "firebase/messaging";

const vapidKey = "BCyMqPTtAhyjNyGgSpt9UukjKrjRPnNCvBw9VcCfP_oFdyDEXRj9a-kADm5AF6sPbBXsB1TIBN_rQOvlU4s3rls";
// const alertsRef = db.collection('alerts');


// console.log(vapidKey);
export const sendPushNotification = (title, body) => {
  // Obtengo el token de cliente
  const tokenPromise = getToken(messaging, { vapidKey: vapidKey });
  console.log(title, body);
  tokenPromise.then((currentToken) => {
    if (currentToken) {
      console.log('FCM registration token: ', currentToken);
      
      // Armado de los datos de notificacion
      const notificationData = {
        title: title,
        body: body,
        token: currentToken,
      }

      // Configuración de la solicitud POST
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      };

      fetch('http://localhost:3050/send-notification',requestOptions)
      .then(response => {
        console.log('Notificación enviada correctamente');
      })
      .catch(error => {
        console.error('Error al enviar la notificación:', error);
      });
    }
  });
}
//         // Escucha los cambios en la colección "alerts".

//       alertsRef.onSnapshot((snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === 'added') {
//             const alert = change.doc.data();
//             console.log('Alert added:', alert);

//             // Envía una notificación con los datos de la alerta.
//             Notification('Nueva alerta', {
//               body: alert.message
//             });
//           }
//         });
//       });
//   } else {
//     console.log('No registration token available.');
//   }
// }).catch((error) => {
//   console.error('An error occurred while retrieving token.', error);
// });


// // Escucha las notificaciones entrantes.
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
// });























// alertsRef = db.collection('alerts');

// alertsRef.onSnapshot((querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//     if (change.type === 'added') {
//       const alert = change.doc.data();
//       console.log('Alert added:', alert);
//       sendPushNotification().then((result) => {
//         console.log('Notification sent:', result);
//       }).catch((err) => {
//         console.error('Error sending notification', err);
//       });
//     }
//   });
// })
