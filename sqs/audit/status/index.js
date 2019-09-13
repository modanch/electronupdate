function startForm() {

    var zr = 4

    $.get("https://sqswebapitest.modan.ch/breeze/auditboltbreeze/GetLogStats?Type=3&TypeParam=0&Zeitraum=" + zr + "&ExcludeUser='48'", function (data) {

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
        var datasetsArbeit = [];
        datasetsArbeit.push({ label: "Logins", data: [], borderWidth: 1, borderColor: 'rgba(0, 179, 21, 1)', backgroundColor: 'rgba(0, 179, 21, 0.06)' });
        datasetsArbeit.push({ label: "Statuswechsel", data: [], borderWidth: 1, borderColor: 'rgba(30, 85, 136, 1)', backgroundColor: 'rgba(30, 85, 136,0.06)' });
        datasetsArbeit.push({ label: "Fehler", data: [], borderWidth: 1, borderColor: 'rgba(245, 97, 81, 1)', backgroundColor: 'rgba(245, 97, 81, 0.06)' });

        var datasetsError = [];
        datasetsError.push({ label: "Server-Error", data: [], borderWidth: 1, borderColor: 'rgba(245, 97, 81, 1)', backgroundColor: 'rgba(245, 97, 81, 0.06)' });
        datasetsError.push({ label: "Client-Handled-Error", data: [], borderWidth: 1, borderColor: 'rgba(247, 153, 12, 1)', backgroundColor: 'rgba(247, 153, 12, 0.06)' });
        datasetsError.push({ label: "Client-Unhandled-Error", data: [], borderWidth: 1, borderColor: 'rgba(247, 12, 157, 1)', backgroundColor: 'rgba(247, 12, 157,0.06)' });

        var max = 0;

        for (index = dataArray.length - 1; index > 0; index--) {
            const elem = dataArray[index];

            labels.push(elem.day.format('DD.MM.'));

            var vals = [0,0,0,0,0,0];
            data.forEach(function (state) {
                var inserted = moment(state.Inserted);
                if ((state.typeid == 1) && (inserted.isSame(elem.day, "day"))) {
                    vals[0] = state.cnt;
                } else if ((state.typeid == 5) && (inserted.isSame(elem.day, "day"))) {
                    vals[1] = state.cnt;
                } else if ((state.typeid == 3) && (inserted.isSame(elem.day, "day"))) {
                    vals[2] += state.cnt;
                    vals[3] = state.cnt;
                } else if ((state.typeid == 4) && (inserted.isSame(elem.day, "day"))) {
                    vals[2] += state.cnt;
                    vals[4] = state.cnt;
                } else if ((state.typeid == 6) && (inserted.isSame(elem.day, "day"))) {
                    vals[2] += state.cnt;
                    vals[5] = state.cnt;
                }
            })

            datasetsArbeit[0].data.push(vals[0]);
            datasetsArbeit[1].data.push(vals[1]);
            datasetsArbeit[2].data.push(vals[2]);
            datasetsError[0].data.push(vals[3]);
            datasetsError[1].data.push(vals[4]);
            datasetsError[2].data.push(vals[5]);

            vals.forEach(function (val) {
                if (val > max)
                    max = val;
            });

        };

        //max = (~~((max + 99) / 100) * 100);

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        }
                }]
            }
        }

        var loginChartCtx = document.getElementById('chartArbeit').getContext('2d');
        new Chart(loginChartCtx, {
            type: 'line',
            options: options,
            data: {
                labels: labels,
                datasets: datasetsArbeit
            }
        });
        var loginChartCtx = document.getElementById('chartError').getContext('2d');
        new Chart(loginChartCtx, {
            type: 'line',
            options: options,
            data: {
                labels: labels,
                datasets: datasetsError
            }
        });


    });

}

