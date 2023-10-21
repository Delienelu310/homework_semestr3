import { useEffect, useState } from "react";
import { VictoryChart, VictoryScatter, VictoryLabel, VictoryTooltip } from "victory";
import generateGraph, { convertIntoVictoryGraphData, getAverage } from "../calculations/generateGraph";

export default function GraphCopmonent({formula, func, a, b, m, k}){

    const [data, setData] = useState(null);
    const [average, setAverage] = useState(null);

    useEffect(() => {
        if(data == null){
            let calculatedData = generateGraph(func, a, b, m, k);
            setData(
                convertIntoVictoryGraphData(calculatedData)
            );
            setAverage(
                getAverage(calculatedData, k)
            )
        }
        
    }, []);

    return (
        <div style={{width: "50%"}}>
            <h3>{formula}</h3>
            <VictoryChart width={400} height={300}>
                <VictoryScatter
                    data={data}
                    size={1}
                    style={{ data: { fill: "blue"} }} 

                />

                <VictoryScatter
                    data={average}
                    size={2}
                    style={{ data: { fill: "red"} }} 

                    labels={({ datum }) => datum.y}
                    labelComponent={
                        <VictoryTooltip
                            flyoutStyle={{ fill: 'white' }}
                        />
                    }
                />
            </VictoryChart>

        </div>
    );
}