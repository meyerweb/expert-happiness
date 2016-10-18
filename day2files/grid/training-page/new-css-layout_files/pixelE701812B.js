(function(externalSnippet) {
    function loadScripts(ssIdx, sslen, ss, h, ck) {
        var breaked = false;
        for(var i = ssIdx; i < sslen; i++) {
            if( ss[i].getAttribute("dl") == "true" ){ ss[i].removeAttribute("dl"); continue; }
            if (!ss[i].src) { eval(ss[i].innerHTML); continue; }
            var s = document.createElement('script'); s.src = ss[i].src; s.async = ss[i].async; h.appendChild(s);
            if (!ss[i].async && i+1 < sslen) {
                s.onload = s.onerror = function() {
                    if (!this.executed) { this.executed = true; loadScripts(i+1, sslen, ss, h, ck); }
                };
                s.onreadystatechange = function() {
                    if (this.readyState == "complete" || this.readyState == "loaded") {
                        var self = this; setTimeout( function () {self.onload(); }, 0);
                    }};
                breaked = true;
                break;
            }
        }
        if (!breaked) { ck(); }
    }
    function appendHTML(html) {
        var h = document.head || document.getElementsByTagName('head')[0], b = document.body, c = document.createElement("div");
        var ss = b.getElementsByTagName("script");
        for(var i = 0; i < ss.length; i++) { ss[i].setAttribute("dl","true"); }
        c.style.position = 'absolute';
        c.style.padding = '0'; c.style.margin = '0';
        c.style.width = '1px'; c.style.height = '1px';
        c.style.left = '-30px'; c.style.top = '-30px';
        c.innerHTML += html; b.appendChild(c);
        var ss = b.getElementsByTagName("script");
        var dw = document.write;
        var dwText = '';
        document.write = function(text) {
            dwText += text;
        }
        loadScripts(0, ss.length, ss, h, function(){
            document.write = dw;
            if (dwText) {
                appendHTML(dwText);
            }
        });
    }
    appendHTML(externalSnippet);
})
('<div style="display:inline;">\n<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/921478111/?value=1&amp;guid=ON&amp;script=0"/>\n</div>');