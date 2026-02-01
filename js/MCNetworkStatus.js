$(document).ready(() => {
    const mcnetworkurl = "mcnetwork.zake2002.xyz:19132";
    const mcservers = [
        "mcnetwork.zake2002.xyz:22002", //Zake2002-Server
        "mcnetwork.zake2002.xyz:29656", //Creative
        "mcnetwork.zake2002.xyz:29653", //Zake2002-Legacy
        "zxcorporiginalserver.falixsrv.me:22390", //Zake2002-Original
        "pc.zake2002.xyz:54248", //Zake2002-Computer
        "a5.kyttuslab.org:25565", //Kyttus-Lab
        "mcnetwork.zake2002.xyz:32568", //SiegeCraft
        "node1.hg-gaming.eu:25565", //HellsGate-gaming
        "post-banners.gl.at.ply.gg:59559", //SnailCraft
        "PhoenixHeartalicorn.aternos.me:27597" //PhoenixHeart-Server
    ];

    // Fetch network status
    $.getJSON(`https://api.mcsrvstat.us/1/${mcnetworkurl}`, (network) => {
        if (network.debug?.ping) {
            let connected = network.players?.online || 0;

            // Fetch statuses of all servers
            const requests = mcservers.map((serverUrl) => {
                return $.getJSON(`https://api.mcsrvstat.us/1/${serverUrl}`).then((server) => {
                    if (server.debug?.ping) {
                        connected += server.players?.online || 0;
                    }
                });
            });

            // Fetch network details for the hub status
            if (network.players?.max != 0) {
                $("#hub_players_num").text(`${network.players?.online}/${network.players?.max} in hub / `);
            } else {
                $("#hub_players_num").text(`${network.players?.online} in hub / `);
            }

            // Wait for all server requests to complete
            Promise.all(requests).then(() => {
                if (network.players?.max != 0) {
                    $("#network").text(`${connected}/${network.players?.max} on network`).addClass("connected");
                } else {
                    $("#network").text(`${connected} on network`).addClass("connected");
                }
            });
        } else {
            $("#network").text("Network Unavailable").addClass("offline");
            $("#hub_players_num").hide();
        }
    }).fail(() => {
        $("#network").text("Cannot ping network").addClass("offline");
        $("#hub_players_num").hide();
    });

});