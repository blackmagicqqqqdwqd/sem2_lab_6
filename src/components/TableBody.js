import TableRow from './TableRow.js';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
*/

const TableBody = (props) => {
    // номера строк, отображаемых на странице
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);

    //формируем строки на основе переданных данных
    const tbody = props.body.map((item, index) =>
   // оставляем видимыми только строки, индексы которых принадлежат интервалу
        <tr key={index} className={
           (index >= begRange && index < endRange) ? "show" : "hide"
        }> 
                <TableRow row={ Object.values(item) } isHead="0"/>
            </tr>
        ); 
 
    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TableBody;