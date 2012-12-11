# Parallax.js

Create easy parallax (3D) effects with jQuery.

This plugin is inspired by [stephband's jparallax](https://github.com/stephband/jparallax). However I tried to make an easier to use/modify plugin.

## Usage

``` javascript
$(function () {
    $('.parallax').parallax({
        layers: [{
            src: 'img/0_sun.png',
            scale: 0.2,
            xSpeed: -0.5,
            ySpeed: 1,
            xRange: [0.8],
            yRange: [0, 1],
            name: 'sun'
        }, {
            src: 'img/1_mountains.png',
            scale: 0.9,
            yAxis: false,
            xSpeed: -0.2,
            ySpeed: 0.2,
            yRange: [0.45],
            name: 'mountains'
        }, {
            src: 'img/2_hill.png',
            scale: 1.3,
            xSpeed: -0.5,
            ySpeed: 0.2,
            yRange: [0.41, 1],
            name: 'hill'
        }, {
            src: 'img/3_wood.png',
            scale: 0.9,
            xSpeed: -0.8,
            ySpeed: 0.3,
            yRange: [0.4],
            name: 'wood'
        }]
    });

    // To destroy the parallax:
    $('.parallax').parallax('destroy');

    // To live update a layer in a parallax instance use the update method,
    // it receives the name of the layer to update, and the new attributes.
    $('.parallax').parallax('update', 'sun', {xSpeed: 0.7})
});
```

## Example

See the `demo/` folder.

## License

[MIT License](http://opensource.org/licenses/MIT).
