var setSettings = function (layer) {
    var settings = $('.parallax.wide').perspectiva('settings', layer);
    $('#name').val(layer);
    $('#x-axis').attr('checked', settings.xAxis);
    $('#y-axis').attr('checked', settings.yAxis);
    $('#x-speed').val(settings.xSpeed);
    $('#y-speed').val(settings.ySpeed);
    $('#x-start').val(settings.x);
    $('#y-start').val(settings.y);
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
            x: parseFloat($('#x-start').val() || 0),
            y: parseFloat($('#y-start').val() || 0),
            scale: parseFloat($('#scale').val() || 0),
            xAxis: $('#x-axis').is(':checked'),
            yAxis: $('#y-axis').is(':checked')
        };
        $('.parallax').perspectiva('update', layer, settings);
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

    $('.parallax').perspectiva({
        layers: [{
            src: function (layer) {
                // You can build any src for the image depending on the layer or viewport settings
                return 'img/0_sun.png';
            },
            xSpeed: 0.1,
            ySpeed: 0.3,
            x: 0.2,
            y: 0.2,
            name: 'sun'
        }, {
            src: 'img/1_mountains.png',
            yAxis: false,
            xSpeed: 0.05,
            ySpeed: 0,
            x: 0,
            y: -0.3,
            name: 'mountains'
        }, {
            src: 'img/2_hill.png',
            xSpeed: 0.25,
            ySpeed: 0.2,
            x: 0,
            y: -0.4,
            name: 'hill'
        }, {
            src: 'img/3_wood.png',
            xSpeed: 0.2,
            ySpeed: 0.1,
            x: 0,
            y: -0.4,
            name: 'wood'
        }]
    });

    $('.parallax-mini').perspectiva({
        layers: [{
            src: 'img/0_sun.png',
            xSpeed: 0.1,
            ySpeed: 0.3,
            x: 0.2,
            y: 0.2,
            name: 'sun',
            scale: 0.2
        }, {
            src: 'img/1_mountains.png',
            yAxis: false,
            xSpeed: 0.05,
            ySpeed: 0,
            x: 0,
            y: -0.3,
            name: 'mountains',
            scale: 0.9
        }, {
            src: 'img/2_hill.png',
            xSpeed: 0.25,
            ySpeed: 0.2,
            x: 0,
            y: -0.4,
            name: 'hill',
            scale: 1.3
        }, {
            src: 'img/3_wood.png',
            xSpeed: 0.2,
            ySpeed: 0.1,
            x: 0,
            y: -0.4,
            name: 'wood',
            scale: 0.9
        }]
    });

    $('.parallax-responsive').perspectiva({
        layers: [{
            src: 'img/0_sun.png',
            xSpeed: 0.1,
            ySpeed: 0.3,
            x: 0.2,
            y: 0.2,
            name: 'sun',
            scale: 0.2
        }, {
            src: 'img/1_mountains.png',
            yAxis: false,
            xSpeed: 0.05,
            ySpeed: 0,
            x: 0,
            y: -0.3,
            name: 'mountains',
            scale: 0.9
        }, {
            src: 'img/2_hill.png',
            xSpeed: 0.25,
            ySpeed: 0.2,
            x: 0,
            y: -0.4,
            name: 'hill',
            scale: 1.3
        }, {
            src: 'img/3_wood.png',
            xSpeed: 0.2,
            ySpeed: 0.1,
            x: 0,
            y: -0.4,
            name: 'wood',
            scale: 0.9
        }]
    });
});