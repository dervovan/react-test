class utl{
    static constants (){
        return {
            stepChangedByInputEventName: 'stepChangedByInput',
            stateProcessedEventName: 'stateProcessed',
            GOLButttonEventName : 'GOLButtton'
        };
    }

    static debounce(func, delay){
        var timeout;
        return function debouncedFunc(){
          clearTimeout(timeout);
          var args = arguments;
          timeout = setTimeout( function(){
            func.apply(this, args);
          }.bind(this), delay);
        }
    }

    static shallowArraysCompare (a1, a2){
      return a1.length === a2.length
             && a1.every((val, index) => val === a2[index]);
    }

    static positionByIndex(columnCount, index){
        if (!Number.isInteger(columnCount) || !Number.isInteger(index)){
            console.log('columncount = ', columnCount);
            console.log('index = ', index);
            throw Error("wrong params");
        }
        if (!columnCount || !index){
            return {
                row: 0,
                column: 0
            }
        }
        return {
            row: Math.floor(index/columnCount),
            column: index%columnCount
        }
    }
  
    static mdaCompare(a1, a2){
      if (a1.length !== a2.length){
        return false;
      }

      return !a1.some((el, i) => {
                        if (el instanceof Array && a2[i] instanceof Array){
                            return !utl.mdaCompare(el, a2[i]);
                        } else {
                            return el !== a2[i];
                        }
                    })
    }

    static crop2dArray(arr, row, column, squareSize){
        var result = [];
        arr.forEach((val, i) => {
            if (i >= row + squareSize){
                return;
            }
            if (i >= row){
                if (val instanceof Array){
                    result.push(val.slice(column, squareSize + column));
                }
            }
        });
        return result;
    }

    static merge2DArrays(target, source, row, column){
        var shallowCopy = target.slice().map((el) => el.slice());
        row = row || 0;
        column = column || 0;
        var i;
        for (i = 0;
             row < shallowCopy.length && i < source.length;
             row++, i++){
                shallowCopy[row] = utl.replaceArrData(shallowCopy[row], source[i], column);
        }
        return shallowCopy;
    }
  
    static replaceArrData(target, source, targetX){
        var shallowCopy = target.slice();
        var start = targetX || 0;
        
        for (var i = start, j = 0;
             j < source.length && i < shallowCopy.length;
             i++, j++){
                shallowCopy[i] = source[j];
        }
        return shallowCopy;
    }
  }

  export default utl;