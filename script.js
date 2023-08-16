const graphContainer = document.querySelector('.graph');
const daysOfWeekContainer = document.querySelector('.days-of-week');
const monthsContainer = document.querySelector('.months');
const apiUrl = 'https://dpg.gg/test/calendar.json';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}