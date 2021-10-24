import React from 'react'
import { Link } from 'react-router-dom';
import './GoodsCard.css'
import EditTools from '../EditTools/EditTools'

const GoodsCard =(props)=>{
    return(
        <div>
            
        {props.type==="category" ?
            
            <div className="CategoryCard" >
            <div className={"SettingBtn"}>
                <EditTools image={props.image} name={props.name} type={props.type} delete={props.delete} reload={props.reload}  />
            </div>
            <Link to={"/store/"+props.name}><img className="CategoryCardImage" alt="categoryImg" src={require('../../../Images/'+'containers.jpg')} />
                <p className="CategoryCardText">{props.name}</p></Link> 
            </div>
            :<div className="ItemCard">
                <div className={"SettingBtn"}>
                    <EditTools image={props.image} name={props.name} type={props.type} delete={props.delete} reload={props.reload}  />
                </div>
                <img className="ItemCardImage" alt="ItemCardImage" src={require('../../../Images/'+'containers.jpg')} />
                <div className="ItemCardNumberBox">
                    <p className="ItemCardNumber">{props.number}</p>
                </div>
                <div className="ItemCardTitle">
                <p className="ItemCardText">{props.name}</p>
                </div>
                
                <div className="ItemCardActionBar">
                    <Link to={"/store/"+props.name+"/details"}>
                        <button className="btn btn-info mr-3">Details</button>
                    </Link>
                    <button className="btn btn-light" onClick={()=>props.operationFormShow(props.name)}>Operation</button>
                </div>
            </div>}
        </div>
        
         
    )
}

export default GoodsCard;