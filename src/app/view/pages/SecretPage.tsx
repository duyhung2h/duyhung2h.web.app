import React, { useEffect } from "react";
import MyEditor from "../components/test_components/DraftJS";

export function test() {
  const person = { age: 20 };
  const person2 = { ...person }; // shallow copy
  person2.age = 99;
  console.log(person);
  console.log(person2);
}

const SecretPage = () => {
  test();

  // initial fetch movie on site load
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <h1>Secret Page to test data</h1>
      <section>
        <MyEditor />
      </section>

      {/* <Provider store={store}>
        <Counter />
      </Provider>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section> */}
    </React.Fragment>
  );
};
export default SecretPage;
