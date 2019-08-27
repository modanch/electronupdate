function startVideo() {

    var url = new URL(window.location.href);

    //var l = url.searchParams.get("lang");
    //$("#backlink").attr("href", "index.html?lang=" + l);

    var c = url.searchParams.get("video");
    $("#videoctrl").attr("src", c);
    $('#videoctrl').trigger("play");
}

