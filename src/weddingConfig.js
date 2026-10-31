// ============================================================
//  WEDDING CONFIGURATION FILE
//  Edit all wedding details here — changes apply site-wide.
// ============================================================

export const weddingConfig = {
  // ─── Couple ────────────────────────────────────────────────
  coupleInitials: "A & S",
  groom: {
    name: "Ahmad Kareem",
    occupation: "Software Engineer",
  },
  bride: {
    name: "Sara Fatima",
    occupation: "Medical Doctor",
  },

  // ─── Families ──────────────────────────────────────────────
  groomFamily: "Mr. & Mrs. Kareem Abdullah",
  brideFamily: "Mr. & Mrs. Fatima Hassan",

  // ─── Invitation Message ────────────────────────────────────
  invitationMessage:
    "With immense joy and gratitude to Almighty Allah, we invite you to join us as we begin a beautiful new chapter of our lives. Your presence and duas will make our special day even more memorable.",

  // ─── Nikkah Ceremony ───────────────────────────────────────
  nikkah: {
    date: "2027-03-15",           // YYYY-MM-DD
    day: "Sunday",
    time: "11:00 AM",
    timeISO: "2027-03-15T11:00:00", // Used for countdown (local time)
    venue: "Al-Noor Grand Mosque & Banquet Hall",
    address: "123 Crescent Boulevard, Al-Noor District, Hyderabad, 500001",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Hyderabad+Mosque+Banquet+Hall",
  },

  // ─── Reception ─────────────────────────────────────────────
  reception: {
    date: "2027-03-15",
    day: "Sunday",
    time: "7:00 PM",
    venue: "The Royal Garden Pavilion",
    address: "456 Heritage Lane, Banjara Hills, Hyderabad, 500034",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Royal+Garden+Pavilion+Banjara+Hills+Hyderabad",
  },

  // ─── Theme Colors (CSS custom properties) ──────────────────
  colors: {
    ivory: "#FDFAF3",
    champagne: "#F5E6C8",
    gold: "#C9A84C",
    goldLight: "#E4C97A",
    goldDark: "#8B6914",
    emerald: "#1E5B3A",
    emeraldLight: "#2D7A52",
    emeraldDark: "#0F3320",
    cream: "#F9F3E3",
    warmBeige: "#EDE0C4",
    textDark: "#2C1810",
    textMid: "#5C4033",
    textLight: "#8B6914",
  },
};

