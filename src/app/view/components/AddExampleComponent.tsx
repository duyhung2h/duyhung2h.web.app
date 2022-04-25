import React from "react";
import classes from "../../../assets/scss/index.module.scss";
import Card from "../small_components/Card";
import Button from "../small_components/Button";

const AddExampleComponent = () => {
  return (
    <Card className={(`${classes.login} overlay-container`)}>
      <Button type="submit" className={classes.btn}>
        Add new post
      </Button>
    </Card>
  );
};

export default AddExampleComponent;
