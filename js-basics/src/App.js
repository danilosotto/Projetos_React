import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const array = [1, 2, 3, 4];
  const arrayMap = array.map((item) => <h1 key={item}>{item}</h1>);
  console.log(arrayMap);
  return (
    <div>
      <h1></h1>
      {arrayMap}
    </div>
  );
};

export default App;
