import firebase from 'firebase';
import { Injectable, isDevMode } from '@angular/core';
import { FirebaseConfig } from './firebase-config';

export abstract class AbstractFirebase
{
    firebaseConfig: any = {};
    debug: boolean = false;
    offlineMode: boolean = false;
    db: any;

    constructor()
    {
        if (isDevMode()) {
            console.log('Dev Mode');
            this.firebaseConfig = FirebaseConfig.devDB
        } else {
            console.log('Prod Mode');
            this.firebaseConfig = FirebaseConfig.prodDB
        }
        // firebase.analytics();
      
        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);

        this.setDebugMode();
        this.setModeApp();
    }

    setDebugMode() {
    // if(this.debug) firebase.firestore.setLogLevel('debug');

    }

    setModeApp() {
    // if(this.offlineMode) firebase.firestore().enablePersistence();
    }

    getFirebaseApp()
    {
        return this.db; 
    }
    handleConnexionState(callBack: ({ connected: boolean }) => void) {
        // firebase.database().ref('.info/connected').on('value', (snap) => {
        //   if (snap.val() === true) { callBack({ connected: true }); }
        //   else { callBack({ connected: false }); }
        // })
      }
}