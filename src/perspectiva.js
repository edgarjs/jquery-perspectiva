(function () {
    var Layer = function (attributes) {
        this.init(attributes);
        return this;
    };

    Layer.prototype = {
        init: function (attributes) {
            var _this = this;

            this.update(attributes);

            this.element.load(function () {
                _this.element.unbind('load');
                _this.setCenter();
                $(this).trigger('ready.perspectiva');
            });
        },

        update: function (attributes) {
            var options = $.extend(true, {
                    xAxis: true,
                    yAxis: true,
                    xSpeed: 0.2,
                    scale: 0,
                    ySpeed: 0.2,
                    x: 0,
                    y: 0,
                }, attributes);

            $.extend(true, this, options);

            if (!this.element) {
                this.element = $('<img />');
            }

            if (this.scale) {
                this.element.height((this.scale * 100) + '%');
            } else {
                this.element.css('height', '');
            }

            this.element.css({
                position: 'absolute',
                marginLeft: '',
                marginTop: ''
            });

            this.setCenter();

            if (typeof this.src === 'function') {
                this.src = this.src(this);
            }
            this.element.attr('src', this.src);
        },

        setCenter: function () {
            var xc = 0.5, yc = 0.5, scale = 1, center = {};
            center.x = xc + this.x * scale;
            center.y = yc - this.y * scale;

            this.element.css({
                top: (center.y * this.viewport.height() - this.element.height() / 2),
                left: (center.x * this.viewport.width() - this.element.width() / 2)
            });
        },

        render: function (container) {
            container.append(this.element);
            return this;
        },

        move: function (position) {
            var css = {}, x, y;
            position = this._translateScreenToCartesian(position);

            if (this.xAxis) {
                x = -(position.x * this.xSpeed);
                css.marginLeft = this.viewport.width() * x;
            }
            if (this.yAxis) {
                y = position.y * this.ySpeed;
                css.marginTop = this.viewport.height() * y;
            }
            this.element.css(css);
        },

        destroy: function () {
            this.element.remove();
            this.viewport = null;
        },

        _translateScreenToCartesian: function (screenPos) {
            var x, y, xc, yc, scale;
            scale = 1;
            xc = yc = 0.5;

            x = (screenPos.x - xc) / scale;
            y = -((screenPos.y - yc) / scale);

            return {x: x, y: y};
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
                this.element.on('mousemove.perspectiva', function (ev) {
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

        center: function () {
            var x = this.width() / 2,
                y = this.height() / 2;
            return {x: x, y: y};
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
                layer.element.bind('ready.perspectiva', function () {
                    $(this).unbind('ready.perspectiva');
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

            this.element.unbind('mousemove.perspectiva');
            for (i = 0; i < layersCount; i++) {
                this.layers[i].destroy();
            }
        }
    }

    $.fn.perspectiva = function (options, layer, attributes) {
        if (options === 'settings') {
            return this[0].perspectiva[layer] && this[0].perspectiva[layer];
        }
        return $(this).each(function () {
            if (options === 'destroy') {
                this.perspectiva.destroy();
            } else if (options === 'update') {
                this.perspectiva[layer] && this.perspectiva[layer].update(attributes);
            } else {
                this.perspectiva = new Viewport($(this), options);
            }
        });
    };
})();
