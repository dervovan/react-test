import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
// import ReactDOM from 'react-dom';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
class Game extends Component {
  constructor(){
    super();
    this.state = {iteration: 0, timeLineSize: 0};
    this.addIteration = this.addIteration.bind(this);
    this.timeLine = [];
  }
  static BoardSize(){
    return 80;
  }

  static CellSize(){
    return 7;
  }

  addIteration(newState){
    this.setState(
      (prev) => { 
        return {
          iteration: ++prev.iteration,
          timeLineSize: ++prev.timeLineSize}
      });
    this.timeLine.push(newState);
  }




  
  // to do  - pass iteration to board and show it






  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board size={Game.BoardSize()} addIteration = {this.addIteration} iteration = {this.state.iteration}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
      // console.log(nextProps.value + '---' + this.state.value);
      // console.log(this.props.rowIndex, this.props.columnIndex);
      this.setState((prev) => {return {value: nextProps.value}});
      return true;
    }

    return false;
  }

  handleClick(){
    this.props.handleClick(this.props.rowIndex, this.props.columnIndex);
    //this.setState(prev => {return {value: !prev.value}})
    // this.setState(prevState => ({
    //   cssAdditional: prevState.value ? "square--empty" : "square--filled",
    //   value: !prevState.value
    // }));
  }

  componentDidMount() {
    // When the component is mounted, add your DOM listener to the "nv" elem.
    // (The "nv" elem is assigned in the render function.)
    this.nv.addEventListener("mouseover", this.handleClick);
  }

  componentWillUnmount() {
    // Make sure to remove the DOM listener when the component is unmounted.
    this.nv.removeEventListener("mouseover", this.handleClick);
  }

  render() {
    // console.log('square');
    //var cssClass = "square " + (this.props.value ? "square--filled" : "square--empty");
    //this.addEventListener('click', () => {this.handleClick});
    //let cssAdditional = this.props.value ? "square--filled" : "square--empty";
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
    //  console.log("---");
    // console.log(nextProps.rowData);
    // console.log(this.state.rowData);
    if (this.compareArrays(nextProps.rowData, this.state.rowData)){
      return false;
    }

    this.setState(() => {return {rowData: nextProps.rowData}});
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
    // this.dataGrid = Array(data.size).fill(Array(data.size).fill(false));
    // this.dataGrid = Array(Math.min(data.size, 220)).fill(false).map(() => Array(Math.min(data.size, 140)).fill(false));
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  addIteration(state){
    this.props.addIteration(state);
    // Game.AddIteration(state);
  }

  handleCellClick(rowIndex, columnIndex){
    // var rowNum = Math.floor(index/Game.BoardSize());
    // var column = index%Game.BoardSize();
    // console.log(rowNum);
    // console.log(this.dataGrid);
    // console.log(this.dataGrid[rowNum][column]);
    // var temp = this.dataGrid[rowIndex].slice(columnIndex, columnIndex + 1);
    // console.log("---" + rowIndex + '---' + columnIndex + '---' + temp[0]);
    // console.log(this.dataGrid[rowIndex][columnIndex]);
    //this.dataGrid[rowNum][column] = !this.dataGrid[rowNum][column];
    // this.setState(prev => {
    //   // var dataGridCopy = prev.dataGrid.slice().map(row => {return row.slice();});
    //   // dataGridCopy[rowIndex][columnIndex] = !dataGridCopy[rowIndex][columnIndex];
    //   return {
    //     dataGrid: prev.dataGrid[rowIndex][columnIndex] = !prev.dataGrid[rowIndex][columnIndex]
    //   }
    // });
    var copy = this.state.dataGrid.slice().map(row => {return row.slice()});
    copy[rowIndex][columnIndex] = !copy[rowIndex][columnIndex];
    this.setState(() => {return {dataGrid: copy}});
    this.addIteration(copy);
        
    // console.log(this.state.dataGrid);
    //setTimeout(() => {this.dataGrid[rowIndex][columnIndex] = !this.dataGrid[rowIndex][columnIndex]}, 500);
  }

  // componentDidUpdate(prevProps, prevState){
    
  // }
  
  render() {
    //console.log('board');

    return (
      <svg width="1200" height="700" className="svg-root" id="gameSVG" overflow="hidden" xmlns="http://www.w3.org/2000/svg">
        {this.state.dataGrid.map((rowData, index) => {
            return <Row key={'row'+ index} rowData={rowData} rowIndex={index} handleCellClick={this.handleCellClick}/>;
        })}
      </svg>
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
