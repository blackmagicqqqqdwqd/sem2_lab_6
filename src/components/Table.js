import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';
import { findAllByAltText } from '@testing-library/dom';
/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props,pagination) => {
	
    const [dataTable, setDataTable] = useState(props.data);
    const updateDataTable = (value) => {
       
        props.changeData(value)
      
        setDataTable(value)
    }
    const [activePage, setActivePage] = useState("1");
    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    //if(props.pagination == false) setActivePage(1);
	//количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows); 
    
    // массив с номерами страниц
    
        const arr = Array.from({ length: n }, (v, i) => i + 1);
        let pages;
        let countPage = props.amountRows;
        if (props.pagination)
        {
            
            pages = arr.map((item, index) =>  {
                if (activePage  == index+1) return <span className={'currentPage'} key={ index } onClick={ changeActive }> { item } </span>
                else return <span key={ index } onClick={ changeActive }> { item } </span>
            }
            );
        }
        else {
            //setActivePage("1");
            countPage = props.data.length;
        } 
    
   
    
     //формируем совокупность span с номерами страниц


    return( 
      <>
        
        <Filter     setPage={()=> setActivePage("1")}  filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>  
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={ countPage} numPage={ activePage }/>
        
        </table>

	    <div>
            
          {pages}
        </div>
	  </>   
    )   
}

export default Table;