$(document).ready(function() {
    // Beim Laden der Seite: Holen und Anzeigen der verfügbaren Berufsgruppen

    $.ajax({
        url: "http://sandbox.gibm.ch/berufe.php",
        dataType: "json",
        success: function(data) {
            // Dropdown-Menü für Berufsgruppen erstellen
            var dropdown = $("#auswahlBerufsgruppe");
            $.each(data, function(index, beruf) {
                var optionText = beruf.beruf_name;
                dropdown.append($('<option></option>').attr('value', beruf.beruf_id).text(optionText));
            });

            // Überprüfen, ob zuvor eine Berufsgruppe ausgewählt wurde (im Local Storage)
            var selectedBeruf = localStorage.getItem("selectedBeruf");
            if (selectedBeruf) {
                dropdown.val(selectedBeruf);
                dropdown.trigger("change");
            }
        },
        error: function(error) {
            // Fehlermeldung, falls die API nicht verfügbar ist
            alert("Fehler beim Abrufen der Berufe: " + error);
        }
        
    });

    // Event-Handler für die Auswahl einer Berufsgruppe
    $("#auswahlBerufsgruppe").change(function() {
        var selectedOption = $(this).val();
        localStorage.setItem("selectedBeruf", selectedOption);
        // Anhand der ausgewählten Berufsgruppe: Holen und Anzeigen der verfügbaren Klassen
        $.ajax({
            url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(data) {
                // Dropdown-Menü für Klassen erstellen
                var dropdown = $("#auswahlKlasse");
                dropdown.empty(); // Vorherige Optionen löschen

                $.each(data, function(index, klasse) {
                    var optionText = klasse.klasse_longname;
                    dropdown.append($('<option></option>').attr('value', klasse.klasse_id).text(optionText));
                });

                // Überprüfen, ob zuvor eine Klasse ausgewählt wurde (im Local Storage)
                var selectedKlasse = localStorage.getItem("selectedKlasse");
                if (selectedKlasse) {
                    dropdown.val(selectedKlasse);
                    dropdown.trigger("change");
                }
            },
            error: function(error) {
                // Fehlermeldung, falls die API nicht verfügbar ist
                alert("Fehler beim Abrufen der Klassen: " + error);
            }
        });
    });

    // Event-Handler für die Auswahl einer Klasse
    $("#auswahlKlasse").change(function() {
        var selectedOption = $(this).val();

        // Anhand der ausgewählten Klasse: Holen und Anzeigen des Stundenplans

        $.ajax({
            url: "http://sandbox.gibm.ch/tafel.php?klasse_id=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(stundenplanData) {
                var stundenplanAnzeige = $("#stundenplanAnzeige");
                stundenplanAnzeige.empty(); // Vorherige Daten löschen

                var table = $("<table class='table'></table>");
                var thead = $("<thead></thead>").appendTo(table);
                var tbody = $("<tbody></tbody>").appendTo(table);

                // Überschriften für die Tabelle erstellen
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

                    row.hide().appendTo(tbody).fadeIn(1000);
                });

                table.appendTo(stundenplanAnzeige);

                // Speichern der ausgewählten Klasse im Local Storage
                localStorage.setItem("selectedKlasse", selectedOption);
            },
            error: function(error) {
                // Fehlermeldung, falls die API nicht verfügbar ist
                alert("Fehler beim Abrufen des Stundenplans: " + error);
            }
        });
    });
});