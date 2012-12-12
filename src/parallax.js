(function () {
    var Layer = function (attributes) {
        this.init(attributes);
        return this;
    };

    Layer.prototype = {
        init: function (attributes) {
            this.update(attributes);

            this.element.load(function () {
                $(this).trigger('ready.parallax');
            });
        },

        update: function (attributes) {
            var options = $.extend(true, {
                    xAxis: true,
                    yAxis: true,
                    xSpeed: 0.2,
                    scale: 0,
                    ySpeed: 0.2,
                    xRange: [0, 1],
                    yRange: [0, 1]
                }, attributes);

            $.extend(true, this, options);

            if (!this.element) {
                this.element = $('<img />');
            }

            if (typeof this.src === 'function') {
                this.src = this.src(this);
            }
            this.element.attr('src', this.src);

            if (this.scale) {
                this.element.height((this.scale * 100) + '%');
            } else {
                this.element.css('height', '');
            }

            this.element.css({
                position: 'absolute',
                left: (this.xRange[0] * 100) + '%',
                top: (this.yRange[0] * 100) + '%',
                marginLeft: '',
                marginTop: ''
            });
        },

        render: function (container) {
            container.append(this.element);
            return this;
        },

        move: function (position) {
            var css = {}, x, realX, maxRangeX, minRangeX, y, realY, maxRangeY, minRangeY;

            if (this.xAxis) {
                x = position.x * this.xSpeed;
                realX = this.xRange[0] + x;
                maxRangeX = Math.max.apply(null, this.xRange);
                minRangeX = Math.min.apply(null, this.xRange);

                xDiff = (this.element.width() - this.viewport.width()) / this.viewport.width();

                if (xDiff > 0) {
                    minRangeX = Math.max(minRangeX, -xDiff);
                    maxRangeX = Math.min(maxRangeX, xDiff);
                }

                if (realX >= minRangeX && realX <= maxRangeX) {
                    css.marginLeft = (x * 100) + '%';
                }
            }
            if (this.yAxis) {
                y = position.y * this.ySpeed;
                realY = this.yRange[0] + y;

                maxRangeY = Math.max.apply(null, this.yRange);
                minRangeY = Math.min.apply(null, this.yRange);

                yDiff = (this.element.height() - this.viewport.height()) / this.viewport.height();

                if (yDiff > 0) {
                    minRangeY = Math.max(minRangeY, -yDiff);
                    maxRangeY = Math.min(maxRangeY, yDiff);
                }

                if (realY >= minRangeY && realY <= maxRangeY) {
                    css.marginTop = (y * 100) + '%';
                }
            }
            this.element.css(css);
        },

        destroy: function () {
            this.element.remove();
            this.viewport = null;
        }
    };

    var Viewport = function (element, options) {
        this.init(element, options);
        return this;
    };

    Viewport.prototype = {
        init: function (element, options) {
            this.options = $.extend({}, options);
            this.element = element;
            this.layers = [];
            this.layersReady = 0;
            this.initLayers();
        },

        _onLayerReady: function () {
            var _this = this;
            this.layersReady++;
            if (this.layersReady === this.layers.length) {
                this.element.on('mousemove.parallax', function (ev) {
                    var elemOffset = $(this).offset(),
                        offset = {
                            x: ev.pageX - elemOffset.left,
                            y: ev.pageY - elemOffset.top
                        };
                    _this.animate(offset);
                });
                this.options.ready && this.options.ready();
            }
        },

        width: function () {
            return this.element.width();
        },

        height: function () {
            return this.element.height();
        },

        initLayers: function () {
            var layersCount = this.options.layers.length,
                layer, i, _this = this;

            for (i = 0; i < layersCount; i++) {
                this.options.layers[i].viewport = this;
                layer = new Layer(this.options.layers[i]);
                layer.element.bind('ready.parallax', function () {
                    $(this).unbind('ready.parallax');
                    _this._onLayerReady();
                });
                this.layers.push(layer);
                if (layer.name) {
                    this[layer.name] = layer;
                }

                layer.render(this.element);
            }
        },

        animate: function (position) {
            var i, layer, newPos,
                layersLength = this.layers.length;

            newPos = {
                x: (position.x / this.width()),
                y: (position.y / this.height())
            };

            for (i = 0; i < layersLength; i++) {
                layer = this.layers[i];
                layer.move(newPos);
            }

            return this;
        },

        destroy: function () {
            var layersCount = this.layers.length,
                i;

            this.element.unbind('mousemove.parallax');
            for (i = 0; i < layersCount; i++) {
                this.layers[i].destroy();
            }
        }
    }

    $.fn.parallax = function (options, layer, attributes) {
        if (options === 'settings') {
            return this[0].parallax[layer] && this[0].parallax[layer];
        }
        return $(this).each(function () {
            if (options === 'destroy') {
                this.parallax.destroy();
            } else if (options === 'update') {
                this.parallax[layer] && this.parallax[layer].update(attributes);
            } else {
                this.parallax = new Viewport($(this), options);
            }
        });
    };
})();
