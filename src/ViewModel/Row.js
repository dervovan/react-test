import React, { Component } from 'react';
import Square from './Square';
import utl from '../Logic/Utility';

class Row extends Component {
    constructor(props){
      super(props);
      this.state = {rowData: this.props.rowData};
      this.boardSize = props.size;
    }
  
   shouldComponentUpdate(nextProps, nextState) {
     if (utl.shallowArraysCompare(nextProps.rowData, this.state.rowData)){
       return false;
     }
  
     this.setState(() => ({rowData: nextProps.rowData}));
     return true;
   }
  
   render(){
     return (
           this.state.rowData.map((element, index) => {
             var squareIndex = this.props.rowIndex * this.boardSize + index;
             return <Square 
                       key={'sq'+squareIndex} 
                       rowIndex={this.props.rowIndex} 
                       columnIndex={index} 
                       handleEvent={this.props.handleCellEvent}
                       value={element}/>
           })
     );
   }
  }
  
export default Row;