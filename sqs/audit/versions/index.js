function loadPage() {

    var requests = 0;
    
    var reqstart = function() {
        requests++;

        if (requests > 0) {
            $("#btnRefresh").text("loading...");
        }
    }
    var reqend = function () {
        requests--;

        if (requests == 0) {
            $("#btnRefresh").text("Refresh");
        }

    }

    reqstart();    
    $("#prodserver_label").text("sqswebapi.modan.ch");
    $.ajax({
        url: "https://sqswebapi.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#prodserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    reqstart();    
    $("#preserver_label").text("sqswebapipre.modan.ch");
    $.ajax({
        url: "https://sqswebapipre.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#preserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    reqstart();    
    $("#testserver_label").text("sqswebapitest.modan.ch");
    $.ajax({
        url: "https://sqswebapitest.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#testserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    reqstart();    
    $("#devserver_label").text("sqswebapidev.modan.ch");
    $.ajax({
        url: "https://sqswebapidev.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#devserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    reqstart();    
    $("#axserver_label").text("sqswebapiaxsync.modan.ch");
    $.ajax({
        url: "https://sqswebapiaxsync.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#axserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    reqstart();    
    $("#axtestserver_label").text("sqswebapiaxsync.modan.ch");
    $.ajax({
        url: "https://sqswebapiaxsync.modan.ch/breeze/auditbreeze/getserverinfo"
    }).done(function (response) {
        $("#axtestserver").text(response.Release + "." + response.MainVersion + "." + response.SubVersion);
        reqend();
    });

    //electron
    reqstart();    
    $.ajax({
        url: "http://update.modan.ch/sqs/audit/win64/RELEASES"
    }).done(function (response) {
        var idx = response.indexOf(" sqsauditapp-");
        var str = response.substr(idx + 13, 20);
        var idx2 = str.indexOf("-");
        str = str.substr(0, idx2);

        $("#windowtestclient").text(str);
        reqend();
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
    $("#prodclient_label").text("sqsauditapp.modan.ch");
    $.ajax({
        url: "https://sqsauditapp.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#prodclient").text(vstrwp(str));
        reqend();
    }).fail(function () {
        $("#prodclient").text("error");
        reqend();
    });

    reqstart();    
    $("#preclient_label").text("sqspre.modan.ch");
    $.ajax({
        url: "https://sqspre.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#preclient").text(vstrwp(str));
        reqend();
    }).fail(function () {
        $("#preclient").text("error");
        reqend();
    });

    reqstart();    
    $("#testclient_label").text("sqstest.modan.ch");
    $.ajax({
        url: "https://sqstest.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#testclient").text(vstrwp(str));
        reqend();
    }).fail(function () {
        $("#testclient").text("error");
        reqend();
    });

    reqstart();    
    $("#axtestclient_label").text("sqsaxtest.modan.ch");
    $.ajax({
        url: "https://sqsaxtest.modan.ch/index.html",
        crossDomain: true
    }).done(function (response) {
        var str = getVnr(response);
        $("#axtestclient").text(vstrwp(str));
        reqend();
    }).fail(function () {
        $("#axtestclient").text("error");
        reqend();
    });



}