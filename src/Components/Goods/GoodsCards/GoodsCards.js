import React from 'react'
import GoodsCard from '../GoodsCard/GoodsCard'
import './GoodsCards.css'


const GoodsCards =(props)=>{
    return (
        
            <div className="CardsContainer">
                {props.goods.map(goods=>(
                    <GoodsCard name={goods.name} number={goods.number} key={goods.name}
                    delete={props.delete} clicked={props.clicked} parent={goods.parent}
                    operationFormShow={props.operationFormShow} type={goods.type}
                    image={goods.image} reload={props.reload}/>
                ))}
            </div>
            
    )
}

export default GoodsCards;