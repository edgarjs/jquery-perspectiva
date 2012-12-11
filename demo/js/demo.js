$(function () {
    $('.viewport').parallax({
        layers: [{
            src: 'img/0_sun.png',
            position: {
                x: 0.3,
                y: 0.1
            },
            xSpeed: 0.3,
            ySpeed: 0.5,
            xRange: [0, 1]
        }, {
            src: 'img/1_mountains.png',
            position: {
                x: 0,
                y: 0.45
            },
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            xRange: [0, 1]
        }, {
            src: 'img/2_hill.png',
            position: {
                x: 0,
                y: 0.41
            },
            xSpeed: -0.5,
            ySpeed: 0.2,
            xRange: [0, 1]
        }, {
            src: 'img/3_wood.png',
            position: {
                x: 0,
                y: 0.41
            },
            xSpeed: -0.8,
            ySpeed: 0.3,
            xRange: [0, 1]
        }]
    });
});