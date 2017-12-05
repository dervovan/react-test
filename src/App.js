import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Utility from './Utility'
// import ReactDOM from 'react-dom';

class StateProcessor {
  constructor(rowSize){
    this.state = {};
    this.rowSize = rowSize;
  }

  updateState(newState, sourceBoardIndex){
    var row = Math.floor(sourceBoardIndex/this.rowSize);
    var column = sourceBoardIndex%this.rowSize;
    

  }

  get currentState(){
    return this.state;
  }
}


class Game extends Component {
  constructor(){
    super();
    this.state = {currentIteration: 0, timeLineSize: 0};
    this.addIteration = this.addIteration.bind(this);
    this.changeIteration = this.changeIteration.bind(this);
    this.timeLine = [];
  }

  static get size(){
    return 15;
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
      <div className="game">
        <div className="game-board">
          {Array(Game.size).fill(null).map((val, index) => 
            (<Board key={"gb" + index} addIteration = {this.addIteration} index={index} />)
          )}
        </div>
      </div>
    );
  }
}

class Board extends Component {
  constructor(data){
    super(data);
    this.state = {dataGrid : Array(Board.size).fill(false).map(() => Array(Board.size).fill(false))}
    this.handleCellClick = this.handleCellClick.bind(this);
    //window.addEventListener('test', () => )
  }

  static get size(){
    return 30;
  }

  addIteration(state){
    this.props.addIteration(state);
  }

  handleCellClick(rowIndex, columnIndex){
    var copy = this.state.dataGrid.slice().map(row => row.slice());
    copy[rowIndex][columnIndex] = !copy[rowIndex][columnIndex];
    this.setState(() => ({dataGrid: copy}));
    this.addIteration(copy);
  }
  
  render() {
    return (
      <svg className="svg-container">
        {this.state.dataGrid.map((rowData, index) => 
            (<Row key={'row'+ index} rowData={rowData} rowIndex={index} handleCellClick={this.handleCellClick}/>)
        )}
      </svg>
    );
  }
}


class Row extends Component {
  constructor(props){
    super(props);
    this.state = {rowData: this.props.rowData};
  }

 shouldComponentUpdate(nextProps, nextState) {
   if (Utility.shallowArraysCompare(nextProps.rowData, this.state.rowData)){
     return false;
   }

   this.setState(() => ({rowData: nextProps.rowData}));
   return true;
 }

 render(){
   return (
         this.state.rowData.map((element, index) => {
           var squareIndex = this.props.rowIndex * Board.size + index;
           return <Square 
                     key={'sq'+squareIndex} 
                     rowIndex={this.props.rowIndex} 
                     columnIndex={index} 
                     handleClick={this.props.handleCellClick}
                     value={element}/>
         })
   );
 }
}

class Square extends Component {
  constructor(props){
    console.log('square');
    super(props);
    this.state = {value: props.value};
    this.handleClick = this.handleClick.bind(this);
  }

  static get size(){
    return 7;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.value !== this.state.value){
      this.setState((prev) => ({value: nextProps.value}));
      return true;
    }

    return false;
  }

  handleClick(){
    this.props.handleClick(this.props.rowIndex, this.props.columnIndex);
  }

  componentDidMount() {
    this.nv.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    this.nv.removeEventListener("click", this.handleClick);
  }

  render() {
    // console.log('square');
    return (
      <rect 
        ref={elem => this.nv = elem} 
        className={"square " + (this.props.value ? "square--filled" : "square--empty")}
        x = {this.props.columnIndex * Square.size }
        y = {this.props.rowIndex * Square.size }
        /> 
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

//export default App;
export default Game;
export {Utility};
