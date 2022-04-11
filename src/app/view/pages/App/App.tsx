import { Route } from "react-router-dom";
// import MainHeader from "../../components/Header";

import GetExamplePage from "./../../components/ExampleComponent";
// import Home from "./../home";

function App() {
  return (
    <div>
      {/* <MainHeader/> */}
        {/* <Route path={"/home"}>
        <Home />
      </Route> */}
        <Route path={"/example"}>
        <GetExamplePage />
      </Route>
    </div>
  );
}

export default App;
