import React,{Component} from 'react';
import './InstalmentCard.css'

class InstalmentCard extends Component{
    state = {
        detailShow:false
    }

    detailShowHandler(){
        const currentState = this.state.detailShow;
        this.setState({detailShow:!currentState})
    }

    render(){  
        let index=0;
        const rowColor = this.props.remainder <= 0 ? "linear-gradient(315deg, #63d471 0%, #233329 74%)":"linear-gradient(45deg, #3f0d12 0%, #a71d31 74%)";
        return (
            <tbody>
                <tr style={{backgroundImage:rowColor}}>
                    <td>{this.props.itemName}</td>
                    <td>{this.props.quantity}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.cost}</td>
                    <td>{this.props.paid}</td>
                    <td>{this.props.remainder}</td>
                    {this.props.remainder <=0 ? 
                    <td> 
                        <img src ={require("../../../assets/icons/icon-done.png")}
                        alt="done-icon" className="DoneIcon" />
                    </td>
                    :
                    <td> 
                        <img src ={require("../../../assets/icons/icon-add.png")}
                        onClick={()=>this.props.addInstalment(this.props.id,this.props.remainder)} alt="add-icon" className="InstalmentIcon" />
                    </td>
                    }
                    <td> 
                        <img src ={require("../../../assets/icons/icon-show.png")}
                        onClick={this.detailShowHandler.bind(this)} alt="show-icon" className="InstalmentIcon" />
                    </td>
                </tr>
                {this.state.detailShow ? this.props.instalments.map(inst=>{
                    index++;
                    return(
                        <tr key={index} style={{background:"#161616"}}>
                            <td>{index}</td>
                            <td colSpan="1">Value   :</td>
                            <td>{inst.cost}</td>
                            <td colSpan="2">Date    :</td>
                            <td>{inst.date.toString().substring(0,10)}</td>
                            <td colSpan="2"></td>
                        </tr>
                    )
                }):null}
            </tbody>
        )

    }

    
}

export default InstalmentCard;