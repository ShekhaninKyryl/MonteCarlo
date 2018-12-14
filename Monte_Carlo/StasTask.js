/*
 * y = exp(-|x|);
 */

'use strickt'

var MonteCarlo = {
    Inf: undefined,
    CountPoints: undefined,
    Result: undefined,

    IntegralPoint: 0,


    Isfunction: function (x, y) {
        var functionY = Math.exp(-x);
        return y < functionY ? true : false;
    },


    Init: function (countpoints = 1000, InfinityValue = 1000, debuglvl = false) {
        this.CountPoints = countpoints;
        this.IntegralPoint = 0;
        this.Inf = InfinityValue;

        var x = 0;
        var y = 0;

        for (var i = 0; i < this.CountPoints; i += 1) {
            x = Math.random() * this.Inf;
            y = Math.random();

            if (this.Isfunction(x, y)) {
                this.IntegralPoint += 1;
            }
        }

        this.Result = 2 * ((this.IntegralPoint * this.Inf) / this.CountPoints);

        if (debuglvl) {
            console.log('Infinity:' + this.Inf);
            console.log('Integral point:' + this.IntegralPoint);
            console.log('Total Count:' + this.CountPoints);
            console.log('Result:' + this.Result);
        }

        return this.Result;
    }

};

var CountVal = 1000000000;
var n = 100;
var Result = 0;

for (var i = 0; i < n; i += 1) {
    console.log('\nCount: ' + (i + 1));
    Result += MonteCarlo.Init(CountVal,100000, true);
    console.log('\n');
}
Result /= n;

console.log("Result:" + Result);
//console.log("Math Pi:" + Math.PI);
var a = 'nanana';