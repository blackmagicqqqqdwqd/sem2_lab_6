import TableRow from './TableRow.js';

/*
   компонент, для вывода thead таблицы
   пропсы:
      head - данные для шапки таблицы в виде массива
*/
const TableHead = (props) => {
    return (
        <thead>
            <tr>   
                <TableRow row={ props.head } isHead="1"/>
            </tr>
        </thead>
    )
}

export default TableHead;