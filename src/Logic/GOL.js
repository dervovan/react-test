import utl from '../Logic/Utility';


// !!! make module


// function GoL (data){
//     this.dataField = data;
// }

function GoL() {
    function applyGOLRules (dataField){
        console.log(dataField);
        var processed = utl.crop2dArray(dataField, 0, 0, dataField[0].length);
        for (var i = 0; i < processed.length; i++){
            applyGOLRulesToLine(processed[i-1], processed[i], processed[i+1]);
        }

        return processed;
    }

    function applyGOLRulesToLine(topArr, middleArr, bottomArr){
        if (!middleArr || !middleArr.length || middleArr.length < 3){
            throw Error("No data to process. middleArr = " + JSON.stringify(middleArr));
        }

        middleArr = middleArr.slice();
        topArr = topArr || Array(middleArr.length).fill(0);
        bottomArr = bottomArr || Array(middleArr.length).fill(0);
        if (middleArr.length !== topArr.length || middleArr.length !== bottomArr.length){
            throw Error("Can't process different arrays. topArr.length = " + topArr.length + " middleArr.length = " + middleArr.length + " bottomArr.length = " + bottomArr.length);
        }

        handleLineStart(topArr, middleArr, bottomArr);
        handleLine(topArr, middleArr, bottomArr);
        handleLineEnd(topArr, middleArr, bottomArr);

        return middleArr;
    }

    function lifeLogic (array, cellIndex, aliveNeigbours){
        if (array[cellIndex]) {
            if (aliveNeigbours < 2 || aliveNeigbours > 3){
                array[cellIndex] = 0;
            }
        } else {
            if (aliveNeigbours === 3){
                array[cellIndex] = 1;
            }
        }
    }

    function handleLineStart(topArr, middleArr, bottomArr){
        var alive = topArr[0] + topArr[1] + middleArr[1] + bottomArr[0] + bottomArr[1];
        lifeLogic(middleArr, 0, alive);
    }

    function handleLine(topArr, middleArr, bottomArr){
        for (var i = 1; i < middleArr.length - 2; i++)
        {
            var alive = topArr[i - 1] + topArr[i] + topArr.slice[i + 1];
            alive += middleArr[i - 1] + middleArr[i + 1];
            alive += bottomArr[i - 1] + bottomArr[i] + bottomArr[i + 1];
            lifeLogic(middleArr, middleArr[i], alive);
        }
    }

    function handleLineEnd(topArr, middleArr, bottomArr){
        var alive = topArr[topArr.length - 2]
                    + topArr[topArr.length - 1]
                    + middleArr[middleArr.length - 2] 
                    + bottomArr[bottomArr.length - 2] 
                    + bottomArr[bottomArr.length - 1];
        lifeLogic(middleArr, middleArr.length - 1, alive);
    }

    return {
        applyRules: applyGOLRules
    }
}

export default GoL;