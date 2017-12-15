import React, { Component } from 'react';
import Row from './Row';
//import utl from '../Logic/Utility';

class Board extends Component {
    constructor(data){
      super(data);
      this.state = {dataGrid : Array(Board.size).fill(false).map(() => Array(Board.size).fill(false))}
      this.handleCellEvent = this.handleCellEvent.bind(this);
      this.index = data.index;
      data.sp.addBoard(this);
      // this.updateState = this.updateState.bind(this);
    }
  
    static get size(){
      return 30;
    }
  
    handleCellEvent(args){
      this.props.updateState(this, args);
    }
  
    updateState(newState){
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