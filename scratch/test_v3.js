const test = async () => {
  const url = 'https://realty-in-us.p.rapidapi.com/properties/v3/list';
  const body = {
    limit: 10,
    offset: 0,
    status: ['for_sale'],
    city: 'Los Angeles',
    state_code: 'CA',
    sort: { direction: 'desc', field: 'list_date' }
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': 'd58e3b00d1msh690400a87679812p1c30cfjsnafb929771808',
        'x-rapidapi-host': 'realty-in-us.p.rapidapi.com'
      },
      body: JSON.stringify(body)
    });
    
    console.log('API Status:', res.status);
    const data = await res.json();
    console.log('Results Found:', data?.data?.home_search?.results?.length);
    console.log('First Title:', data?.data?.home_search?.results?.[0]?.location?.address?.line);
  } catch (err) {
    console.error('Test Error:', err.message);
  }
};

test();
