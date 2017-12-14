import utl from '../Logic/Utility';

class StateProcessor {
    constructor(size, initialState){
        this.size = size;
        this.timeLine = [];
        this.curStep = 0;

        this.state = initialState;
        this.timeLine.push(this.state);
        this.updateByCellEvent = this.updateByCellEvent.bind(this);
        // this.onStepChanged = this.changeTimeStamp.bind(this);
        this.listenToEvents();
    }

    set currentStep(value){
        this.curStep = value;
        // console.log(this.curStep);
        
    }

    get currentStep(){
        return this.curStep;
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
        var stateBoard = this.getBoardDataByIndex(board.index);
        stateBoard.data[args.rowIndex][args.columnIndex] = !args.value;
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
            this.updateByPickedStep);
    }

    updateByPickedStep(event){
        // console.log('--', event);
        //{detail: {currentStep: event.target.value, maxStep: event.target.max}}
        

    }

    // changeTimeStamp(pickStepElement, args){
    //     this.currentStep = args.value;
    //     // var current = this.state;
    //     // var next = this.timeLine[args.value];
    //     // pickStepElement.changeState(args.value, pickStepElement.state.maxStep)
    // }
    
    get currentState(){
        return this.state;
    }
  }

  export default StateProcessor;