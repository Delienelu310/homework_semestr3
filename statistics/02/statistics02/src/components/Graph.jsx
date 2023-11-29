import { useEffect, useState } from "react";
import { VictoryChart, VictoryScatter, VictoryLabel, VictoryTooltip, VictoryLine } from "victory";

export default function Graph({options}){

    const [chosen, setChosen] = useState(0);
    const [data, setData] = useState([]);
    const [average, setAverage] = useState([]);

    useEffect(() => {
        console.log(options);
        if(!options) return;
        setData(options[chosen].data[0]);
        setAverage(options[chosen].data[1]);
    }, [chosen]);

    return (
        <div style={{width: "50%", margin: "auto"}}>
            <VictoryChart width={400} height={300} style={{margin:"10%"}}>
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

                <VictoryLine
                    data={average}
                    style={{
                    data: { stroke: 'red' },
                    parent: { border: '1px solid #ccc' },
                    }}
                />
            </VictoryChart>

            {options.map((option, index) => (
                <button onClick={() => {
                    setChosen(index);
                }}>{option.label}</button>
            ))}

        </div>
    );
}