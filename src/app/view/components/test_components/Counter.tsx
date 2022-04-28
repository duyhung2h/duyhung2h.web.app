import React from "react";
import ReactDOM from "react-dom/client";
import { connect, useDispatch, useSelector } from "react-redux";
import { mapStateToProps } from "../../../db/_redux";
import Button from "../../small_components/Button";
import { Input } from "../../small_components/Input";
import { Theme } from "../../small_components/Theme";
import classes from "./../../../../assets/scss/test_scss/Counter.module.scss";

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

class Counter extends Theme {
  counterInput: number = this.props.counterInput;
  incrementHandler() {
    this.props.increment(this.counterInput);
  }
  decrementHandler() {
    this.props.decrement(this.counterInput);
  }

  toggleCounterHandler() {
    this.props.show_counter();
  }
  render() {
    // alert(this.props.counter)
    // alert(this.props.showCounter)
    this.reRender();
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        {this.props.showCounter && (
          <div className={classes.value}>{this.props.counter}</div>
        )}
        <div>
          <Button onClick={this.incrementHandler.bind(this)}>Increment</Button>
          <Button onClick={this.decrementHandler.bind(this)}>Decrement</Button>
        </div>
        <Input
          value={this.props.counterInput}
          onChange={(e: any) => (this.counterInput = e.target.value)}
        />
        <h1>Theme</h1>
        <div className={classes.value}>{this.props.theme}</div>
        <div>
          <Button onClick={this.themeHandler.bind(this)}>Change theme</Button>
        </div>
        <Button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</Button>
      </main>
    );
  }
}
const Render = () => {
  // let counterInput = 0;
  return Counter;
};

/////////////////////////////////////////////////////////////

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (value: number) =>
      dispatch({ type: "increment", amount: value }),
    decrement: (value: number) =>
      dispatch({ type: "decrement", amount: value }),
    show_counter: () =>
      dispatch({ type: "show_counter"}),
    change_theme: (value: number) =>
      dispatch({ type: "change_theme", amount: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Render());
