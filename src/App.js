import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import utl from './Logic/Utility'
import StateProcessor from './Logic/StateProcessor'
import Board from './ViewModel/Board'
// import ReactDOM from 'react-dom';

class Game extends Component {
  constructor(){
    super();
    this.size =  {
      boardSize: 30,
      length: 15,
      rowCount: 3,
      columnCount: 5
    };
    var initialState = Array(this.size.rowCount * this.size.boardSize).fill(false).map(() => Array(this.size.boardSize * this.size.columnCount).fill(false));
    /// to do - add this state to each board
    this.StateProcessor = new StateProcessor(this.size, initialState);
  }

  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          {Array(this.size.length).fill(null).map((val, index) => 
            {
               // !!! вот тут - я надеюсь получить ссылку на js-объект Board, который наследует Component.
               // однако тут я получаю react-объект, у которого непонятно как получить ссылку на внутренний Board 
               let board =
                // React.createElement(
                // Board, { key :"gb" + index, 
                // index : index, 
                // updateState : this.StateProcessor.updateByCellEvent })
                <Board 
                  key = {"gb" + index} 
                  index = {index} 
                  updateState = {this.StateProcessor.updateByCellEvent} />

                  /// тут хочу добавить Board, чтобы потом вызывать его методы.
                this.StateProcessor.addBoard(board);
              return board;}
          )}
        </div>
        <GameInfo 
          currentStep = {this.StateProcessor.currentStep}
          // onStepChanged = {this.StateProcessor.onStepChanged}
          timeLineSize = {this.StateProcessor.timeLine.length}
        />
      </div>
    );
  }
}

class GameInfo extends Component{
  constructor(props){
    super(props);
    // this.state = {currentStep: props.currentStep, maxStep: props.timeLineSize};
    this.state = {currentStep: 0, maxStep: 0};
    // this.onStepChanged = this.onStepChanged.bind(this);
    // this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    window.addEventListener(utl.constants().stateProcessedEventName, 
      (event) => this.setState((prev, props) => {
        // console.log(1);
        // console.log('---', event.detail.currentStep, event.detail.maxStep, prev.maxStep);
        return {currentStep: event.detail.currentStep, maxStep: event.detail.maxStep}
      }));

    window.addEventListener(utl.constants().stepChangedByInputEventName, 
      (event) => this.setState((prev, props) => {
        // console.log(2);
        return {currentStep: event.detail.currentStep}
      }));
  }

  render(){
    return (
       <div className="game-info">
          <div>
            <SelectIteration 
              currentValue = {this.state.currentStep} 
              onStepChanged = {this.onStepChanged}
              maxValue = {this.state.maxStep} />
          </div>
          <div>
            {/* <AddStep /> */}
          </div>
          <ol>{/* TODO */}</ol>
        </div>
    );
  }
}

class SelectIteration extends Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log(' - ', event.target.value , event.target.max, event.target);
    window.dispatchEvent(
      new CustomEvent(
          utl.constants().stepChangedByInputEventName, 
          {detail: {currentStep: event.target.value, maxStep: event.target.max}}));
  }

  render(){
    return (
      <div className = "iteration-select">
        <input 
          className = "range-picker" 
          type = "range" 
          value = {this.props.currentValue} 
          min = {0} 
          max = {this.props.maxValue} 
          onChange = {this.handleChange} />
          {/* <ShowCurrentIteration currentValue = {this.state.value} max = {this.state.maxValue}/> */}
          <ShowCurrentIteration currentValue = {this.props.currentValue} max = {this.props.maxValue}/>
      </div>
    );
  }
}

class ShowCurrentIteration extends Component{
  render(){
    return(
      <div className="range-legend" type="text">
        <div className="range-legend-value">
          {0}
        </div>
        <div className="range-legend-value">
          {this.props.currentValue}
        </div>
        <div className="range-legend-value">
          {this.props.max}
        </div>
      </div>
    );
  }
}

class AddStep extends Component{
  constructor(){
    super();
    this.count = 0;
  }

  componentDidMount() {
    this.htmlElement.addEventListener("click", ()=> {
      this.count++;
      window.dispatchEvent(new CustomEvent(utl.constants().stateProcessedEventName, {detail: {currentStep: this.count, maxStep: this.count}}));
     });
  }
  
  render(){
    return(
      <div className="add-step-button"
            ref={elem => this.htmlElement = elem} >
      </div>
    );
  }
}

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('App')
// );

export default Game;

