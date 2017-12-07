import utl from '../Utility/Utility';

class StateProcessor {
    constructor(size){
        this.size = size;
        this.timeLine = [];
        this.state = Array(size.rowCount * this.size.boardSize).fill(false).map(() => Array(this.size.boardSize * size.columnCount).fill(false));
        this.timeLine.push(this.state);
        this.updateByCellEvent = this.updateByCellEvent.bind(this);
    }
  
    updateByCellEvent(board, args){
        console.time('my');
        //setTimeout(()=> {console.timeEnd('my');},0);
        var position = utl.positionByIndex(this.size.columnCount, board.index);
        var stateRow = position.row * this.size.boardSize;
        var stateColumn = position.column * this.size.boardSize;
        var boardData = utl.crop2dArray(
                        this.state,
                        stateRow,
                        stateColumn, 
                        this.size.boardSize);
        

        boardData[args.rowIndex][args.columnIndex] = !args.value;
        this.state = utl.merge2DArrays(this.state, boardData, stateRow, stateColumn).result;

        // todo -  update history

        board.updateState(boardData);
        console.timeEnd('my');
    }
  
    get currentState(){
        return this.state;
    }
  }

  export default StateProcessor;