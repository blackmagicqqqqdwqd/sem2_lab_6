/*
   компонент, для вывода строки таблицы
   пропсы:
      row - данные для формирования ячеек строки таблицы в виде массива
      isHead - 0 - если формируются ячейки td, 1 - если формируются ячейки th
*/

const TableRow = (props) => {

    const cells = (props.isHead == "0") 
        ? props.row.map((item, index) => <td key={ index }> {item} </td>) 
        : props.row.map((item, index) => <th key={ index }> {item} </th>);
 
    return( cells )
}

export default TableRow;