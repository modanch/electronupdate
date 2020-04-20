
function startForm() {


    var url = new URL(window.location.href);

    var lang = url.searchParams.get('lang');
    if (!lang)
        lang = "DE"

    var standalone = url.searchParams.get('standalone');
    if (standalone == 1) {
        $("body").addClass("standalone");
    }

    //Titel
    var text = "Verfügbare Hilfethemen:"
    lang == "EN" ? text = "E Available Help Topics:" : "";
    lang == "IT" ? text = "I Argomenti della Guida in linea:" : "";
    lang == "FR" ? text = "F Rubriques d'aide disponibles:" : "";
    $("#title").text(text);

    //Doku
    //var link = "https://hcp.sqs.ch/u/ha79RhUu_VaXrv1G/Anleitung.pdf?l";
    var link = "https://modansoftware.atlassian.net/wiki/download/attachments/1347878939/Anleitung.pdf?api=v2";
    link = link + "&lang=" + lang
    $("#dokulink").attr("href", link);

    var text = "Download Gesamtdokumentation";
    lang == "EN" ? text = "Complete documentation" : "";
    lang == "IT" ? text = "Documentazione completa" : "";
    lang == "FR" ? text = "Dossier complet" : "";
    $("#dokulink").text(text);

    //Video
    //var video = "https://hcp.sqs.ch/fss/public/link/public/stream/read/Starseite.mp4?linkToken=wDsaBVC7Gg_SOxoF&itemName=Starseite.mp4"
    var video = "https://modansoftware.atlassian.net/wiki/download/attachments/1347878939/1%20-%20Startseite.mp4?api=v2"
    var link = "video.html?video=" + encodeURIComponent(video);
    link = link + "&lang=" + lang
    if (standalone == 1) {
        link = link + "&standalone=1"
    }
    $("#videolink").attr("href", link);

    var text = "Einführungsvideo";
    lang == "EN" ? text = "Introductory video" : "";
    lang == "IT" ? text = "Video introduttivo" : "";
    lang == "FR" ? text = "Vidéo introductive" : "";
    $("#videolink").text(text);

    //History
    $("#historylink").attr("href", "https://modansoftware.atlassian.net/wiki/spaces/PUB/pages/1076199436/SQS-App+Versionshistory");
    var text = "Versionshistory";
    lang == "EN" ? text = "Version history (german)" : "";
    lang == "IT" ? text = "Storia delle versioni (tedesco)" : "";
    lang == "FR" ? text = "Historique des versions (allemand)" : "";
    $("#historylink").text(text);


}

