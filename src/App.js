import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import utl from './Logic/Utility';
import StateProcessor from './Logic/StateProcessor';
import Board from './ViewModel/Board';

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
    var initialState = Array(this.size.rowCount * this.size.boardSize).fill(false).map(() => Array(this.size.boardSize * this.size.columnCount).fill(0));
    // initialState[5][5] = 1;
    // initialState[6][6] = 1;
    // initialState[7][4] = 1;
    // initialState[7][5] = 1;
    // initialState[7][6] = 1;
    this.StateProcessor = new StateProcessor(this.size, initialState);
  }

  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          {Array(this.size.length).fill(null).map((val, index) => 
            (<Board 
                  key = {"gb" + index} 
                  index = {index} 
                  updateState = {this.StateProcessor.updateByCellEvent}
                  sp = {this.StateProcessor} />)
              )}
        </div>
        <GameInfo 
          currentStep = {this.StateProcessor.currentStep}
          timeLineSize = {this.StateProcessor.timeLine.length}
        />
      </div>
    );
  }
}

class GameInfo extends Component{
  constructor(props){
    super(props);
    this.state = {currentStep: 0, maxStep: 0};
  }

  componentDidMount() {
    window.addEventListener(utl.constants().stateProcessedEventName, 
      (event) => this.setState((prev, props) => {
        return {currentStep: event.detail.currentStep, maxStep: event.detail.maxStep}
      }));

    window.addEventListener(utl.constants().stepChangedByInputEventName, 
      (event) => this.setState((prev, props) => {
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
            { <GOLButton /> }
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

class GOLButton extends Component{
  constructor(){
    super();
    this.state = {GOLTurnedOn : false};
  }

  componentDidMount() {
    this.htmlElement.addEventListener("click", ()=> {
      this.setState((prev) => ({GOLTurnedOn: !prev.GOLTurnedOn}));
      window.dispatchEvent(new CustomEvent(utl.constants().GOLButttonEventName));
     });
  }

  render(){
    return(
      <div className ={"gol-info"}>
        <div className={"toggle-gol-button" + (this.state.GOLTurnedOn ? " turn-on" : " turn-off")}
              ref={elem => this.htmlElement = elem} >
              {this.state.GOLTurnedOn ?  "ON" : "OFF"}
        </div>
        <div className ={"draw-info"}>Draw with mouse 1 pressed</div>
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

