import { useState } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";




const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [typeChart, setTypeChart] = useState(1);
  const [oy, setOy] = useState([true, false])
  const handleSubmit = (event) => {
    event.preventDefault();
    setOx(event.target["ox"].value);
    setOy([event.target["oy"][0].checked, event.target["oy"][1].checked])
    setTypeChart(event.target["TypeChart"].value)
    if (d3.select("#oy2").property('checked') == false && d3.select("#oy1").property('checked') == false) {
      d3.select("#oy1_s").classed('error', true)
      d3.select("#oy2_s").classed('error', true)
    }

  }

  const changeOY = () => {

    if (d3.select("#oy2").property('checked') || d3.select("#oy1").property('checked')) {
      d3.select("#oy1_s").classed('error', false)
      d3.select("#oy2_s").classed('error', false)
    }

  }

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    for (let entry of groupObj) {
      let minMax = d3.extent(entry[1].map(d => d['Высота']));
      arrGraph.push({ labelX: entry[0], values: minMax });
    }

    // порядок возрастания
    if (ox == "Год")
      arrGraph.sort((item1, item2) => {
        return item1.labelX - item2.labelX;
      })
    return arrGraph;
  }

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p> Значение по оси OX: </p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
          Страна
          <br />
          <input type="radio" name="ox" value="Год" />
          Год
        </div>

        <p> Значение по оси OY </p>
        <div className="checkbox-container">
          <div>
            <label style={{order:2}} id={"oy1_s"} htmlFor={"oy1"}>Максимальная высота</label>
            <input style={{order:1}} id="oy1" type="checkbox" name="oy" onChange={changeOY} defaultChecked={oy[0] === true} />
          </div>  
          <div>
            <label style={{order:2}} id={"oy2_s"} htmlFor={"oy2"}>Минимальная высота</label>
            <input style={{order:1}} id="oy2" type="checkbox" onChange={changeOY} name="oy" />
          </div>
        </div>
        <br/>


        <div>
          <label htmlFor={"TypeChart"}>Тип диограммы </label>
          <select name="TypeChart" defaultValue={typeChart} >
            <option value={0}>Гистограмма</option>
            <option value={1}>Точечная диаграмма</option>
          </select>
        </div>

        <p>
          <button type="submit">Построить </button>
        </p>
      </form>
      <ChartDraw data={createArrGraph(props.data, ox)} oy={oy} typeChart={typeChart} />
    </>
  )
}

export default Chart;