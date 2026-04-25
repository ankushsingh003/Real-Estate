
async function testRedfin() {
  const API_KEY = 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808';
  const HOST = 'redfin-com-data.p.rapidapi.com';
  
  // Trying search-sale
  const url = 'https://redfin-com-data.p.rapidapi.com/properties/search-sale?location=California&limit=5';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data Type:', typeof data);
    console.log('Keys:', Object.keys(data));
    
    // Check if results are in data.data or similar
    if (data.data) {
       console.log('Data array length:', Array.isArray(data.data) ? data.data.length : 'Not array');
       if (data.data.length > 0) {
         console.log('First Item Keys:', Object.keys(data.data[0]));
         console.log('First Item Example:', JSON.stringify(data.data[0]).substring(0, 500));
       }
    } else {
       console.log('Response body:', JSON.stringify(data).substring(0, 1000));
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testRedfin();
