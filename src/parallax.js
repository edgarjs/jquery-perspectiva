(function () {
    var Layer = function (attributes) {
        this.init(attributes);
        return this;
    };

    Layer.prototype = {
        init: function (attributes) {
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

            this.element = $('<img />').attr('src', this.src);
            if (this.scale) {
                this.element.height((this.scale * 100) + '%');
            }
            this.element.load(function () {
                $(this).trigger('ready.parallax');
            });
            this.element.css({
                position: 'absolute',
                left: (this.xRange[0] * 100) + '%',
                top: (this.yRange[0] * 100) + '%'
            });
        },

        render: function (container) {
            container.append(this.element);
            return this;
        },

        move: function (position) {
            var css = {}, maxLeftPerc, maxTopPerc,
                maxLeftRange, maxTopRange,
                maxLeftPx = Math.abs(this.element.width() - this.viewport.width()),
                maxTopPx = Math.abs(this.element.height() - this.viewport.height());
            if (this.xAxis) {
                css.marginLeft = (position.x * 100 * this.xSpeed);
                maxLeftPerc = maxLeftPx * 100 / this.viewport.width();
                maxLeftRange = ((this.xRange[1] - this.xRange[0]) * 100);
                if (Math.abs(css.marginLeft) <= maxLeftPerc &&
                    maxLeftRange >= css.marginLeft) {
                    css.marginLeft += '%';
                } else {
                    delete css.marginLeft;
                }
            }
            if (this.yAxis) {
                css.marginTop = (position.y * 100 * this.ySpeed);
                maxTopPerc = maxTopPx * 100 / this.viewport.height();
                maxTopRange = ((this.yRange[1] - this.yRange[0]) * 100);
                if (Math.abs(css.marginTop) <= maxTopPerc) {
                    css.marginTop += '%';
                } else {
                    delete css.marginTop;
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

    $.fn.parallax = function (options) {
        return $(this).each(function () {
            if (options === 'destroy') {
                this.parallax.destroy();
            } else {
                this.parallax = new Viewport($(this), options);
            }
        });
    };
})();
