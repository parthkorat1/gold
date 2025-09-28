import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Validate Firebase environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Check if all required environment variables are present
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.warn(`Missing Firebase environment variables: ${missingVars.join(', ')}`)
  console.warn('Firebase features will be disabled. Please set the required environment variables.')
}

// Only initialize Firebase if all required variables are present
let app: any = null
let db: any = null

if (missingVars.length === 0) {
  const firebaseConfig = {
    apiKey: requiredEnvVars.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: requiredEnvVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: requiredEnvVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: requiredEnvVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: requiredEnvVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: requiredEnvVars.NEXT_PUBLIC_FIREBASE_APP_ID
  }

  try {
    // Initialize Firebase
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    
    // Initialize Cloud Firestore
    db = getFirestore(app)
  } catch (error) {
    console.error('Failed to initialize Firebase:', error)
  }
}

export { db }
export default app