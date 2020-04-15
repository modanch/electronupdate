function startVideo() {

    var url = new URL(window.location.href);

    var standalone = url.searchParams.get('standalone');
    if (standalone == 1) {
        $("body").addClass("standalone");
    }

    var c = url.searchParams.get("video");
    $("#videoctrl").attr("src", c);
    $('#videoctrl').trigger("play");
}

