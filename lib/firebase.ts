import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  FieldValue,
  DocumentSnapshot,
} from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  uploadString,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDZdqXXo2IySKpCA-000eRFcgidq2qr254',
  authDomain: 'rdr-radio-switch.firebaseapp.com',
  databaseURL:
    'https://rdr-radio-switch-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rdr-radio-switch',
  storageBucket: 'rdr-radio-switch.appspot.com',
  messagingSenderId: '1048734165020',
  appId: '1:1048734165020:web:4732267c8a8a514f2797d9',
  measurementId: 'G-H1FHLFY9N0',
}

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

// Init firbase app
const app = initializeApp(firebaseConfig)

// Init services
const db = getFirestore(app)

// Collection ref
// const colRef = collection(db, 'books')

// Queries
// const q = query(colRef, orderBy('createdAt'))

// Add doc
// const addDocToCollection = () => {
//   addDoc(colRef, {
//     title: 'The Lord of the Rings',
//     author: 'J.R.R. Tolkien',
//     year: 1954,
//     createdAd: serverTimestamp(),
//   }).then((docRef) => {
//     console.log('Document written with ID: ', docRef.id)
//   })
// }

// const deleteDocument = (id) => {
//   deleteDoc(doc(db, 'books', id)).then(() => {
//     console.log('Document successfully deleted!')
//   })
// }

// addDocToCollection()
// deleteDocument('q9qeuD4XJFYHKhhJwIOy')

// Get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data(), 123)
//       books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log('Books', books)
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// Get realtime collection data
// onSnapshot(colRef, (snapshot) => {
//   let books = []
//   snapshot.docs.forEach((doc) => {
//     books.push({ ...doc.data(), id: doc.id })
//   })
//   console.log('Books', books)
// })

// const docRef = doc(db, 'books', '0otv080KpGEDXaQBpffq')
// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id)
// })

// onSnapshot realtime listener
// onSnapshot(docRef, (snapshot) => {
//   console.log(snapshot.data(), snapshot.id)
// })

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const signInPopup = () => signInWithPopup(auth, provider)
const signOutGoogle = () => signOut(auth)

const getCollection = async (source: string) => {
  const querySnapshot = await getDocs(collection(db, source))
  return querySnapshot.docs.map((doc) => doc.data())
}

const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as any
  }
}

const addDocument = async (collectionName: string, data: any) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

const postToJSON = (doc: { data: () => any }) => {
  const data = doc.data()
  return {
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }
}

const serverTime = serverTimestamp()
const storage = getStorage(app)

export {
  auth,
  db,
  getDocument,
  addDocument,
  provider,
  collection,
  getCollection,
  doc,
  onSnapshot,
  signInPopup,
  signOutGoogle,
  getDoc,
  serverTime,
  storage,
  ref,
  getDownloadURL,
  uploadString,
  uploadBytesResumable,
}
// q,
