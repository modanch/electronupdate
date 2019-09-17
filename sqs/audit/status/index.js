var chart1, chart2, chart3;

function startPage() {
    preparePage();
    refresh();
}

function refresh() {
    startForm();
}

function resize1(max) {
    startForm(max)
}

function startForm(max1) {

    var zr = 4

    $.get("https://sqswebapitest.modan.ch/breeze/auditboltbreeze/GetLogStats?Type=3&TypeParam=0&Zeitraum=" + zr + "&ExcludeUser='48'", function (data) {

        $.get("https://sqswebapitest.modan.ch/breeze/auditboltbreeze/GetLogStats?Type=4&TypeParam=0&Zeitraum=" + zr + "&ExcludeUser=", function (dataAX) {

            dataArray = [];
            if (zr == 4) {
                start = moment().add(1, 'days');
                for (index = 0; index < 30; index++) {
                    elem = { day: moment(newd) };
                    dataArray.push(elem);
                    var newd = start.add(-1, 'days');
                }
            }

            var lineTen = 0.2;

            var labels = [];
            var datasetsArbeit = [];
            datasetsArbeit.push({ label: "Logins", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(0, 179, 21, 1)', backgroundColor: 'rgba(0, 179, 21, 0.06)' });
            datasetsArbeit.push({ label: "Statuswechsel", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(30, 85, 136, 1)', backgroundColor: 'rgba(30, 85, 136,0.06)' });
            datasetsArbeit.push({ label: "Fehler", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(245, 97, 81, 1)', backgroundColor: 'rgba(245, 97, 81, 0.06)' });
            datasetsArbeit.push({ label: "Users", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(151, 161, 161)', backgroundColor: 'rgba(151, 161, 161, 0.06)' });

            var datasetsError = [];
            datasetsError.push({ label: "Server-Error", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(245, 97, 81, 1)', backgroundColor: 'rgba(245, 97, 81, 0.06)' });
            datasetsError.push({ label: "Client-Handled-Error", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(247, 153, 12, 1)', backgroundColor: 'rgba(247, 153, 12, 0.06)' });
            datasetsError.push({ label: "Client-Unhandled-Error", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(247, 12, 157, 1)', backgroundColor: 'rgba(247, 12, 157,0.06)' });

            var datasetsAxImport = [];
            datasetsAxImport.push({ label: "Imports", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(30, 85, 136, 1)', backgroundColor: 'rgba(30, 85, 136,0.06)' });
            datasetsAxImport.push({ label: "Laufzeit", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(0, 179, 21, 1)', backgroundColor: 'rgba(0, 179, 21, 0.06)' });
            datasetsAxImport.push({ label: "Errors", data: [], borderWidth: 1, lineTension: lineTen, borderColor: 'rgba(245, 97, 81, 1)', backgroundColor: 'rgba(245, 97, 81, 0.06)' });

            var max = 0;

            for (index = dataArray.length - 1; index > 0; index--) {
                const elem = dataArray[index];

                labels.push(elem.day.format('DD.MM.'));

                var vals = [0, 0, 0, 0, 0, 0, 0];
                data.forEach(function (state) {
                    var inserted = moment(state.Inserted);
                    if ((state.typeid == 1) && (inserted.isSame(elem.day, "day"))) {
                        vals[0] = state.cnt;
                        vals[3] = state.users;
                    } else if ((state.typeid == 5) && (inserted.isSame(elem.day, "day"))) {
                        vals[1] = state.cnt;
                    } else if ((state.typeid == 3) && (inserted.isSame(elem.day, "day"))) {
                        vals[2] += state.cnt;
                        vals[4] = state.cnt;
                    } else if ((state.typeid == 4) && (inserted.isSame(elem.day, "day"))) {
                        vals[2] += state.cnt;
                        vals[5] = state.cnt;
                    } else if ((state.typeid == 6) && (inserted.isSame(elem.day, "day"))) {
                        vals[2] += state.cnt;
                        vals[6] = state.cnt;
                    }
                })

                datasetsArbeit[0].data.push(vals[0]);
                datasetsArbeit[1].data.push(vals[1]);
                datasetsArbeit[2].data.push(vals[2]);
                datasetsArbeit[3].data.push(vals[3]);
                datasetsError[0].data.push(vals[4]);
                datasetsError[1].data.push(vals[5]);
                datasetsError[2].data.push(vals[6]);

                vals.forEach(function (val) {
                    if (val > max)
                        max = val;
                });

                var vals = [0, 0, 0];
                dataAX.forEach(function (state) {
                    var inserted = moment(state.mindt);
                    if (inserted.isSame(elem.day, "day")) {
                        var duration = moment.duration(moment(state.maxdt).diff(moment(state.mindt)));
                        vals[0] = state.starts;
                        vals[1] = duration.asHours();
                        vals[2] = state.errors;
                    }
                })
                datasetsAxImport[0].data.push(vals[0]);
                datasetsAxImport[1].data.push(vals[1]);
                datasetsAxImport[2].data.push(vals[2]);

            };

            var options = {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                scales: {
                    yAxes: [{
                        id: 'left',
                        //type:'logarithmic',
                        ticks: {
                            beginAtZero: true,
                            //max: 200
                        }
                    }]
                }
            }

            var options1 = {};
            $.extend(true, options1, options);
            if (max1 > 0)
                options1.scales.yAxes[0].ticks.max = max1;

            if (chart1)
                chart1.destroy();
            var loginChartCtx = document.getElementById('chartArbeit').getContext('2d');
            chart1 = new Chart(loginChartCtx, {
                type: 'line',
                options: options1,
                data: {
                    labels: labels,
                    datasets: datasetsArbeit
                }
            });

            if (chart2)
                chart2.destroy();
            var loginChartCtx = document.getElementById('chartError').getContext('2d');
            chart2 = new Chart(loginChartCtx, {
                type: 'line',
                options: options,
                data: {
                    labels: labels,
                    datasets: datasetsError
                }
            });
            if (chart3)
                chart3.destroy();
            var importChartCtx = document.getElementById('chartImport').getContext('2d');
            chart3 = new Chart(importChartCtx, {
                type: 'line',
                options: options,
                data: {
                    labels: labels,
                    datasets: datasetsAxImport
                }
            });
        });

    });

}

