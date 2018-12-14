'use strickt'

var MonteCarloPi = {
    Radius: 0.5,
    CountPoints: undefined,
    PiValue: undefined,

    CirclePoint: 0,


    IsCircle: function (x, y) {
        var left = x - this.Radius;
        var right = y - this.Radius;
        var sum = left * left + right * right;

        return sum < this.Radius * this.Radius ? true : false;
    },


    Inint: function (countpoints = 1000, debuglvl = false) {
        this.CountPoints = countpoints;
        this.CirclePoint = 0;

        var x = 0;
        var y = 0;

        for (var i = 0; i < this.CountPoints; i += 1) {
            x = Math.random();
            y = Math.random();

            if (this.IsCircle(x, y)) {
                this.CirclePoint += 1;
            }
        }

        this.PiValue = (4 * this.CirclePoint) / this.CountPoints;

        if (debuglvl) {
            console.log('Radius:' + this.Radius);
            console.log('Circle Points:' + this.CirclePoint);
            console.log('Total Count:' + this.CountPoints);
            console.log('Pi value:' + this.PiValue);
        }

        return this.PiValue;
    }

};

var CountVal = 100000;
var n = 1000;
var MidlePi = 0;

for (var i = 0; i < n; i += 1) {
    console.log('\nCount: ' + (i + 1));
    MidlePi += MonteCarloPi.Inint(CountVal, true);
    console.log('\n');
}
MidlePi /= n;

console.log("Myh Pi:" + MidlePi);
console.log("Math Pi:" + Math.PI);
var a = 'nanana';