const maleFirstNames = [
    // Traditional American Names
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth',
    'George', 'Joshua', 'Kevin', 'Brian', 'Edward', 'Ronald', 'Timothy', 'Jason', 'Jeffrey', 'Ryan',
    'Jacob', 'Gary', 'Nicholas', 'Eric', 'Stephen', 'Jonathan', 'Larry', 'Justin', 'Scott', 'Brandon',
    'Benjamin', 'Samuel', 'Frank', 'Gregory', 'Raymond', 'Alexander', 'Patrick', 'Jack', 'Dennis', 'Jerry',
    'Tyler', 'Aaron', 'Jose', 'Adam', 'Henry', 'Nathan', 'Douglas', 'Zachary', 'Peter', 'Kyle',
    'Walter', 'Ethan', 'Jeremy', 'Harold', 'Keith', 'Christian', 'Roger', 'Noah', 'Gerald', 'Carl',
    'Terry', 'Sean', 'Austin', 'Arthur', 'Lawrence', 'Jesse', 'Dylan', 'Bryan', 'Joe', 'Jordan',
    'Billy', 'Bruce', 'Albert', 'Willie', 'Gabriel', 'Logan', 'Alan', 'Juan', 'Wayne', 'Roy',
    'Ralph', 'Randy', 'Eugene', 'Vincent', 'Russell', 'Elijah', 'Louis', 'Bobby', 'Philip', 'Johnny',
    // Modern American Names
    'Mason', 'Lucas', 'Aiden', 'Owen', 'Hunter', 'Caleb', 'Wyatt', 'Isaac', 'Luke', 'Oliver',
    'Levi', 'Jayden', 'Julian', 'Landon', 'Gavin', 'Carson', 'Jaxon', 'Miles', 'Micah', 'Blake',
    'Chase', 'Cooper', 'Easton', 'Maddox', 'Kai', 'Axel', 'Ryder', 'Asher', 'Hudson', 'Ezra',
    'Bentley', 'Dominic', 'Jace', 'Roman', 'Silas', 'Josiah', 'Colton', 'Cole', 'Brayden', 'Emmett',
    'Knox', 'Declan', 'Braxton', 'Grayson', 'Brooks', 'Sawyer', 'Finn', 'Zion', 'Atlas', 'Nash',
    'Caden', 'Leo', 'Rhett', 'Reid', 'Tate', 'Jude', 'Cash', 'Theo', 'Drake', 'Holden',
    'Tucker', 'Tanner', 'Parker', 'Brody', 'Kaden', 'Thaddeus', 'Titus', 'Crew', 'Rowan', 'Gage',
    'Kaiden', 'Zane', 'Seth', 'Felix', 'Wade', 'Trent', 'Drew', 'Colt', 'Quinn', 'King',
    'Blaine', 'Cody', 'Chance', 'Heath', 'Raiden', 'Otto', 'Ridge', 'Vance', 'Kash', 'Clark',
    'Rory', 'Ace', 'Cruz', 'Beau', 'Kyler', 'Lane', 'Ryker', 'Nico', 'Tripp', 'Knox'
];

const maleSurnames = [
    // Traditional American Surnames
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson',
    'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
    'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright',
    'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner',
    'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Morris', 'Murphy', 'Cook',
    'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard',
    'Ward', 'Cox', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes',
    'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell',
    'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Carroll', 'Robertson', 'Tran', 'Hawkins', 'Hansen', 'Castro',
    'Sutton', 'Gregory', 'McKenzie', 'Marshall', 'Guerrero', 'Carr', 'Vasquez', 'Stanley', 'Hopkins', 'Ramos',
    // Modern American Surnames
    'Fisher', 'Fox', 'Hayes', 'Pearson', 'Reynolds', 'Hamilton', 'Graham', 'Hudson', 'West', 'Mason',
    'Black', 'Wallace', 'Stone', 'Knight', 'Palmer', 'Meyer', 'Mills', 'Rose', 'Chapman', 'Hunt',
    'Ellis', 'Wheeler', 'Dixon', 'Cole', 'Gordon', 'Wagner', 'Hunter', 'Robertson', 'Barrett', 'Freeman',
    'Warren', 'Webb', 'Porter', 'Hicks', 'Walsh', 'Fowler', 'Horton', 'Bishop', 'Silva', 'Walsh',
    'Zimmerman', 'Stephens', 'Payne', 'Ball', 'Bond', 'Morse', 'Barker', 'Woods', 'Briggs', 'Kennedy',
    'Lawson', 'Lynch', 'Hale', 'Garrett', 'Floyd', 'Larson', 'Burke', 'Wade', 'Bridges', 'Gibson',
    'Keller', 'Holt', 'Cunningham', 'Walton', 'Parks', 'Nash', 'Blair', 'Whitaker', 'Cross', 'Gentry',
    'Graves', 'Fischer', 'Ray', 'Steele', 'Wilkins', 'Sharp', 'Cannon', 'Drake', 'Mack', 'Tate',
    'Pratt', 'Wise', 'Shepherd', 'Abbott', 'Flynn', 'Frost', 'Gallagher', 'Stokes', 'Stark', 'Decker',
    'Buckley', 'Rich', 'Bradford', 'Kirby', 'Heath', 'Hancock', 'Sloan', 'York', 'Booth', 'Barton'
];

// API Keys for OpenCage Geocoding
const apiKeys = [
    '5a05c7a4e94349d0a6c9802bd1db8a9d',
    '4ee9481fb5d44428b234f033847d5ed4',
    '6c63bd3912ff498bb3b7f4ff0fd8cfd1',
    'cf446df9fc9d4049b3e873d92a357303',
    '0e4fa50c86244a0b981754814f5c511b',
    'bc2404edaad14979a584b7b3bb6f8feb',
    '9c9c50482f1a4a7ca5f8994e971c6142'
];

// Major Cities with Latitude and Longitude
const majorCities = {
    us: [
        { city: 'New York', lat: 40.7128, lng: -74.0060 },
        { city: 'Texas', lat: 31.9686, lng: -99.9018 },
        { city: 'California', lat: 36.7783, lng: -119.4179 },
        { city: 'Georgia', lat: 32.1656, lng: -82.9001 },
        { city: 'Florida', lat: 27.6648, lng: -81.5158 },
        { city: 'Washington', lat: 47.7511, lng: -120.7401 },
        { city: 'Virginia', lat: 37.4316, lng: -78.6569 }
    ],
    ca: [
        { city: 'Toronto', lat: 43.651070, lng: -79.347015 },
        { city: 'Montreal', lat: 45.501689, lng: -73.567256 },
        { city: 'Vancouver', lat: 49.2827, lng: -123.1207 }
    ],
    gb: [
        { city: 'London', lat: 51.5074, lng: -0.1278 },
        { city: 'Manchester', lat: 53.4808, lng: -2.2426 },
        { city: 'Edinburgh', lat: 55.9533, lng: -3.1883 }
    ]
};

let addressCount = 0;

export const getRandomName = () => {
    const firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
    const lastName = maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
    return `${firstName} ${lastName}`;
};

// Function to generate a random birth date
function generateRandomBirthDate(age) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    let birthYear = currentYear - age;
    let birthMonth = Math.floor(Math.random() * 12);
    let birthDay = Math.floor(Math.random() * 28) + 1;

    // Adjust age based on whether birthday has occurred this year
    if (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)) {
        birthYear--; // Birthday hasn't occurred this year, so subtract 1 from age
    }

    const birthDate = new Date(birthYear, birthMonth, birthDay);
    const actualAge = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));

    // Format the date string
    const formattedDate = birthDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    return {
        formattedDate,
        actualAge,
        birthYear,
        birthMonth: birthMonth + 1, // Adding 1 because months are 0-based
        birthDay
    };
}

export const generateRandomPerson = async (age, country) => {
    try {
        if (!age || age < 30 || age > 55) {
            throw new Error('Age must be between 30 and 55');
        }

        if (!majorCities[country]) {
            throw new Error('Invalid country selection');
        }

        // Generate birth date and calculate actual age
        const birthDateInfo = generateRandomBirthDate(age);
        const ageDisplay = `${birthDateInfo.actualAge} (${birthDateInfo.formattedDate})`;

        // Get random city data
        const cities = majorCities[country];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];

        // Generate random latitude and longitude within the bounds of the selected city
        const lat = randomCity.lat + (Math.random() * 0.1 - 0.05);
        const lng = randomCity.lng + (Math.random() * 0.1 - 0.05);

        // Try each API key until one works
        for (const apiKey of apiKeys) {
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    const result = data.results[0];

                    // Extract address components
                    const address = result.formatted;
                    const city = result.components.city || result.components.town || result.components.village;
                    const state = result.components.state;
                    const zip = result.components.postcode;

                    // Check if any field is undefined
                    if (!address || !city || !state || !zip) {
                        console.warn('Some fields are undefined. Retrying...');
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        return generateRandomPerson(age, country);
                    }

                    return {
                        name: getRandomName(),
                        age: ageDisplay,
                        country: country.toUpperCase(),
                        address,
                        city,
                        state,
                        zip
                    };
                }
            } catch (error) {
                console.error('Error fetching data with API key:', apiKey, error);
            }
        }

        throw new Error('Failed to generate address. Please try again.');
    } catch (error) {
        throw error;
    }
};