import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { ILogUserEventData } from "./analytics.model";

let analytics: Analytics;

export const initializeFirebase = () => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAbYqCwzp-glGQme-58ZuQti0bt9equ9fU",
        authDomain: "dhaval-s.firebaseapp.com",
        databaseURL: "https://dhaval-s.firebaseio.com",
        projectId: "dhaval-s",
        storageBucket: "dhaval-s.appspot.com",
        messagingSenderId: "1051197003295",
        appId: "1:1051197003295:web:525267ff8cb35ec101a72a",
        measurementId: "G-SQ4H0WLCSV"
      };      

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics();
    getPerformance(app);
}

export const logUserEvent = (payload: ILogUserEventData) => {
    if(!analytics) return;
    logEvent(analytics, 'select_content', payload);
}

export const logError = (error: string) => {
    if(!analytics) return;
    logEvent(analytics, 'exception', {
        description: error,
        fatal: true
    })
}