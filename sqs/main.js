function preparePage(noRefresh) {
    
    $.get("/sqs/nav.html", function (result) {
        $("body").prepend(result);

        var href = document.location.href;
        if (href.indexOf("/status") > 0) 
            $("#nv_status").hide();
        if (href.indexOf("/versions") > 0)
            $("#nv_versionen").hide();

        if (noRefresh == true)
            $("#nav_refresh").hide();
    });


    
}

