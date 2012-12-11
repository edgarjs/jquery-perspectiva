# Parallax.js

Create easy parallax (3D) effects with jQuery.

This plugin is inspired by [stephband's jparallax](https://github.com/stephband/jparallax). However I tried to make an easier to use/modify plugin.

## Usage

``` javascript
$(function () {
    $('.viewport').parallax({
        layers: [{
            src: 'img/0_sun.png',
            xSpeed: -0.5,
            ySpeed: 1,
            xRange: [0.8],
            yRange: [0, 1]
        }, {
            src: 'img/1_mountains.png',
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            yRange: [0.45]
        }, {
            src: 'img/2_hill.png',
            xSpeed: -0.5,
            ySpeed: 0.2,
            yRange: [0.41, 1]
        }, {
            src: 'img/3_wood.png',
            xSpeed: -0.8,
            ySpeed: 0.3,
            yRange: [0.41]
        }]
    });

    // To destroy the parallax:
    $('.viewport').parallax('destroy');
});
```

## Example

See the `demo/` folder.

## License

[MIT License](http://opensource.org/licenses/MIT).
