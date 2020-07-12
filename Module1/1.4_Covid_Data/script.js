
const stateDropdown = document.getElementById('stateMenu');
const facilityDropdown = document.getElementById('facilityMenu');
const rawData = 'covidbehindbars-cleaned.csv';
init();

async function init() {
    const states = await getStates();
    for (let state of states) {
        let option = document.createElement('option');
        option.text = state;
        stateDropdown.add(option);
    }

    const facilities = await getFacilities('Alabama');
    for (let facility of facilities) {
        let option = document.createElement('option');
        option.text = facility;
        facilityDropdown.add(option);
    }

    chartIt('ALEX CITY');
    menus();
}

async function menus() {
    stateDropdown.addEventListener('change', async (event) => {
        var length = facilityDropdown.options.length;
        for (i = length - 1; i >= 0; i--) {
            facilityDropdown.options[i] = null;
        }
        const state = event.target.value;
        const facilities = await getFacilities(state);
        for (let facility of facilities) {
            let option = document.createElement('option');
            option.text = facility;
            facilityDropdown.add(option);
        }
        chartIt(facilities[0]);
    });

    facilityDropdown.addEventListener('change', (event) => {
        document.getElementById('myChart').remove();
        const container = document.getElementById('chart-container');
        const newCanvas = document.createElement('canvas');
        newCanvas.setAttribute("id", "myChart");
        container.appendChild(newCanvas);
        const result = event.target.value;
        chartIt(result);
    });
}

async function chartIt(facility) {
    const data = await getData(facility);
    const ctx = document.getElementById('myChart').getContext('2d');
    const barChartData = {
        labels: data.dates,
        datasets: [{
            label: 'Resident Cases',
            data: data.residentCases,
            fill: false,
            backgroundColor: 'rgba(255, 20, 32, 0.5)',
            borderColor: 'rgba(0,0,0, 0.5)',
            borderWidth: 0.5,
            hoverBackgroundColor: 'rgba(255, 20, 32)',
            barThickness: 'flex'
        }, {
            label: 'Staff Cases',
            data: data.staffCases,
            fill: true,
            backgroundColor: 'rgba(25, 100, 232, 0.5)',
            borderColor: 'rgba(0,0,0, 0.5)',
            borderWidth: 0.5,
            hoverBackgroundColor: 'rgba(25,100,232)',
            barThickness: 'flex',
            hidden: true
        }, {
            label: 'Resident Deaths',
            data: data.residentDeaths,
            fill: true,
            backgroundColor: 'rgba(100, 100, 0, 0.5)',
            borderColor: 'rgba(0,0,0, 0.5)',
            borderWidth: 0.5,
            hoverBackgroundColor: 'rgba(100, 100, 0)',
            barThickness: 'flex',
            hidden: true
        }, {
            label: 'Staff Deaths',
            data: data.staffDeaths,
            fill: true,
            backgroundColor: 'rgba(0, 50, 90, 0.5)',
            borderColor: 'rgba(0,0,0, 0.5)',
            borderWidth: 0.5,
            hoverBackgroundColor: 'rgba(0, 250, 90)',
            barThickness: 'flex',
            hidden: true
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: ['Covid-19 in California Prisons']
            }
        }
    });
}

async function getStates() {
    const states = [];
    const response = await fetch(rawData);
    const data = await response.text();
    const table = data.split('\n').slice(1);
    let prevState = "";
    table.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        if (state !== prevState) {
            states.push(state);
            prevState = state;
        }
    });
    console.log(states.length);
    return states;
}

async function getFacilities(targetState) {
    const facilities = [];
    const response = await fetch(rawData);
    const data = await response.text();
    const table = data.split('\n').slice(1);
    let prevFacility = "";
    table.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        if (state === targetState) {
            const facility = columns[3];
            if (facility !== prevFacility) {
                facilities.push(facility);
                prevFacility = facility;
            }
        }
    });
    return facilities;
}

async function getData(targetFacility) {
    const dates = [];
    const residentCases = [];
    const staffCases = [];
    const residentDeaths = [];
    const staffDeaths = [];
    const response = await fetch(rawData);
    const data = await response.text();
    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');
        const date = columns[0].split('-');
        const dayMonth = date[1] + '-' + date[2];
        const state = columns[1];
        const facility = columns[3];
        const staffCaseCount = columns[5];
        const resCaseCount = columns[6];
        const staffDeathCount = columns[7];
        const resDeathCount = columns[8];
        if (facility === targetFacility) {
            dates.push(dayMonth);
            residentCases.push(resCaseCount);
            staffCases.push(staffCaseCount);
            residentDeaths.push(resDeathCount);
            staffDeaths.push(staffDeathCount);
        }
    });
    return { dates, residentCases, staffCases, residentDeaths, staffDeaths };
}




