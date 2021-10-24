import React from 'react'
import {Link} from 'react-router-dom'
import './ClientCard.css'


const clientCard = (props)=>{

    return(
        <Link to={"/clients/"+props.name}>
            <div className="ClientCard">
                <p className="ClientCardName">{props.name}</p>
                <img src={require("../../../assets/icons/icon-arrow.png")}
                className="ClientCardArrow" alt="arrow" />
            </div>
        </Link>
        
        
    )
}

export default clientCard;