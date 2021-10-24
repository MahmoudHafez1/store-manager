import React from 'react'
import './EditClientTools.css'

const editClientTools =(props)=>{
    return(
        <div className="EditClientTools">
            <img src={require("../../../assets/icons/icon-edit.png")}
             className="EditClientTool" alt="edit-icon" onClick={props.edit} />
            <img src={require("../../../assets/icons/icon-delete.png")}
            className="EditClientTool" alt="delete-icon" onClick={props.delete}/>
        </div>
    )
}

export default editClientTools;