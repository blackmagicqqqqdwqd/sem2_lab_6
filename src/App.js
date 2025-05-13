import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { use, useState } from 'react';
import { blur } from 'd3';

function App() {
  const [data,setDate] = useState(buildings)
  const changeData = (d) => {
    setDate(d)
  }
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Chart data={ data } /> 
       <Table pagination={true} data={ buildings } changeData={changeData} amountRows="30" />
    </div>
  );
}

export default App;
