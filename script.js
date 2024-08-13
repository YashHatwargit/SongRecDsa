
class Song {
    constructor(name, singer, genre, subGenre, language, year, filmOrAlbum) {
        this.name = name;
        this.singer = singer;
        this.genre = genre;
        this.subGenre = subGenre;
        this.language = language;
        this.year = year;
        this.filmOrAlbum = filmOrAlbum;
    }
}

let songMap = []; // Array to hold Song objects
let currentSuggestions = []; // Array to hold suggestions
let currentSuggestionIndex = -1; // Index of the current suggestion
let playedSongs = new Set(); // Set to keep track of played songs

// Function to populate song list
function populateSongList() {
    const songListUl = document.getElementById('songList');
    for (let i = 0; i < songMap.length; i++) {
        const song = songMap[i];
        const listItem = document.createElement('li');

        const songNameSpan = document.createElement('span');
        songNameSpan.textContent = song.name;
        songNameSpan.className = 'song-name';

        const singerNameSpan = document.createElement('span');
        singerNameSpan.textContent = `🎤 ${song.singer}`;
        singerNameSpan.className = 'singer-name';

        listItem.appendChild(songNameSpan);
        listItem.appendChild(singerNameSpan);

        listItem.onclick = function() {
            showSuggestionBox(i);
        };

        songListUl.appendChild(listItem);
    }
}

function showSuggestionBox(songId) {
    const suggestionBox = document.getElementById('suggestionBox');
    const currentSongName = document.getElementById('currentSongName');
    const singerName = document.getElementById('singerName');
    const albumName = document.getElementById('albumName');
    const audioPlayer = document.getElementById('audioPlayer');

    currentSongName.textContent = songMap[songId].name;
    singerName.innerHTML = `🎤 ${songMap[songId].singer}`;
    albumName.innerHTML = `💿 ${songMap[songId].filmOrAlbum}`;
    audioPlayer.src = getLocalSongLink(songId + 1);
    suggestionBox.style.display = 'block';
    suggestionBox.dataset.currentSongId = songId; // Store current song ID
}

function getLocalSongLink(fileId) {
    return `music/${fileId}.mp3`;
}

// Function to play the selected song
function playSong() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    
    const currentSongId = parseInt(document.getElementById('suggestionBox').dataset.currentSongId);
    if (!playedSongs.has(currentSongId)) {
        playedSongs.add(currentSongId);
        // Calculate suggestions based on the played song
        calculateSuggestions(currentSongId);
    }
}

// Function to calculate matching points for suggestions
function calculateSuggestions(songId) {
    currentSuggestions = [];
    let matchingPoints = [];
    for (let i = 0; i < songMap.length; i++) {
        if (i !== songId && !playedSongs.has(i)) {
            let points = calculateMatchingPoints(songMap[songId], songMap[i]);
            matchingPoints.push({ songId: i, points: points });
        }
    }

    // Sort the songs based on matching points
    matchingPoints.sort((a, b) => b.points - a.points);
    currentSuggestions = matchingPoints;
    currentSuggestionIndex = -1; // Reset index for new set of suggestions
}

// Function to suggest the next song based on the current suggestions
function suggestNext() {
    if (currentSuggestions.length === 0) {
        alert("No more songs to suggest.");
        return;
    }

    currentSuggestionIndex++;
    if (currentSuggestionIndex >= currentSuggestions.length) {
        currentSuggestionIndex = 0; 
    }

    const nextSongId = currentSuggestions[currentSuggestionIndex].songId;
    console.log(`Next suggested song: ${songMap[nextSongId].name} with ${currentSuggestions[currentSuggestionIndex].points} matching points`);
    showSuggestionBox(nextSongId);
}

// Function to calculate matching points with weighted criteria
function calculateMatchingPoints(song1, song2) {
    let points = 0;
    if (song1.singer === song2.singer) points += 10;  // Singer match
    if (song1.genre === song2.genre) points += 7;   // Genre match
    if (song1.subGenre === song2.subGenre) points += 7;   // Sub-genre match
    if (song1.language === song2.language) points += 5;   // Language match
    if (song1.year === song2.year) points += 5;   // Year match
    else if ((song1.year < 2000 && song2.year < 2000) || 
             (song1.year >= 2000 && song1.year <= 2015 && song2.year >= 2000 && song2.year <= 2015) || 
             (song1.year > 2015 && song2.year > 2015)) points += 3; // Year range match
    if (song1.filmOrAlbum === song2.filmOrAlbum) points += 5;   // Film match
    return points;
}

// Initialize songMap with Song objects
 songMap = [
    // Initial 50 songs...
    new Song("Shape of You", "Ed Sheeran", "Pop", "Love", "English", 2017, "Divide"),
    new Song("Love Story", "Taylor Swift", "Country", "Love", "English", 2008, "Fearless"),
    new Song("Someone Like You", "Adele", "Pop", "Sad", "English", 2011, "21"),
    new Song("Channa Mereya", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2016, "Ae Dil Hai Mushkil"),
    new Song("Sorry", "Justin Bieber", "Pop", "Party", "English", 2015, "Purpose"),
    new Song("She Wolf", "Shakira", "Pop", "Party", "English", 2009, "She Wolf"),
    new Song("Bad Romance", "Lady Gaga", "Pop", "Party", "English", 2008, "The Fame"),
    new Song("Drunk in Love", "Beyonce", "Pop", "Love", "English", 2013, "Beyonce"),
    new Song("Diamonds", "Rihanna", "Pop", "Party", "English", 2012, "Unapologetic"),
    new Song("Same Old Love", "Selena Gomez", "Pop", "Love", "English", 2015, "Revival"),
    new Song("New Rules", "Dua Lipa", "Pop", "Party", "English", 2017, "Dua Lipa"),
    new Song("Hotline Bling", "Drake", "Rap", "Party", "English", 2016, "Views"),
    new Song("Cleanin' Out My Closet", "Eminem", "Rap", "Sad", "English", 2002, "The Eminem Show"),
    new Song("Chaiyya Chaiyya", "AR Rahman", "Bollywood", "Classical", "Hindi", 1998, "Dil Se"),
    new Song("DNA", "BTS", "K-Pop", "Party", "Korean", 2017, "Love Yourself"),
    new Song("Fix You", "Coldplay", "Alternative", "Love", "English", 2005, "X&Y"),
    new Song("24k Magic", "Bruno Mars", "Pop", "Party", "English", 2016, "24k Magic"),
    new Song("California Gurls", "Katy Perry", "Pop", "Party", "English", 2010, "Teenage Dream"),
    new Song("In My Blood", "Shawn Mendes", "Pop", "Love", "English", 2018, "Shawn Mendes"),
    new Song("Bad Guy", "Billie Eilish", "Pop", "Sad", "English", 2019, "When We All Fall Asleep, Where Do We Go?"),
    new Song("Numb", "Linkin Park", "Rock", "Sad", "English", 2003, "Meteora"),
    new Song("Story of My Life", "One Direction", "Pop", "Love", "English", 2013, "Midnight Memories"),
    new Song("Wake Me Up", "Avicii", "Electronic", "Party", "English", 2013, "True"),
    new Song("Can't Feel My Face", "The Weeknd", "R&B", "Party", "English", 2015, "Beauty Behind the Madness"),
    new Song("Stay with Me", "Sam Smith", "Pop", "Sad", "English", 2014, "In the Lonely Hour"),
    new Song("Tum Hi Ho", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2013, "Aashiqui 2"),
    new Song("Piyu Bole", "Shreya Ghoshal", "Bollywood", "Romantic", "Hindi", 2005, "Parineeta"),
    new Song("Thinking Out Loud", "Ed Sheeran", "Pop", "Love", "English", 2014, "x"),
    new Song("Payphone", "Maroon 5", "Pop", "Love", "English", 2012, "Overexposed"),
    new Song("Shake It Off", "Taylor Swift", "Pop", "Love", "English", 2014, "1989"),
    new Song("Sexyback", "Justin Timberlake", "Pop", "Party", "English", 2006, "FutureSex/LoveSounds"),
    new Song("I Will Always Love You", "Whitney Houston", "R&B", "Love", "English", 1992, "The Bodyguard"),
    new Song("My Heart Will Go On", "Celine Dion", "Pop", "Love", "English", 1997, "Titanic"),
    new Song("Beat It", "Michael Jackson", "Pop", "Party", "English", 1982, "Thriller"),
    new Song("Like a Virgin", "Madonna", "Pop", "Party", "English", 1984, "Like a Virgin"),
    new Song("Candle in the Wind", "Elton John", "Pop", "Sad", "English", 1997, "Candle in the Wind"),
    new Song("With or Without You", "U2", "Rock", "Sad", "English", 1987, "The Joshua Tree"),
    new Song("Bohemian Rhapsody", "Queen", "Rock", "Party", "English", 1975, "A Night at the Opera"),
    new Song("Livin' on a Prayer", "Bon Jovi", "Rock", "Party", "English", 1986, "Slippery When Wet"),
    new Song("Lucy in the Sky with Diamonds", "The Beatles", "Rock", "Love", "English", 1967, "Sgt. Pepper's Lonely Hearts Club Band"),
    new Song("Tumblin' Dice", "The Rolling Stones", "Rock", "Party", "English", 1972, "Exile on Main St."),
    new Song("Smells Like Teen Spirit", "Nirvana", "Rock", "Sad", "English", 1991, "Nevermind"),
    new Song("Enter Sandman", "Metallica", "Rock", "Party", "English", 1991, "Metallica"),
    new Song("You Shook Me All Night Long", "AC/DC", "Rock", "Party", "English", 1980, "Back in Black"),
    new Song("Hotel California", "Eagles", "Rock", "Sad", "English", 1976, "Hotel California"),
    new Song("What's Love Got to Do with It", "Tina Turner", "Rock", "Love", "English", 1984, "Private Dancer"),
    new Song("Time", "Pink Floyd", "Rock", "Sad", "English", 1973, "The Dark Side of the Moon"),
    new Song("Hello", "Adele", "Pop", "Sad", "English", 2015, "25"),
    new Song("Treat You Better", "Shawn Mendes", "Pop", "Love", "English", 2016, "Illuminate"),
    new Song("Work", "Rihanna", "Pop", "Party", "English", 2016, "Anti"),

    // Additional 30 songs...
    new Song("Galliyan", "Ankit Tiwari", "Bollywood", "Romantic", "Hindi", 2014, "Ek Villain"),
    new Song("Hasi Ban Gaye", "Ami Mishra", "Bollywood", "Romantic", "Hindi", 2015, "Hamari Adhuri Kahani"),
    new Song("Sun Saathiya", "Priya Saraiya", "Bollywood", "Romantic", "Hindi", 2015, "ABCD 2"),
    new Song("Sanam Re", "Mithoon", "Bollywood", "Romantic", "Hindi", 2016, "Sanam Re"),
    new Song("Raabta", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2012, "Agent Vinod"),
    new Song("Tujhe Kitna Chahne Lage", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2019, "Kabir Singh"),
    new Song("Kaise Hua", "Vishal Mishra", "Bollywood", "Romantic", "Hindi", 2019, "Kabir Singh"),
    new Song("Pachtaoge", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2019, "Jabariya Jodi"),
    new Song("Tum Hi Aana", "Payal Dev", "Bollywood", "Romantic", "Hindi", 2019, "Marjaavaan"),
    new Song("Tera Ban Jaunga", "Akhil Sachdeva", "Bollywood", "Romantic", "Hindi", 2019, "Kabir Singh"),
    new Song("Tera Yaar Hoon Main", "Arijit Singh", "Bollywood", "Friendship", "Hindi", 2018, "Sonu Ke Titu Ki Sweety"),
    new Song("Khairiyat", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2019, "Chhichhore"),
    new Song("Bekhayali", "Sachet Tandon", "Bollywood", "Romantic", "Hindi", 2019, "Kabir Singh"),
    new Song("Duniyaa", "Akhil Sachdeva", "Bollywood", "Romantic", "Hindi", 2019, "Luka Chuppi"),
    new Song("Tere Bin", "Atif Aslam", "Bollywood", "Romantic", "Hindi", 2019, "Simmba"),
    new Song("Ve Maahi", "Asees Kaur", "Bollywood", "Romantic", "Hindi", 2019, "Kesari"),
    new Song("Mere Sohneya", "Vishal Mishra", "Bollywood", "Romantic", "Hindi", 2019, "Kabir Singh"),
    new Song("Dil Diyan Gallan", "Atif Aslam", "Bollywood", "Romantic", "Hindi", 2019, "Bharat"),
    new Song("Akh Lad Jaave", "Badshah", "Bollywood", "Party", "Hindi", 2018, "Loveyatri"),
    new Song("Chal Ghar Chalen", "Jubin Nautiyal", "Bollywood", "Romantic", "Hindi", 2020, "Malang"),
    new Song("Thodi Jagah", "Arijit Singh", "Bollywood", "Romantic", "Hindi", 2020, "Marjaavaan"),
    new Song("Garmi", "Neha Kakkar", "Bollywood", "Party", "Hindi", 2020, "Street Dancer 3D"),
    new Song("Muqabla", "A. R. Rahman", "Bollywood", "Party", "Hindi", 2020, "Street Dancer 3D"),
    new Song("Illegal Weapon 2.0", "Jassie Gill", "Bollywood", "Party", "Hindi", 2020, "Street Dancer 3D"),
    new Song("Dus Bahane 2.0", "Vishal-Shekhar", "Bollywood", "Party", "Hindi", 2020, "Baaghi 3"),
    new Song("Lagdi Lahore Di", "Guru Randhawa", "Bollywood", "Party", "Hindi", 2020, "Street Dancer 3D"),
    new Song("Lut Gaye", "Tanishk Bagchi", "Bollywood", "Party", "Hindi", 2020, "Street Dancer 3D"),
    new Song("Baarish", "Jubin Nautiyal", "Bollywood", "Romantic", "Hindi", 2021, "Marjaavaan"),
    new Song("Sakhiyan 2.0", "Stebin Ben", "Bollywood", "Romantic", "Hindi", 2021, "Half Girlfriend"),
    new Song("Raataan Lambiyan", "Jubin Nautiyal", "Bollywood", "Romantic", "Hindi", 2021, "Shershaah")
];

populateSongList();
