import React, { useState } from 'react';
import style from './Paginator.module.css';
import LeftArrow from '../../../assets/images/CommonIcons/LeftArrow.png'
import RightArrow from '../../../assets/images/CommonIcons/RightArrow.png'


let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalItemCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize

    return <div className={style.paginator}>
        <div className={style.paginator_pages}>
            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}> <img src={LeftArrow} alt='Left' /> </button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <p key={p} className={props.currentPage === p ? style.paginator_pages_selected : null}
                        onClick={() => { props.onPageChange(p) }}>{p} </p>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}> <img src={RightArrow} alt='Right' /> </button>}
        </div>
    </div>
}

export default Paginator;