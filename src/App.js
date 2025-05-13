import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { use, useState } from 'react';
import { blur } from 'd3';

function App() {
  const [data,setDate] = useState(buildings)
  const [paggination,setPaggination] = useState(true)
  const countRows = 30; 
  const changeData = (d) => {
    setDate(d)
    if (d.length < countRows) setPaggination(false)
    else setPaggination(true)
  }
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Chart data={ data } /> 
       <Table pagination={paggination} data={ buildings } changeData={changeData} amountRows={countRows} />
    </div>
  );
}

export default App;
