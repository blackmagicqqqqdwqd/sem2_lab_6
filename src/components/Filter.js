import React, { useState } from 'react';

/*
   компонент, для фильтрации таблицы
*/

const Filter = (props) => {
    const [formValues, setFormValues] = useState({
        structure: '',
        type: '',
        country: '',
        city: '',
        yearFrom: '',
        yearFor: '',
        hightFrom: '',
        hightFor: ''
    });

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // создаем словарь со значениями полей формы
        const filterField = {
            "Название": formValues.structure.toLowerCase(),
            "Тип": formValues.type.toLowerCase(),
            "Страна": formValues.country.toLowerCase(),
            "Город": formValues.city.toLowerCase(),
            "Год": [parseFloat(formValues.yearFrom), parseFloat(formValues.yearFor)],
            "Высота": [parseFloat(formValues.hightFrom), parseFloat(formValues.hightFor)]
        };
        props.setPage()
        // фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        for (const key in filterField) {
            if (!Array.isArray(filterField[key])) {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key]));
            } else {
                arr = arr.filter(item => {
                    return parseFloat(item[key]) >=
                        (isNaN(filterField[key][0]) ? 0 : filterField[key][0]) &&
                        parseFloat(item[key]) <=
                        (isNaN(filterField[key][1]) ? Infinity : filterField[key][1]);
                });
            }
        }

        // передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
       // props.setPage();
    };

    const handleReset = () => {
        setFormValues({
            structure: '',
            type: '',
            country: '',
            city: '',
            yearFrom: '',
            yearFor: '',
            hightFrom: '',
            hightFor: ''
        });

        // Вызываем функцию фильтрации с оригинальными данными, чтобы сбросить фильтр
        props.filtering(props.fullData);
    };

    return (

        <form onSubmit={handleSubmit}>
            <h4>Фильтры</h4>
            <div className='filter_Container'>
                <p>
                    <label>Название: </label>
                    <input name="structure" type="text" value={formValues.structure} onChange={handleChange} />
                </p>
                <p>
                    <label>Type: </label>
                    <input name="type" type="text" value={formValues.type} onChange={handleChange} />
                </p>
                <p>
                    <label>Страна: </label>
                    <input name="country" type="text" value={formValues.country} onChange={handleChange} />
                </p>
                <p>
                    <label>Город: </label>
                    <input name="city" type="text" value={formValues.city} onChange={handleChange} />
                </p>
                <p>
                    <label>Год от: </label>
                    <input name="yearFrom" type="number" value={formValues.yearFrom} onChange={handleChange} />
                </p>
                <p>
                    <label>Год до: </label>
                    <input name="yearFor" type="number" value={formValues.yearFor} onChange={handleChange} />
                </p>
                <p>
                    <label>Высота от: </label>
                    <input name="hightFrom" type="text" value={formValues.hightFrom} onChange={handleChange} />
                </p>
                <p>
                    <label>Высота до: </label>
                    <input name="hightFor" type="text" value={formValues.hightFor} onChange={handleChange} />
                </p>
            </div>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="button" onClick={handleReset}>Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;