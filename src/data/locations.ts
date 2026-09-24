import type { StateInfo } from "../types";

export const STATES: StateInfo[] = [
  {
    "name": "Karnataka",
    "districts": [
      {
        "name": "Bagalkote",
        "lat": 16.18,
        "lng": 75.7
      },
      {
        "name": "Ballari",
        "lat": 15.14,
        "lng": 76.92
      },
      {
        "name": "Belagavi",
        "lat": 15.85,
        "lng": 74.5
      },
      {
        "name": "Bengaluru Rural",
        "lat": 13.23,
        "lng": 77.57
      },
      {
        "name": "Bengaluru South",
        "lat": 13.0,
        "lng": 76.0
      },
      {
        "name": "Bengaluru Urban",
        "lat": 12.97,
        "lng": 77.59
      },
      {
        "name": "Bidar",
        "lat": 17.91,
        "lng": 77.52
      },
      {
        "name": "Chamarajanagar",
        "lat": 13.0,
        "lng": 76.0
      },
      {
        "name": "Chikkaballapur",
        "lat": 13.0,
        "lng": 76.0
      },
      {
        "name": "Chikkamagaluru",
        "lat": 13.32,
        "lng": 75.77
      },
      {
        "name": "Chitradurga",
        "lat": 14.22,
        "lng": 76.4
      },
      {
        "name": "Dakshina Kannada",
        "lat": 12.87,
        "lng": 75.2
      },
      {
        "name": "Davanagere",
        "lat": 14.46,
        "lng": 75.92
      },
      {
        "name": "Dharwad",
        "lat": 15.46,
        "lng": 75.01
      },
      {
        "name": "Gadag",
        "lat": 15.43,
        "lng": 75.63
      },
      {
        "name": "Hassan",
        "lat": 13.01,
        "lng": 76.1
      },
      {
        "name": "Haveri",
        "lat": 14.8,
        "lng": 75.4
      },
      {
        "name": "Kalaburagi",
        "lat": 17.33,
        "lng": 76.83
      },
      {
        "name": "Kodagu",
        "lat": 12.42,
        "lng": 75.74
      },
      {
        "name": "Kolar",
        "lat": 13.14,
        "lng": 78.13
      },
      {
        "name": "Koppal",
        "lat": 15.35,
        "lng": 76.15
      },
      {
        "name": "Mandya",
        "lat": 12.52,
        "lng": 76.9
      },
      {
        "name": "Mysuru",
        "lat": 12.3,
        "lng": 76.65
      },
      {
        "name": "Raichur",
        "lat": 16.2,
        "lng": 77.36
      },
      {
        "name": "Shivamogga",
        "lat": 13.93,
        "lng": 75.57
      },
      {
        "name": "Tumakuru",
        "lat": 13.34,
        "lng": 77.1
      },
      {
        "name": "Udupi",
        "lat": 13.34,
        "lng": 74.74
      },
      {
        "name": "Uttara Kannada",
        "lat": 14.8,
        "lng": 74.13
      },
      {
        "name": "Vijayanagara",
        "lat": 15.27,
        "lng": 76.39
      },
      {
        "name": "Vijayapura",
        "lat": 16.83,
        "lng": 75.71
      },
      {
        "name": "Yadgir",
        "lat": 16.77,
        "lng": 77.14
      }
    ]
  },
  {
    "name": "Kerala",
    "districts": [
      {
        "name": "Alappuzha",
        "lat": 9.49,
        "lng": 76.33
      },
      {
        "name": "Ernakulam",
        "lat": 9.98,
        "lng": 76.3
      },
      {
        "name": "Idukki",
        "lat": 9.85,
        "lng": 76.97
      },
      {
        "name": "Kannur",
        "lat": 11.87,
        "lng": 75.37
      },
      {
        "name": "Kasaragod",
        "lat": 12.51,
        "lng": 74.99
      },
      {
        "name": "Kollam",
        "lat": 8.89,
        "lng": 76.6
      },
      {
        "name": "Kottayam",
        "lat": 9.59,
        "lng": 76.52
      },
      {
        "name": "Kozhikode",
        "lat": 11.26,
        "lng": 75.78
      },
      {
        "name": "Malappuram",
        "lat": 11.07,
        "lng": 76.07
      },
      {
        "name": "Palakkad",
        "lat": 10.78,
        "lng": 76.65
      },
      {
        "name": "Pathanamthitta",
        "lat": 9.26,
        "lng": 76.78
      },
      {
        "name": "Thiruvananthapuram",
        "lat": 8.52,
        "lng": 76.94
      },
      {
        "name": "Thrissur",
        "lat": 10.53,
        "lng": 76.21
      },
      {
        "name": "Wayanad",
        "lat": 11.69,
        "lng": 76.13
      }
    ]
  }
];

export const DISTRICT_META: Record<string, {"zone": string; stations: number; area: string; majorCrops: string[]; lastSurvey: string}> = {
  "Bagalkote": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Ballari": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Belagavi": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Bengaluru Rural": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Bengaluru South": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Bengaluru Urban": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Bidar": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Chamarajanagar": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Chikkaballapur": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Chikkamagaluru": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Chitradurga": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Dakshina Kannada": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Davanagere": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Dharwad": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Gadag": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Hassan": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Haveri": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kalaburagi": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kodagu": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kolar": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Koppal": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Mandya": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Mysuru": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Raichur": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Shivamogga": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Tumakuru": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Udupi": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Uttara Kannada": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Vijayanagara": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Vijayapura": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Banana",
      "Brinjal",
      "Chilli",
      "Cotton"
    ],
    "lastSurvey": "1 day ago"
  },
  "Yadgir": {
    "zone": "Karnataka Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Brinjal",
      "Chilli",
      "Cotton",
      "Finger Millet (Ragi)"
    ],
    "lastSurvey": "1 day ago"
  },
  "Alappuzha": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Ernakulam": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Idukki": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kannur": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kasaragod": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kollam": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kottayam": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Kozhikode": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Malappuram": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Palakkad": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Pathanamthitta": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Thiruvananthapuram": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Thrissur": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  },
  "Wayanad": {
    "zone": "Kerala Agro-Zone",
    "stations": 12,
    "area": "4,500 km\u00b2",
    "majorCrops": [
      "Arecanut",
      "Banana",
      "Black Pepper",
      "Brinjal"
    ],
    "lastSurvey": "1 day ago"
  }
};

export interface AreaDef {
  name: string;
  lat: number;
  lng: number;
}

export const AREAS_BY_DISTRICT: Record<string, AreaDef[]> = {
  "Bagalkote": [
    {
      "name": "Badami",
      "lat": 16.1,
      "lng": 75.62
    },
    {
      "name": "Bagalkote",
      "lat": 16.18,
      "lng": 75.62
    },
    {
      "name": "Bilagi",
      "lat": 16.26,
      "lng": 75.62
    },
    {
      "name": "Guledgudda",
      "lat": 16.1,
      "lng": 75.7
    },
    {
      "name": "Hunagund",
      "lat": 16.18,
      "lng": 75.7
    },
    {
      "name": "Ilkal",
      "lat": 16.26,
      "lng": 75.7
    },
    {
      "name": "Jamkhandi",
      "lat": 16.1,
      "lng": 75.78
    },
    {
      "name": "Mudhol",
      "lat": 16.18,
      "lng": 75.78
    },
    {
      "name": "Rabkavi Banhatti",
      "lat": 16.26,
      "lng": 75.78
    }
  ],
  "Ballari": [
    {
      "name": "Ballari",
      "lat": 15.06,
      "lng": 76.84
    },
    {
      "name": "Kampli",
      "lat": 15.14,
      "lng": 76.84
    },
    {
      "name": "Kurugodu",
      "lat": 15.22,
      "lng": 76.84
    },
    {
      "name": "Sanduru",
      "lat": 15.06,
      "lng": 76.92
    },
    {
      "name": "Siraguppa",
      "lat": 15.14,
      "lng": 76.92
    }
  ],
  "Belagavi": [
    {
      "name": "Athani",
      "lat": 15.77,
      "lng": 74.42
    },
    {
      "name": "Bailhongal",
      "lat": 15.85,
      "lng": 74.42
    },
    {
      "name": "Belagavi",
      "lat": 15.93,
      "lng": 74.42
    },
    {
      "name": "Chikkodi",
      "lat": 15.77,
      "lng": 74.5
    },
    {
      "name": "Gokak",
      "lat": 15.85,
      "lng": 74.5
    },
    {
      "name": "Hukkeri",
      "lat": 15.93,
      "lng": 74.5
    },
    {
      "name": "Kagawad",
      "lat": 15.77,
      "lng": 74.58
    },
    {
      "name": "Khanapur",
      "lat": 15.85,
      "lng": 74.58
    },
    {
      "name": "Kittur",
      "lat": 15.93,
      "lng": 74.58
    },
    {
      "name": "Mudalgi",
      "lat": 15.77,
      "lng": 74.66
    },
    {
      "name": "Nippani",
      "lat": 15.85,
      "lng": 74.66
    },
    {
      "name": "Raibag",
      "lat": 15.93,
      "lng": 74.66
    },
    {
      "name": "Ramdurga",
      "lat": 15.77,
      "lng": 74.74
    },
    {
      "name": "Savadatti",
      "lat": 15.85,
      "lng": 74.74
    },
    {
      "name": "Yargatti",
      "lat": 15.93,
      "lng": 74.74
    }
  ],
  "Bengaluru Urban": [
    {
      "name": "Anekal",
      "lat": 12.89,
      "lng": 77.51
    },
    {
      "name": "Bengaluru",
      "lat": 12.97,
      "lng": 77.51
    },
    {
      "name": "Kengeri",
      "lat": 13.05,
      "lng": 77.51
    },
    {
      "name": "Krishnarajapura",
      "lat": 12.89,
      "lng": 77.59
    },
    {
      "name": "Yelahanka",
      "lat": 12.97,
      "lng": 77.59
    }
  ],
  "Bengaluru Rural": [
    {
      "name": "Devanahalli",
      "lat": 13.15,
      "lng": 77.49
    },
    {
      "name": "Doddaballapura",
      "lat": 13.23,
      "lng": 77.49
    },
    {
      "name": "Hosakote",
      "lat": 13.31,
      "lng": 77.49
    },
    {
      "name": "Nelamangala",
      "lat": 13.15,
      "lng": 77.57
    }
  ],
  "Bidar": [
    {
      "name": "Aurad",
      "lat": 17.83,
      "lng": 77.44
    },
    {
      "name": "Basavakalyan",
      "lat": 17.91,
      "lng": 77.44
    },
    {
      "name": "Bhalki",
      "lat": 17.99,
      "lng": 77.44
    },
    {
      "name": "Bidar",
      "lat": 17.83,
      "lng": 77.52
    },
    {
      "name": "Chitgoppa",
      "lat": 17.91,
      "lng": 77.52
    },
    {
      "name": "Hulsoor",
      "lat": 17.99,
      "lng": 77.52
    },
    {
      "name": "Humnabad",
      "lat": 17.83,
      "lng": 77.6
    },
    {
      "name": "Kamalnagar",
      "lat": 17.91,
      "lng": 77.6
    }
  ],
  "Chamarajanagar": [
    {
      "name": "Chamarajanagar",
      "lat": 12.92,
      "lng": 75.92
    },
    {
      "name": "Gundlupet",
      "lat": 13.0,
      "lng": 75.92
    },
    {
      "name": "Hanur",
      "lat": 13.08,
      "lng": 75.92
    },
    {
      "name": "Kollegal",
      "lat": 12.92,
      "lng": 76.0
    },
    {
      "name": "Yelandur",
      "lat": 13.0,
      "lng": 76.0
    }
  ],
  "Chikkaballapur": [
    {
      "name": "Bagepalli",
      "lat": 12.92,
      "lng": 75.92
    },
    {
      "name": "Chelur",
      "lat": 13.0,
      "lng": 75.92
    },
    {
      "name": "Chikkaballapur",
      "lat": 13.08,
      "lng": 75.92
    },
    {
      "name": "Chintamani",
      "lat": 12.92,
      "lng": 76.0
    },
    {
      "name": "Gauribidanur",
      "lat": 13.0,
      "lng": 76.0
    },
    {
      "name": "Gudibanda",
      "lat": 13.08,
      "lng": 76.0
    },
    {
      "name": "Manchenahalli",
      "lat": 12.92,
      "lng": 76.08
    },
    {
      "name": "Sidlaghatta",
      "lat": 13.0,
      "lng": 76.08
    }
  ],
  "Chikkamagaluru": [
    {
      "name": "Ajjampura",
      "lat": 13.24,
      "lng": 75.69
    },
    {
      "name": "Chikkamagaluru",
      "lat": 13.32,
      "lng": 75.69
    },
    {
      "name": "Kadur",
      "lat": 13.4,
      "lng": 75.69
    },
    {
      "name": "Kalasa",
      "lat": 13.24,
      "lng": 75.77
    },
    {
      "name": "Koppa",
      "lat": 13.32,
      "lng": 75.77
    },
    {
      "name": "Mudigere",
      "lat": 13.4,
      "lng": 75.77
    },
    {
      "name": "Narasimharajapura",
      "lat": 13.24,
      "lng": 75.85
    },
    {
      "name": "Sringeri",
      "lat": 13.32,
      "lng": 75.85
    },
    {
      "name": "Tarikere",
      "lat": 13.4,
      "lng": 75.85
    }
  ],
  "Chitradurga": [
    {
      "name": "Challakere",
      "lat": 14.14,
      "lng": 76.32
    },
    {
      "name": "Chitradurga",
      "lat": 14.22,
      "lng": 76.32
    },
    {
      "name": "Hiriyur",
      "lat": 14.3,
      "lng": 76.32
    },
    {
      "name": "Holalkere",
      "lat": 14.14,
      "lng": 76.4
    },
    {
      "name": "Hosadurga",
      "lat": 14.22,
      "lng": 76.4
    },
    {
      "name": "Molakalmuru",
      "lat": 14.3,
      "lng": 76.4
    }
  ],
  "Dakshina Kannada": [
    {
      "name": "Bantwal",
      "lat": 12.79,
      "lng": 75.12
    },
    {
      "name": "Belthangady",
      "lat": 12.87,
      "lng": 75.12
    },
    {
      "name": "Kadaba",
      "lat": 12.95,
      "lng": 75.12
    },
    {
      "name": "Mangaluru",
      "lat": 12.79,
      "lng": 75.2
    },
    {
      "name": "Moodbidri",
      "lat": 12.87,
      "lng": 75.2
    },
    {
      "name": "Mulki",
      "lat": 12.95,
      "lng": 75.2
    },
    {
      "name": "Puttur",
      "lat": 12.79,
      "lng": 75.28
    },
    {
      "name": "Sullia",
      "lat": 12.87,
      "lng": 75.28
    },
    {
      "name": "Ullal",
      "lat": 12.95,
      "lng": 75.28
    }
  ],
  "Davanagere": [
    {
      "name": "Channagiri",
      "lat": 14.38,
      "lng": 75.84
    },
    {
      "name": "Davanagere",
      "lat": 14.46,
      "lng": 75.84
    },
    {
      "name": "Harihar",
      "lat": 14.54,
      "lng": 75.84
    },
    {
      "name": "Honnali",
      "lat": 14.38,
      "lng": 75.92
    },
    {
      "name": "Jagalur",
      "lat": 14.46,
      "lng": 75.92
    },
    {
      "name": "Nyamathi",
      "lat": 14.54,
      "lng": 75.92
    }
  ],
  "Dharwad": [
    {
      "name": "Alnavar",
      "lat": 15.38,
      "lng": 74.93
    },
    {
      "name": "Annigeri",
      "lat": 15.46,
      "lng": 74.93
    },
    {
      "name": "Dharwad",
      "lat": 15.54,
      "lng": 74.93
    },
    {
      "name": "Hubballi Rural",
      "lat": 15.38,
      "lng": 75.01
    },
    {
      "name": "Hubballi Urban",
      "lat": 15.46,
      "lng": 75.01
    },
    {
      "name": "Kalghatgi",
      "lat": 15.54,
      "lng": 75.01
    },
    {
      "name": "Kundgol",
      "lat": 15.38,
      "lng": 75.09
    },
    {
      "name": "Navalgund",
      "lat": 15.46,
      "lng": 75.09
    }
  ],
  "Gadag": [
    {
      "name": "Gadag",
      "lat": 15.35,
      "lng": 75.55
    },
    {
      "name": "Gajendragad",
      "lat": 15.43,
      "lng": 75.55
    },
    {
      "name": "Lakshmeshwar",
      "lat": 15.51,
      "lng": 75.55
    },
    {
      "name": "Mundargi",
      "lat": 15.35,
      "lng": 75.63
    },
    {
      "name": "Nargund",
      "lat": 15.43,
      "lng": 75.63
    },
    {
      "name": "Ron",
      "lat": 15.51,
      "lng": 75.63
    },
    {
      "name": "Shirahatti",
      "lat": 15.35,
      "lng": 75.71
    }
  ],
  "Hassan": [
    {
      "name": "Alur",
      "lat": 12.93,
      "lng": 76.02
    },
    {
      "name": "Arakalgud",
      "lat": 13.01,
      "lng": 76.02
    },
    {
      "name": "Arsikere",
      "lat": 13.09,
      "lng": 76.02
    },
    {
      "name": "Belur",
      "lat": 12.93,
      "lng": 76.1
    },
    {
      "name": "Channarayapatna",
      "lat": 13.01,
      "lng": 76.1
    },
    {
      "name": "Hassan",
      "lat": 13.09,
      "lng": 76.1
    },
    {
      "name": "Holenarasipura",
      "lat": 12.93,
      "lng": 76.18
    },
    {
      "name": "Sakleshpur",
      "lat": 13.01,
      "lng": 76.18
    }
  ],
  "Haveri": [
    {
      "name": "Byadgi",
      "lat": 14.72,
      "lng": 75.32
    },
    {
      "name": "Hangal",
      "lat": 14.8,
      "lng": 75.32
    },
    {
      "name": "Haveri",
      "lat": 14.88,
      "lng": 75.32
    },
    {
      "name": "Hirekerur",
      "lat": 14.72,
      "lng": 75.4
    },
    {
      "name": "Ranebennur",
      "lat": 14.8,
      "lng": 75.4
    },
    {
      "name": "Rattihalli",
      "lat": 14.88,
      "lng": 75.4
    },
    {
      "name": "Savanur",
      "lat": 14.72,
      "lng": 75.48
    },
    {
      "name": "Shiggaon",
      "lat": 14.8,
      "lng": 75.48
    }
  ],
  "Kalaburagi": [
    {
      "name": "Afzalpur",
      "lat": 17.25,
      "lng": 76.75
    },
    {
      "name": "Aland",
      "lat": 17.33,
      "lng": 76.75
    },
    {
      "name": "Chincholi",
      "lat": 17.41,
      "lng": 76.75
    },
    {
      "name": "Chittapur",
      "lat": 17.25,
      "lng": 76.83
    },
    {
      "name": "Jevargi",
      "lat": 17.33,
      "lng": 76.83
    },
    {
      "name": "Kalaburagi",
      "lat": 17.41,
      "lng": 76.83
    },
    {
      "name": "Kalagi",
      "lat": 17.25,
      "lng": 76.91
    },
    {
      "name": "Kamalapur",
      "lat": 17.33,
      "lng": 76.91
    },
    {
      "name": "Sedam",
      "lat": 17.41,
      "lng": 76.91
    },
    {
      "name": "Shahabad",
      "lat": 17.25,
      "lng": 76.99
    },
    {
      "name": "Yedrami",
      "lat": 17.33,
      "lng": 76.99
    }
  ],
  "Kodagu": [
    {
      "name": "Kushalnagar",
      "lat": 12.34,
      "lng": 75.66
    },
    {
      "name": "Madikeri",
      "lat": 12.42,
      "lng": 75.66
    },
    {
      "name": "Ponnampet",
      "lat": 12.5,
      "lng": 75.66
    },
    {
      "name": "Somwarpet",
      "lat": 12.34,
      "lng": 75.74
    },
    {
      "name": "Virajpet",
      "lat": 12.42,
      "lng": 75.74
    }
  ],
  "Kolar": [
    {
      "name": "Bangarapet",
      "lat": 13.06,
      "lng": 78.05
    },
    {
      "name": "Kolar",
      "lat": 13.14,
      "lng": 78.05
    },
    {
      "name": "Kolar Gold Fields (Robertsonpet)",
      "lat": 13.22,
      "lng": 78.05
    },
    {
      "name": "Malur",
      "lat": 13.06,
      "lng": 78.13
    },
    {
      "name": "Mulbagal",
      "lat": 13.14,
      "lng": 78.13
    },
    {
      "name": "Srinivaspur",
      "lat": 13.22,
      "lng": 78.13
    }
  ],
  "Koppal": [
    {
      "name": "Gangavathi",
      "lat": 15.27,
      "lng": 76.07
    },
    {
      "name": "Kanakagiri",
      "lat": 15.35,
      "lng": 76.07
    },
    {
      "name": "Karatagi",
      "lat": 15.43,
      "lng": 76.07
    },
    {
      "name": "Koppal",
      "lat": 15.27,
      "lng": 76.15
    },
    {
      "name": "Kuknoor",
      "lat": 15.35,
      "lng": 76.15
    },
    {
      "name": "Kushtagi",
      "lat": 15.43,
      "lng": 76.15
    },
    {
      "name": "Yelburga",
      "lat": 15.27,
      "lng": 76.23
    }
  ],
  "Mandya": [
    {
      "name": "Krishnarajapete",
      "lat": 12.44,
      "lng": 76.82
    },
    {
      "name": "Maddur",
      "lat": 12.52,
      "lng": 76.82
    },
    {
      "name": "Malavalli",
      "lat": 12.6,
      "lng": 76.82
    },
    {
      "name": "Mandya",
      "lat": 12.44,
      "lng": 76.9
    },
    {
      "name": "Nagamangala",
      "lat": 12.52,
      "lng": 76.9
    },
    {
      "name": "Pandavapura",
      "lat": 12.6,
      "lng": 76.9
    },
    {
      "name": "Srirangapatna",
      "lat": 12.44,
      "lng": 76.98
    }
  ],
  "Mysuru": [
    {
      "name": "Heggadadevanakote",
      "lat": 12.22,
      "lng": 76.57
    },
    {
      "name": "Hunsur",
      "lat": 12.3,
      "lng": 76.57
    },
    {
      "name": "Krishnarajanagara",
      "lat": 12.38,
      "lng": 76.57
    },
    {
      "name": "Mysuru",
      "lat": 12.22,
      "lng": 76.65
    },
    {
      "name": "Nanjangud",
      "lat": 12.3,
      "lng": 76.65
    },
    {
      "name": "Piriyapatna",
      "lat": 12.38,
      "lng": 76.65
    },
    {
      "name": "Saligrama",
      "lat": 12.22,
      "lng": 76.73
    },
    {
      "name": "Saragur",
      "lat": 12.3,
      "lng": 76.73
    },
    {
      "name": "T. Narasipura",
      "lat": 12.38,
      "lng": 76.73
    }
  ],
  "Raichur": [
    {
      "name": "Devadurga",
      "lat": 16.12,
      "lng": 77.28
    },
    {
      "name": "Lingasugur",
      "lat": 16.2,
      "lng": 77.28
    },
    {
      "name": "Manvi",
      "lat": 16.28,
      "lng": 77.28
    },
    {
      "name": "Maski",
      "lat": 16.12,
      "lng": 77.36
    },
    {
      "name": "Mudgal",
      "lat": 16.2,
      "lng": 77.36
    },
    {
      "name": "Raichur",
      "lat": 16.28,
      "lng": 77.36
    },
    {
      "name": "Sindhanur",
      "lat": 16.12,
      "lng": 77.44
    },
    {
      "name": "Sirwar",
      "lat": 16.2,
      "lng": 77.44
    }
  ],
  "Bengaluru South": [
    {
      "name": "Channapatna",
      "lat": 12.92,
      "lng": 75.92
    },
    {
      "name": "Harohalli",
      "lat": 13.0,
      "lng": 75.92
    },
    {
      "name": "Kanakapura",
      "lat": 13.08,
      "lng": 75.92
    },
    {
      "name": "Magadi",
      "lat": 12.92,
      "lng": 76.0
    },
    {
      "name": "Ramanagara",
      "lat": 13.0,
      "lng": 76.0
    }
  ],
  "Shivamogga": [
    {
      "name": "Bhadravathi",
      "lat": 13.85,
      "lng": 75.49
    },
    {
      "name": "Hosanagara",
      "lat": 13.93,
      "lng": 75.49
    },
    {
      "name": "Sagara",
      "lat": 14.01,
      "lng": 75.49
    },
    {
      "name": "Shikaripura",
      "lat": 13.85,
      "lng": 75.57
    },
    {
      "name": "Shivamogga",
      "lat": 13.93,
      "lng": 75.57
    },
    {
      "name": "Soraba",
      "lat": 14.01,
      "lng": 75.57
    },
    {
      "name": "Tirthahalli",
      "lat": 13.85,
      "lng": 75.65
    }
  ],
  "Tumakuru": [
    {
      "name": "Chikkanayakanahalli",
      "lat": 13.26,
      "lng": 77.02
    },
    {
      "name": "Gubbi",
      "lat": 13.34,
      "lng": 77.02
    },
    {
      "name": "Koratagere",
      "lat": 13.42,
      "lng": 77.02
    },
    {
      "name": "Kunigal",
      "lat": 13.26,
      "lng": 77.1
    },
    {
      "name": "Madhugiri",
      "lat": 13.34,
      "lng": 77.1
    },
    {
      "name": "Pavagada",
      "lat": 13.42,
      "lng": 77.1
    },
    {
      "name": "Sira",
      "lat": 13.26,
      "lng": 77.18
    },
    {
      "name": "Tiptur",
      "lat": 13.34,
      "lng": 77.18
    },
    {
      "name": "Tumakuru",
      "lat": 13.42,
      "lng": 77.18
    },
    {
      "name": "Turuvekere",
      "lat": 13.26,
      "lng": 77.26
    }
  ],
  "Udupi": [
    {
      "name": "Brahmavar",
      "lat": 13.26,
      "lng": 74.66
    },
    {
      "name": "Byndoor",
      "lat": 13.34,
      "lng": 74.66
    },
    {
      "name": "Hebri",
      "lat": 13.42,
      "lng": 74.66
    },
    {
      "name": "Kapu",
      "lat": 13.26,
      "lng": 74.74
    },
    {
      "name": "Karkala",
      "lat": 13.34,
      "lng": 74.74
    },
    {
      "name": "Kundapura",
      "lat": 13.42,
      "lng": 74.74
    },
    {
      "name": "Udupi",
      "lat": 13.26,
      "lng": 74.82
    }
  ],
  "Uttara Kannada": [
    {
      "name": "Ankola",
      "lat": 14.72,
      "lng": 74.05
    },
    {
      "name": "Bhatkal",
      "lat": 14.8,
      "lng": 74.05
    },
    {
      "name": "Dandeli",
      "lat": 14.88,
      "lng": 74.05
    },
    {
      "name": "Haliyal",
      "lat": 14.72,
      "lng": 74.13
    },
    {
      "name": "Honnavar",
      "lat": 14.8,
      "lng": 74.13
    },
    {
      "name": "Joida",
      "lat": 14.88,
      "lng": 74.13
    },
    {
      "name": "Karwar",
      "lat": 14.72,
      "lng": 74.21
    },
    {
      "name": "Kumta",
      "lat": 14.8,
      "lng": 74.21
    },
    {
      "name": "Mundgod",
      "lat": 14.88,
      "lng": 74.21
    },
    {
      "name": "Siddapur",
      "lat": 14.72,
      "lng": 74.29
    },
    {
      "name": "Sirsi",
      "lat": 14.8,
      "lng": 74.29
    },
    {
      "name": "Yellapur",
      "lat": 14.88,
      "lng": 74.29
    }
  ],
  "Vijayapura": [
    {
      "name": "Almel",
      "lat": 16.75,
      "lng": 75.63
    },
    {
      "name": "Babaleshwar",
      "lat": 16.83,
      "lng": 75.63
    },
    {
      "name": "Basavana Bagewadi",
      "lat": 16.91,
      "lng": 75.63
    },
    {
      "name": "Chadchan",
      "lat": 16.75,
      "lng": 75.71
    },
    {
      "name": "Devar Hippargi",
      "lat": 16.83,
      "lng": 75.71
    },
    {
      "name": "Indi",
      "lat": 16.91,
      "lng": 75.71
    },
    {
      "name": "Kolhar",
      "lat": 16.75,
      "lng": 75.79
    },
    {
      "name": "Muddebihal",
      "lat": 16.83,
      "lng": 75.79
    },
    {
      "name": "Nidagundi",
      "lat": 16.91,
      "lng": 75.79
    },
    {
      "name": "Sindagi",
      "lat": 16.75,
      "lng": 75.87
    },
    {
      "name": "Talikote",
      "lat": 16.83,
      "lng": 75.87
    },
    {
      "name": "Tikota",
      "lat": 16.91,
      "lng": 75.87
    },
    {
      "name": "Vijayapura",
      "lat": 16.75,
      "lng": 75.95
    }
  ],
  "Yadgir": [
    {
      "name": "Gurmitkal",
      "lat": 16.69,
      "lng": 77.06
    },
    {
      "name": "Hunasagi",
      "lat": 16.77,
      "lng": 77.06
    },
    {
      "name": "Shahapur",
      "lat": 16.85,
      "lng": 77.06
    },
    {
      "name": "Shorapur",
      "lat": 16.69,
      "lng": 77.14
    },
    {
      "name": "Wadgera",
      "lat": 16.77,
      "lng": 77.14
    },
    {
      "name": "Yadgir",
      "lat": 16.85,
      "lng": 77.14
    }
  ],
  "Vijayanagara": [
    {
      "name": "Hagaribommanahalli",
      "lat": 15.19,
      "lng": 76.31
    },
    {
      "name": "Harapanahalli",
      "lat": 15.27,
      "lng": 76.31
    },
    {
      "name": "Hoovina Hadagali",
      "lat": 15.35,
      "lng": 76.31
    },
    {
      "name": "Hosapete",
      "lat": 15.19,
      "lng": 76.39
    },
    {
      "name": "Kotturu",
      "lat": 15.27,
      "lng": 76.39
    },
    {
      "name": "Kudligi",
      "lat": 15.35,
      "lng": 76.39
    }
  ],
  "Thiruvananthapuram": [
    {
      "name": "Chirayinkeezhu",
      "lat": 8.44,
      "lng": 76.86
    },
    {
      "name": "Kattakada",
      "lat": 8.52,
      "lng": 76.86
    },
    {
      "name": "Nedumangad",
      "lat": 8.6,
      "lng": 76.86
    },
    {
      "name": "Neyyattinkara",
      "lat": 8.44,
      "lng": 76.94
    },
    {
      "name": "Thiruvananthapuram",
      "lat": 8.52,
      "lng": 76.94
    },
    {
      "name": "Varkala",
      "lat": 8.6,
      "lng": 76.94
    }
  ],
  "Kollam": [
    {
      "name": "Karunagappally",
      "lat": 8.81,
      "lng": 76.52
    },
    {
      "name": "Kollam",
      "lat": 8.89,
      "lng": 76.52
    },
    {
      "name": "Kottarakkara",
      "lat": 8.97,
      "lng": 76.52
    },
    {
      "name": "Kunnathur",
      "lat": 8.81,
      "lng": 76.6
    },
    {
      "name": "Pathanapuram",
      "lat": 8.89,
      "lng": 76.6
    },
    {
      "name": "Punalur",
      "lat": 8.97,
      "lng": 76.6
    }
  ],
  "Pathanamthitta": [
    {
      "name": "Adoor",
      "lat": 9.18,
      "lng": 76.7
    },
    {
      "name": "Konni",
      "lat": 9.26,
      "lng": 76.7
    },
    {
      "name": "Kozhenchery",
      "lat": 9.34,
      "lng": 76.7
    },
    {
      "name": "Mallappally",
      "lat": 9.18,
      "lng": 76.78
    },
    {
      "name": "Ranni",
      "lat": 9.26,
      "lng": 76.78
    },
    {
      "name": "Thiruvalla",
      "lat": 9.34,
      "lng": 76.78
    }
  ],
  "Alappuzha": [
    {
      "name": "Ambalappuzha",
      "lat": 9.41,
      "lng": 76.25
    },
    {
      "name": "Chengannur",
      "lat": 9.49,
      "lng": 76.25
    },
    {
      "name": "Cherthala",
      "lat": 9.57,
      "lng": 76.25
    },
    {
      "name": "Karthikappally",
      "lat": 9.41,
      "lng": 76.33
    },
    {
      "name": "Kuttanad",
      "lat": 9.49,
      "lng": 76.33
    },
    {
      "name": "Mavelikkara",
      "lat": 9.57,
      "lng": 76.33
    }
  ],
  "Kottayam": [
    {
      "name": "Changanassery",
      "lat": 9.51,
      "lng": 76.44
    },
    {
      "name": "Kanjirappally",
      "lat": 9.59,
      "lng": 76.44
    },
    {
      "name": "Kottayam",
      "lat": 9.67,
      "lng": 76.44
    },
    {
      "name": "Meenachil",
      "lat": 9.51,
      "lng": 76.52
    },
    {
      "name": "Vaikom",
      "lat": 9.59,
      "lng": 76.52
    }
  ],
  "Idukki": [
    {
      "name": "Devikulam",
      "lat": 9.77,
      "lng": 76.89
    },
    {
      "name": "Idukki",
      "lat": 9.85,
      "lng": 76.89
    },
    {
      "name": "Peermade",
      "lat": 9.93,
      "lng": 76.89
    },
    {
      "name": "Thodupuzha",
      "lat": 9.77,
      "lng": 76.97
    },
    {
      "name": "Udumbanchola",
      "lat": 9.85,
      "lng": 76.97
    }
  ],
  "Ernakulam": [
    {
      "name": "Aluva",
      "lat": 9.9,
      "lng": 76.22
    },
    {
      "name": "Kanayannur",
      "lat": 9.98,
      "lng": 76.22
    },
    {
      "name": "Kochi",
      "lat": 10.06,
      "lng": 76.22
    },
    {
      "name": "Kothamangalam",
      "lat": 9.9,
      "lng": 76.3
    },
    {
      "name": "Kunnathunad",
      "lat": 9.98,
      "lng": 76.3
    },
    {
      "name": "Muvattupuzha",
      "lat": 10.06,
      "lng": 76.3
    },
    {
      "name": "North Paravur",
      "lat": 9.9,
      "lng": 76.38
    }
  ],
  "Thrissur": [
    {
      "name": "Chalakudy",
      "lat": 10.45,
      "lng": 76.13
    },
    {
      "name": "Chavakkad",
      "lat": 10.53,
      "lng": 76.13
    },
    {
      "name": "Kodungallur",
      "lat": 10.61,
      "lng": 76.13
    },
    {
      "name": "Kunnamkulam",
      "lat": 10.45,
      "lng": 76.21
    },
    {
      "name": "Mukundapuram",
      "lat": 10.53,
      "lng": 76.21
    },
    {
      "name": "Thalapilly",
      "lat": 10.61,
      "lng": 76.21
    },
    {
      "name": "Thrissur",
      "lat": 10.45,
      "lng": 76.29
    }
  ],
  "Palakkad": [
    {
      "name": "Alathur",
      "lat": 10.7,
      "lng": 76.57
    },
    {
      "name": "Attappady",
      "lat": 10.78,
      "lng": 76.57
    },
    {
      "name": "Chittur",
      "lat": 10.86,
      "lng": 76.57
    },
    {
      "name": "Mannarkkad",
      "lat": 10.7,
      "lng": 76.65
    },
    {
      "name": "Ottapalam",
      "lat": 10.78,
      "lng": 76.65
    },
    {
      "name": "Palakkad",
      "lat": 10.86,
      "lng": 76.65
    },
    {
      "name": "Pattambi",
      "lat": 10.7,
      "lng": 76.73
    }
  ],
  "Malappuram": [
    {
      "name": "Eranad",
      "lat": 10.99,
      "lng": 75.99
    },
    {
      "name": "Kondotty",
      "lat": 11.07,
      "lng": 75.99
    },
    {
      "name": "Nilambur",
      "lat": 11.15,
      "lng": 75.99
    },
    {
      "name": "Perinthalmanna",
      "lat": 10.99,
      "lng": 76.07
    },
    {
      "name": "Ponnani",
      "lat": 11.07,
      "lng": 76.07
    },
    {
      "name": "Tirur",
      "lat": 11.15,
      "lng": 76.07
    },
    {
      "name": "Tirurangadi",
      "lat": 10.99,
      "lng": 76.15
    }
  ],
  "Kozhikode": [
    {
      "name": "Koyilandy",
      "lat": 11.18,
      "lng": 75.7
    },
    {
      "name": "Kozhikode",
      "lat": 11.26,
      "lng": 75.7
    },
    {
      "name": "Thamarassery",
      "lat": 11.34,
      "lng": 75.7
    },
    {
      "name": "Vatakara",
      "lat": 11.18,
      "lng": 75.78
    }
  ],
  "Wayanad": [
    {
      "name": "Mananthavady",
      "lat": 11.61,
      "lng": 76.05
    },
    {
      "name": "Sulthan Bathery",
      "lat": 11.69,
      "lng": 76.05
    },
    {
      "name": "Vythiri",
      "lat": 11.77,
      "lng": 76.05
    }
  ],
  "Kannur": [
    {
      "name": "Iritty",
      "lat": 11.79,
      "lng": 75.29
    },
    {
      "name": "Kannur",
      "lat": 11.87,
      "lng": 75.29
    },
    {
      "name": "Payyanur",
      "lat": 11.95,
      "lng": 75.29
    },
    {
      "name": "Taliparamba",
      "lat": 11.79,
      "lng": 75.37
    },
    {
      "name": "Thalassery",
      "lat": 11.87,
      "lng": 75.37
    }
  ],
  "Kasaragod": [
    {
      "name": "Hosdurg",
      "lat": 12.43,
      "lng": 74.91
    },
    {
      "name": "Kasaragod",
      "lat": 12.51,
      "lng": 74.91
    },
    {
      "name": "Manjeshwaram",
      "lat": 12.59,
      "lng": 74.91
    },
    {
      "name": "Vellarikund",
      "lat": 12.43,
      "lng": 74.99
    }
  ]
};

export function getDistrict(stateName: string, districtName: string) {
  return STATES.find((s) => s.name === stateName)?.districts.find((d) => d.name === districtName);
}
