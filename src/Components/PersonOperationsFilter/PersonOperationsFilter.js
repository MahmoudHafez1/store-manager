import React from 'react'
import './PersonOperationsFilter.css'

const PersonOperationsFilter = (props)=>{
    const itemOptions = props.itemSet ? [...props.itemSet].map(itemName=>(
        <option value={itemName} key={itemName}>{itemName}</option>
    )):null;
    const dateInputShow = (e)=>{
        if(e.target.value==="all"){
            document.getElementById("ClientDateInput").style.visibility="hidden"
        }else {
            document.getElementById("ClientDateInput").style.visibility="visible"
        }
    }
    const itemInputShow = (e)=>{
        if(e.target.value==="all"){
            document.getElementById("ClientItemInput").style.visibility="hidden"
        }else {
            document.getElementById("ClientItemInput").style.visibility="visible"
        }
    }
    return (
        <div className="Filterbar">
            
            <div className="FilterItem">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="ClientItemsOptions" 
                      value="all" defaultChecked onClick={(e)=>{props.itemFilterHandler(e);itemInputShow(e)}} />
                    <label className="form-check-label text-white mr-2" >all items</label>
                    <input className="form-check-input" type="radio" name="ClientItemsOptions"
                     value="selected" onClick={(e)=>{props.itemFilterHandler(e);itemInputShow(e)}} />
                    <label className="form-check-label text-white" >select item</label>
                </div>
                <div id="ClientItemInput" style={{visibility:"hidden"}}>
                    <select className="form-control" id="ClientItemSelect" 
                    onChange={props.itemChangeHandler}>
                        <option value="undefined" defaultValue >Choose...</option>
                        {itemOptions}
                    </select>
                    
                </div>
            </div>
            <div className="FilterItem">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="ClientDateOptions" 
                      value="all" defaultChecked onClick={(e)=>{props.dateHandler(e);dateInputShow(e)}} />
                    <label className="form-check-label text-white mr-2" >all time</label>
                    <input className="form-check-input" type="radio" name="ClientDateOptions"
                     value="selected" onClick={(e)=>{props.dateHandler(e);dateInputShow(e)}} />
                    <label className="form-check-label text-white" >select date</label>
                </div>
                <div id="ClientDateInput" style={{visibility:"hidden",alignItems:"flex-end"}}>
                    <div className="form-group text-left mr-2" >
                        <label className="DateLabel text-white">from
                        <input type="date" className="form-control" onChange={props.dateFromHandler} />
                        </label>
                        
                    </div>
                    <div className="form-group text-left">
                        <label className="DateLabel text-white">to
                        <input type="date" className="form-control" onChange={props.dateToHandler} />
                        </label>
                        
                    </div>
                    
                </div>
            </div>
            <div className="FilterItem">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <label className="input-group-text" >sort date</label>
                    </div>
                    <select className="custom-select" onChange={props.sortHandler} >
                        <option value="Des">Des</option>
                        <option value="Asc">Asc</option>
                    </select>
                </div>
            </div>
            <div className="FilterItem">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" onChange={props.GByItemsHandler} />
                    <label className="form-check-label text-white" >Group items</label>
                </div>
            </div>
            <button type="button" className="btn btn-outline-light" onClick={props.submit}>
                Apply Filter
            </button>

        </div>
    )
}

export default PersonOperationsFilter;