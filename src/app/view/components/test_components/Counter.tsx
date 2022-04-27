import React from "react";
import ReactDOM from "react-dom/client";
import { connect } from "react-redux";
import Button from "../../small_components/Button";
import { Input } from "../../small_components/Input";
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
  // const [counterInput, setCounterInput] = useState(0);
  let counterInput = 0;
  let themeValue = 0;

  class Counter extends React.Component<any> {
    incrementHandler() {
      this.props.increment(counterInput);
    }
    decrementHandler() {
      this.props.decrement(counterInput);
    }

    static themes = {
      dark: "/src/assets/scss/test2.scss",
      light: "test.module.scss",
    };
    static container: HTMLElement | null = document.getElementById("root");
    static root = ReactDOM.createRoot(this.container || new HTMLElement());
    themeHandler() {
      var all = document.getElementsByTagName("*");
      for (var i = 0, max = all.length; i < max; i++) {
        all[i].classList.remove("theme_color" + 0)
        all[i].classList.remove("theme_color" + 1)
        all[i].classList.add("theme_color" + themeValue)
      }
      if (themeValue == 0) {
        themeValue = 1;
        this.props.change_theme(themeValue);
      } else {
        themeValue = 0;
        this.props.change_theme(themeValue);
      }
    }

    toggleCounterHandler() {}
    // render(){
    // return Render(this.props)}
    render() {
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
