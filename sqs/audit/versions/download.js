function loadPage() {

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


    var makeLink = function (name, inp, isService) {
        $(name).text(inp + "");
        $(name).css("color", "#212529");

        if (isService) {
            $(name).attr("href", "https://" + inp + "/breeze/auditbreeze/getserverinfo");
        } else {
            $(name).attr("href", "https://" + inp + "");
        }

        $(name).attr("target", "_blank");
    }

    var reqstart = function () {
        requests++;

        if (requests > 0) {
            $("#nav_refresh").text("loading...");
        }
    }
    var reqend = function () {
        requests--;
        if (requests == 0) {
            $("#nav_refresh").text("Refresh");
        }
    }


    //electron
    reqstart();
    makeWait("#windowtestclient");
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditapp-");
            var str = response.substr(idx + 13, 20);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowtestclient").text(str);
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
    //electron
    reqstart();
    makeWait("#windowclient");
    $.ajax({
        url: "https://update.modan.ch/sqs/audit/win64/RELEASES?_=" + new Date().getTime()
    }).done(function (response) {
        setTimeout(function () {
            var idx = response.indexOf(" sqsauditapp-");
            var str = response.substr(idx + 13, 20);
            var idx2 = str.indexOf("-");
            str = str.substr(0, idx2);

            $("#windowclient").text("Version: "+str);
            reqend();
        }, getTime());
    });




}