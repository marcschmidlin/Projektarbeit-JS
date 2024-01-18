$(document).ready(function() {
    $.ajax({
        url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON",
        dataType: "json",
        success: function(data) {
            var dropdown = $("#Auswahl");
            $.each(data, function(index, filiale) {
                var optionText = filiale.stadt + " - " + filiale.strasse;
                dropdown.append($('<option></option>').attr('value', filiale.id).text(optionText));
            });

            // Beim Laden der Seite überprüfen, ob eine ausgewählte Filiale im Local Storage vorhanden ist
            var selectedFiliale = localStorage.getItem("selectedFiliale");
            if (selectedFiliale) {
                dropdown.val(selectedFiliale);
                dropdown.trigger("change");
            }
        }
    });

    $("#Auswahl").change(function() {
        var selectedOption = $(this).val();
        $.ajax({
            url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale=" + selectedOption + "&format=JSON",
            dataType: "json",
            success: function(openingHoursData) {
                var oeffnungszeitenAnzeige = $("#oeffnungszeitenAnzeige");
                oeffnungszeitenAnzeige.empty(); 
                var table = $("<table class='table'></table>");
                var thead = $("<thead></thead>").appendTo(table);
                var tbody = $("<tbody></tbody>").appendTo(table);
                var headerRow = $("<tr></tr>").appendTo(thead);
                headerRow.append("<th>Stadt</th>");
                headerRow.append("<th>Straße</th>");
                headerRow.append("<th>Öffnungszeiten</th>");
                $.each(openingHoursData, function(index, entry) {
                    var row = $("<tr></tr>").appendTo(tbody);
                    row.append("<td>" + entry.stadt + "</td>");
                    row.append("<td>" + entry.strasse + "</td>");
                    row.append("<td>" + entry.oeffnungszeiten + "</td>");
                });
                table.appendTo(oeffnungszeitenAnzeige);

                // Speichern der ausgewählten Filiale im Local Storage
                localStorage.setItem("selectedFiliale", selectedOption);
            }
        });
    });
});