# Stundenplan BBZBL JavaScript-Anwendung

Die "Stundenplan BBZBL" JavaScript-Anwendung ermöglicht es Benutzern, den Stundenplan für das Berufsbildungszentrum BBZBL anzuzeigen. Die Anwendung verwendet jQuery für AJAX-Anfragen und die Manipulation des DOM, um Daten dynamisch auf der Webseite anzuzeigen.

## Funktionalität

Die Anwendung bietet die folgenden Hauptfunktionen:

1. **Auswahl der Berufsgruppe:** Beim Laden der Seite werden verfügbare Berufsgruppen von einer externen API abgerufen und in einem Dropdown-Menü angezeigt. Der Benutzer kann eine Berufsgruppe auswählen.

2. **Auswahl der Klasse:** Basierend auf der ausgewählten Berufsgruppe werden die verfügbaren Klassen von der API abgerufen und in einem weiteren Dropdown-Menü angezeigt. Der Benutzer kann eine Klasse auswählen.

3. **Anzeige des Stundenplans:** Nach Auswahl einer Klasse wird der Stundenplan für diese Klasse von der API abgerufen und in einer Tabelle auf der Webseite angezeigt. Die Tabelle wird dynamisch erstellt und zeigt Informationen wie Datum, Wochentag, Uhrzeiten, Lehrer, Fach und Raum an.

## Fehlerbehandlung

Die Anwendung verfügt über eine Fehlerbehandlung für den Fall, dass die externen APIs nicht verfügbar sind. In solchen Fällen wird eine Fehlermeldung angezeigt, um den Benutzer zu informieren.

## Verwendung

Um die Anwendung zu nutzen, öffnen Sie einfach die "index.html"-Datei in Ihrem Webbrowser. Sie benötigen eine Internetverbindung, da die Anwendung externe Ressourcen lädt.

## Anpassung

Sie können den JavaScript-Code in der "script.js"-Datei anpassen, um das Verhalten der Anwendung zu ändern oder zusätzliche Funktionen hinzuzufügen. Das Styling der Anwendung kann durch Bearbeiten der verlinkten CSS-Dateien in der "index.html"-Datei angepasst werden.

## Lizenz

Diese JavaScript-Anwendung steht unter der MIT-Lizenz. Sie können den Quellcode frei verwenden, ändern und verteilen, solange Sie die Lizenzbedingungen einhalten.

Vielen Dank, dass Sie die "Stundenplan BBZBL" JavaScript-Anwendung verwenden!