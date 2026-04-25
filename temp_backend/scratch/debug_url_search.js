
async function testRedfinSearchByUrl() {
  const API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const HOST = 'redfin-com-data.p.rapidapi.com';
  
  const propertyUrl = '/TN/Franklin/Sussex-Downs/apartment/87897586';
  const url = `https://${HOST}/properties/search-by-url?url=${encodeURIComponent(propertyUrl)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST
      }
    });
    
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testRedfinSearchByUrl();
