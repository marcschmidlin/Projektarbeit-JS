$(document).ready(function() {
    // initiales Laden der Berufsgruppen
    $.ajax({
        url: "http://sandbox.gibm.ch/berufe.php",
        dataType: "json",
        success: function(data) {
            var dropdown = $("#auswahlBerufsgruppe");
            $.each(data, function(index, beruf) {
                var optionText = beruf.beruf_name;
                dropdown.append($('<option></option>').attr('value', beruf.beruf_id).text(optionText));
            });

            // Überprüfen, ob eine ausgewählte Berufsgruppe im Local Storage vorhanden ist
            var selectedBeruf = localStorage.getItem("selectedBeruf");
            if (selectedBeruf) {
                dropdown.val(selectedBeruf);
                dropdown.trigger("change");
            }
        }
    });

    // Event-Handler für die Auswahl der Berufsgruppe
    $("#auswahlBerufsgruppe").change(function() {
        var selectedOption = $(this).val();
        $.ajax({
            url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(data) {
                var dropdown = $("#auswahlKlasse");
                dropdown.empty(); // Vorherige Optionen löschen

                $.each(data, function(index, klasse) {
                    var optionText = klasse.klasse_longname;
                    dropdown.append($('<option></option>').attr('value', klasse.klasse_id).text(optionText));
                });

                // Überprüfen, ob eine ausgewählte Klasse im Local Storage vorhanden ist
                var selectedKlasse = localStorage.getItem("selectedKlasse");
                if (selectedKlasse) {
                    dropdown.val(selectedKlasse);
                    dropdown.trigger("change");
                }
            }
        });
    });

    // Event-Handler für die Auswahl der Klasse
    $("#auswahlKlasse").change(function() {
        var selectedOption = $(this).val();
        $.ajax({
            url: "http://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(stundenplanData) {
                var stundenplanAnzeige = $("#stundenplanAnzeige");
                stundenplanAnzeige.empty(); // Vorherige Daten löschen

                var table = $("<table class='table'></table>");
                var thead = $("<thead></thead>").appendTo(table);
                var tbody = $("<tbody></tbody>").appendTo(table);

                // Überschriften für die Tabelle
                var headerRow = $("<tr></tr>").appendTo(thead);
                headerRow.append("<th>Datum</th>");
                headerRow.append("<th>Wochentag</th>");
                headerRow.append("<th>Von</th>");
                headerRow.append("<th>Bis</th>");
                headerRow.append("<th>Lehrer</th>");
                headerRow.append("<th>Fach</th>");
                headerRow.append("<th>Raum</th>");

                // Stundenplan-Daten in die Tabelle einfügen
                $.each(stundenplanData, function(index, entry) {
                    var row = $("<tr></tr>").appendTo(tbody);
                    row.append("<td>" + entry.tafel_datum + "</td>");
                    row.append("<td>" + entry.tafel_wochentag + "</td>");
                    row.append("<td>" + entry.tafel_von + "</td>");
                    row.append("<td>" + entry.tafel_bis + "</td>");
                    row.append("<td>" + entry.tafel_lehrer + "</td>");
                    row.append("<td>" + entry.tafel_fach + "</td>");
                    row.append("<td>" + entry.tafel_raum + "</td>");
                });

                table.appendTo(stundenplanAnzeige);

                // Speichern der ausgewählten Klasse im Local Storage
                localStorage.setItem("selectedKlasse", selectedOption);
            }
        });
    });

    // Löschen des Local Storage bei Klick auf den Button
    $("#loeschenButton").click(function() {
        localStorage.removeItem("selectedKlasse");
        localStorage.removeItem("selectedBeruf");
        $("#auswahlKlasse").val('');
        $("#auswahlBerufsgruppe").val('');
        $("#stundenplanAnzeige").empty();
    });
});