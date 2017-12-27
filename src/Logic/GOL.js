import utl from '../Logic/Utility';

function GoL() {
    function applyGOLRules (dataField){
        // console.log("dataField = ", dataField);
        var processed = [];
        for (var i = 0; i < dataField.length; i++){
            processed.push(applyGOLRulesToLine(dataField[i-1], dataField[i], dataField[i+1]));
        }

        return processed;
    }

    function applyGOLRulesToLine(topArr, middleArr, bottomArr){
        if (!middleArr || !middleArr.length || middleArr.length < 3){
            throw Error("No data to process. middleArr = " + JSON.stringify(middleArr));
        }
        
        var resultArr = middleArr.slice();
        //console.log('before = ', resultArr);
        topArr = topArr || Array(middleArr.length).fill(0);
        bottomArr = bottomArr || Array(middleArr.length).fill(0);
        if (middleArr.length !== topArr.length || middleArr.length !== bottomArr.length){
            throw Error("Can't process different arrays. topArr.length = " + topArr.length + " middleArr.length = " + middleArr.length + " bottomArr.length = " + bottomArr.length);
        }

        handleLineStart(topArr, middleArr, bottomArr, resultArr);
        handleLine(topArr, middleArr, bottomArr, resultArr);
        handleLineEnd(topArr, middleArr, bottomArr, resultArr);
        //console.log('after = ', resultArr);
        return resultArr;
    }

    function lifeLogic (array, cellIndex, aliveNeigbours){
        //console.log('lifeLogic', cellIndex, aliveNeigbours, array);
        if (array[cellIndex]) {
            if (aliveNeigbours < 2 || aliveNeigbours > 3){
                array[cellIndex] = 0;
            }
        } else {
            if (aliveNeigbours === 3){
                array[cellIndex] = 1;
            }
        }
        //console.log('lifeLogic array', array);
    }

    function handleLineStart(topArr, middleArr, bottomArr, resultArr){
        //console.log('handleLineStart start = ', resultArr);
        var alive = topArr[0] + topArr[1] + middleArr[1] + bottomArr[0] + bottomArr[1];
        
        lifeLogic(resultArr, 0, alive);
        //console.log('handleLineStart end = ', resultArr);
    }

    function handleLine(topArr, middleArr, bottomArr, resultArr){
        //console.log('handleLine = ', topArr, middleArr, bottomArr, resultArr);
        for (var i = 1; i < middleArr.length - 1; i++)
        {
            var alive = topArr[i - 1] + topArr[i] + topArr[i + 1];
            alive += middleArr[i - 1] + middleArr[i + 1];
            alive += bottomArr[i - 1] + bottomArr[i] + bottomArr[i + 1];
            //console.log('handleLine i = ' + i, 'alive = ' +  alive);
            lifeLogic(resultArr, i, alive);
        }
        //console.log('handleLine end = ', resultArr);
    }

    function handleLineEnd(topArr, middleArr, bottomArr, resultArr){
        
        var alive = topArr[topArr.length - 2]
                    + topArr[topArr.length - 1]
                    + middleArr[middleArr.length - 2] 
                    + bottomArr[bottomArr.length - 2] 
                    + bottomArr[bottomArr.length - 1];
        lifeLogic(resultArr, middleArr.length - 1, alive);
    }

    return {
        applyRules: applyGOLRules
    }
}

export default GoL;