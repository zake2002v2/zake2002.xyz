$(document).ready(() => {
    const mcmainserver = "mc.zake2002.xyz:22002"; //replace with your server's NODE address, NOT the shared join address

    // Fetch main server status
    $.getJSON(`https://api.mcsrvstat.us/1/${mcmainserver}`, (mainserver) => {
        if (mainserver.debug?.ping) {
            $("#status").text("Online!").addClass("online");
            if (mainserver.players?.max != 0) {
                $("#players_num").text(`${mainserver.players?.online}/${mainserver.players?.max} connected`);
            } else {
                $("#players_num").text(`${mainserver.players?.online} connected`);
            };
        } else {
            $("#status").text("Offline").addClass("offline");
            $("#players_num").hide();
        }
    }).fail(() => {
        $("#status").text("Error").addClass("offline");
        $("#players_num").hide();
    });
});