const DATA = './data.json';

export const fetchData = async () => {
  try {
    const response = await fetch(DATA);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};