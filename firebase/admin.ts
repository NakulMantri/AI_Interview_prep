import {initializeApp,getApps, cert} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth'
import {getFirestore} from 'firebase-admin/firestore'

const initFirebaseAdmin =()=>{
    const apps = getApps()

    if(!apps.length){
        initializeApp({
             credential:cert({
                projectId:process.env.FIREBASE_PROJECT_ID,
                clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
                privateKey:process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,"\n") //g is for global, this is used to remove extra charcaters available in private key
                //much more secure way to manipulate the database and other operations as compared to other methods

                //Cloud Firestore is a NOSQL database for server development from firebase and google cloud.
             })

        })
    }

    return{
        auth:getAuth(),
        db:getFirestore()

    }
}


export const {auth,db} = initFirebaseAdmin();