import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import utl from './Utility/Utility'
import StateProcessor from './Utility/StateProcessor'
import Board from './ViewModel/Board'
// import ReactDOM from 'react-dom';



class Game extends Component {
  constructor(){
    super();
    this.state = {currentIteration: 0, timeLineSize: 0};
    this.addIteration = this.addIteration.bind(this);
    this.changeIteration = this.changeIteration.bind(this);
    this.timeLine = [];
    this.StateProcessor = new StateProcessor(Game.size);
  }

  static get size(){
    return {
      boardSize: 30,
      length: 15,
      rowCount: 3,
      columnCount: 5
    };
  }

  addIteration(newState, boardIndex){
    return;
    //!!!!!!!!!
    this.timeLine.push(newState);
    this.setState(
      (prev) =>({         
          currentIteration: ++prev.currentIteration,
          timeLineSize: ++prev.timeLineSize
      }));
  }

  changeIteration(args){
    console.log(1);
    // this.setState(
    //   (prev) => { 
    //     return {
    //       currentIteration: arguments.value,
    //       timeLineSize: prev.timeLineSize
    //     }
    //   });
  }

  // to do  - pass iteration to board and show it

  render() {
    return (
      <div className = "game">
        <div className = "game-board">
          {Array(Game.size.length).fill(null).map((val, index) => 
            (<Board 
              key = {"gb" + index} 
              
              addIteration = {this.addIteration} 
              index = {index} 
              updateState = {this.StateProcessor.updateByCellEvent} />)
          )}
        </div>
      </div>
    );
  }
}






class GameInfo extends Component{
  render(){
    return (
       <div className="game-info">
          <div>
            <SelectIteration 
              currentValue = {this.state.currentIteration} 
              onIterationChanged = {this.changeIteration}
              maxValue = {this.state.timeLineSize} />
          </div>
          <ol>{/* TODO */}</ol>
        </div>
    );
  }

}

class SelectIteration extends Component{
  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <div className="iteration-select">
        <input 
          className="range-picker" 
          type="range" 
          value={this.props.currentValue} 
          min = {0} 
          max = {this.props.maxValue} 
          onChange={this.props.onIterationChanged} />
          <ShowCurrentIteration currentValue={this.props.currentValue} max={this.props.maxValue}/>
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

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('App')
// );

export default Game;

