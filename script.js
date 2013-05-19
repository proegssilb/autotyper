function createTyper(url, selector, delay) {
    req = new XMLHttpRequest();
    req.onload = function () {
        var lines = this.responseText.split("\n");
        var lineNo = 0;
        var typer = function () {
            elem = $(selector)
            // Get the new line in
            if (lineNo >= lines.length) {
                lineNo = 0;
            }
            var newline = lines[lineNo].replace("<", "&lt;").replace(">", "&gt;")
            elem.append(newline + "\n");
            lineNo = lineNo + 1;
            
            // Don't overflow.
            linecount = ( elem.text().match(/\n/g) || [] ).length
            if (linecount > 500) {
                newStart = elem.text().indexOf("\n")+1;
                elem.text( elem.text().substr(newStart) );
            }
            
            // Scroll to the bottom
            $("html, body").scrollTop( $("html, body").scrollTop() + 9999 );
        }
        setInterval(typer, delay);
    }
    req.open("get", url, true);
    req.send();
}
