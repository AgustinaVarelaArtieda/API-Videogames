import React from "react";

import style from '../Pagination/pagination.module.css'

//Este componente renderiza los numeritos en si
export default function Pagination({gamesPerPage, allVideogames, paginated, currentPage}){
    const pageNumber=[]

    for(let i=1;i<=Math.ceil(allVideogames/gamesPerPage);i++){
        pageNumber.push(i)
    }

    return(
        <nav className={style.page}>
            <ul className={`pagination ${style.pagination}`}>
        {pageNumber?.map((number) => (
          <li className={`${style.number} ${currentPage === number ? style.active : ''}`} key={number}>
                        <button className={style.btn} onClick={()=>paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}