import utl from '../Logic/Utility';
import GoL from '../Logic/GOL';

class StateProcessor {
    constructor(size, initialState){
        this.size = size;
        this.timeLine = [];
        this.curStep = 0;
        this.state = initialState;
        this.golTurnedOn = false;
        this.boards = [];
        this.timeLine.push(this.state);
        this.updateByCellEvent = this.updateByCellEvent.bind(this);
        this.updateByStepPicked = utl.debounce(this.updateByStepPicked.bind(this), 200);
        this.gol = GoL();
        this.listenToEvents();
    }

    set currentStep(value){
        this.curStep = value;
    }

    get currentStep(){
        return this.curStep;
    }

    addBoard(board){
        this.boards.push(board);
    }

    getBoardDataByIndex(index){
        if (index >= this.size.length){
            throw Error('index out of game field size');
        }

        var position = utl.positionByIndex(this.size.columnCount, index);
        var stateRow = position.row * this.size.boardSize;
        var stateColumn = position.column * this.size.boardSize;
        var boardData = utl.crop2dArray(
                        this.state,
                        stateRow,
                        stateColumn, 
                        this.size.boardSize);

        return {
            data: boardData,
            stateRow: stateRow,
            stateColumn: stateColumn
        };                        
    }

    updateByCellEvent(board, args){
        if (this.golTurnedOn){
            return;
        }
        var stateBoard = this.getBoardDataByIndex(board.index);
        stateBoard.data[args.rowIndex][args.columnIndex] = args.value ? 0 : 1;
        this.timeLine.push(this.state);
        this.onTimeStampAdded();
        this.state = utl.merge2DArrays(this.state, stateBoard.data, stateBoard.stateRow, stateBoard.stateColumn);
        board.updateState(stateBoard.data);
    }

    onTimeStampAdded(){
        this.currentStep++;
        window.dispatchEvent(
            new CustomEvent(
                utl.constants().stateProcessedEventName, 
                {detail: {currentStep: this.currentStep, maxStep: this.timeLine.length - 1}}));
    }

    listenToEvents(){
        window.addEventListener(
            utl.constants().stepChangedByInputEventName, 
            this.updateByStepPicked);

        window.addEventListener(
            utl.constants().GOLButttonEventName,
            this.startGOL.bind(this));
    }

    startGOL(){
        this.golTurnedOn = !this.golTurnedOn;
        if (!this.golTurnedOn){
            return;
        }  
 
        var timerId = 
            setInterval(() => {
                if (this.golTurnedOn)
                {
                    var processedState = this.gol.applyRules(this.state);
                    this.timeLine.push(processedState);
                    this.state = processedState;
                    this.onTimeStampAdded();
                    this.updateField(processedState);
                } else {
                    clearInterval(timerId);
                }
            }, 0);
    }
    
    updateByStepPicked(event){
        let pickedState = this.timeLine[event.detail.currentStep];
        this.updateField(pickedState);
    }

    updateField(newState){
        for (var i = 0; i < this.boards.length; i++) {
            var position = utl.positionByIndex(this.size.columnCount, this.boards[i].index);
            var newBoardState = utl.crop2dArray(
                                    newState,
                                    position.row * this.size.boardSize,
                                    position.column * this.size.boardSize,
                                    this.size.boardSize);
            this.boards[i].updateState(newBoardState);
        }
    }
   
    get currentState(){
        return this.state;
    }
  }

  export default StateProcessor;