import React from "react";

//Este componente renderiza los numeritos en si
export default function Pagination({gamesPerPage, allVideogames, paginated}){
    const pageNumber=[]

    for(let i=1;i<=Math.ceil(allVideogames/gamesPerPage);i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className='pagination'>
                {pageNumber?.map(number=>(
                    <li className='number' key={number}>
                        <button onClick={()=>paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}