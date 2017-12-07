import React, { Component } from 'react';
import Row from './Row';
//import utl from '../Utility/Utility';

class Board extends Component {
    constructor(data){
      super(data);
      this.state = {dataGrid : Array(Board.size).fill(false).map(() => Array(Board.size).fill(false))}
      this.handleCellEvent = this.handleCellEvent.bind(this);
      this.index = data.index;
      //window.addEventListener('test', () => )
    }
  
    static get size(){
      return 30;
    }
  
    addIteration(state){
      this.props.addIteration(state);
    }
  
    handleCellEvent(args){
      this.props.updateState(this, args);
      return;
  
    //   var copy = this.state.dataGrid.slice().map(row => row.slice());
    //   copy[args.rowIndex][args.columnIndex] = !args.value;
    //   this.setState(() => ({dataGrid: copy}));
    //   this.addIteration(copy);
    }
  
    updateState(newState){
      console.log('update state');
      this.setState(() => ({dataGrid: newState}));
    }
    
    render() {
      return (
        <svg className="svg-container">
          {this.state.dataGrid.map((rowData, index) => 
              (<Row 
                  key={'row'+ index} 
                  size = {Board.size}
                  rowData = {rowData} 
                  rowIndex = {index} 
                  handleCellEvent = {this.handleCellEvent}/>)
          )}
        </svg>
      );
    }
  }

  export default Board;