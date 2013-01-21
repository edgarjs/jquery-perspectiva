# Perspectiva.js

Create easy parallax (3D) effects with jQuery.

This plugin is inspired by [stephband's jparallax](https://github.com/stephband/jparallax). However I tried to make an easier to use/modify plugin.

## Coordinates

When building a scene, think in [cartesian](http://en.wikipedia.org/wiki/Cartesian_coordinate_system) coordinates, not screen coordinates.

That means that when you add a new layer, its position will be right in the center of your viewport. And the settings you pass to it (like `x` and `y`) are based in that system.

The cartesian plane goes from `0,0` to `1,1` and the corresponding negative values.

So for example, if I want a layer to start in the right-bottom quadrant, my coordinates would be something like `{x: 0.3, y: -0.2}`

## Scale

The scale of the layers is by height, if scale is `0` then the layer will use the original image size. And if the scale is `1`, the layer will resize the image to fit 100% of the viewport's height.

## Usage

``` javascript
$(function () {
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
            name: 'wood',
            scale: 0
        }]
    });

    // To destroy the parallax:
    $('.parallax').perspectiva('destroy');

    // To live update a layer in a parallax instance use the update method,
    // it receives the name of the layer to update, and the new attributes.
    $('.parallax').perspectiva('update', 'sun', {xSpeed: 0.7});
});
```

## Example

See the `demo/` folder.

## License

[MIT License](http://opensource.org/licenses/MIT).
