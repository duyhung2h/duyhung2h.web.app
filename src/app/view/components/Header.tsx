import { NavLink } from "react-router-dom";
import classes from "../../../assets/scss/Header.module.scss";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/examples">Examples</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
