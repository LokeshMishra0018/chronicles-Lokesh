// Update date and time
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);

    timeElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    this.classList.toggle('fa-times');
    this.classList.toggle('fa-bars');
});

// Category tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.category-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
    });
});

// Load more button functionality
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;

loadMoreBtn.addEventListener('click', function () {
    currentPage++;
    this.textContent = 'Loading...';
    this.disabled = true;

    // Simulate loading more news
    setTimeout(() => {
        const newsGrid = document.querySelector('.news-grid');
        const newArticles = [
            {
                category: 'politics',
                title: 'New Legislation Proposed to Reform Education System',
                desc: 'Lawmakers introduce comprehensive bill aimed at modernizing national education standards and increasing funding.',
                time: '10 hours ago',
                comments: 7
            },
            {
                category: 'health',
                title: 'Study Links Exercise to Improved Mental Health',
                desc: 'New research confirms strong connection between regular physical activity and reduced symptoms of depression and anxiety.',
                time: '12 hours ago',
                comments: 14
            },
            {
                category: 'technology',
                title: 'Major Software Update Released for Popular Apps',
                desc: 'Several leading mobile applications receive significant updates with new features and security improvements.',
                time: '14 hours ago',
                comments: 23
            }
        ];

        newArticles.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'news-card';
            articleElement.innerHTML = `
                                <img src="https://source.unsplash.com/random/400x300/?${article.category}" alt="News Image">
                                <div class="news-content">
                                    <span class="category ${article.category}">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                                    <h3><a href="#">${article.title}</a></h3>
                                    <p>${article.desc}</p>
                                    <div class="meta">
                                        <span><i class="far fa-clock"></i> ${article.time}</span>
                                        <span><i class="far fa-comment"></i> ${article.comments} comments</span>
                                    </div>
                                </div>
                            `;
            newsGrid.appendChild(articleElement);
        });

        this.textContent = 'Load More News';
        this.disabled = false;

        // Scroll to show new content
        window.scrollBy(0, 300);
    }, 1000);
});

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Trigger when counter is in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.counter-number').forEach(counter => {
    observer.observe(counter);
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    this.innerHTML = document.body.classList.contains('dark-mode') ?
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Check for saved preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
const successMessage = document.querySelector('.success-message');

newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');

    if (!emailInput.value || !emailInput.value.includes('@')) {
        emailInput.style.border = '2px solid #e74c3c';
        emailInput.placeholder = 'Please enter a valid email';
        return;
    }

    // Simulate submission
    this.style.display = 'none';
    successMessage.style.display = 'block';

    setTimeout(() => {
        this.style.display = 'flex';
        successMessage.style.display = 'none';
        emailInput.value = '';
        emailInput.style.border = 'none';
    }, 3000);
});

// Weather widget simulation
function updateWeather() {
    const cities = [
        { name: 'New Delhi', temp: '24°C', icon: 'fa-cloud-sun' },
        { name: 'Mumbai', temp: '28°C', icon: 'fa-sun' },
        { name: 'Bangalore', temp: '22°C', icon: 'fa-cloud' },
        { name: 'Kolkata', temp: '26°C', icon: 'fa-cloud-rain' }
    ];

    let currentCity = 0;
    const weatherIcon = document.getElementById('weather-icon');
    const weatherTemp = document.getElementById('weather-temp');
    const weatherCity = document.getElementById('weather-city');

    setInterval(() => {
        currentCity = (currentCity + 1) % cities.length;
        const city = cities[currentCity];

        weatherIcon.innerHTML = `<i class="fas ${city.icon}"></i>`;
        weatherTemp.textContent = city.temp;
        weatherCity.textContent = city.name;
    }, 5000);
}

updateWeather();

// Search functionality
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');

searchButton.addEventListener('click', function () {
    if (searchInput.value.trim()) {
        alert(`Searching for: ${searchInput.value}`);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && this.value.trim()) {
        alert(`Searching for: ${this.value}`);
        this.value = '';
    }
});

// Simulate trending news views increment
setInterval(() => {
    const viewCounts = document.querySelectorAll('.fa-fire');
    viewCounts.forEach(count => {
        const current = parseInt(count.parentElement.textContent.replace(/\D/g, ''));
        const increment = Math.floor(Math.random() * 10) + 1;
        count.parentElement.innerHTML = count.parentElement.innerHTML.replace(
            current,
            current + increment
        );
    });
}, 5000);

// Configuration
const API_KEY = https://api.cricapi.com/v1/series_info?apikey=b3dfec87-ddbe-42ea-a9f6-3f5d337642c5&id=71756de6-bdef-4b23-801f-c6bec9604e07; // Replace with your actual API key
const API_ENDPOINT = 'https://api.cricapi.com/v1/currentMatches';

// Team logo and abbreviation mapping
const TEAM_DATA = {
  'Mumbai Indians': { 
    logo: 'https://www.iplt20.com/assets/images/teams/legacy/91.png',
    abbr: 'MI'
  },
  'Chennai Super Kings': { 
    logo: 'https://www.iplt20.com/assets/images/teams/legacy/59.png',
    abbr: 'CSK' 
  },
  // Add all IPL teams here
};

// Fetch live scores
async function fetchLiveScores() {
  try {
    const response = await fetch(`${API_ENDPOINT}?apikey=${API_KEY}&offset=0`);
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      throw new Error('No live matches found');
    }
    
    // Find IPL matches
    const iplMatches = data.data.filter(match => 
      match.matchType === 't20' && match.series.includes('IPL')
    );
    
    if (iplMatches.length === 0) {
      throw new Error('No live IPL matches found');
    }
    
    // Get the first live IPL match
    const liveMatch = iplMatches[0];
    updateScoreBox(liveMatch);
    
  } catch (error) {
    console.error("Error fetching live scores:", error);
    document.getElementById('update-time').textContent = "Update failed";
    
    // Fallback to mock data
    loadMockData();
  }
}

// Update the score box with live data
function updateScoreBox(match) {
  // Basic match info
  document.getElementById('match-number').textContent = match.name;
  document.getElementById('match-venue').textContent = match.venue;
  document.getElementById('match-status').textContent = match.status;
  
  // Team 1 data
  const team1 = match.teamInfo[0];
  document.getElementById('team1-name').textContent = team1.name;
  document.getElementById('team1-logo').src = TEAM_DATA[team1.name]?.logo || '';
  document.getElementById('team1-abbr').textContent = TEAM_DATA[team1.name]?.abbr || '';
  
  // Team 2 data
  const team2 = match.teamInfo[1];
  document.getElementById('team2-name').textContent = team2.name;
  document.getElementById('team2-logo').src = TEAM_DATA[team2.name]?.logo || '';
  document.getElementById('team2-abbr').textContent = TEAM_DATA[team2.name]?.abbr || '';
  
  // Scores
  if (match.score && match.score.length > 0) {
    match.score.forEach(innings => {
      if (innings.inning.includes(team1.shortname)) {
        document.getElementById('team1-score').textContent = `${innings.runs}/${innings.wickets}`;
        document.getElementById('team1-overs').textContent = `(${innings.overs} overs)`;
      } else {
        document.getElementById('team2-score').textContent = `${innings.runs}/${innings.wickets}`;
        document.getElementById('team2-overs').textContent = `(${innings.overs} overs)`;
      }
    });
  }
  
  // Batsmen data
  if (match.batsman && match.batsman.length > 0) {
    const batsmenContainer = document.querySelector('.batsmen');
    batsmenContainer.innerHTML = '';
    
    match.batsman.slice(0, 2).forEach(batsman => {
      const batsmanEl = document.createElement('div');
      batsmanEl.className = 'batsman';
      batsmanEl.innerHTML = `
        <span class="name">${batsman.name}</span>
        <span class="status">${batsman.out ? '' : '*'}</span>
        <span class="runs">${batsman.runs} (${batsman.balls})</span>
      `;
      batsmenContainer.appendChild(batsmanEl);
    });
  }
  
  // Bowler data
  if (match.bowler && match.bowler.length > 0) {
    const bowlerEl = document.querySelector('.bowler');
    const mainBowler = match.bowler[0];
    bowlerEl.innerHTML = `
      <span class="label">Bowling:</span>
      <span class="name">${mainBowler.name}</span>
      <span class="stats">${mainBowler.overs}-${mainBowler.maidens}-${mainBowler.runs}-${mainBowler.wickets}</span>
    `;
  }
  
  // Run rates
  if (match.score && match.score.length > 0) {
    const currentInnings = match.score.find(innings => innings.inning === match.liveInning);
    if (currentInnings) {
      document.querySelectorAll('.rate .value')[0].textContent = currentInnings.currentRunRate || '-';
      document.querySelectorAll('.rate .value')[1].textContent = currentInnings.requiredRunRate || '-';
    }
  }
  
  // Update timestamp
  document.getElementById('update-time').textContent = new Date().toLocaleTimeString();
}

// Mock data fallback
function loadMockData() {
  const mockData = {
    teamInfo: [
      { name: "Mumbai Indians", shortname: "MI" },
      { name: "Chennai Super Kings", shortname: "CSK" }
    ],
    name: "Match 12",
    venue: "Wankhede Stadium, Mumbai",
    status: "In Progress • 35th over",
    liveInning: "CSK 2nd Innings",
    score: [
      {
        inning: "MI 1st Innings",
        shortTitle: "MI",
        runs: "187",
        wickets: "5",
        overs: "20",
        currentRunRate: "9.35"
      },
      {
        inning: "CSK 2nd Innings",
        shortTitle: "CSK",
        runs: "156",
        wickets: "3",
        overs: "35",
        currentRunRate: "8.45",
        requiredRunRate: "9.20"
      }
    ],
    batsman: [
      { name: "Ruturaj Gaikwad", runs: "72", balls: "48", out: false },
      { name: "Shivam Dube", runs: "34", balls: "22", out: false }
    ],
    bowler: [
      { name: "Jasprit Bumrah", overs: "3", maidens: "0", runs: "28", wickets: "0" }
    ]
  };
  
  updateScoreBox(mockData);
}

// Initialize and set refresh interval
document.addEventListener('DOMContentLoaded', () => {
  fetchLiveScores();
  setInterval(fetchLiveScores, 15000); // Refresh every 15 seconds
});