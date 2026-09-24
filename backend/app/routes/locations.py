from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api", tags=["locations"])

STATES = [
  "Karnataka",
  "Kerala"
]
DISTRICTS = {
  "Karnataka": [
    "Bagalkote",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru South",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayanagara",
    "Vijayapura",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ]
}
TALUKS = {
  "Bagalkote": [
    "Badami",
    "Bagalkote",
    "Bilagi",
    "Guledgudda",
    "Hunagund",
    "Ilkal",
    "Jamkhandi",
    "Mudhol",
    "Rabkavi Banhatti"
  ],
  "Ballari": [
    "Ballari",
    "Kampli",
    "Kurugodu",
    "Sanduru",
    "Siraguppa"
  ],
  "Belagavi": [
    "Athani",
    "Bailhongal",
    "Belagavi",
    "Chikkodi",
    "Gokak",
    "Hukkeri",
    "Kagawad",
    "Khanapur",
    "Kittur",
    "Mudalgi",
    "Nippani",
    "Raibag",
    "Ramdurga",
    "Savadatti",
    "Yargatti"
  ],
  "Bengaluru Urban": [
    "Anekal",
    "Bengaluru",
    "Kengeri",
    "Krishnarajapura",
    "Yelahanka"
  ],
  "Bengaluru Rural": [
    "Devanahalli",
    "Doddaballapura",
    "Hosakote",
    "Nelamangala"
  ],
  "Bidar": [
    "Aurad",
    "Basavakalyan",
    "Bhalki",
    "Bidar",
    "Chitgoppa",
    "Hulsoor",
    "Humnabad",
    "Kamalnagar"
  ],
  "Chamarajanagar": [
    "Chamarajanagar",
    "Gundlupet",
    "Hanur",
    "Kollegal",
    "Yelandur"
  ],
  "Chikkaballapur": [
    "Bagepalli",
    "Chelur",
    "Chikkaballapur",
    "Chintamani",
    "Gauribidanur",
    "Gudibanda",
    "Manchenahalli",
    "Sidlaghatta"
  ],
  "Chikkamagaluru": [
    "Ajjampura",
    "Chikkamagaluru",
    "Kadur",
    "Kalasa",
    "Koppa",
    "Mudigere",
    "Narasimharajapura",
    "Sringeri",
    "Tarikere"
  ],
  "Chitradurga": [
    "Challakere",
    "Chitradurga",
    "Hiriyur",
    "Holalkere",
    "Hosadurga",
    "Molakalmuru"
  ],
  "Dakshina Kannada": [
    "Bantwal",
    "Belthangady",
    "Kadaba",
    "Mangaluru",
    "Moodbidri",
    "Mulki",
    "Puttur",
    "Sullia",
    "Ullal"
  ],
  "Davanagere": [
    "Channagiri",
    "Davanagere",
    "Harihar",
    "Honnali",
    "Jagalur",
    "Nyamathi"
  ],
  "Dharwad": [
    "Alnavar",
    "Annigeri",
    "Dharwad",
    "Hubballi Rural",
    "Hubballi Urban",
    "Kalghatgi",
    "Kundgol",
    "Navalgund"
  ],
  "Gadag": [
    "Gadag",
    "Gajendragad",
    "Lakshmeshwar",
    "Mundargi",
    "Nargund",
    "Ron",
    "Shirahatti"
  ],
  "Hassan": [
    "Alur",
    "Arakalgud",
    "Arsikere",
    "Belur",
    "Channarayapatna",
    "Hassan",
    "Holenarasipura",
    "Sakleshpur"
  ],
  "Haveri": [
    "Byadgi",
    "Hangal",
    "Haveri",
    "Hirekerur",
    "Ranebennur",
    "Rattihalli",
    "Savanur",
    "Shiggaon"
  ],
  "Kalaburagi": [
    "Afzalpur",
    "Aland",
    "Chincholi",
    "Chittapur",
    "Jevargi",
    "Kalaburagi",
    "Kalagi",
    "Kamalapur",
    "Sedam",
    "Shahabad",
    "Yedrami"
  ],
  "Kodagu": [
    "Kushalnagar",
    "Madikeri",
    "Ponnampet",
    "Somwarpet",
    "Virajpet"
  ],
  "Kolar": [
    "Bangarapet",
    "Kolar",
    "Kolar Gold Fields (Robertsonpet)",
    "Malur",
    "Mulbagal",
    "Srinivaspur"
  ],
  "Koppal": [
    "Gangavathi",
    "Kanakagiri",
    "Karatagi",
    "Koppal",
    "Kuknoor",
    "Kushtagi",
    "Yelburga"
  ],
  "Mandya": [
    "Krishnarajapete",
    "Maddur",
    "Malavalli",
    "Mandya",
    "Nagamangala",
    "Pandavapura",
    "Srirangapatna"
  ],
  "Mysuru": [
    "Heggadadevanakote",
    "Hunsur",
    "Krishnarajanagara",
    "Mysuru",
    "Nanjangud",
    "Piriyapatna",
    "Saligrama",
    "Saragur",
    "T. Narasipura"
  ],
  "Raichur": [
    "Devadurga",
    "Lingasugur",
    "Manvi",
    "Maski",
    "Mudgal",
    "Raichur",
    "Sindhanur",
    "Sirwar"
  ],
  "Bengaluru South": [
    "Channapatna",
    "Harohalli",
    "Kanakapura",
    "Magadi",
    "Ramanagara"
  ],
  "Shivamogga": [
    "Bhadravathi",
    "Hosanagara",
    "Sagara",
    "Shikaripura",
    "Shivamogga",
    "Soraba",
    "Tirthahalli"
  ],
  "Tumakuru": [
    "Chikkanayakanahalli",
    "Gubbi",
    "Koratagere",
    "Kunigal",
    "Madhugiri",
    "Pavagada",
    "Sira",
    "Tiptur",
    "Tumakuru",
    "Turuvekere"
  ],
  "Udupi": [
    "Brahmavar",
    "Byndoor",
    "Hebri",
    "Kapu",
    "Karkala",
    "Kundapura",
    "Udupi"
  ],
  "Uttara Kannada": [
    "Ankola",
    "Bhatkal",
    "Dandeli",
    "Haliyal",
    "Honnavar",
    "Joida",
    "Karwar",
    "Kumta",
    "Mundgod",
    "Siddapur",
    "Sirsi",
    "Yellapur"
  ],
  "Vijayapura": [
    "Almel",
    "Babaleshwar",
    "Basavana Bagewadi",
    "Chadchan",
    "Devar Hippargi",
    "Indi",
    "Kolhar",
    "Muddebihal",
    "Nidagundi",
    "Sindagi",
    "Talikote",
    "Tikota",
    "Vijayapura"
  ],
  "Yadgir": [
    "Gurmitkal",
    "Hunasagi",
    "Shahapur",
    "Shorapur",
    "Wadgera",
    "Yadgir"
  ],
  "Vijayanagara": [
    "Hagaribommanahalli",
    "Harapanahalli",
    "Hoovina Hadagali",
    "Hosapete",
    "Kotturu",
    "Kudligi"
  ],
  "Thiruvananthapuram": [
    "Chirayinkeezhu",
    "Kattakada",
    "Nedumangad",
    "Neyyattinkara",
    "Thiruvananthapuram",
    "Varkala"
  ],
  "Kollam": [
    "Karunagappally",
    "Kollam",
    "Kottarakkara",
    "Kunnathur",
    "Pathanapuram",
    "Punalur"
  ],
  "Pathanamthitta": [
    "Adoor",
    "Konni",
    "Kozhenchery",
    "Mallappally",
    "Ranni",
    "Thiruvalla"
  ],
  "Alappuzha": [
    "Ambalappuzha",
    "Chengannur",
    "Cherthala",
    "Karthikappally",
    "Kuttanad",
    "Mavelikkara"
  ],
  "Kottayam": [
    "Changanassery",
    "Kanjirappally",
    "Kottayam",
    "Meenachil",
    "Vaikom"
  ],
  "Idukki": [
    "Devikulam",
    "Idukki",
    "Peermade",
    "Thodupuzha",
    "Udumbanchola"
  ],
  "Ernakulam": [
    "Aluva",
    "Kanayannur",
    "Kochi",
    "Kothamangalam",
    "Kunnathunad",
    "Muvattupuzha",
    "North Paravur"
  ],
  "Thrissur": [
    "Chalakudy",
    "Chavakkad",
    "Kodungallur",
    "Kunnamkulam",
    "Mukundapuram",
    "Thalapilly",
    "Thrissur"
  ],
  "Palakkad": [
    "Alathur",
    "Attappady",
    "Chittur",
    "Mannarkkad",
    "Ottapalam",
    "Palakkad",
    "Pattambi"
  ],
  "Malappuram": [
    "Eranad",
    "Kondotty",
    "Nilambur",
    "Perinthalmanna",
    "Ponnani",
    "Tirur",
    "Tirurangadi"
  ],
  "Kozhikode": [
    "Koyilandy",
    "Kozhikode",
    "Thamarassery",
    "Vatakara"
  ],
  "Wayanad": [
    "Mananthavady",
    "Sulthan Bathery",
    "Vythiri"
  ],
  "Kannur": [
    "Iritty",
    "Kannur",
    "Payyanur",
    "Taliparamba",
    "Thalassery"
  ],
  "Kasaragod": [
    "Hosdurg",
    "Kasaragod",
    "Manjeshwaram",
    "Vellarikund"
  ]
}
CROPS = [
  "Arecanut",
  "Banana",
  "Black Pepper",
  "Brinjal",
  "Cardamom",
  "Cashew",
  "Chilli",
  "Cocoa",
  "Coconut",
  "Coffee",
  "Cotton",
  "Finger Millet (Ragi)",
  "Ginger",
  "Groundnut",
  "Maize",
  "Okra",
  "Pigeonpea",
  "Rice",
  "Rubber",
  "Sorghum",
  "Sugarcane",
  "Tapioca",
  "Tomato",
  "Turmeric"
]
PESTS = {
  "Arecanut": [
    "Inflorescence Caterpillar",
    "Root Grub",
    "Spindle Bug"
  ],
  "Banana": [
    "Banana Aphid",
    "Pseudostem Weevil",
    "Rhizome Weevil"
  ],
  "Black Pepper": [
    "Pollu Beetle",
    "Scale Insect",
    "Top Shoot Borer"
  ],
  "Brinjal": [
    "Aphid",
    "Shoot and Fruit Borer",
    "Whitefly"
  ],
  "Cardamom": [
    "Shoot and Capsule Borer",
    "Thrips"
  ],
  "Cashew": [
    "Stem and Root Borer",
    "Tea Mosquito Bug"
  ],
  "Chilli": [
    "Fruit Borer",
    "Mite",
    "Thrips"
  ],
  "Cocoa": [
    "Mealybug",
    "Pod Borer",
    "Tea Mosquito Bug"
  ],
  "Coconut": [
    "Black Headed Caterpillar",
    "Eriophyid Mite",
    "Red Palm Weevil",
    "Rhinoceros Beetle"
  ],
  "Coffee": [
    "Coffee Berry Borer",
    "Mealybug",
    "White Stem Borer"
  ],
  "Cotton": [
    "Cotton Aphid",
    "Pink Bollworm",
    "Whitefly"
  ],
  "Finger Millet (Ragi)": [
    "Pink Stem Borer",
    "Shoot Fly"
  ],
  "Ginger": [
    "Rhizome Scale",
    "Shoot Borer"
  ],
  "Groundnut": [
    "Aphid",
    "Leaf Miner",
    "Tobacco Caterpillar"
  ],
  "Maize": [
    "Corn Aphid",
    "Fall Armyworm",
    "Maize Stem Borer"
  ],
  "Okra": [
    "Jassid",
    "Shoot and Fruit Borer",
    "Whitefly"
  ],
  "Pigeonpea": [
    "Gram Pod Borer",
    "Plume Moth",
    "Pod Fly"
  ],
  "Rice": [
    "Brown Planthopper",
    "Gall Midge",
    "Leaf Folder",
    "Yellow Stem Borer"
  ],
  "Rubber": [
    "Mealybug",
    "Scale Insect",
    "Termite"
  ],
  "Sorghum": [
    "Earhead Bug",
    "Shoot Fly",
    "Stem Borer"
  ],
  "Sugarcane": [
    "Early Shoot Borer",
    "Internode Borer",
    "Woolly Aphid"
  ],
  "Tapioca": [
    "Cassava Mosaic Whitefly",
    "Mealybug",
    "Scale Insect"
  ],
  "Tomato": [
    "Serpentine Leaf Miner",
    "Tomato Fruit Borer",
    "Whitefly"
  ],
  "Turmeric": [
    "Rhizome Scale",
    "Shoot Borer"
  ]
}

@router.get("/states", response_model=List[str])
def get_states():
    return STATES

@router.get("/districts")
def get_districts(state: str):
    return DISTRICTS.get(state, ["Other"])

@router.get("/taluks")
def get_taluks(district: str):
    return TALUKS.get(district, ["Other"])

@router.get("/crops", response_model=List[str])
def get_crops():
    return CROPS

@router.get("/pests")
def get_pests(crop: str):
    return PESTS.get(crop, ["General Pest"])
