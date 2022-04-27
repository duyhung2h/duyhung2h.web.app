import React from "react";
import ReactDOM from "react-dom/client";
import { connect } from "react-redux";
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
const Render = () => {
  let counterInput = 0;
  class Counter extends Theme {
    incrementHandler() {
      this.props.increment(counterInput);
    }
    decrementHandler() {
      this.props.decrement(counterInput);
    }


    toggleCounterHandler() {}
    render() {
      this.reRender();
      return (
        <main className={classes.counter}>
          <h1>Redux Counter</h1>
          <div className={classes.value}>{this.props.counter}</div>
          <div>
            <Button onClick={this.incrementHandler.bind(this)}>
              Increment
            </Button>
            <Button onClick={this.decrementHandler.bind(this)}>
              Decrement
            </Button>
          </div>
          <Input
            value={this.props.counterInput}
            onChange={(e: any) => (counterInput = parseInt(e.target.value))}
          />
          <h1>Theme</h1>
          <div className={classes.value}>{this.props.theme}</div>
          <div>
            <Button onClick={this.themeHandler.bind(this)}>Change theme</Button>
          </div>
          <Button onClick={this.toggleCounterHandler}>Toggle Counter</Button>
        </main>
      );
    }
  }
  return Counter;
};

/////////////////////////////////////////////////////////////

const mapStateToProps = (state: any) => {
  return {
    counter: state.counter,
    theme: state.theme,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (value: number) =>
      dispatch({ type: "increment", amount: value }),
    decrement: (value: number) =>
      dispatch({ type: "decrement", amount: value }),
    change_theme: (value: number) =>
      dispatch({ type: "change_theme", amount: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Render());
