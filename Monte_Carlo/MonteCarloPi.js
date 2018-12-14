'use strickt'
const RadiusValue = 100;
const CountPointValue = 1000;


var MonteCarloPi = {
    Radius: RadiusValue,
    CountPoints: CountPointValue,
    PiValue: undefined,

    CirclePoint: 0,


    IsCircle: function (x, y) {
        var left = x - this.Radius;
        var right = y - this.Radius;
        var sum = left * left + right * right;

        return sum < this.Radius * this.Radius ? true : false;
    },


    Inint: function (radius = 100, countpoints = 1000, debuglvl = true) {
        this.Radius = radius;
        this.CountPoints = countpoints;
        this.CirclePoint = 0;

        var x = 0;
        var y = 0;

        for (var i = 0; i < this.CountPoints; i += 1) {
            x = Math.floor(Math.random() * 2 * this.Radius);
            y = Math.floor(Math.random() * 2 * this.Radius);

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

var RadiusVal = 1000;
var CountVal = 10000000;
var n = 100;
var MidlePi = 0;

for (var i = 0; i < n; i += 1) {
    console.log('\nCount: ' + (i + 1));
    MidlePi += MonteCarloPi.Inint(RadiusVal, CountVal, true);
    console.log('\n');
}
MidlePi /= 100; 

console.log("Myh Pi:" + MidlePi);
console.log("Math Pi:" + Math.PI);