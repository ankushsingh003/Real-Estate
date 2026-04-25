
async function testRedfin() {
  const API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const HOST = 'redfin-com-data.p.rapidapi.com';
  
  // Exactly as in user screenshot
  const url = 'https://redfin-com-data.p.rapidapi.com/property/search-rent?location=Franklin';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST
      }
    });
    
    const result = await response.json();
    if (result.data && result.data.length > 0) {
      console.log('--- FULL ITEM 0 ---');
      console.log(JSON.stringify(result.data[0], null, 2));
    } else {
      console.log('No data found:', result);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testRedfin();
