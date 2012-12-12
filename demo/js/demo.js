var setSettings = function (layer) {
    var settings = $('.parallax.wide').parallax('settings', layer);
    $('#name').val(layer);
    $('#x-axis').attr('checked', settings.xAxis);
    $('#y-axis').attr('checked', settings.yAxis);
    $('#x-speed').val(settings.xSpeed);
    $('#y-speed').val(settings.ySpeed);
    $('#x-range-0').val(settings.xRange[0]);
    $('#x-range-1').val(settings.xRange[1] || 1);
    $('#y-range-0').val(settings.yRange[0]);
    $('#y-range-1').val(settings.yRange[1] || 1);
    $('#scale').val(settings.scale);
    $('#update-settings').removeAttr('disabled');
    $('#settings-form').show();
};

$(function () {

    $('#settings-form').on('submit', function () {
        var layer = $('#name').val();
        var settings = {
            xSpeed: parseFloat($('#x-speed').val() || 0),
            ySpeed: parseFloat($('#y-speed').val() || 0),
            xRange: [parseFloat($('#x-range-0').val() || 0), parseFloat($('#x-range-1').val() || 0)],
            yRange: [parseFloat($('#y-range-0').val() || 0), parseFloat($('#y-range-1').val() || 0)],
            scale: parseFloat($('#scale').val() || 0),
            xAxis: $('#x-axis').is(':checked'),
            yAxis: $('#y-axis').is(':checked')
        };
        $('.parallax').parallax('update', layer, settings);
        return false;
    });

    $('.settings.sun').on('click', function () {
        setSettings('sun');
        return false;
    });

    $('.settings.mountains').on('click', function () {
        setSettings('mountains');
        return false;
    });

    $('.settings.hill').on('click', function () {
        setSettings('hill');
        return false;
    });

    $('.settings.wood').on('click', function () {
        setSettings('wood');
        return false;
    });

    $('.parallax').parallax({
        layers: [{
            src: function (layer) {
                // You can build any src for the image depending on the layer or viewport settings
                return 'img/0_sun.png';
            },
            xSpeed: 0.5,
            ySpeed: 1,
            xRange: [0.2, 1],
            yRange: [0, 1],
            name: 'sun'
        }, {
            src: 'img/1_mountains.png',
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            xRange: [0, -0.06],
            yRange: [0.45],
            name: 'mountains'
        }, {
            src: 'img/2_hill.png',
            xSpeed: -1,
            ySpeed: 0.2,
            xRange: [0, -0.25],
            yRange: [0.41, 1],
            name: 'hill'
        }, {
            src: 'img/3_wood.png',
            xSpeed: -1.2,
            ySpeed: 0.3,
            xRange: [0, -0.55],
            yRange: [0.5],
            name: 'wood'
        }]
    });

    $('.parallax-mini').parallax({
        layers: [{
            src: 'img/0_sun.png',
            scale: 0.2,
            xSpeed: 0.5,
            ySpeed: 1,
            xRange: [0.2, 1],
            yRange: [0, 1],
            name: 'sun'
        }, {
            src: 'img/1_mountains.png',
            scale: 0.9,
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            xRange: [0, -0.06],
            yRange: [0.2],
            name: 'mountains'
        }, {
            src: 'img/2_hill.png',
            scale: 1.3,
            xSpeed: -1,
            ySpeed: 0.2,
            xRange: [0, -0.25],
            yRange: [0.2, 1],
            name: 'hill'
        }, {
            src: 'img/3_wood.png',
            scale: 0.9,
            xSpeed: -1.2,
            ySpeed: 0.3,
            xRange: [0, -0.55],
            yRange: [0.3],
            name: 'wood'
        }]
    });

    $('.parallax-responsive').parallax({
        layers: [{
            src: 'img/0_sun.png',
            scale: 0.2,
            xSpeed: 0.5,
            ySpeed: 1,
            xRange: [0.2, 1],
            yRange: [0, 1],
            name: 'sun'
        }, {
            src: 'img/1_mountains.png',
            scale: 0.9,
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            xRange: [0, -0.06],
            yRange: [0.2],
            name: 'mountains'
        }, {
            src: 'img/2_hill.png',
            scale: 1.3,
            xSpeed: -1,
            ySpeed: 0.2,
            xRange: [0, -0.25],
            yRange: [0.2, 1],
            name: 'hill'
        }, {
            src: 'img/3_wood.png',
            scale: 0.9,
            xSpeed: -1.2,
            ySpeed: 0.3,
            xRange: [0, -0.55],
            yRange: [0.3],
            name: 'wood'
        }]
    });
});