import axios from 'axios';
import React,{Component} from 'react';
import './GoodsDetails.css'
import {Link} from "react-router-dom"
import ItemOperationsFilter from '../../Components/ItemOperationsFilter/ItemOperationsFilter';
import Modal from '../../Components/UI/Modal/Modal'
import OperationForm from '../../Components/Goods/OperationForm/OperationForm'

class GoodsDetails extends Component {

    state={
        name:this.props.match.params.name,
        number:0,
        operations:[],
        prevParent:null,
        type:"all",
        date:"all",
        dateFrom:new Date("2021-01-01"),
        dateTo:new Date(),
        gByDealerHandler:false,
        gByDealerTableShow:false,
        sort:-1,
        totalShow:false,
        operationsSettingShow:false,
        operationFormShow:false
    }

    componentDidMount(){
        this.getNumber();
        axios.get("http://localhost:5000/store/parent/"+this.state.name)
            .then(res=>{
                this.setState({pervParent:res.data})
        })
        axios.get("http://localhost:5000/operations/item/"+this.state.name)
        .then(res=>{
            this.setState({operations:res.data})
        })
    }

    getNumber(){
        axios.get("http://localhost:5000/store/details/"+this.state.name)
        .then(res=>{
            this.setState({number:res.data.number})
        })
    }

    getOperations(){
        const data = {
            type:this.state.type,
            date:this.state.date,
            dateFrom:this.state.dateFrom,
            dateTo:this.state.dateTo,
            sort:this.state.sort,
        };
        console.log(data)
        axios.post("http://localhost:5000/operations/item/"+this.state.name,data)
        .then(res=>{
            this.setState({operations:res.data})
            this.setState({gByDealerTableShow:false})
        })
    }

    getOperationsGByDealer(){
        const data = {
            type:this.state.type,
            date:this.state.date,
            dateFrom:this.state.dateFrom,
            dateTo:this.state.dateTo,
            sort:this.state.sort,
        };
        console.log(data)
        axios.post("http://localhost:5000/operations/groupByDealer/"+this.state.name,data)
        .then(async (res)=>{
            await this.setState({operationsGByDealer:res.data})
            this.setState({gByDealerTableShow:true})
        })
    }

    typeHandler(e){
        if(e.target.value==="all"){
            this.setState({type:"all"})
        }
        else if(e.target.value==="Add"){
            this.setState({type:"Add"})
        }
        else {
            this.setState({type:"Withdraw"})
        }
    }

    dateHandler(e){
        if(e.target.value === "all"){
            this.setState({date:"all"})
        }else {
            this.setState({date:"selected"})
        }
    }

    onDateFromChangeHandler(e){
        this.setState({date:"selected"})
        this.setState({dateFrom:e.target.value});
    }
    onDateToChangeHandler(e){
        this.setState({date:"selected"})
        this.setState({dateTo:e.target.value});
    }

    sortHandler(e){
        if(e.target.value==="Asc")
        this.setState({sort:1})
        else{
            this.setState({sort:-1})
        }
    }
   
    GByDealerHandler(e){
        this.setState({gByDealerHandler:e.target.checked})
    }

    onFilterSubmit(e){
        if(this.state.type==="all"){
            this.setState({totalShow:false})
        }else{
            this.setState({totalShow:true})
        }
        if(this.state.gByDealerHandler===true){
            this.getOperationsGByDealer();
        }
        else {
            this.getOperations();
        }
        
    }

    deleteOperationHandler(id,type,number){
        const conf = window.confirm("Do you want to delete this operation");
        if(conf){

        let typeReverse = type==="Add" ? "Withdraw" : "Add" ;
        axios.delete("http://localhost:5000/operations/"+id)
        .then(res=>{
            if(res.data==="Deleted"){
                axios.patch("http://localhost:5000/store/operation/"+this.state.name,
                {type:typeReverse,number:number})
                .then(res=>{
                    if(res.data==="Succeed"){
                        alert("deleted")
                        this.getOperations();
                        this.getNumber();
                    }else{
                        alert("Report this issue to the adminstrator")
                    }
                })
            }else{
                alert(res.data)
            }
        })

        }
        
    }


    operationsSettingShow(){
        let current = this.state.operationsSettingShow;
        this.setState({operationsSettingShow:!current})
    }

    operationFormOpen(){
        this.setState({operationFormShow:true})
    }

    operationFormClose(){
        this.setState({operationFormShow:false})
    }
    
    reloadGoods(){
        this.getNumber();
        this.getOperations();
    }

    render(){
  //      console.log(this.props.goods)
    let index = 0;
    let classType="";
    let sum =0;
        const table = this.state.gByDealerTableShow === false ? 
        <table className="table table-striped table-dark">
            <thead>
                <tr style={{background:"#161616"}}>
                    <th scope="col">#</th>
                    <th scope="col">Operation</th>
                    <th scope="col">Quantity</th> 
                    <th scope="col">Client/Exporter</th>
                    <th scope="col">Date</th>
                    <th scop="col">
                        <img src={require("../../assets/icons/icon-setting.png")} style={{height:"20px"}} alt="icon-setting"
                        onClick={this.operationsSettingShow.bind(this)} />
                    </th>
                </tr>
            </thead>
            <tbody>
            {this.state.operations.map(operation=>{
                if(operation.type==="Add"){
                    classType="AddRow"
                  }else {
                    classType="WithdrawRow"
                  }
                index++;
                sum+=operation.number;
                return(
                    <tr className={classType} key={index}>
                        <th scope="row">{index}</th>
                        <td>{operation.type}</td>
                        <td>{operation.number}</td>
                        <td>{operation.dealerName}</td>
                        <td>{operation.date.toString().substring(0,10)}</td>
                        {this.state.operationsSettingShow?
                        <td className="deleteOperationIcon">
                            <img src={require("../../assets/icons/icon-delete.png")} style={{height:"20px"}} alt="icon-setting"
                            onClick={()=>this.deleteOperationHandler(operation._id,operation.type,operation.number)} />
                        </td>
                        :<td></td>}
                    </tr>
                )  
            })}
                {this.state.totalShow ?
                <tr style={{background:"#161616"}}>
                    <td colSpan="2"><b className="text-warning">Total</b></td>
                    <td><b className="text-warning">{sum}</b></td>
                    <td colSpan="2"></td>
                </tr>:null}  
            </tbody>
        </table>:
        <table className="table table-striped table-dark">
        <thead>
            <tr style={{background:"#161616"}}>
                <th scope="col">#</th>
                <th scope="col">Client/Exporter</th>
                <th scope="col">No. of Operations</th> 
                <th scope="col">Total Quantity</th>
            </tr>
        </thead>
        <tbody>
            {this.state.operationsGByDealer.map(operation=>{
                if(operation._id.type==="Add"){
                    classType="AddRow"
                  }else {
                    classType="WithdrawRow"
                    console.log(index)
                  }
                index++;
                sum+=operation.number;
                return(
                    <tr className={classType} key={index}>
                     <th scope="row">{index}</th>
                     <td>{operation._id.dealerName}</td>
                     <td>{operation.count}</td>
                     <td>{operation.number}</td>
                    </tr>
                )  
            })} 
            {this.state.totalShow ?
            <tr style={{background:"#161616"}}>
                <td colSpan="3"><b className="text-warning">Total</b></td>
                <td><b className="text-warning">{sum}</b></td>
            </tr> :null }
        </tbody>
    </table>
;
          
    return (
        <div>
            <Modal show={this.state.operationFormShow} modalClosed={this.operationFormClose.bind(this)}>
                    <OperationForm name={this.state.name} reload={this.reloadGoods.bind(this)}
                        close={this.operationFormClose.bind(this)} />
            </Modal>
            <div className="BackBtnCont">
                <button type="button" className="btn btn-outline-warning"
                        onClick={this.operationFormOpen.bind(this)}><strong>New Operation</strong></button>   
                <Link to={"/store/"+this.state.pervParent}>
                    <button className="btn btn-secondary" >back</button>
                </Link>
            </div>
            <div className="GoodsDetailsData text-left">
                <h4>Name : <strong>{this.state.name}</strong></h4>
                <h4 className="mt-4">Quantity : <strong>{this.state.number}</strong></h4>
            </div>
            <div className="OperationsContainer">
            <h2 className="text-left text-white">Operations:</h2>
            <ItemOperationsFilter typeHandler={this.typeHandler.bind(this)}  dateHandler={this.dateHandler.bind(this)} 
                dateFromHandler={this.onDateFromChangeHandler.bind(this)} dateToHandler={this.onDateToChangeHandler.bind(this)}
                GByDealerHandler={this.GByDealerHandler.bind(this)} sortHandler={this.sortHandler.bind(this)}
                submit={this.onFilterSubmit.bind(this)} />
            {table}
            </div>
           
        </div>
        
    )
}

}

export default GoodsDetails;