/* -2,2
 * |sin(x)^2+cos(x+0.5)^3|;
 */


var MonteCarloIntegral = {

    CountPoints: undefined,
    Result: undefined,
    IntegralPoint: 0,

    From: undefined,
    To: undefined,

    StepX: 0.5,
    MinY: 0,
    MaxY: 0,


    MyFunction: function (x) {
        var var1 = Math.sin(x);
        var1 = var1 * var1;

        var var2 = Math.cos(x + 0.5);
        var2 = Math.pow(var2, 3);
        return Math.abs(var1 + var2);
    },

    SetMinMaxY: function () {
        for (var x = this.From; x <= this.To; x += this.StepX) {
            this.MaxY = this.MaxY < this.MyFunction(x) ? this.MyFunction(x) : this.MaxY;
            this.MinY = this.MinY > this.MyFunction(x) ? this.MyFunction(x) : this.MinY;
        }
        this.MaxY = Math.ceil(this.MaxY);
        this.MinY = Math.floor(this.MinY);
    },

    Isfunction: function (x, y) {
        return y < this.MyFunction(x) ? true : false;
    },


    Init: function (countpoints = 1000, from = 1, to = 2, debuglvl = false) {

        this.CountPoints = countpoints;
        this.IntegralPoint = 0;
        this.From = from;
        this.To = to;
        this.SetMinMaxY();

        var x = 0;
        var y = 0;

        for (var i = 0; i < this.CountPoints; i += 1) {
            x = Math.random() * (this.To - this.From) + this.From;
            y = Math.random() * (this.MaxY);

            if (this.Isfunction(x, y)) {
                this.IntegralPoint += 1;
            }
        }


        var area = (this.MaxY - this.MinY) * (this.To - this.From);
        this.Result = (this.IntegralPoint / this.CountPoints) * area;

        if (debuglvl) {
            console.log('Infinity:' + this.Inf);
            console.log('Integral point:' + this.IntegralPoint);
            console.log('Total Count:' + this.CountPoints);
            console.log('Result:' + this.Result);
        }

        return this.Result;
    }

};

var CountVal = 100000;
var n = 100;
var Result = 0;

for (var i = 0; i < n; i += 1) {
    console.log('\nCount: ' + (i + 1));
    Result += MonteCarloIntegral.Init(CountVal, -2, 2, true)
    console.log('\n');
}
Result /= n;

console.log("Result:" + Result);
console.log("Math Pi:" + Math.PI);
var a = 'nanana';