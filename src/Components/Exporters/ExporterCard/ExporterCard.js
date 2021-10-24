import React from 'react'
import {Link} from 'react-router-dom'
import './ExporterCard.css'


const exporterCard = (props)=>{

    return(
        <Link to={"/exporters/"+props.name}>
            <div className="ExporterCard">
                <p className="ExporterCardName">{props.name}</p>
                <img src={require("../../../assets/icons/icon-arrow.png")}
                className="ExporterCardArrow" alt="arrow" />
            </div>
        </Link>
        
        
    )
}

export default exporterCard;