import BMap from 'BMap';

function MyOverlay(point, imgPath, options) {
  this._point = point;
  this._imgPath = imgPath;
  this._options = options;
}
MyOverlay.prototype = new BMap.Overlay();
MyOverlay.prototype.initialize = function(map) {
  this._map = map;
  let div = this._div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  div.style.display = 'inline-block';
  div.style.width = '45px';
  div.style.height = '45px';
  div.style.borderRadius = '50%';
  div.style.backgroundImage = 'url(' + this._imgPath + ')';
  div.style.backgroundRepeat = 'no-repeat';
  div.style.backgroundSize = 'cover';
  div.style.MozUserSelect = 'none';
  if (this._options) {
    let disDiv = document.createElement('div');
    disDiv.className = 'distribution_info';
    disDiv.style.position = 'absolute';
    disDiv.style.top = '-60px';
    disDiv.style.left = '-57px';
    let innerHTML = '<div class="status">' + this._options.statusTxt + '</div>';
    innerHTML += '<div class="distance"><span class="normal">' + this._options.distanceDesc + '</span><span class="colorful">' + this._options.distanceTxt + '</span></div>';
    innerHTML += '<div class="trianle"></div>';
    disDiv.innerHTML = innerHTML;
    div.appendChild(disDiv);
  }
  this._map.getPanes().labelPane.appendChild(div);
  return div;
};

MyOverlay.prototype.draw = function() {
  let map = this._map;
  let pixel = map.pointToOverlayPixel(this._point);
  console.log(pixel);
  this._div.style.left = pixel.x + 'px';
  this._div.style.top = pixel.y + 'px';
};

export {
  MyOverlay
};