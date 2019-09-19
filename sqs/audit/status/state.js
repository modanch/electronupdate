
function startForm() {

    var zr = 4

    $.get("https://sqswebapitest.modan.ch/breeze/auditboltbreeze/GetLogStats?Type=4&TypeParam=0&Zeitraum=" + zr + "&ExcludeUser=", function (dataAX) {


        var vals = [0,0,0];
        today = moment();
        dataAX.forEach(function (state) {
            var inserted = moment(state.mindt);
            if (inserted.isSame(today, "day")) {
                var duration = moment.duration(moment(state.maxdt).diff(moment(state.mindt)));
                vals[0] = state.starts;
                vals[1] = duration.asHours();
                vals[2] = state.errors;
            }
        })

        $("#stateImport").text(vals[0]);

    });

}

