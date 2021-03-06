const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {    

    const choise = document.querySelector('input[name=os]:checked').value;
    
    const data = {
        os: choise
    }
    // method post
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
// method get
fetch('http://localhost:3000/polling')
    // body: JSON.stringify(data),
    // headers: new Headers({
    //     'Content-type': 'application/json'
    // })
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;

        //count vote points - acc / current votes
        const voteCounts = votes.reduce(
            (acc, vote) => (
                    (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
                 ),
                 {}
            );

        // data poinst 
        let dataPoints = [
            { label: 'Windows', y: voteCounts.Windows}, 
            { label: 'MacOs', y: voteCounts.MacOs}, 
            { label: 'Linux', y: voteCounts.Linux}, 
            { label: 'Other', y: voteCounts.Other}, 
        ];

        const chartContainer = document.querySelector('#chartContainer');
        if(chartContainer) {
            var  chart =  new  CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes: ${totalVotes}`, //enl
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
    })
    .catch(e => console.log(e));



