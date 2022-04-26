import classes from "./../../../../assets/scss/test_scss/Counter.module.scss";
import React, { Component } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import Button from "../../small_components/Button";
import store from "../../../db/_redux";

// const Counter = () => {
//   const dispatch = useDispatch();
//   const counter = useSelector((state: any) => state.counter);
//   console.log(counter);
//   console.log(counter.counter);

//   const incrementHandler = () => {
//     dispatch({ type: "increment" });
//   };
//   const decrementHandler = () => {
//     dispatch({ type: "decrement" });
//   };

//   const toggleCounterHandler = () => {};

//   return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{counter}</div>
//       <div>
//         <Button onClick={incrementHandler}>Increment</Button>
//         <Button onClick={decrementHandler}>Decrement</Button>
//       </div>
//       <Button onClick={toggleCounterHandler}>Toggle Counter</Button>
//     </main>
//   );
// };

/////////////////////////////////////////////////////////////

class Counter extends React.Component<any> {
  incrementHandler() {
    this.props.increment();
  };
  decrementHandler() {
    this.props.decrement();
  };

  toggleCounterHandler() {};
  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <Button onClick={this.incrementHandler.bind(this)}>Increment</Button>
          <Button onClick={this.decrementHandler.bind(this)}>Decrement</Button>
        </div>
        <Button onClick={this.toggleCounterHandler}>Toggle Counter</Button>
      </main>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    counter: state.counter
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return{
    increment: () => dispatch({type: "increment"}),
    decrement: () => dispatch({type: "decrement"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
