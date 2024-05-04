import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase-config';

export function uploadImage(file) {
  const storageRef = ref(storage, `images/${file.name}`);
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref); // Return the promise that resolves to the URL
    })
    .catch((error) => {
      console.error("Failed to upload image:", error);
      throw error; // Ensure any errors are propagated up
    });
}