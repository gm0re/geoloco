// some countries have no streetview data so it's better to exclude them
const blacklistedCountries = [
  'afghanistan',
  'angola',
  'anguilla',
  'aland', // TODO: clean polygons
  'united-arab-emirates', // TODO: clean up boundaries
  'armenia', // TODO: clean up boundaries
  'american-samoa', // TODO: review
  'antarctica',
  'ashmore-and-cartier-islands',
  'french-southern-and-antarctic-lands',
  'antigua-and-barbuda',
  'azerbaijan', // TODO: review boundaries
  'burundi',
  'benin',
  'burkina-faso',
  'bangladesh',
  'the-bahamas',
  'bosnia-and-herzegovina',
  'bajo-nuevo-bank-(petrel-is.)',
  'saint-barthelemy',
  'belarus',
  'belize',
  'brunei',
  'bhutan',
  'central-african-republic',
  'canada', // TOOD: review boundaries
  'chile', // TODO: review boundaries
  'china',
  'ivory-coast',
  'clipperton-island',
  'cameroon',
  'cyprus-no-mans-area', // TODO: review site
  'democratic-republic-of-the-congo',
  'republic-of-congo',
  'cook-islands',
  'comoros',
  'cape-verde',
  'costa-rica', // TODO: review boundaries
  'coral-sea-islands',
  'cuba',
  'northern-cyprus',
  'djibouti',
  'dominica',
  'dominican-republic', // TODO: review boundaries
  'algeria',
  'egypt', // TODO: review boundaries
  'eritrea',
  'dhekelia-sovereign-base-area',
  'ethiopia',
  'fiji', // TODO: review boundaries
  'falkland-islands',
  'federated-states-of-micronesia',
  'gabon',
  'georgia', // TODO: review boundaries
  'guernsey',
  'guinea',
  'gambia',
  'guinea-bissau',
  'equatorial-guinea',
  'grenada',
  'greenland', // TODO: review boundaries
  'guyana',
  'heard-island-and-mcdonald-islands',
  'honduras',
  'haiti',
  'india', // TODO: review boundaries
  'indian-ocean-territories',
  'british-indian-ocean-territory',
  'iran',
  'iraq',
  'jamaica',
  'jersey',
  'baykonur-cosmodrome',
  'siachen-glacier',
  'kazakhstan',
  'kiribati',
  'saint-kitts-and-nevis',
  'kosovo',
  'kuwait', // TODO: review boundaries
  'laos',
  'liberia',
  'libya',
  'saint-lucia',
  'liechtenstein',
  'saint-martin',
  'morocco',
  'moldova',
  'madagascar',
  'maldives',
  'marshall-islands',
  'mali',
  'myanmar', // TODO: review boundaries
  'northern-mariana-islands',
  'mozambique',
  'mauritania',
  'montserrat',
  'mauritius',
  'malawi',
  'namibia', // TODO: review boundaries
  'new-caledonia',
  'niger',
  'norfolk-island',
  'nigeria', // TODO: review boundaries
  'nicaragua',
  'niue',
  'nepal', // TODO: review boundaries
  'nauru',
  'oman', // TODO: review boundaries
  'pakistan', // TODO: review boundaries
  'pitcairn-islands',
  'spratly-islands',
  'palau',
  'papua-new-guinea',
  'north-korea',
  'russia', // TODO: review boundaries
  'rwanda',
  'western-sahara',
  'saudi-arabia', // TODO: review boundaries
  'scarborough-reef',
  'sudan',
  'south-sudan',
  'serranilla-bank',
  'south-georgia-and-south-sandwich-islands',
  'saint-helena',
  'solomon-islands',
  'sierra-leone',
  'el-salvador',
  'somalia',
  'sao-tome-and-principe',
  'suriname',
  'sint-maarten',
  'seychelles',
  'syria',
  'turks-and-caicos-islands',
  'chad',
  'togo',
  'tajikistan',
  'turkmenistan',
  'east-timor',
  'tonga',
  'trinidad-and-tobago', // TODO: review boundaries
  'tunisia', // TODO: review boundaries
  'tuvalu',
  'united-republic-of-tanzania', // TODO: review boundaries
  'uganda', // TODO: review boundaries
  'united-states-minor-outlying-islands',
  'us-naval-base-guantanamo-bay',
  'uzbekistan',
  'saint-vincent-and-the-grenadines',
  'venezuela',
  'british-virgin-islands',
  'vanuatu',
  'wallis-and-futuna',
  'yemen',
  'zambia',
  'zimbabwe', // TODO: review boundaries
];

module.exports = blacklistedCountries;
