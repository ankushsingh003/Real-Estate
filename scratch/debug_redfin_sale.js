
async function testRedfinSale() {
  const API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const HOST = 'redfin-com-data.p.rapidapi.com';
  
  const url = 'https://redfin-com-data.p.rapidapi.com/properties/search-sale?location=Franklin&limit=1';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST
      }
    });
    
    const result = await response.json();
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testRedfinSale();
