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


async function drawGraph() {
    const contributionsData = await fetchData();

    if (contributionsData.length === 0) {
        return;
    }

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 50 * 7); // 50 weeks ago

    let currentDate = new Date(startDate);
    let currentMonth = startDate.getMonth();

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const daysOfWeekLabels = ['Mon', 'Wed', 'Fri']; // Изменили список дней недели

    for (let dayLabel of daysOfWeekLabels) {
        const dayOfWeekLabel = document.createElement('div');
        dayOfWeekLabel.textContent = dayLabel;
        dayOfWeekLabel.classList.add('day-of-week-label');
        daysOfWeekContainer.appendChild(dayOfWeekLabel);
    }

    while (currentDate <= today) {
        if (currentDate.getMonth() !== currentMonth) {
            const monthLabel = document.createElement('div');
            monthLabel.textContent = monthLabels[currentDate.getMonth()];
            monthLabel.classList.add('month-label');
            monthsContainer.appendChild(monthLabel);

            currentMonth = currentDate.getMonth();
        }

        const contributions = contributionsData[currentDate.toISOString().split('T')[0]] || 0;
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundColor = getSquareColor(contributions);

        const dateString = currentDate.toDateString();
        square.title = `${contributions}+ contributions\n${dateString}`;

        graphContainer.appendChild(square);

        currentDate.setDate(currentDate.getDate() + 1);
    }
}

function getSquareColor(contributions) {
    if (contributions === 0) return '#e1e4e8';
    if (contributions <= 9) return '#ACD5F2';
    if (contributions <= 19) return '#7FA8C9';
    if (contributions <= 29) return '#527BA0';
    return '#254E77';
}

drawGraph();