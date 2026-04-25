
async function testRentcast() {
  const API_KEY = '024dd1fb131f408fb46a8da3af6f10a2';
  const url = 'https://api.rentcast.io/v1/listings/sale?state=CA&limit=5&status=Active';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-Api-Key': API_KEY
      }
    });
    
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data count:', Array.isArray(data) ? data.length : 'Not an array');
    if (!Array.isArray(data)) console.log('Response body:', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testRentcast();
