class Utility{
    shallowArraysCompare (a1, a2){
      return a1.length === a2.length
             && a1.every((val, index) => val === a2[index]);
    }
  
    mdaCompare(a1, a2){
      if (a1.length !== a2.length){
        return false;
      }
      return !a1.some((el, i) => {
                        if (el instanceof Array && a2[i] instanceof Array){
                            return !this.mdaCompare(el, a2[i]);
                        } else {
                            return el !== a2[i];
                        }
                    })
    }
  
    merge2DArrays(target, source, row, column){
        var shallowCopy = target.slice().map((el) => el.slice());
        var row = row || 0;
        var column = column || 0;
        var i;
        console.log(row, column);
        for (i = 0;
             row < shallowCopy.length && i < source.length;
             row++, i++){
                console.log("--", row, i);
                shallowCopy[row] = this.replaceArrData(shallowCopy[row], source[i], column);
        }
        return { result: shallowCopy, row: --row, column: column + --i };
    }
  
    replaceArrData(target, source, targetX){
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

  export default Utility;