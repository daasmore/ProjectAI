import { create } from "zustand";

export interface Guest {
  id: number;
  nama: string;
  jumlahTamu: number;
  konfirmasi: "hadir" | "tidak_hadir" | "pending";
  pesan: string;
  tanggal: string;
}

export interface WeddingEvent {
  slug: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  weddingDate: string;
  akadTime: string;
  akadLocation: string;
  akadAddress: string;
  resepsiTime: string;
  resepsiLocation: string;
  resepsiAddress: string;
  story: string;
}

const dummyGuests: Guest[] = [
  { id: 1, nama: "Ahmad Fauzi", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat ya semoga bahagia selalu!", tanggal: "2026-05-20" },
  { id: 2, nama: "Siti Nurhaliza", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Barakallahu lakuma, semoga menjadi keluarga sakinah mawaddah warahmah.", tanggal: "2026-05-20" },
  { id: 3, nama: "Budi Santoso", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru!", tanggal: "2026-05-21" },
  { id: 4, nama: "Dewi Lestari", jumlahTamu: 2, konfirmasi: "tidak_hadir", pesan: "Maaf ya tidak bisa hadir, semoga lancar acaranya.", tanggal: "2026-05-21" },
  { id: 5, nama: "Rizky Pratama", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Alhamdulillah, selamat ya!", tanggal: "2026-05-22" },
  { id: 6, nama: "Putri Wulandari", jumlahTamu: 2, konfirmasi: "pending", pesan: "", tanggal: "2026-05-22" },
  { id: 7, nama: "Hendra Gunawan", jumlahTamu: 4, konfirmasi: "hadir", pesan: "Semoga menjadi keluarga yang bahagia!", tanggal: "2026-05-22" },
  { id: 8, nama: "Rina Marlina", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat ya, semoga langgeng sampai maut memisahkan.", tanggal: "2026-05-23" },
  { id: 9, nama: "Agus Setiawan", jumlahTamu: 2, konfirmasi: "tidak_hadir", pesan: "Mohon maaf tidak bisa hadir, ada urusan mendadak.", tanggal: "2026-05-23" },
  { id: 10, nama: "Nur Aini", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair.", tanggal: "2026-05-23" },
  { id: 11, nama: "Dimas Anggara", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru, semoga bahagia selalu!", tanggal: "2026-05-24" },
  { id: 12, nama: "Lestari Rahayu", jumlahTamu: 2, konfirmasi: "pending", pesan: "", tanggal: "2026-05-24" },
  { id: 13, nama: "Fajar Nugroho", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Semoga menjadi keluarga yang sakinah.", tanggal: "2026-05-24" },
  { id: 14, nama: "Maya Sari", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat ya! Semoga pernikahan yang penuh berkah.", tanggal: "2026-05-25" },
  { id: 15, nama: "Yoga Aditya", jumlahTamu: 1, konfirmasi: "tidak_hadir", pesan: "Maaf tidak bisa hadir, semoga sukses ya!", tanggal: "2026-05-25" },
  { id: 16, nama: "Indah Permata", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Alhamdulillah, selamat ya semoga bahagia selalu!", tanggal: "2026-05-25" },
  { id: 17, nama: "Rudi Hartono", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru!", tanggal: "2026-05-26" },
  { id: 18, nama: "Wati Susilawati", jumlahTamu: 1, konfirmasi: "pending", pesan: "", tanggal: "2026-05-26" },
  { id: 19, nama: "Eko Prasetyo", jumlahTamu: 4, konfirmasi: "hadir", pesan: "Semoga menjadi keluarga yang bahagia dan diberkahi.", tanggal: "2026-05-26" },
  { id: 20, nama: "Sari Dewi", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Barakallahu lakuma, selamat ya!", tanggal: "2026-05-27" },
  { id: 21, nama: "Bayu Saputra", jumlahTamu: 1, konfirmasi: "tidak_hadir", pesan: "Mohon maaf tidak bisa hadir.", tanggal: "2026-05-27" },
  { id: 22, nama: "Citra Kirana", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat ya, semoga langgeng!", tanggal: "2026-05-27" },
  { id: 23, nama: "Dian Sastro", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Semoga pernikahan yang indah dan penuh berkah.", tanggal: "2026-05-28" },
  { id: 24, nama: "Fachrul Rozi", jumlahTamu: 3, konfirmasi: "pending", pesan: "", tanggal: "2026-05-28" },
  { id: 25, nama: "Gita Gutawa", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru, semoga bahagia!", tanggal: "2026-05-28" },
  { id: 26, nama: "Ilham Akbar", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Barakallahu lakuma wa baraka 'alaikuma.", tanggal: "2026-05-29" },
  { id: 27, nama: "Jessica Mila", jumlahTamu: 2, konfirmasi: "tidak_hadir", pesan: "Maaf ya tidak bisa hadir, semoga lancar!", tanggal: "2026-05-29" },
  { id: 28, nama: "Kevin Julio", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat ya semoga menjadi keluarga bahagia!", tanggal: "2026-05-29" },
  { id: 29, nama: "Luna Maya", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Semoga pernikahan yang penuh kebahagiaan!", tanggal: "2026-05-30" },
  { id: 30, nama: "Mika Melatika", jumlahTamu: 2, konfirmasi: "pending", pesan: "", tanggal: "2026-05-30" },
  { id: 31, nama: "Nadia Saphira", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat ya, semoga langgeng sampai akhir hayat!", tanggal: "2026-05-30" },
  { id: 32, nama: "Omar Daniel", jumlahTamu: 4, konfirmasi: "hadir", pesan: "Alhamdulillah, selamat menempuh hidup baru!", tanggal: "2026-05-31" },
  { id: 33, nama: "Putri Ayu", jumlahTamu: 2, konfirmasi: "tidak_hadir", pesan: "Mohon maaf tidak bisa hadir ya.", tanggal: "2026-05-31" },
  { id: 34, nama: "Reza Rahadian", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Semoga menjadi keluarga sakinah mawaddah warahmah.", tanggal: "2026-05-31" },
  { id: 35, nama: "Shandy Aulia", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat ya, semoga bahagia selalu!", tanggal: "2026-06-01" },
  { id: 36, nama: "Titi Sjuman", jumlahTamu: 3, konfirmasi: "pending", pesan: "", tanggal: "2026-06-01" },
  { id: 37, nama: "Umar Lubis", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Barakallahu lakuma, selamat ya!", tanggal: "2026-06-01" },
  { id: 38, nama: "Vanesha Prescilla", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Semoga pernikahan yang indah dan bahagia!", tanggal: "2026-06-02" },
  { id: 39, nama: "Winky Wiryawan", jumlahTamu: 1, konfirmasi: "tidak_hadir", pesan: "Maaf tidak bisa hadir, semoga sukses!", tanggal: "2026-06-02" },
  { id: 40, nama: "Yuni Shara", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru!", tanggal: "2026-06-02" },
  { id: 41, nama: "Zaskia Sungkar", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Semoga menjadi keluarga yang diberkahi Allah.", tanggal: "2026-06-03" },
  { id: 42, nama: "Ariel Tatum", jumlahTamu: 1, konfirmasi: "pending", pesan: "", tanggal: "2026-06-03" },
  { id: 43, nama: "Bunga Citra Lestari", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Selamat ya, semoga bahagia selalu!", tanggal: "2026-06-03" },
  { id: 44, nama: "Chelsea Islan", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair.", tanggal: "2026-06-04" },
  { id: 45, nama: "Dion Wiyoko", jumlahTamu: 4, konfirmasi: "tidak_hadir", pesan: "Mohon maaf tidak bisa hadir.", tanggal: "2026-06-04" },
  { id: 46, nama: "Eva Celia", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Semoga pernikahan yang penuh berkah dan kebahagiaan!", tanggal: "2026-06-04" },
  { id: 47, nama: "Fiersa Besari", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat menempuh hidup baru, semoga langgeng!", tanggal: "2026-06-05" },
  { id: 48, nama: "Gisella Anastasia", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Alhamdulillah, selamat ya semoga bahagia!", tanggal: "2026-06-05" },
  { id: 49, nama: "Howard Dietz", jumlahTamu: 2, konfirmasi: "pending", pesan: "", tanggal: "2026-06-05" },
  { id: 50, nama: "Iqbaal Ramadhan", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat ya, semoga menjadi keluarga yang sakinah!", tanggal: "2026-06-06" },
  { id: 51, nama: "Jefri Nichol", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Semoga bahagia selalu, amin!", tanggal: "2026-06-06" },
  { id: 52, nama: "Krisdayanti", jumlahTamu: 1, konfirmasi: "tidak_hadir", pesan: "Maaf ya tidak bisa hadir.", tanggal: "2026-06-06" },
  { id: 53, nama: "Lukman Sardi", jumlahTamu: 3, konfirmasi: "hadir", pesan: "Barakallahu lakuma, selamat menempuh hidup baru!", tanggal: "2026-06-07" },
  { id: 54, nama: "Marissa Anita", jumlahTamu: 2, konfirmasi: "hadir", pesan: "Semoga pernikahan yang indah dan penuh kebahagiaan!", tanggal: "2026-06-07" },
  { id: 55, nama: "Nirina Zubir", jumlahTamu: 1, konfirmasi: "hadir", pesan: "Selamat ya semoga langgeng sampai maut memisahkan!", tanggal: "2026-06-07" },
];

interface WeddingState {
  guests: Guest[];
  wedding: WeddingEvent;
  addGuest: (guest: Omit<Guest, "id" | "tanggal">) => void;
  getStats: () => { hadir: number; tidakHadir: number; pending: number; total: number; totalTamu: number };
}

export const useWeddingStore = create<WeddingState>((set, get) => ({
  guests: dummyGuests,
  wedding: {
    slug: "ahmad-siti-2026",
    brideName: "Siti Nurhaliza, S.Pd",
    groomName: "Ahmad Fauzi, S.Kom",
    brideParents: "Bapak H. Mulyadi & Ibu Hj. Aminah",
    groomParents: "Bapak H. Sudrajat & Ibu Hj. Komalasari",
    weddingDate: "2026-07-15T08:00:00",
    akadTime: "08:00 - 10:00 WIB",
    akadLocation: "Masjid Al-Ikhlas",
    akadAddress: "Jl. Merdeka No. 45, Bandung, Jawa Barat",
    resepsiTime: "11:00 - 14:00 WIB",
    resepsiLocation: "Gedung Sate Ballroom",
    resepsiAddress: "Jl. Diponegoro No. 22, Bandung, Jawa Barat",
    story: "Pertama kali kami bertemu di sebuah perpustakaan kampus pada tahun 2018. Saat itu, Siti sedang mencari referensi skripsi dan Ahmad yang menjadi asisten perpustakaan membantunya. Dari pertemuan sederhana itu, kami mulai saling mengenal dan menemukan kenyamanan satu sama lain. Setelah 5 tahun menjalin hubungan dengan berbagai suka duka, akhirnya kami memutuskan untuk melanjutkan ke jenjang yang lebih serius. Doa restu Bapak/Ibu sangat berarti bagi kami.",
  },
  addGuest: (guest) => {
    const newGuest: Guest = {
      ...guest,
      id: get().guests.length + 1,
      tanggal: new Date().toISOString().split("T")[0],
    };
    set((state) => ({ guests: [newGuest, ...state.guests] }));
  },
  getStats: () => {
    const guests = get().guests;
    const hadir = guests.filter((g) => g.konfirmasi === "hadir").length;
    const tidakHadir = guests.filter((g) => g.konfirmasi === "tidak_hadir").length;
    const pending = guests.filter((g) => g.konfirmasi === "pending").length;
    const total = guests.length;
    const totalTamu = guests.reduce((acc, g) => acc + g.jumlahTamu, 0);
    return { hadir, tidakHadir, pending, total, totalTamu };
  },
}));
