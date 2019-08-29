$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

function startForm() {
    var lang = $.urlParam('lang');
    if (!lang)
        lang = "DE"

    //Titel
    var text = "Verfügbare Hilfethemen:"
    lang == "EN" ? text = "E Available Help Topics:" : "";
    lang == "IT" ? text = "I Argomenti della Guida in linea:" : "";
    lang == "FR" ? text = "F Rubriques d'aide disponibles:" : "";
    $("#title").text(text);

    //Doku
    var link = "https://hcp.sqs.ch/fss/public/link/public/stream/read/Anleitung.pdf?linkToken=6WUcVHnlHF37ZRxU&itemName=Anleitung.pdf";
    link = link + "&lang=" + lang
    $("#dokulink").attr("href", link);

    var text = "Download Gesamtdokumentation";
    lang == "EN" ? text = "E Complete documentation" : "";
    lang == "IT" ? text = "I Documentazione completa" : "";
    lang == "FR" ? text = "F Dossier complet" : "";
    $("#dokulink").text(text);

    //Video
    var video = "https://hcp.sqs.ch/fss/public/link/public/stream/read/Starseite.mp4?linkToken=wDsaBVC7Gg_SOxoF&itemName=Starseite.mp4"
    var link = "video.html?video=" + encodeURIComponent(video);
    link = link + "&lang=" + lang
    $("#videolink").attr("href", link);

    var text = "Einführungsvideo";
    lang == "EN" ? text = "E Einführungsvideo" : "";
    lang == "IT" ? text = "I Einführungsvideo" : "";
    lang == "FR" ? text = "F Vidéo introductive" : "";
    $("#videolink").text(text);

}

