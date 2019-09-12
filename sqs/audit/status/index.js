function startForm() {

    $("#title").text("Status");
    var zr = 4

    $.get("https://sqswebapiaxtestdev.modan.ch/breeze/auditboltbreeze/GetLogStats?Type=3&TypeParam=0&Zeitraum=" + zr + "&ExcludeUser='48'", function (data) {

        dataArray = [];
        if (zr == 4) {
            start = moment();
            for (index = 0; index < 30; index++) {
                var newd = start.add(-1, 'days');
                elem = { day: moment(newd) };
                dataArray.push(elem);
            }
        }

        var labels = [];
        var vals = [];
        for (index = dataArray.length-1; index > 0;index--) {
            const elem = dataArray[index];
            labels.push(elem.day.format('DD.MM.'));
            
            var val = 0;

            data.forEach(function(state) {
                var inserted = moment(state.Inserted);
                if ((state.typeid == 1) && (inserted.isSame(elem.day, "day"))) {
                    val = state.cnt;
                }
            })
            vals.push(val);

        };


        var loginChartCtx = document.getElementById('loginChart').getContext('2d');
        var chart = new Chart(loginChartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Login',
                    data: vals,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    });

}

