const fetch = require('node-fetch');

const API_URL = 'http://localhost:3000/api/admin/partners';
const TOKEN = 'hrl_studio_77_premium_auth_secure_2026_xyz_lab_studio';

// Profile Jane (Solo Female)
const janeProfile = {
  name: 'Jane',
  handle: 'jane',
  email: 'jane@hrlstudio.online',
  status: 'active',
  type: 'solo',
  bio: 'Professional Content Creator. Studio HRL Adult. Specialization: Solo, Fetish, Custom Videos. Top 10% OnlyFans.',
  description: 'Profesjonalna twórczyni treści adult z doświadczeniem w solo i fetish content. Kreatywna, elastyczna i zawsze gotowa na nowe wyzwania.',
  avatar: '/image/Jane.jpg',
  height: 168,
  weight: 54,
  measurements: '85C / 62 / 88',
  profileData: JSON.stringify({
    likes: ['Solo content', 'Fetish videos', 'Custom requests', 'Roleplay', 'Teasing', 'Interactive shows'],
    boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Brak BDSM ekstremalnego', 'Tylko soft fetish', 'Dyskrecja'],
    bestInMe: ['Kreatywność', 'Elastyczność', 'Profesjonalizm', 'Doświadczenie', 'Charisma', 'Energy', 'Punktualność', 'Współpraca', 'Open-minded', 'Quality focus'],
    whyWatchMe: ['Unikalny styl', 'High-quality content', 'Interactive shows', 'Custom-friendly', 'Professional approach', 'Creative scenarios', 'Authentic energy', 'Fetish expertise', 'Solo specialist', 'Engaging personality'],
    gallery: ['/image/Jane.jpg', '/image/jane1.jpg', '/image/jane2.jpg', '/image/jane4.jpg', '/image/jane5.jpg']
  })
};

// Profile Anna & Mark (Couple)
const amProfile = {
  name: 'Anna & Mark',
  handle: 'anna-mark',
  email: 'anna-mark@hrlstudio.online',
  status: 'active',
  type: 'couple',
  bio: 'Power Couple. Studio HRL Adult. Specialization: Couple content, Live shows, Custom scenarios. Top 5% Couple category.',
  description: 'Autentyczna para z naturalną chemią. Specjalizujemy się w couples content, live shows i custom scenarios. Profesjonalizm, pasja i zabawa.',
  avatar: '/image/am.jpg',
  height: null,
  weight: null,
  measurements: 'Anna: 170cm / 88C / 64 / 90, Mark: 182cm / Athletic',
  profileData: JSON.stringify({
    likes: ['Couples content', 'Live shows', 'Custom scenarios', 'Roleplay', 'Interactive sessions', 'Chemistry-focused content'],
    boundaries: ['Brak hardcore ekstremalnego', 'Tylko para', 'Bez innych osób', 'Safe practices', 'Consensual only', 'Dyskrecja absolutna'],
    bestInMe: ['Naturalna chemia', 'Autentyczność', 'Profesjonalizm', 'Doświadczenie', 'Charisma', 'Energy', 'Współpraca', 'Open-minded', 'Quality focus', 'Fun & passion'],
    whyWatchMe: ['Real chemistry', 'Authentic couple', 'Professional production', 'Interactive shows', 'Custom scenarios', 'Genuine passion', 'High-quality content', 'Couple specialist', 'Engaging energy', 'Real experience'],
    gallery: ['/image/am.jpg', '/image/am1.jpg', '/image/am2.jpg', '/image/am3.jpg', '/image/am4.jpg']
  })
};

async function createProfile(profile) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(profile)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Profile created: ${profile.name} (${profile.handle})`);
      console.log(`   ID: ${data.id}`);
      return data;
    } else {
      const error = await response.json();
      console.error(`❌ Error creating ${profile.name}:`, error.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Network error for ${profile.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Creating profiles...');
  
  const jane = await createProfile(janeProfile);
  const am = await createProfile(amProfile);
  
  console.log('\n✨ Profile creation completed!');
  console.log('Jane:', jane ? '✅' : '❌');
  console.log('Anna & Mark:', am ? '✅' : '❌');
}

main();
