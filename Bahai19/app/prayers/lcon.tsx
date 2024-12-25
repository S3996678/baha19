const renderIcon = (category: string) => {
  switch (category) {
    case "Aid and Assistance":
      return "lifebuoy";
    case "America":
      return "flag";
    case "Children":
      return "human-child";
    case "Infants":
      return "baby-face";
    case "The Departed":
      return "candle";
    case "Detachment":
      return "meditation";
    case "Evening":
      return "weather-sunset";
    case "Midnight":
      return "weather-night";
    case "Families":
      return "human-male-female-child";
    case "Firmness in the Covenant":
      return "script-text-outline";
    case "Forgiveness":
      return "hands-pray";
    case "The Fund":
      return "piggy-bank";
    case "Gatherings":
      return "account-group";
    case "Healing":
      return "medical-bag";
    case "Humanity":
      return "human";
    case "Marriage":
      return "ring";
    case "Morning":
      return "white-balance-sunny";
    case "Nearness to God":
      return "map-marker-star";
    case "Praise and Gratitude":
      return "star";
    case "Protection":
      return "security";
    case "Service":
      return "hand-heart";
    case "Spiritual Growth":
      return "sprout";
    case "Steadfastness":
      return "anchor";
    case "Teaching":
      return "gift";
    case "Tests and Difficulties":
      return "weight";
    case "Triumph of the Cause":
      return "trophy";
    case "Unity":
      return "handshake";
    case "Women":
      return "human-female";
    case "Youth":
      return "rocket-launch";
    case "The Fast":
      return "pillar";
    case "Ḥuqúqu’lláh":
      return "cash";
    case "Intercalary Days":
      return "emoticon-excited";
    case "Martyrs and Their Families":
      return "oil";
    case "Naw-Rúz":
      return "calendar-refresh";
    case "Spiritual Assembly":
      return "numeric-9";
    case "Tablet of Aḥmad":
      return "book-open";
    case "Fire Tablet":
      return "fire";
    case "Tablet of the Holy Mariner":
      return "star";
    case "Tablets of Visitation":
      return "home-outline";

    // Add other icons for each category as needed
    default:
      return "bookmark"; // Use 'bookmark' or another valid Ionicons name
  }
};

export default renderIcon;
