import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { GalleryImage, Blessing } from '../types/wedding';
import { INITIAL_GALLERY_IMAGES, INITIAL_BLESSINGS } from '../data/weddingData';

const PHOTOS_COLLECTION = 'galleryPhotos';
const BLESSINGS_COLLECTION = 'blessings';

const LOCAL_PHOTOS_KEY = 'durgesh_wedding_photo_gallery_v1';
const LOCAL_BLESSINGS_KEY = 'durgesh_bhumika_wedding_blessings';

/**
 * Real-time subscription to Wedding Photo Gallery
 * Synchronizes across all users and devices in real-time.
 */
export function subscribeToGallery(
  onUpdate: (photos: GalleryImage[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const photosRef = collection(db, PHOTOS_COLLECTION);
    const q = query(photosRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: GalleryImage[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as GalleryImage);
          });
          // Sort newest first if id has timestamp or reverse
          list.sort((a, b) => (b.id > a.id ? 1 : -1));
          localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(list));
          onUpdate(list);
        } else {
          // If first time or empty, seed initial photos
          seedInitialPhotos();
        }
      },
      (error) => {
        console.warn('Firestore gallery snapshot notice, using local cache:', error);
        if (onError) onError(error);
        const cached = localStorage.getItem(LOCAL_PHOTOS_KEY);
        if (cached) {
          try {
            onUpdate(JSON.parse(cached));
          } catch {
            onUpdate(INITIAL_GALLERY_IMAGES);
          }
        } else {
          onUpdate(INITIAL_GALLERY_IMAGES);
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Subscription error, fallback to local:', err);
    onUpdate(INITIAL_GALLERY_IMAGES);
    return () => {};
  }
}

async function seedInitialPhotos() {
  try {
    for (const photo of INITIAL_GALLERY_IMAGES) {
      await setDoc(doc(db, PHOTOS_COLLECTION, photo.id), photo);
    }
  } catch (e) {
    console.warn('Initial photo seed note:', e);
  }
}

export async function saveGalleryPhoto(photo: GalleryImage): Promise<void> {
  // Update local cache immediately
  try {
    const cached = localStorage.getItem(LOCAL_PHOTOS_KEY);
    const current: GalleryImage[] = cached ? JSON.parse(cached) : [];
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify([photo, ...current]));
  } catch {
    // ignore
  }

  // Push to Cloud Firestore for all users
  const photoRef = doc(db, PHOTOS_COLLECTION, photo.id);
  await setDoc(photoRef, {
    ...photo,
    createdAt: new Date().toISOString(),
  });
}

export async function removeGalleryPhoto(photoId: string): Promise<void> {
  // Update local cache immediately
  try {
    const cached = localStorage.getItem(LOCAL_PHOTOS_KEY);
    if (cached) {
      const current: GalleryImage[] = JSON.parse(cached);
      localStorage.setItem(
        LOCAL_PHOTOS_KEY,
        JSON.stringify(current.filter((p) => p.id !== photoId))
      );
    }
  } catch {
    // ignore
  }

  // Delete from Cloud Firestore for all users
  const photoRef = doc(db, PHOTOS_COLLECTION, photoId);
  await deleteDoc(photoRef);
}

/**
 * Real-time subscription to Guest Blessings
 * Any blessing added by guests or deleted by the host updates everywhere live!
 */
export function subscribeToBlessings(
  onUpdate: (blessings: Blessing[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const blessingsRef = collection(db, BLESSINGS_COLLECTION);
    const q = query(blessingsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Blessing[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Blessing);
          });
          list.sort((a, b) => (b.id > a.id ? 1 : -1));
          localStorage.setItem(LOCAL_BLESSINGS_KEY, JSON.stringify(list));
          onUpdate(list);
        } else {
          seedInitialBlessings();
        }
      },
      (error) => {
        console.warn('Firestore blessings snapshot notice, using local cache:', error);
        if (onError) onError(error);
        const cached = localStorage.getItem(LOCAL_BLESSINGS_KEY);
        if (cached) {
          try {
            onUpdate(JSON.parse(cached));
          } catch {
            onUpdate(INITIAL_BLESSINGS);
          }
        } else {
          onUpdate(INITIAL_BLESSINGS);
        }
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Subscription error, fallback to local:', err);
    onUpdate(INITIAL_BLESSINGS);
    return () => {};
  }
}

async function seedInitialBlessings() {
  try {
    for (const b of INITIAL_BLESSINGS) {
      await setDoc(doc(db, BLESSINGS_COLLECTION, b.id), b);
    }
  } catch (e) {
    console.warn('Initial blessings seed note:', e);
  }
}

export async function saveBlessing(blessing: Blessing): Promise<void> {
  // Update local cache
  try {
    const cached = localStorage.getItem(LOCAL_BLESSINGS_KEY);
    const current: Blessing[] = cached ? JSON.parse(cached) : [];
    localStorage.setItem(LOCAL_BLESSINGS_KEY, JSON.stringify([blessing, ...current]));
  } catch {
    // ignore
  }

  // Push to Cloud Firestore for all users
  const blessingRef = doc(db, BLESSINGS_COLLECTION, blessing.id);
  await setDoc(blessingRef, {
    ...blessing,
    createdAt: new Date().toISOString(),
  });
}

export async function removeBlessing(blessingId: string): Promise<void> {
  // Update local cache
  try {
    const cached = localStorage.getItem(LOCAL_BLESSINGS_KEY);
    if (cached) {
      const current: Blessing[] = JSON.parse(cached);
      localStorage.setItem(
        LOCAL_BLESSINGS_KEY,
        JSON.stringify(current.filter((b) => b.id !== blessingId))
      );
    }
  } catch {
    // ignore
  }

  // Delete from Cloud Firestore for all users
  const blessingRef = doc(db, BLESSINGS_COLLECTION, blessingId);
  await deleteDoc(blessingRef);
}
