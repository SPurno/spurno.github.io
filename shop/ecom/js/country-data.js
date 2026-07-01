// ============================================
// Country Data — All countries with flags & states
// ============================================

const Countries = {
  list: [
    { code: 'US', name: 'United States', flag: '🇺🇸', phone: '+1' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', phone: '+1' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phone: '+44' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', phone: '+61' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', phone: '+49' },
    { code: 'FR', name: 'France', flag: '🇫🇷', phone: '+33' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', phone: '+39' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', phone: '+34' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', phone: '+351' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phone: '+31' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', phone: '+32' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phone: '+41' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', phone: '+43' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', phone: '+46' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', phone: '+47' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', phone: '+45' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', phone: '+358' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', phone: '+353' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', phone: '+81' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', phone: '+82' },
    { code: 'CN', name: 'China', flag: '🇨🇳', phone: '+86' },
    { code: 'IN', name: 'India', flag: '🇮🇳', phone: '+91' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', phone: '+65' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phone: '+60' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', phone: '+66' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phone: '+84' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', phone: '+63' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phone: '+62' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phone: '+971' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phone: '+966' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦', phone: '+974' },
    { code: 'KW', name: 'Kuwait', flag: '🇰🇼', phone: '+965' },
    { code: 'OM', name: 'Oman', flag: '🇴🇲', phone: '+968' },
    { code: 'BH', name: 'Bahrain', flag: '🇧🇭', phone: '+973' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱', phone: '+972' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', phone: '+90' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', phone: '+7' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', phone: '+380' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', phone: '+48' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', phone: '+420' },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰', phone: '+421' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺', phone: '+36' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴', phone: '+40' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', phone: '+359' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', phone: '+30' },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷', phone: '+385' },
    { code: 'RS', name: 'Serbia', flag: '🇷🇸', phone: '+381' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', phone: '+52' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', phone: '+55' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', phone: '+54' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', phone: '+56' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', phone: '+57' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪', phone: '+51' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾', phone: '+598' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', phone: '+64' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phone: '+27' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phone: '+234' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', phone: '+254' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', phone: '+20' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦', phone: '+212' },
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿', phone: '+213' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳', phone: '+216' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phone: '+92' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phone: '+880' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phone: '+94' },
    { code: 'NP', name: 'Nepal', flag: '🇳🇵', phone: '+977' },
    { code: 'MM', name: 'Myanmar', flag: '🇲🇲', phone: '+95' },
    { code: 'KH', name: 'Cambodia', flag: '🇰🇭', phone: '+855' },
    { code: 'LA', name: 'Laos', flag: '🇱🇦', phone: '+856' },
    { code: 'MN', name: 'Mongolia', flag: '🇲🇳', phone: '+976' },
    { code: 'IS', name: 'Iceland', flag: '🇮🇸', phone: '+354' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phone: '+352' },
    { code: 'MT', name: 'Malta', flag: '🇲🇹', phone: '+356' },
    { code: 'CY', name: 'Cyprus', flag: '🇨🇾', phone: '+357' },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', phone: '+372' },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻', phone: '+371' },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹', phone: '+370' },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮', phone: '+386' },
    { code: 'BY', name: 'Belarus', flag: '🇧🇾', phone: '+375' },
    { code: 'MD', name: 'Moldova', flag: '🇲🇩', phone: '+373' },
    { code: 'GE', name: 'Georgia', flag: '🇬🇪', phone: '+995' },
    { code: 'AM', name: 'Armenia', flag: '🇦🇲', phone: '+374' },
    { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', phone: '+994' },
    { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', phone: '+7' },
    { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', phone: '+998' },
    { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', phone: '+993' },
    { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', phone: '+996' },
    { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', phone: '+992' },
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phone: '+93' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷', phone: '+98' },
    { code: 'IQ', name: 'Iraq', flag: '🇮🇶', phone: '+964' },
    { code: 'SY', name: 'Syria', flag: '🇸🇾', phone: '+963' },
    { code: 'JO', name: 'Jordan', flag: '🇯🇴', phone: '+962' },
    { code: 'LB', name: 'Lebanon', flag: '🇱🇧', phone: '+961' },
    { code: 'YE', name: 'Yemen', flag: '🇾🇪', phone: '+967' },
    { code: 'PS', name: 'Palestine', flag: '🇵🇸', phone: '+970' },
    { code: 'LY', name: 'Libya', flag: '🇱🇾', phone: '+218' },
    { code: 'SD', name: 'Sudan', flag: '🇸🇩', phone: '+249' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', phone: '+251' },
    { code: 'SO', name: 'Somalia', flag: '🇸🇴', phone: '+252' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', phone: '+255' },
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', phone: '+256' },
    { code: 'RW', name: 'Rwanda', flag: '🇷🇼', phone: '+250' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', phone: '+233' },
    { code: 'CM', name: 'Cameroon', flag: '🇨🇲', phone: '+237' },
    { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', phone: '+225' },
    { code: 'SN', name: 'Senegal', flag: '🇸🇳', phone: '+221' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', phone: '+223' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', phone: '+226' },
    { code: 'BJ', name: 'Benin', flag: '🇧🇯', phone: '+229' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪', phone: '+227' },
    { code: 'TD', name: 'Chad', flag: '🇹🇩', phone: '+235' },
    { code: 'CD', name: 'DR Congo', flag: '🇨🇩', phone: '+243' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴', phone: '+244' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', phone: '+258' },
    { code: 'MG', name: 'Madagascar', flag: '🇲🇬', phone: '+261' },
    { code: 'MU', name: 'Mauritius', flag: '🇲🇺', phone: '+230' },
    { code: 'SC', name: 'Seychelles', flag: '🇸🇨', phone: '+248' },
    { code: 'MV', name: 'Maldives', flag: '🇲🇻', phone: '+960' },
    { code: 'BN', name: 'Brunei', flag: '🇧🇳', phone: '+673' },
    { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', phone: '+670' },
    { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', phone: '+675' },
    { code: 'FJ', name: 'Fiji', flag: '🇫🇯', phone: '+679' },
    { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', phone: '+677' },
    { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', phone: '+678' },
    { code: 'WS', name: 'Samoa', flag: '🇼🇸', phone: '+685' },
    { code: 'TO', name: 'Tonga', flag: '🇹🇴', phone: '+676' },
    { code: 'FM', name: 'Micronesia', flag: '🇫🇲', phone: '+691' },
    { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', phone: '+692' },
    { code: 'PW', name: 'Palau', flag: '🇵🇼', phone: '+680' },
    { code: 'NR', name: 'Nauru', flag: '🇳🇷', phone: '+674' },
    { code: 'KI', name: 'Kiribati', flag: '🇰🇮', phone: '+686' },
    { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', phone: '+688' },
    { code: 'BS', name: 'Bahamas', flag: '🇧🇸', phone: '+1-242' },
    { code: 'BB', name: 'Barbados', flag: '🇧🇧', phone: '+1-246' },
    { code: 'JM', name: 'Jamaica', flag: '🇯🇲', phone: '+1-876' },
    { code: 'TT', name: 'Trinidad & Tobago', flag: '🇹🇹', phone: '+1-868' },
    { code: 'HT', name: 'Haiti', flag: '🇭🇹', phone: '+509' },
    { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', phone: '+1-809' },
    { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', phone: '+506' },
    { code: 'PA', name: 'Panama', flag: '🇵🇦', phone: '+507' },
    { code: 'GT', name: 'Guatemala', flag: '🇬🇹', phone: '+502' },
    { code: 'HN', name: 'Honduras', flag: '🇭🇳', phone: '+504' },
    { code: 'SV', name: 'El Salvador', flag: '🇸🇻', phone: '+503' },
    { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', phone: '+505' },
    { code: 'CU', name: 'Cuba', flag: '🇨🇺', phone: '+53' },
    { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', phone: '+1-787' },
    { code: 'GY', name: 'Guyana', flag: '🇬🇾', phone: '+592' },
    { code: 'SR', name: 'Suriname', flag: '🇸🇷', phone: '+597' },
    { code: 'BZ', name: 'Belize', flag: '🇧🇿', phone: '+501' },
    { code: 'MC', name: 'Monaco', flag: '🇲🇨', phone: '+377' },
    { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', phone: '+423' },
    { code: 'AD', name: 'Andorra', flag: '🇦🇩', phone: '+376' },
    { code: 'SM', name: 'San Marino', flag: '🇸🇲', phone: '+378' },
    { code: 'VA', name: 'Vatican City', flag: '🇻🇦', phone: '+379' },
    { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴', phone: '+298' },
    { code: 'GL', name: 'Greenland', flag: '🇬🇱', phone: '+299' },
    { code: 'GI', name: 'Gibraltar', flag: '🇬🇮', phone: '+350' },
    { code: 'AL', name: 'Albania', flag: '🇦🇱', phone: '+355' },
    { code: 'BA', name: 'Bosnia & Herzegovina', flag: '🇧🇦', phone: '+387' },
    { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', phone: '+389' },
    { code: 'ME', name: 'Montenegro', flag: '🇲🇪', phone: '+382' },
    { code: 'XK', name: 'Kosovo', flag: '🇽🇰', phone: '+383' },
  ],

  // States/provinces for major countries
  states: {
    US: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
      'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
      'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      'District of Columbia'
    ],
    CA: [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
      'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island',
      'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'
    ],
    GB: [
      'England', 'Scotland', 'Wales', 'Northern Ireland',
      'London', 'South East', 'South West', 'East of England',
      'West Midlands', 'East Midlands', 'Yorkshire and the Humber',
      'North West', 'North East'
    ],
    AU: [
      'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
      'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'
    ],
    DE: [
      'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen',
      'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern',
      'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland',
      'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    FR: [
      'Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine',
      'Occitanie', 'Hauts-de-France', 'Grand Est', 'Provence-Alpes-Côte d\'Azur',
      'Pays de la Loire', 'Brittany', 'Normandy', 'Bourgogne-Franche-Comté',
      'Centre-Val de Loire', 'Corsica'
    ],
    IN: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
      'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
      'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
      'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ],
    BR: [
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
      'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
      'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
      'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
      'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
    ],
    MX: [
      'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
      'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango',
      'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán',
      'Morelos', 'México', 'Nayarit', 'Nuevo León', 'Oaxaca',
      'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
      'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
      'Yucatán', 'Zacatecas', 'Ciudad de México'
    ],
    IT: [
      'Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata', 'Calabria',
      'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio',
      'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont',
      'Sardinia', 'Sicily', 'Trentino-South Tyrol', 'Tuscany',
      'Umbria', 'Veneto'
    ],
    ES: [
      'Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country',
      'Canary Islands', 'Cantabria', 'Castile and León', 'Castile-La Mancha',
      'Catalonia', 'Extremadura', 'Galicia', 'Madrid', 'Murcia',
      'Navarre', 'La Rioja', 'Valencian Community'
    ],
    JP: [
      'Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata',
      'Fukushima', 'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba',
      'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa', 'Fukui',
      'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi', 'Mie',
      'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama',
      'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi',
      'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga',
      'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'
    ],
    CN: [
      'Beijing', 'Tianjin', 'Hebei', 'Shanxi', 'Inner Mongolia',
      'Liaoning', 'Jilin', 'Heilongjiang', 'Shanghai', 'Jiangsu',
      'Zhejiang', 'Anhui', 'Fujian', 'Jiangxi', 'Shandong',
      'Henan', 'Hubei', 'Hunan', 'Guangdong', 'Guangxi',
      'Hainan', 'Chongqing', 'Sichuan', 'Guizhou', 'Yunnan',
      'Tibet', 'Shaanxi', 'Gansu', 'Qinghai', 'Ningxia', 'Xinjiang'
    ],
    KR: [
      'Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon',
      'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon', 'Chungcheongbuk',
      'Chungcheongnam', 'Jeollabuk', 'Jeollanam', 'Gyeongsangbuk', 'Gyeongsangnam',
      'Jeju'
    ],
    NG: [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
      'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
      'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa',
      'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
      'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
      'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ],
    ZA: [
      'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
      'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'
    ],
    RU: [
      'Moscow', 'Saint Petersburg', 'Adygea', 'Bashkortostan', 'Buryatia',
      'Chechnya', 'Chuvashia', 'Dagestan', 'Ingushetia', 'Kabardino-Balkaria',
      'Kalmykia', 'Karachay-Cherkessia', 'Karelia', 'Khakassia', 'Komi',
      'Mari El', 'Mordovia', 'North Ossetia', 'Tatarstan', 'Tuva',
      'Udmurtia', 'Sakha', 'Altai Krai', 'Kamchatka Krai', 'Khabarovsk Krai',
      'Krasnodar Krai', 'Krasnoyarsk Krai', 'Perm Krai', 'Primorsky Krai',
      'Stavropol Krai', 'Zabaykalsky Krai', 'Amur Oblast', 'Arkhangelsk Oblast'
    ],
    AE: [
      'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain',
      'Ras Al Khaimah', 'Fujairah'
    ],
    SA: [
      'Riyadh', 'Makkah', 'Madinah', 'Eastern Province', 'Asir',
      'Tabuk', 'Ha\'il', 'Northern Borders', 'Jizan', 'Najran',
      'Al Bahah', 'Al Jawf', 'Al Qassim'
    ],
    TR: [
      'Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Adana',
      'Gaziantep', 'Konya', 'Mersin', 'Diyarbakır', 'Hatay', 'Manisa',
      'Kayseri', 'Samsun', 'Balıkesir', 'Kahramanmaraş', 'Van', 'Aydın',
      'Denizli', 'Eskişehir', 'Trabzon', 'Ordu', 'Malatya', 'Erzurum'
    ],
    AR: [
      'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
      'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa',
      'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
      'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe',
      'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
    ],
    CO: [
      'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar',
      'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar',
      'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare',
      'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
      'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
      'San Andrés', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
      'Vaupés', 'Vichada', 'Bogotá'
    ],
    PH: [
      'Metro Manila', 'Cordillera', 'Ilocos', 'Cagayan Valley',
      'Central Luzon', 'CALABARZON', 'MIMAROPA', 'Bicol',
      'Western Visayas', 'Central Visayas', 'Eastern Visayas',
      'Zamboanga Peninsula', 'Northern Mindanao', 'Davao',
      'SOCCSKSARGEN', 'Caraga', 'Bangsamoro'
    ],
    TH: [
      'Bangkok', 'Central Thailand', 'Eastern Thailand', 'Northern Thailand',
      'Northeastern Thailand (Isan)', 'Southern Thailand', 'Western Thailand'
    ],
    VN: [
      'An Giang', 'Bà Rịa-Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
      'Bắc Ninh', 'Bến Tre', 'Bình Dương', 'Bình Định', 'Bình Phước',
      'Bình Thuận', 'Cà Mau', 'Cao Bằng', 'Đắk Lắk', 'Đắk Nông',
      'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang',
      'Hà Nam', 'Hà Tĩnh', 'Hải Dương', 'Hậu Giang', 'Hòa Bình',
      'Hưng Yên', 'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu',
      'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
      'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên',
      'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị',
      'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
      'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'Trà Vinh', 'Tuyên Quang',
      'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái', 'Hà Nội', 'Hồ Chí Minh City',
      'Cần Thơ', 'Đà Nẵng', 'Hải Phòng'
    ],
    PK: [
      'Azad Kashmir', 'Balochistan', 'Gilgit-Baltistan', 'Islamabad',
      'Khyber Pakhtunkhwa', 'Punjab', 'Sindh'
    ],
    BD: [
      'Barisal', 'Chittagong', 'Dhaka', 'Khulna', 'Mymensingh',
      'Rajshahi', 'Rangpur', 'Sylhet'
    ],
  },

  /**
   * Get flag emoji for a country code
   */
  getFlag(code) {
    const country = this.list.find(c => c.code === code);
    return country ? country.flag : '🌍';
  },

  /**
   * Get country name from code
   */
  getName(code) {
    const country = this.list.find(c => c.code === code);
    return country ? country.name : code;
  },

  /**
   * Get states for a country code
   */
  getStates(code) {
    return this.states[code] || [];
  },

  /**
   * Render country select options HTML
   */
  renderOptions(selectedCode = '') {
    return this.list.map(c => 
      `<option value="${c.code}" ${c.code === selectedCode ? 'selected' : ''}>${c.flag} ${c.name}</option>`
    ).join('');
  },

  /**
   * Render state/province select options HTML
   */
  renderStateOptions(countryCode, selectedState = '') {
    const states = this.getStates(countryCode);
    if (states.length === 0) {
      return '<option value="">No states/provinces listed</option>';
    }
    return states.map(s => 
      `<option value="${s}" ${s === selectedState ? 'selected' : ''}>${s}</option>`
    ).join('');
  }
};
