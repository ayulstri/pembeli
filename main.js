import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data dari data base
export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      gmail: dok.data().gmail,
      noTlpn: dok.data().noTlpn,
    });
  });
  
  return hasil;
}
//####№############33333$$##$$$$$$$##$$$
export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahPembeli(nama, alamat, gmail, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      nama: nama,
      alamat: alamat,
      gmail: gmail,
      noTlpn: noTlpn
    });
    console.log('Berhasil menambah pembeli' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah pembeli' + e);
  }
   }
   
   export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}

export async function ubahPembeli(docId, nama, alamat, gmail, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    gmail: gmail,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}