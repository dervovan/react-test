import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
// import ReactDOM from 'react-dom';

class Game extends Component {
  constructor(){
    super();
    this.state = {currentIteration: 0, timeLineSize: 0};
    this.addIteration = this.addIteration.bind(this);
    this.changeIteration = this.changeIteration.bind(this);
    this.timeLine = [];
  }
  static BoardSize(){
    return 30;
  }

  static CellSize(){
    return 7;
  }

  addIteration(newState){
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
          <Board size={Game.BoardSize()} addIteration = {this.addIteration} iteration = {this.state.iteration}/>
        </div>
        <div className="game-info">
          <div>
            <SelectIteration 
              currentValue = {this.state.currentIteration} 
              onIterationChanged = {this.changeIteration}
              maxValue = {this.state.timeLineSize} />
          </div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Square extends Component {
  constructor(props){
    super(props);
    this.state = {value: props.value};
    this.handleClick = this.handleClick.bind(this);
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
    this.nv.addEventListener("mouseover", this.handleClick);
  }

  componentWillUnmount() {
    this.nv.removeEventListener("mouseover", this.handleClick);
  }

  render() {
    // console.log('square');
    return (
      <rect 
        ref={elem => this.nv = elem} 
        className={"square " + (this.props.value ? "square--filled" : "square--empty")}
        x = {this.props.columnIndex * Game.CellSize() }
        y = {this.props.rowIndex * Game.CellSize() }
        /> 
    );
  }
}

class Row extends Component {
   constructor(props){
     super(props);
     this.state = {rowData: this.props.rowData};
   }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.compareArrays(nextProps.rowData, this.state.rowData)){
      return false;
    }

    this.setState(() => ({rowData: nextProps.rowData}));
    return true;
  }

  compareArrays(a1, a2){
    return a1.length === a2.length
           && a1.every((val, index) => val === a2[index]);
  }

  render(){
    return (
          this.state.rowData.map((element, index) => {
            var squareIndex = this.props.rowIndex * Game.BoardSize() + index;
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

class Board extends Component {
  constructor(data){
    super(data);
    this.state = {dataGrid : Array(Math.min(data.size, 100)).fill(false).map(() => Array(Math.min(data.size, 150)).fill(false))}
    this.handleCellClick = this.handleCellClick.bind(this);
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
      <svg className="svg-container" id="gameSVG" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
        {this.state.dataGrid.map((rowData, index) => {
            return <Row key={'row'+ index} rowData={rowData} rowIndex={index} handleCellClick={this.handleCellClick}/>;
        })}
      </svg>
    );
  }
}

class SelectIteration extends Component{
  constructor(props){
    super(props);
  }


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
