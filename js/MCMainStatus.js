$(document).ready(() => {
    const mcnetworkurl = "mcnetwork.zake2002.xyz:19132";
    const mcmainserver = "mcnetwork.zake2002.xyz:22002";
    const mccreativeserver = "mcnetwork.zake2002.xyz:29656";
    const mclegacyserver = "mcnetwork.zake2002.xyz:29653";
    const mcoriginalserver = "zxcorporiginalserver.falixsrv.me:22390";

    // Fetch network status for MCMap
    $.getJSON(`https://api.mcsrvstat.us/1/${mcnetworkurl}`, (network) => {
        if (network.debug?.ping) {
            $("#mcmap").addClass("map");
        };
    });

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

    // Fetch creative server status
    $.getJSON(`https://api.mcsrvstat.us/1/${mccreativeserver}`, (creativeserver) => {
        if (creativeserver.debug?.ping) {
            $("#creative_status").text("Online!").addClass("online");
            if (creativeserver.players?.max != 0) {
                $("#creative_players_num").text(`${creativeserver.players?.online}/${creativeserver.players?.max} connected`);
            } else {
                $("#creative_players_num").text(`${creativeserver.players?.online} connected`);
            };
        } else {
            $("#creative_status").text("Offline").addClass("offline");
            $("#creative_players_num").hide();
        }
    }).fail(() => {
        $("#creative_status").text("Error").addClass("offline");
        $("#creative_players_num").hide();
    });

    // Fetch legacy server status
    $.getJSON(`https://api.mcsrvstat.us/1/${mclegacyserver}`, (legacyserver) => {
        if (legacyserver.debug?.ping) {
            $("#legacy_status").text("Online!").addClass("online");
            if (legacyserver.players?.max != 0) {
                $("#legacy_players_num").text(`${legacyserver.players?.online}/${legacyserver.players?.max} connected`);
            } else {
                $("#legacy_players_num").text(`${legacyserver.players?.online} connected`);
            };
        } else {
            $("#legacy_status").text("Offline").addClass("offline");
            $("#legacy_players_num").hide();
        }
    }).fail(() => {
        $("#legacy_status").text("Error").addClass("offline");
        $("#legacy_players_num").hide();
    });

        // Fetch original server status
    $.getJSON(`https://api.mcsrvstat.us/1/${mcoriginalserver}`, (originalserver) => {
        if (originalserver.debug?.ping) {
            if (originalserver.players?.max != 0) {
                $("#original_status").text("Online!").addClass("online");
                $("#original_players_num").text(`${originalserver.players?.online}/${originalserver.players?.max} connected`);
            } else {
                $("#original_status").text("Offline").addClass("offline");
                $("#original_players_num").hide();
            };
        } else {
            $("#original_status").text("Offline").addClass("offline");
            $("#original_players_num").hide();
        }
    }).fail(() => {
        $("#original_status").text("Error").addClass("offline");
        $("#original_players_num").hide();
    }); 
});