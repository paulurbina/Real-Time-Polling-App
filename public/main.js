const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {

    const choise = document.querySelector('input[name=os]:checked').value;
    
    const data = {
        os: choise
    }

    fetch('http://localhost:3000/polling', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));

    e.preventDefault();
});

// data poinst 
let dataPoints = [
    { label: 'Windows', y: 0}, 
    { label: 'MacOs', y: 0}, 
    { label: 'Linux', y: 0}, 
    { label: 'Other', y: 0}, 
];

const chartContainer = document.querySelector('#chartContainer');
if(chartContainer) {
    var  chart =  new  CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Result',
            fontWeight: "bolder",
            fontColor: "#008B8B",
            fontfamily: "tahoma",
            fontSize: 25,
            padding: "10"
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('549c2bdbf09152653457', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map(x => {
            if(x.label == data.os) {
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        });
        chart.render();
    });
}