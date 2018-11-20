function loadPage() {

    $.ajax({
        url: "https://sqswebapi.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#prodserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
    });

    $.ajax({
        url: "https://sqswebapipre.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#preserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
    });

    $.ajax({
        url: "https://sqswebapitest.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#testserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
    });

    $.ajax({
        url: "https://sqswebapidev.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#devserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
    });

    /*
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/win64/RELEASES",
        context: document.body
    }).done(function (response) {
        $("#windowtestclient").text(response);
    });
    */

    var getVnr = function (response) {
        var idx = response.indexOf(" version=");
        var str = response.substr(idx + 10, 20);
        var idx2 = str.indexOf("\"");
        str = str.substr(0, idx2);
        return str;
    }

    var vstrwp = function(inp) {
        if (inp.length == 4) {
            return inp.substr(0, 1) + "." + inp.substr(1, 1) + "." + inp.substr(2, 2);
        }
    }


    $.ajax({
        url: "https://sqsauditapp.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#prodclient").text(vstrwp(str));
    });

    $.ajax({
        url: "https://sqspre.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#prodclient").text(vstrwp(str));
    });
    $.ajax({
        url: "https://sqstest.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#prodclient").text(vstrwp(str));
    });


}