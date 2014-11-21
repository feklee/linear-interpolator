/*jslint node: true, maxerr: 50, maxlen: 80 */

'use strict';

module.exports = function (points) {
    var first, n = points.length - 1,
        interpolated,
        leftExtrapolated,
        rightExtrapolated;

    if (points.length === 0) {
        return function () {
            return 0;
        };
    }

    if (points.length === 1) {
        return function () {
            return points[0][1];
        };
    }

    points = points.sort(function (a, b) {
        return a[0] - b[0];
    });
    first = points[0];

    leftExtrapolated = function (x) {
        var a = points[0], b = points[1];
        return a[1] + (x - a[0]) * (b[1] - a[1]) / (b[0] - a[0]);
    };

    interpolated = function (x, a, b) {
        return a[1] + (x - a[0]) * (b[1] - a[1]) / (b[0] - a[0]);
    };

    rightExtrapolated = function (x) {
        var a = points[n - 1], b = points[n];
        return b[1] + (x - b[0]) * (b[1] - a[1]) / (b[0] - a[0]);
    };

    return function (x) {
        var i;

        if (x <= first[0]) {
            return leftExtrapolated(x);
        }
        for (i = 0; i < n; i += 1) {
            if (x > points[i][0] && x <= points[i + 1][0]) {
                return interpolated(x, points[i], points[i + 1]);
            }
        }
        return rightExtrapolated(x);
    };
};
