(function (host, cookieId, isNew, dnt, ecds, syncUrl) {
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    function setCookie(name, value, ops, e) {
        ops = ops || {}; e = ops.expires;
        if (typeof e == "number" && e) {
            var d = new Date(); d.setTime(d.getTime() + e*1000); e = ops.expires = d;
        }
        if (e && e.toUTCString) { ops.expires = e.toUTCString(); }
        var uc = name + "=" + encodeURIComponent(value);
        for(var pn in ops) {
            uc += "; " + pn; var pv = ops[pn];
            if (pv !== true) {
                uc += "=" + pv;
            }
        }
        document.cookie = uc;
    }
    function getRtbmScreenStr(fields, wc, i, res) {
        wc = window.screen;
        fields = "availWidth availHeight availTop availLeft pixelDepth colorDepth width height".split(' ');
        res = [];
        for(i = 0; i < fields.length; i++) {
            if (wc[fields[i]]) {
                res.push('"' + fields[i]+'":' + wc[fields[i]]);
            }
        }
        return '{' + res.join(',') + '}';
    }
    function inEcds(h, i) {
        h = document.location.hostname;
        if (ecds && ecds.length) {
            for(i = 0; i < ecds.length; i++) {
                if (h.toLowerCase().indexOf(ecds[i].toLowerCase()) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
    (function (dcookieId) {
        dcookieId = getCookie('_rtbmedia');
        if (inEcds() || dnt) {
            if (dcookieId) {
                setCookie('_rtbmedia', "", {"path": "/", "expires": -365*24*60*60 });
            }
            return;
        }
        if (isNew && dcookieId) {
            cookieId = dcookieId;
        }
        if (!dcookieId || cookieId != dcookieId) {
            setCookie('_rtbmedia', cookieId, {"path": "/", "expires": 365 * 24 * 60 * 60 });
        }
    })();
    var syncPixelInserted = false;
    function _insertSyncPixel(id) {
        syncPixelInserted = true;
        if (!syncUrl.length) return;
        var img = document.createElement('img');
        img.setAttribute("style", "position: absolute; width: 2px; height: 2px; left: -100px; top: -100px;");
        img.src = "//" + host + syncUrl+"?p="+encodeURIComponent(id);
        document.body.appendChild(img);
    }
    function _rtbmt(_rtbm, s, e, u, h) {
        if (_rtbm && _rtbm.id) {
            if (!syncPixelInserted) _insertSyncPixel(_rtbm.id)
            e = encodeURIComponent;
            u = "//" + host + "/pixel" + _rtbm.id + ".js?_rtbmedia=" + cookieId +
                "&url=" + e(document.location.href) + "&referrer=" + e(document.referrer) +
                "&screen=" + e(getRtbmScreenStr()) + "&r=" + Math.random();
            if (_rtbm.osum) { u += "&osum=" + encodeURIComponent(_rtbm.osum); }
            if (_rtbm.oid) { u += "&oid=" + encodeURIComponent(_rtbm.oid); }
            if (_rtbm.custom_data) { u += "&custom_data=" + encodeURIComponent(_rtbm.custom_data); }
            if (_rtbm.sync) {
                document.write('<script type="text/javascript" src="'+u+'&sync=1"></script>');
            } else {
                s = document.createElement('script'); s.src = u; s.async = true;
                h = document.head || document.getElementsByTagName('head')[0]; h.appendChild(s);
            }
        }
    }
    if (typeof window._rtbm !== "undefined") {
        _rtbmt(window._rtbm);
        delete window._rtbm;
    }
    if (typeof window._rtbms !== "undefined" && window._rtbms && window._rtbms.length) {
            for (var r = 0; r < window._rtbms.length; r++) {
                _rtbmt(window._rtbms[r]);
        }
    }
    window._rtbms = { push: _rtbmt };
})
('track.rtb-media.me', '3b64fbd08efe11e6a0994b5ad6af0682', true, false, ['google', 'doubleclick'], '')