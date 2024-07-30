importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCtWar09Jcq8-9ZoobzoFw1ZWJIxZeGgC4",
  authDomain: "indigo-hack-b1061.firebaseapp.com",
  projectId: "indigo-hack-b1061",
  storageBucket: "indigo-hack-b1061.appspot.com",
  messagingSenderId: "396118267828",
  appId: "1:396118267828:web:682c1007cc5ad2fcfb44e1",
  measurementId: "G-LXWDZ9S4TB",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
