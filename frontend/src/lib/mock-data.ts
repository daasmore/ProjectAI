export interface Couple {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  slug: string;
  date: string;
  akadTime: string;
  resepsiTime: string;
  venue: string;
  venueAddress: string;
  gmapsUrl: string;
  gmapsEmbed: string;
  quote: string;
  quoteSource: string;
  heroImage: string;
  coupleImage: string;
  bridePhoto: string;
  groomPhoto: string;
  gallery_1: string;
  gallery_2: string;
  gallery_3: string;
  gallery_4: string;
  gallery_5: string;
  gallery_6: string;
}

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  status: "confirmed" | "declined" | "pending";
  guestCount: number;
  message?: string;
  respondedAt?: string;
}

export const mockCouple: Couple = {
  brideName: "Sarah Putri",
  groomName: "Ahmad Rizky",
  brideParents: "Bapak H. Mulyadi & Ibu Hj. Siti Aminah",
  groomParents: "Bapak H. Wahyu & Ibu Hj. Kartini",
  slug: "sarah-ahmad",
  date: "2026-07-15T00:00:00+07:00",
  akadTime: "08:00 WIB",
  resepsiTime: "11:00 - 14:00 WIB",
  venue: "Gedung Serbaguna Melati Ballroom",
  venueAddress: "Jl. Bougenville No. 12, Kebayoran Baru, Jakarta Selatan 12160",
  gmapsUrl: "https://maps.google.com/?q=-6.261493,106.781784",
  gmapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.234!2d106.781784!3d-6.261493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzUnNDEuNCJTIDEwNsKwNDYnNTQuNCJF!5e0!3m2!1sen!2sid!4v1716000000000",
  quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum: 21",
  heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  coupleImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  bridePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  gallery_1: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80",
  gallery_2: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
  gallery_3: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  gallery_4: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
  gallery_5: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
  gallery_6: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
};

export const mockGuests: Guest[] = [
  { id: "1", name: "Bapak Budi Santoso", phone: "08123456789", status: "confirmed", guestCount: 2, message: "Semoga indah membangunnya 🙏", respondedAt: "2026-05-20T10:30:00+07:00" },
  { id: "2", name: "Ibu Ratna Dewi", phone: "08234567890", status: "confirmed", guestCount: 1, message: "Alhamdulillah, insya Allah hadir!", respondedAt: "2026-05-21T14:20:00+07:00" },
  { id: "3", name: "Pak Hendra & Keluarga", phone: "08345678901", status: "declined", guestCount: 0, message: "Mohon maaf berhalangan hadir, semoga lancar acaranya", respondedAt: "2026-05-22T09:15:00+07:00" },
  { id: "4", name: "Keluarga Besar Wijaya", phone: "08456789012", status: "confirmed", guestCount: 4, message: "Hadir pakai! 🎉", respondedAt: "2026-05-23T16:45:00+07:00" },
  { id: "5", name: "Ani & Rudi", phone: "08567890123", status: "pending", guestCount: 0 },
  { id: "6", name: "Siti Nurhaliza", phone: "08678901234", status: "confirmed", guestCount: 2, message: "Barakallahu lakuma wa baraka 'alaikuma", respondedAt: "2026-05-24T11:00:00+07:00" },
  { id: "7", name: "Dian Sastro", phone: "08789012345", status: "pending", guestCount: 0 },
  { id: "8", name: "Keluarga H. Mansyur", phone: "08890123456", status: "declined", guestCount: 0, message: "Mohon maaf ada acara keluarga bersamaan"},
  { id: "9", name: "Rina & Partner", phone: "08901234567", status: "confirmed", guestCount: 2, respondedAt: "2026-05-25T08:30:00+07:00" },
  { id: "10", name: "Tim IT Corp", phone: "08112233445", status: "pending", guestCount: 0 },
];

export const mockStats = {
  total: mockGuests.length,
  confirmed: mockGuests.filter((g) => g.status === "confirmed").length,
  declined: mockGuests.filter((g) => g.status === "declined").length,
  pending: mockGuests.filter((g) => g.status === "pending").length,
  totalAttending: mockGuests
    .filter((g) => g.status === "confirmed")
    .reduce((sum, g) => sum + g.guestCount, 0),
};
