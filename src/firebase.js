import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey:"AIzaSyAefCm0OilRri5TJFS1a82rvsk7DLufa1M",
  authDomain: "yt-clone-2125.firebaseapp.com",
  projectId: "yt-clone-2125",
  storageBucket: "yt-clone-2125.appspot.com",
  messagingSenderId: "1063858727411",
  appId: "1:1063858727411:web:c7fc51ed69e6a4c1f68a86",
  measurementId: "G-5QB7446VP5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
