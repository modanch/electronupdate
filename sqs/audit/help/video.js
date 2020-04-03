function startVideo() {

    var url = new URL(window.location.href);

    //var l = url.searchParams.get("lang");
    //$("#backlink").attr("href", "index.html?lang=" + l);

    var standalone = $.urlParam('standalone');
    if (standalone == 1) {
        $("body").addClass("standalone");
    }

    var c = url.searchParams.get("video");
    $("#videoctrl").attr("src", c);
    $('#videoctrl').trigger("play");
}

