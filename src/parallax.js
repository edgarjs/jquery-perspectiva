(function () {
    var Layer = function (attributes) {
        this.init(attributes);
        return this;
    };

    Layer.prototype = {
        init: function (attributes) {
            var options = $.extend(true, {
                position: {
                    x: 0,
                    y: 0
                },
                xAxis: true,
                yAxis: true,
                xSpeed: 0,
                ySpeed: 0,
                xRange: [0, 1],
                yRange: [0, 1]
            }, attributes);

            $.extend(this, options);

            this.element = $('<img />').attr('src', this.src);
            this.element.load(function () {
                $(this).trigger('ready.parallax');
            });
            this.element.css({
                position: 'absolute',
                top: (this.position.y * 100) + '%',
                left: (this.position.x * 100) + '%'
            });
        },

        render: function (container) {
            container.append(this.element);
            return this;
        },

        move: function (position) {
            var css = {}, maxLeftPerc, maxTopPerc,
                maxLeftPx = Math.abs(this.element.width() - this.viewport.width),
                maxTopPx = Math.abs(this.element.height() - this.viewport.height);
            if (this.xAxis) {
                css.marginLeft = (position.x * 100 * this.xSpeed);
                maxLeftPerc = maxLeftPx * 100 / this.viewport.width;
                if (Math.abs(css.marginLeft) <= maxLeftPerc) {
                    css.marginLeft += '%';
                } else {
                    delete css.marginLeft;
                }
            }
            if (this.yAxis) {
                css.marginTop = (position.y * 100 * this.ySpeed);
                maxTopPerc = maxTopPx * 100 / this.viewport.height;
                if (Math.abs(css.marginTop) <= maxTopPerc) {
                    css.marginTop += '%';
                } else {
                    delete css.marginTop;
                }
            }
            this.element.css(css);
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
            this.width = this.element.width();
            this.height = this.element.height();
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

        initLayers: function () {
            var layersCount = this.options.layers.length,
                layer, i, _this = this;

            for (i = 0; i < layersCount; i++) {
                this.options.layers[i].viewport = this;
                layer = new Layer(this.options.layers[i]);
                layer.element.bind('ready.parallax', function () {
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
                x: (position.x / this.width),
                y: (position.y / this.height)
            };

            for (i = 0; i < layersLength; i++) {
                layer = this.layers[i];
                layer.move(newPos);
            }

            return this;
        }
    }

    $.fn.parallax = function (options) {
        return $(this).each(function () {
            new Viewport($(this), options);
        });
    };
})();
