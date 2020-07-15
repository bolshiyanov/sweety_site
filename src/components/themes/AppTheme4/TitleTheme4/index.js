import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const TitleTheme4 = () => {
    const [data, setData] = useState({ title: '', description: '' });

    const { title, description } = useSelector((state) => state.config.data);


    useEffect(() => {
        setData({ title, description });
    }, [title, description]);

    return (
        <React.Fragment>
            <h1 className="title-theme4" >{data.title || 'АВТОСЕРВИС НА ТАГАНКЕ'}</h1>
            <div className="description-theme4">{data.description ||
                'Оперативный ремонт ходовой, автоэлектрики, диагностика двигателя и любые другие поломки. Все марки авто.'}</div>

        </React.Fragment>
    );
};

export default TitleTheme4;