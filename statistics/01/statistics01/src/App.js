import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import { first, piCalculation, second, third, zero } from './calculations/testedFunctions';
import generateGraph from './calculations/generateGraph';
import { convertIntoVictoryGraphData } from './calculations/generateGraph';
import calculateIntegal from './calculations/calculateIntegral';
import GraphCopmonent from './components/GraphComponent';

function App() {

  // const [result, setData] = useState(null);

  // useEffect(() => {
  //   // if(result != null) return;
  //   // let data = convertIntoVictoryGraphData(
  //   //   generateGraph(first, 0, 8, 2)
  //   // );
  //   // setData(data);
  //   // console.log(data);

  //   console.log(calculateIntegal(first, 0, 8, 2, 2000))

  // }, []);

  return (
    <div className="App">
      <GraphCopmonent formula={"x^(1/3) : from 0 to 8"} func={first} a={0} b={8} m={2} k={50}/>
      <hr/>
      <GraphCopmonent formula={"sin(x) : from 0 to PI"} func={second} a={0} b={Math.PI} m={2} k={50}/>
      <hr/>
      <GraphCopmonent formula={"4 * x * ( (1 - x)^3 ) : from 0 to 1"} func={third} a={0} b={1} m={2} k={50}/>
      <hr/>
      <GraphCopmonent formula={"half of a circle : from -1 to 1"} func={piCalculation} a={-1} b={1} m={2} k={50}/>
   </div>
  );
}

export default App;
