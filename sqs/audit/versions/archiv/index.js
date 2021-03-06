function startPage() {
    preparePage();
    refresh();
}

function refresh() {

    var requests = 0;

    var makeWait = function (name) {
        $(name).text("");
        $('<img />').attr({
            'src': 'wait.gif',
            'width': 20
        }).appendTo(name);
    }

    var getTime = function() {
        return Math.random() * 1000;
    }

    var generateError = function(name) {
        $(name).text("");
        $('<img />').attr({
            'src': 'error.gif',
            'width': 30
        }).appendTo(name);
    }

    var makeLink = function (name, inp, isService, isBolt) {
        $(name).text(inp + "");

        if (isService) {
            if (isBolt) {
                $(name).attr("href", "https://" + inp + "/breeze/auditboltbreeze/getserverinfo");
            } else {
                $(name).attr("href", "https://" + inp + "/breeze/auditbreeze/getserverinfo");
            }
        } else {
            $(name).attr("href", "https://" + inp + "");
        }

        $(name).attr("target", "_blank");
    }

    var reqstart = function () {
        requests++;

        //if (requests > 0) {
        //    $("#nav_refresh a").text("loading...");
        //}
    }
    var reqend = function (all) {
        requests--;
        if (all == true)
            requests = 0;

        //if (requests == 0) {
        //    $("#nav_refresh a").text("Aktualisieren");
        //}
    }

    reqstart();
    makeLink("#prodserver_label", "sqswebapi.modan.ch", true, true);
    makeWait("#prodserver");
    $.ajax({
        url: "https://sqswebapi.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#prodserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });

    reqstart();
    makeLink("#preserver_label", "sqswebapipre.modan.ch", true, true);
    makeWait("#preserver");
    $.ajax({
        url: "https://sqswebapipre.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#preserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });

    reqstart();
    makeLink("#testserver_label", "sqswebapitest.modan.ch", true, true);
    makeWait("#testserver");
    $.ajax({
        url: "https://sqswebapitest.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#testserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });

    reqstart();
    makeLink("#axtestserver_label", "sqswebapiaxtest.modan.ch", true, true);
    makeWait("#axtestserver");
    $.ajax({
        url: "https://sqswebapiaxtest.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#axtestserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });

    reqstart();
    makeLink("#axtestdevserver_label", "sqswebapiaxtestdev.modan.ch", true, true);
    makeWait("#axtestdevserver");
    $.ajax({
        url: "https://sqswebapiaxtestdev.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#axtestdevserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });


    reqstart();
    makeLink("#devserver_label", "sqswebapidev.modan.ch", true, true);
    makeWait("#devserver");
    $.ajax({
        url: "https://sqswebapidev.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#devserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });

    reqstart();
    makeLink("#devdevserver_label", "sqswebapidev_dev.modan.ch", true, true);
    makeWait("#devdevserver");
    $.ajax({
        url: "https://sqswebapidev_dev.modan.ch/breeze/auditboltbreeze/getserverinfo"
    }).done(function (response) {
        setTimeout(function () {
            $("#devdevserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
            reqend();
        }, getTime());
    });


    //electron
    reqstart();
    makeWait("#windowaxtestclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/axtest/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditappaxtest-");
            var str = response.substr(idx + 19, 22);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowaxtestclient").text(str);
            reqend();
        }, getTime());
    });

    reqstart();
    makeWait("#windowtestclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/test/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditapptest-");
            var str = response.substr(idx + 17, 20);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowtestclient").text(str);
            reqend();
        }, getTime());
    });

    reqstart();
    makeWait("#windowclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditapp-");
            var str = response.substr(idx + 13, 20);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowclient").text(str);
            reqend();
        }, getTime());
    });

    reqstart();
    makeWait("#windowpreclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/pre/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditapppre-");
            var str = response.substr(idx + 16, 23);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowpreclient").text(str);
            reqend();
        }, getTime());
    });

    reqstart();
    makeWait("#windowdevclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/dev/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditappdev-");
            var str = response.substr(idx + 16, 23);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowdevclient").text(str);
            reqend();
        }, getTime());
    });


    var getVnr = function (response) {
        var idx = response.indexOf(" version=");
        var str = response.substr(idx + 10, 20);
        var idx2 = str.indexOf("\"");
        str = str.substr(0, idx2);
        return str;
    }

    var vstrwp = function (inp) {
        if (inp.length == 4) {
            return inp.substr(0, 1) + "." + inp.substr(1, 1) + "." + inp.substr(2, 2);
        }
    }

    //webapps
    reqstart();
    makeWait("#prodclient");
    makeLink("#prodclient_label", "auditapp.sqs.ch");
    $.ajax({
        url: "https://auditapp.sqs.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        setTimeout(function () {
            var str = getVnr(response);
            $("#prodclient").text(vstrwp(str));
            reqend();
        }, getTime());
    }).fail(function () {
        generateError("#prodclient");
        reqend();
    });

    reqstart();
    makeWait("#preclient");
    makeLink("#preclient_label", "sqspre.modan.ch");
    $.ajax({
        url: "https://sqspre.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        setTimeout(function () {
            var str = getVnr(response);
            $("#preclient").text(vstrwp(str));
            reqend();
        }, getTime());
    }).fail(function () {
        generateError("#preclient");
        reqend();
    });

    reqstart();
    makeWait("#testclient");
    makeLink("#testclient_label", "sqstest.modan.ch");
    $.ajax({
        url: "https://sqstest.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        setTimeout(function () {
            var str = getVnr(response);
            $("#testclient").text(vstrwp(str));
            reqend();
        }, getTime());
    }).fail(function () {
        generateError("#testclient");
        reqend();
    });

    reqstart();
    makeWait("#axtestclient");
    makeLink("#axtestclient_label", "sqsaxtest.modan.ch");
    $.ajax({
        url: "https://sqsaxtest.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        setTimeout(function () {
            var str = getVnr(response);
            $("#axtestclient").text(vstrwp(str));
            reqend();
        }, getTime());
    }).fail(function () {
        generateError("#axtestclient");
        reqend();
    });

    reqstart();
    makeWait("#devclient");
    makeLink("#devclient_label", "sqsdev.modan.ch");
    $.ajax({
        url: "https://sqsdev.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        setTimeout(function () {
            var str = getVnr(response);
            $("#devclient").text(vstrwp(str));
            reqend();
        }, getTime());
    }).fail(function () {
        generateError("#devclient");
        reqend();
    });


    setTimeout(function() {
        reqend(true);
    }, 5000)

}