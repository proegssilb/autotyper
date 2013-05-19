function nth_ocurrence(str, needle, nth) {
  for (i=0;i<str.length;i++) {
    if (str.charAt(i) == needle) {
        if (!--nth) {
           return i;    
        }
    }
  }
  return false;
}

function createTyper(url, selector, delay) {
    var multiplier = 20;
    var maxlen = 100;
    req = new XMLHttpRequest();
    req.onload = function () {
        var lines = this.responseText.split("\n");
        var lineNo = 0;
        var typer = function () {
            elem = $(selector)
            // Get the new lines in
            var text = "";
            for (var i = 0; i < multiplier; i++) {
                if (lineNo >= lines.length) {
                    lineNo = 0;
                }
                var newline = lines[lineNo].replace("<", "&lt;").replace(">", "&gt;")
                text = text + newline + "\n"
                lineNo = lineNo + 1;
            }
            elem.append(text)
            
            // Don't overflow.
            linecount = ( elem.text().match(/\n/g) || [] ).length
            if (linecount > maxlen) {
                newStart = nth_ocurrence(elem.text(), "\n", multiplier)+1;
                elem.text( elem.text().substr(newStart) );
            }
            
            // Scroll to the bottom
            $("html, body").scrollTop( $("html, body").scrollTop() + 9999 );
        }
        setInterval(typer, delay*multiplier);
    }
    req.open("get", url, true);
    req.send();
}
