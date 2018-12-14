class Test {
    constructor(stKnow = 0.5, stConf = 0.5, testNumQ = 20, testTProb = 0.5) {

        this.stKnow = stKnow;
        this.stConf = stConf;

        this.testNumQ = testNumQ;
        this.testTProb = testTProb;

        this.resT = 0;
        this.resTProb = 0;
        this.resF = 0;

        this.maxValue = 0;
    }
    
    getResultOneTest() {

        this.resT = 0;
        this.resTProb = 0;
        this.resF = 0;

        for (let numtest = 0; numtest < this.testNumQ; numtest += 1) {

            if (Math.random() < this.stKnow) {
                this.resT += 1;
            } else {

                if (Math.random() < this.stConf) {

                    if (Math.random() < this.testTProb) {
                        this.resTProb += 1;
                    } else {
                        this.resF += 1;
                    }

                } else {
                    this.resF += 1;
                }

            }
        }
    }

    getResultTest(numtest = 1000) {
        let tmpObj = {};

        for (let i = 0; i < numtest; i += 1) {
            this.getResultOneTest();

            let trueRes = (this.resT + this.resTProb) / this.testNumQ;
            trueRes = Math.round(trueRes * 100) / 100;
            trueRes = trueRes.toString();


            if (!tmpObj[trueRes]) {
                tmpObj[trueRes] = 0;
            }
            tmpObj[trueRes] += 1;
            
        }
        if (tmpObj) {
            this.resArray = tmpObj;
        }
    }

    sorResultTest(byEvaluation = true, toLarge = true) {
        let tmpNewRes = {};

        while (Object.keys(this.resArray).length) {

            let MinMaxEval = (() => {
                for (var a in this.resArray) {
                    return a;
                }
            })();
            let MinMaxNum = this.resArray[MinMaxEval];


            for (let a in this.resArray) {
                if (toLarge) {
                    if (byEvaluation) {
                        if (a < MinMaxEval) {
                            MinMaxNum = this.resArray[a];
                            MinMaxEval = a;
                            
                            //this.maxValue = this.maxValue > MinMaxNum ? this.maxValue : MinMaxNum;
                        }
                    }
                    else {
                        if (this.resArray[a] < MinMaxNum) {
                            MinMaxNum = this.resArray[a];
                            MinMaxEval = a;
                            //this.maxValue = this.maxValue > MinMaxNum ? this.maxValue : MinMaxNum;
                        }
                    }
                } else {
                    if (byEvaluation) {
                        if (a > MinMaxEval) {
                            MinMaxNum = this.resArray[a];
                            MinMaxEval = a;
                        }
                    }
                    else {
                        if (this.resArray[a] > MinMaxNum) {
                            MinMaxNum = this.resArray[a];
                            MinMaxEval = a;
                        }
                    }
                }
            }

            tmpNewRes[MinMaxEval] = MinMaxNum;
            delete this.resArray[MinMaxEval];
        }

        //this.maxValue = (Math.ceil(this.maxValue / 10)) * 10;


        if (Object.keys(tmpNewRes).length) {
            this.resArray = tmpNewRes;
            this.findmaxValue();
        }
    }


    findmaxValue() {
        this.maxValue = 0;
        for (let a in this.resArray) {
            if (this.resArray[a] > this.maxValue)
                this.maxValue = this.resArray[a];
        }
        this.maxValue = (Math.ceil(this.maxValue / 10)) * 10;

        this.maxValue;
    }

    saveRes(filename = 'res.csv') {
        const errfn = function (err) {
            if (err) throw err;
            console.log('Saved!');
        };

        let filenameArr = filename.split('.');
        let date = new Date();
        filename = filenameArr[0] + '_' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '.' + filenameArr[1];
        
        const fs = require('fs');
        fs.openSync(filename, 'w');
        for (var a in this.resArray) {

            fs.appendFileSync(filename, a, errfn);
            fs.appendFileSync(filename, ';', errfn);
            fs.appendFileSync(filename, this.resArray[a], errfn);
            fs.appendFileSync(filename, '\n', errfn);
        }
    }
}

class Interface {

    /**
     * 
     * @param {HTMLElement} table
     * @param {string[]} theadString
     */
    static __addTHead(table, theadString) {

        if (table == null) {
            return 'Null';
        }
        else if (table instanceof HTMLElement) {
            if (table.nodeName != 'TABLE') {
                return 'Not table';
            }
        }
 
        let header = table.createTHead();
        let r0 = header.insertRow(0);

        for (let i = 0; i < theadString.length; i += 1) {
            let h = r0.insertCell(i);
            h.innerHTML = theadString[i];
            h.id = theadString[i];
            h.style.backgroundColor = 'darkseagreen';
            h.toLarge = true;
            
        }

    }
    /**
     * 
     * @param {string} id
     * @param {Test} testObj
     */
    static AddTable(id, testObj) {

        let table = document.createElement('TABLE');
            document.getElementById(id).insertAdjacentElement('afterBegin', table);

        let tbody = document.createElement('TBODY');
        tbody.id = 'tbody';
        table.insertAdjacentElement('afterBegin', tbody);

        let i = 0;
        for (var a in testObj.resArray) {
            var row = tbody.insertRow(i);
            if (i % 2) {
                row.style.backgroundColor = 'aliceblue';
            }
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);

            cell0.innerHTML = a;
            cell1.innerHTML = testObj.resArray[a].toString();
            i += 1;
        }
        this.__addTHead(table, ['Evaluation', 'Numbers']);

        let content = document.getElementById('content');
        let tableDiv = document.getElementById('table');
        content.style.height = `${tableDiv.clientHeight}px`;

    }
     /**
     * 
     * @param {string} id
     * @param {Test} testObj
     */
    static RewriteTable(id, testObj) {
        var tbody = document.getElementById('tbody');
        tbody.parentNode.removeChild(tbody);



        tbody = document.createElement('TBODY');
        tbody.id = 'tbody';

        let table = document.getElementById(id).childNodes[0];
        


        table.insertAdjacentElement('beforeEnd', tbody);

        let i = 0;
        for (var a in testObj.resArray) {
            var row = tbody.insertRow(i);
            if (i % 2) {
                row.style.backgroundColor = 'aliceblue';
            }
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);

            cell0.innerHTML = a;
            cell1.innerHTML = testObj.resArray[a].toString();
            i += 1;
        }

        let content = document.getElementById('content');
        let tableDiv = document.getElementById('table');
        content.style.height = `${tableDiv.clientHeight}px`;
    }


    /**
     * 
     * @param {HTMLElement} idLeftcoloumn
     * @param {Test} testObj
     * @param {number} numElements
     */
    static DrawLeft(idLeftcoloumn, testObj, numElements = 10) {
        let coloumn = document.getElementById(idLeftcoloumn);
        for (let i = 0; i < numElements; i += 1) {
            let value = document.createElement('div');

            value.style.top = `${i * (100 / numElements)}%`;
            value.style.height = `${(100 / numElements)}%`;
            value.style.width = `8%`;
            

            value.innerHTML = testObj.maxValue - i * testObj.maxValue / numElements;


            let line = document.createElement('hr');
            line.style.top = `${i * (100 / numElements)}%`;


            coloumn.insertAdjacentElement('afterbegin', line);
            coloumn.insertAdjacentElement('afterbegin', value);
        }
    }

    static DrawGistogramAll(idSpaceGraphic, testObj) {
        let Space = document.getElementById(idSpaceGraphic);

        for (let i = 0; i < 100; i += 1) {
            
            let coloumn = document.createElement('div');
            coloumn.style.height = `110%`;
            coloumn.style.width = `1%`;

            let needthiscoloum = false;

            for (let a in testObj.resArray) {

                if (Math.round(a * 100) === i) {
                    //let evaluation = document.createElement('div');                    
                    //evaluation.style.writingMode = `vertical-rl`;
                    //evaluation.style.height = `10%`;
                    //evaluation.style.width = `100%`;
                    //evaluation.style.bottom = `0%`;
                    //evaluation.style.fontSize = `12px`;
                    //evaluation.style.textAlign = `right`;
                   //evaluation.innerHTML = a;

                    let gista = document.createElement('div');
                    gista.style.height = `${(testObj.resArray[a] * 91) / testObj.maxValue}%`;
                    gista.style.backgroundColor = `rgb(30,30,30)`;
                    gista.style.width = `100%`;
                    gista.style.bottom = `9%`;
                    gista.style.outlineColor = `rgb(220, 220, 220)`;
                    gista.style.outlineStyle = `solid`;
                    gista.style.outlineWidth = `1px`;
                    gista.style.outlineOffset = `-1px`;


                    gista.setAttribute('title', `${a}:${testObj.resArray[a]}`);

                    //let number = document.createElement('div');
                    //let regexp = /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
                    //let gistaHeight = gista.style.height.match(regexp);
                    //number.style.bottom = `${+gistaHeight + 9}%`;
                    //number.style.width = `100%`;
                    //number.style.textAlign = `center`;
                    
                    //number.innerHTML = testObj.resArray[a];


                   // coloumn.insertAdjacentElement('afterbegin', evaluation);
                    coloumn.insertAdjacentElement('afterbegin', gista);
                   // coloumn.insertAdjacentElement('afterbegin', number);

                    coloumn.style.left = `${a * 100}%`;

                    needthiscoloum = true;


                    gista.addEventListener('mouseover', () => {
                        gista.style.backgroundColor = `rgb(${100},${100},${100}`;
                    });
                    gista.addEventListener('mouseout', () => {
                        gista.style.backgroundColor = `rgb(${30},${30},${30}`;
                    });
                    
                }
            }

            if (needthiscoloum) {
                Space.insertAdjacentElement('afterbegin', coloumn);
            }
        }

    }


    static DrawGistogramFull(idSpaceGraphic, testObj) {
        let Space = document.getElementById(idSpaceGraphic);

        let numofEvaluation = Object.keys(testObj.resArray).length;
        let i = 0;
        for (let a in testObj.resArray) {

            let coloumn = document.createElement('div');
            coloumn.style.height = `110%`;
            coloumn.style.left = `${(100 / numofEvaluation) * i}%`;
            coloumn.style.width = `${(100 / numofEvaluation)}%`;

            let evaluation = document.createElement('div');

            evaluation.style.writingMode = `vertical-rl`;
            evaluation.style.height = `9%`;
            evaluation.style.width = `100%`;
            evaluation.style.bottom = `0%`;

            evaluation.style.fontSize = `12px`;
            evaluation.style.textAlign = `right`;



            evaluation.innerHTML = a;

            let gista = document.createElement('div');
            if (((testObj.resArray[a] * 91) / testObj.maxValue) == 'Infinity') {
                gista.style.height = `91%`;
            }
            else {
                gista.style.height = `${(testObj.resArray[a] * 91) / testObj.maxValue}%`;
            }
            gista.style.backgroundColor = `rgb(30,30,30)`;
            gista.style.width = `100%`;
            gista.style.bottom = `9%`;

            gista.style.outlineColor = `rgb(220, 220, 220)`;
            gista.style.outlineStyle = `solid`;
            gista.style.outlineWidth = `1px`;
            gista.style.outlineOffset = `-1px`;
            gista.setAttribute('title', `${a}:${testObj.resArray[a]}`);

            

            let number = document.createElement('div');
            let regexp = /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g;
            let gistaHeight = gista.style.height.match(regexp);
            //number.style.transform = `rotate(-90deg)`;
            number.style.bottom = `${+gistaHeight + 9}%`;
            number.style.width = `100%`;
            number.style.textAlign = `center`;
            number.innerHTML = testObj.resArray[a];


            coloumn.insertAdjacentElement('afterbegin', evaluation);
            coloumn.insertAdjacentElement('afterbegin', gista);
            coloumn.insertAdjacentElement('afterbegin', number);

            gista.addEventListener('mouseover', () => {
                gista.style.backgroundColor = `rgb(${100},${100},${100}`;
            });
            gista.addEventListener('mouseout', () => {
                gista.style.backgroundColor = `rgb(${30},${30},${30}`;
            });

            Space.insertAdjacentElement('afterbegin', coloumn);
            i += 1;
        }

         
    }

    static DeleteGistogram(idSpace) {
        let space = document.getElementById(idSpace);
        while (space.firstChild) {
            space.removeChild(space.firstChild);
        }
    }

    static RewriteGistogram(idSpace, idLeftValue, GistaType = true) {
        Interface.DeleteGistogram(idSpace);
        Interface.DeleteGistogram(idLeftValue);

        if (GistaType) {
            Interface.DrawGistogramFull(idSpace, test);
        }
        else {
            Interface.DrawGistogramAll(idSpace, test);

        }

        Interface.DrawLeft(idLeftValue, test, 10);

    }

}


let test = new Test(0.5, 0.5, 100, 0.25);
test.getResultTest(1000);
test.sorResultTest(true, true);

let checkBox = document.getElementById('GistoType');
Interface.AddTable('table', test);

Interface.RewriteGistogram('Space', 'leftValue', checkBox.checked);




