
chartIt();

async function chartIt() {
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Global Average Temperature',
                data: data.tempVals,
                backgroundColor: 'rgb(0,0,0)', 
                fill: false
            }]
        }, 
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    });
}


async function getData() {
    const xlabels = [];
    const tempVals = [];        
    const response = await fetch('YearTemp.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const temp = columns[1];
        tempVals.push(parseFloat(temp) + 14);
        console.log(year, temp);
    })
    return {xlabels, tempVals};
}