function QQOverlay(point, imgPath, QQMap, options) {
  let _QQOverlay = function(point, imgPath, options) {
    this._point = point;
    this._imgPath = imgPath;
    this._options = options;
  };
  _QQOverlay.prototype = new QQMap.maps.Overlay();
  _QQOverlay.prototype.construct = function() {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.display = 'inline-block';
    this.div.style.width = '45px';
    this.div.style.height = '45px';
    this.div.style.borderRadius = '50%';
    this.div.style.backgroundImage = 'url(' + this._imgPath + ')';
    this.div.style.backgroundRepeat = 'no-repeat';
    this.div.style.backgroundSize = 'cover';
    this.div.style.MozUserSelect = 'none';
    this.div.zIndex = 1;
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
      this.div.appendChild(disDiv);
    }
    this.getPanes().overlayMouseTarget.appendChild(this.div);
  };
  _QQOverlay.prototype.draw = function() {
    if (this._point) {
      let pixel = this.getProjection().fromLatLngToDivPixel(this._point);
      this.div.style.left = pixel.getX() + 'px';
      this.div.style.top = pixel.getY() + 'px';
    }
  };

  _QQOverlay.prototype.destroy = function() {
    this.div.parentNode.removeChild(this.div);
  };

  return new _QQOverlay(point, imgPath, options);
}

export {
  QQOverlay
};
