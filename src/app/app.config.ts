import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

/*
import { provideZoneChangeDetection } from '@angular/core';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {environment} from "../environments/environment";
*/

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]

    // providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
    /*
        providers: [provideRouter(routes),
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
            provideAuth(() => getAuth()),
            provideFirestore(() => getFirestore()),
            provideMessaging(() => getMessaging()),
            provideStorage(() => getStorage())
        ]
    */
};
