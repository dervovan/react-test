import React, { Component } from 'react';
//import utl from '../Logic/Utility';

class Square extends Component {
    constructor(props){
      super(props);
      this.state = {value: props.value};
      this.handleEvent = this.handleEvent.bind(this);
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
  
    handleEvent(e){
      if (e.buttons !== 1){
        return;
      }
      
      this.props.handleEvent(
        {
          rowIndex: this.props.rowIndex, 
          columnIndex:  this.props.columnIndex,
          value: this.props.value,
          event: e
        });
    }
  
    componentDidMount() {
      this.nv.addEventListener("mouseover", this.handleEvent);
    }
  
    componentWillUnmount() {
      this.nv.removeEventListener("mouseover", this.handleEvent);
    }
  
    render() {
      return (
        <rect 
          ref = {elem => this.nv = elem} 
          className={"square " + (this.props.value ? "square--filled" : "square--empty")}
          x = {this.props.columnIndex * Square.size }
          y = {this.props.rowIndex * Square.size }
          /> 
      );
    }
  }

  export default Square;