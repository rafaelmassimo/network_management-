import {
	BR,
	ES,
	US,
	CA,
	FR,
	DE,
	IT,
	JP,
	CN,
	IN,
	MX,
	AU,
	RU,
	ZA,
	KR,
	AR,
	NL,
	SE,
	CH,
	GB,
	NO,
	DK,
	FI,
	BE,
	AT,
	NZ,
	SG,
	MY,
	TH,
	ID,
	PH,
	VN,
	SA,
	AE,
	IL,
	TR,
	EG,
	NG,
	KE,
	CL,
	PE,
	CO,
	VE,
} from 'country-flag-icons/react/3x2';


// When I'll use this object, I'll pass the country name as a key for example: countryFlagComponents["Brazil"] in my component
// will be countryFlagComponents[country]
const countryFlagComponents = {
    "Brazil": BR,
    "Brasil": BR,
    "Spain": ES,
    "United States": US,
    "USA": US,
    "Canada": CA,
    "canada": CA,
    "France": FR,
    "Germany": DE,
    "Italy": IT,
    "Italia": IT,
    "Japan": JP,
    "China": CN,
    "India": IN,
    "Mexico": MX,
    "Australia": AU,
    "Russia": RU,
    "South Africa": ZA,
    "South Korea": KR,
    "Argentina": AR,
    "Netherlands": NL,
    "Sweden": SE,
    "Switzerland": CH,
    "United Kingdom": GB,
    "Norway": NO,
    "Denmark": DK,
    "Finland": FI,
    "Belgium": BE,
    "Austria": AT,
    "New Zealand": NZ,
    "Singapore": SG,
    "Malaysia": MY,
    "Thailand": TH,
    "Indonesia": ID,
    "Philippines": PH,
    "Vietnam": VN,
    "Saudi Arabia": SA,
    "United Arab Emirates": AE,
    "Israel": IL,
    "Turkey": TR,
    "Egypt": EG,
    "Nigeria": NG,
    "Kenya": KE,
    "Chile": CL,
    "Peru": PE,
    "Colombia": CO,
    "Venezuela": VE,
    // Add more countries and their flag components as needed
};

export default countryFlagComponents;
