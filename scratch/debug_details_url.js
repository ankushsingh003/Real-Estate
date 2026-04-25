
async function testRedfinDetailsUrl() {
  const API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const HOST = 'redfin-com-data.p.rapidapi.com';
  
  const propertyUrl = '/TN/Franklin/Sussex-Downs/apartment/87897586';
  // Trying plural with 'url' param
  const url = `https://${HOST}/properties/get-details?url=${encodeURIComponent(propertyUrl)}`;
  
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

testRedfinDetailsUrl();
