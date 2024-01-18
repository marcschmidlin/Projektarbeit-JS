$(document).ready(function() {
    $.ajax({
        url: "http://sandbox.gibm.ch/berufe.php",
        dataType: "json",
        success: function(data) {
            var dropdown = $("#auswahlBerufsgruppe");
            $.each(data, function(index, beruf) {
                var optionText = beruf.beruf_name;
                dropdown.append($('<option></option>').attr('value', beruf.beruf_id).text(optionText));
            });

            // Beim Laden der Seite überprüfen, ob eine ausgewählte Berufsgruppe im Local Storage vorhanden ist
            var selectedBeruf = localStorage.getItem("selectedBeruf");
            if (selectedBeruf) {
                dropdown.val(selectedBeruf);
                dropdown.trigger("change");
            }
        }
    });


    $("#auswahlBerufsgruppe").change(function() {
        var selectedOption = $(this).val();
        $.ajax({
            url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(openingHoursData) {
                var stundenplanAnzeige = $("#stundenplanAnzeige");
                stundenplanAnzeige.empty(); 
                var table = $("<table class='table'></table>");
                var thead = $("<thead></thead>").appendTo(table);
                var tbody = $("<tbody></tbody>").appendTo(table);
                var headerRow = $("<tr></tr>").appendTo(thead);
                headerRow.append("<th>Datum</th>");
                headerRow.append("<th>Wochentag</th>");
                headerRow.append("<th>Von</th>");
                headerRow.append("<th>Bis</th>");
                headerRow.append("<th>Lehrer</th>");
                headerRow.append("<th>Fach</th>");
                headerRow.append("<th>Raum</th>");
                $.each(openingHoursData, function(index, entry) {
                    var row = $("<tr></tr>").appendTo(tbody);
                    row.append("<td>" + entry.stadt + "</td>");
                    row.append("<td>" + entry.strasse + "</td>");
                    row.append("<td>" + entry.stundenplan + "</td>");
                });
                table.appendTo(stundenplanAnzeige);

                // Speichern der ausgewählten Filiale im Local Storage
                localStorage.setItem("selectedFiliale", selectedOption);
            }
        });
    });
});