export function FONTSIZE() {
  return (
    (function (doc, win) {
      let docEl = doc.documentElement;
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let recalc = function () {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window)
  );
}