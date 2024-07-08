import {ApplicationConfig} from '@angular/core';
// import { provideZoneChangeDetection } from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
    // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
    providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"g-shop-89c63","appId":"1:301226694100:web:79c0194603ab573dd67241","storageBucket":"g-shop-89c63.appspot.com","locationId":"us-central","apiKey":"AIzaSyBxwbunXCibucF2RA9AbMzPpU0RAU3XXSk","authDomain":"g-shop-89c63.firebaseapp.com","messagingSenderId":"301226694100","measurementId":"G-9T7MK04617"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"g-shop-89c63","appId":"1:301226694100:web:79c0194603ab573dd67241","storageBucket":"g-shop-89c63.appspot.com","locationId":"us-central","apiKey":"AIzaSyBxwbunXCibucF2RA9AbMzPpU0RAU3XXSk","authDomain":"g-shop-89c63.firebaseapp.com","messagingSenderId":"301226694100","measurementId":"G-9T7MK04617"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())]
};
