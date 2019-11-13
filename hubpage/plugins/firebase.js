import firebase from 'firebase'

const {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId} = process.env;

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
      projectId: projectId,
      storageBucket: storageBucket,
      messagingSenderId: messagingSenderId,
      appId: appId
    }
  )
}

export default firebase
