import { useEffect, useState } from "react";
import Graph from "./components/Graph";
import calculateData from "./calculations/calculateData";
import generateAvgFuncData from "./calculations/averageFunctions";
import axios from "axios";

function App() {

  const [calculatedData, setCalculatedData] = useState();

  useEffect(() => {

    setCalculatedData(calculateData());
    console.log(calculatedData);

    // axios.get("http://localhost:8080/data")
    //   .then(response => {
    //     console.log(response);
    //     setCalculatedData(response.data);
    //   }).catch(() => {
    //     console.log("Error");
    //   });
  }, []);

  return (
    <div className="App">
      
      {/* {
        calculatedData && <Graph options={
          calculatedData.map((graph) => {
            return {
              label: graph.label,
              data: graph.data
            }
          })
        }/>
      } */}
      
      {
        calculatedData && <Graph options={[
          {label: "b", data: [calculatedData[0].b, calculatedData[1].b]},
          {label: "u", data: [calculatedData[0].u, calculatedData[1].u]},
          {label: "c", data: [calculatedData[0].c, calculatedData[1].c]},
          {label: "d", data: [calculatedData[0].d, calculatedData[1].d]},
          {label: "d - c", data: [calculatedData[0].cmd, calculatedData[1].cmd]},

          //A
          {label: "Bn / n", data: [[], generateAvgFuncData((avg, n) => avg / n, calculatedData[1].b)]},
          {label: "Bn / n**0.5", data: [[], generateAvgFuncData((avg, n) => avg / n**0.5, calculatedData[1].b)]},
          //B
          {label: "Un / n", data: [[], generateAvgFuncData((avg, n) => avg / n, calculatedData[1].u)]},
          //C
          {label: "Cn / n", data: [[], generateAvgFuncData((avg, n) => avg / n, calculatedData[1].c)]},
          {label: "Cn / n**2", data: [[], generateAvgFuncData((avg, n) => avg / n**2, calculatedData[1].c)]},
          {label: "Cn / nln(n)", data: [[], generateAvgFuncData((avg, n) => avg / n / Math.log(n), calculatedData[1].c)]},

          //D
          {label: "Dn / n", data: [[], generateAvgFuncData((avg, n) => avg / n, calculatedData[1].d)]},
          {label: "Dn / n**2", data: [[], generateAvgFuncData((avg, n) => avg / n**2, calculatedData[1].d)]},
          {label: "Dn / nln(n)", data: [[], generateAvgFuncData((avg, n) => avg / n / Math.log(n), calculatedData[1].d)]},

          //E
          {label: "(Dn - Cn) / n", data: [[], generateAvgFuncData((avg, n) => avg / n, calculatedData[1].cmd)]},
          {label: "(Dn - Cn) / nln(n)", data: [[], generateAvgFuncData((avg, n) => avg / n / Math.log(n), calculatedData[1].cmd)]},
          {label: "(Dn - Cn) / nln(ln(n))", data: [[], generateAvgFuncData((avg, n) => avg / n / Math.log(Math.log(n)), calculatedData[1].cmd)]},
        ]}></Graph> 
      }
      
    </div>
  );
}

export default App;
