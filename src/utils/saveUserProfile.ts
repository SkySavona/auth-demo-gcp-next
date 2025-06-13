// utils/saveUserProfile.ts
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export async function saveUserProfile() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    displayName: user.email,        // or pull from a profile input
    email: user.email,
    createdAt: new Date().toISOString(),
  });
}
