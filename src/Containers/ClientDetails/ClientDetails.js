import React,{Component} from 'react'
import './ClientDetails.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from '../../Components/UI/Modal/Modal'
import EditClientForm from '../../Components/Clients/EditClientForm/EditClientForm'
import PersonOperationsFilter from '../../Components/PersonOperationsFilter/PersonOperationsFilter'
import Instalments from '../../Components/Clients/Instalments/Instalments'

class ClientDetails extends Component {
    state={
        name:this.props.match.params.name,
        operations:[],
        editClientShow:false,
        date:"all",
        itemName:"all",
        dateFrom:new Date("2021-01-01"),
        dateTo:new Date(),
        gByItemsHandler:false,
        gByItemsTableShow:false,
        sort:-1,
    }

    componentDidMount(){
        console.log(this.props.match.params.name)
        axios.get("http://localhost:5000/clients/"+this.state.name)
        .then(res=>{
            this.setState({phone:res.data.phone,address:res.data.address})
        })
        const data = {
            itemName:this.state.itemName,
            date:this.state.date,
            sort:this.state.sort,
            type:"Withdraw"
        };
        axios.post("http://localhost:5000/operations/dealer/"+this.state.name,data)
        .then(res=>{
            let itemSet = new Set();
            this.setState({operations:res.data})
            this.setState({gByItemsTableShow:false})
            res.data.forEach(operation=>{
                itemSet.add(operation.itemName);
            })
            console.log(itemSet)
            this.setState({itemSet:itemSet})
        })
    }

    getOperations(){
        const data = {
            itemName:this.state.itemName,
            date:this.state.date,
            dateFrom:this.state.dateFrom,
            dateTo:this.state.dateTo,
            sort:this.state.sort,
            type:"Withdraw"
        };
        console.log(data)
        axios.post("http://localhost:5000/operations/dealer/"+this.state.name,data)
        .then(res=>{
            this.setState({operations:res.data})
            this.setState({gByItemsTableShow:false})
        })
    }

    getOperationsGByItems(){
        const data = {
            itemName:this.state.itemName,
            date:this.state.date,
            dateFrom:this.state.dateFrom,
            dateTo:this.state.dateTo,
            sort:this.state.sort,
            type:"Withdraw"
        };
        console.log(data)
        axios.post("http://localhost:5000/operations/groupByItems/"+this.state.name,data)
        .then(async (res)=>{
            await this.setState({operationsGByItems:res.data})
            this.setState({gByItemsTableShow:true})
        })
    }

    deleteHandler(){
        const conf = window.confirm("Do you want to delete this Client")
        if(conf){
            axios.delete("http://localhost:5000/clients/"+this.state.name)
            .then(res=>{
            alert(res.data)
            
        })
            axios.delete("http://localhost:5000/operations/client/"+this.state.name)
            .then(res=>{
                console.log(res.data);
                window.location.href = "http://localhost:3000/clients"
            })
            
        }
    }

    editClientShow(){
        this.setState({editClientShow:true})
    }

    editClientClose(){
        this.setState({editClientShow:false})
    }


    onDateFromChangeHandler(e){
        this.setState({date:"selected"})
        this.setState({dateFrom:e.target.value});
    }
    onDateToChangeHandler(e){
        this.setState({date:"selected"})
        this.setState({dateTo:e.target.value});
    }
    onFilterSubmit(e){
        if(this.state.gByItemsHandler===true){
            this.getOperationsGByItems();
        }
        else {
            this.getOperations();
        }
        
    }

    dateHandler(e){
        if(e.target.value === "all"){
            this.setState({date:"all"})
        }else {
            this.setState({date:"selected"})
        }
    }

    itemFilterHandler(e){
        if(e.target.value === "all"){
            this.setState({itemName:"all"})
        }else {
            this.setState({itemName:document.getElementById("ClientItemSelect").value})
        }
    }

    itemChangeHandler(e){
        this.setState({itemName:e.target.value})
    }

    GByItemsHandler(e){
        this.setState({gByItemsHandler:e.target.checked})
    }

    sortHandler(e){
        if(e.target.value==="Asc")
        this.setState({sort:1})
        else{
            this.setState({sort:-1})
        }
    }
    

    render(){
        let index = 0;
        let sum = 0;
        const table = this.state.gByItemsTableShow === false ? 
            <table className="table table-striped table-dark">
                <thead>
                    <tr style={{background:"#161616"}}>
                        <th scope="col">#</th>
                        <th scope="col">Item</th> 
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.operations.map(operation=>{
                        index++;
                        sum+=operation.number;
                        return(
                            <tr className="WithdrawRow" key={index}>
                             <th scope="row">{index}</th>
                             <td>{operation.itemName}</td>
                             <td>{operation.number}</td>
                             <td>{operation.date.toString().substring(0,10)}</td>
                            </tr>
                        )  
                    })}
                     <tr style={{background:"#161616"}}>
                        <td colSpan="2"><b className="text-warning">Total</b></td>
                        <td><b className="text-warning">{sum}</b></td>
                        <td colSpan="1"></td>
                    </tr>  
                </tbody>
            </table>
        :
        <table className="table table-striped table-dark">
            <thead>
                <tr style={{background:"#161616"}}>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">No. of Operations</th> 
                    <th scope="col">Total Quantity</th>
                </tr>
            </thead>
            <tbody>
                {this.state.operationsGByItems.map(operation=>{
                    index++;
                    sum+=operation.number;
                    return(
                        <tr className="WithdrawRow" key={index}>
                         <th scope="row">{index}</th>
                         <td>{operation._id.itemName}</td>
                         <td>{operation.count}</td>
                         <td>{operation.number}</td>
                        </tr>
                    )  
                })} 
                <tr style={{background:"#161616"}}>
                    <td colSpan="3"><b className="text-warning">Total</b></td>
                    <td><b className="text-warning">{sum}</b></td>
                </tr> 
            </tbody>
        </table>

        ;
  //      console.log(this.props.goods)

    return (
        <div>
            {this.state.editClientShow?
            <Modal show={this.state.editClientShow} modalClosed={this.editClientClose.bind(this)}>
                <EditClientForm name={this.state.name} phone={this.state.phone}
                address={this.state.address} close={this.editClientClose.bind(this)} />
            </Modal>:null}
            
            <div className="Options">
                <div className="OptionsBar">
                    <img src ={require("../../assets/icons/icon-edit.png")}
                     onClick={this.editClientShow.bind(this)} alt="edit-icon" className="ClientDetailsOption" />
                    <img src ={require("../../assets/icons/icon-delete.png")}
                    onClick={this.deleteHandler.bind(this)} alt="delete-icon" className="ClientDetailsOption" />
                </div>
                <Link to="/clients">
                    <button className="btn btn-secondary BackButton" >back</button>
                </Link>
            </div>
            <div className="ClientDetailsData text-left">
                 <h4>Name : <strong>{this.state.name}</strong></h4>
                <h4 >Phone : <strong>{this.state.phone}</strong></h4>
                <h4 >Address : <strong>{this.state.address}</strong></h4>
            </div>
            <Instalments name={this.state.name} />
            <div className="ClientOperationsContainer">
            <h2 className="text-left text-white">Operations:</h2>

            <PersonOperationsFilter dateFromHandler={this.onDateFromChangeHandler.bind(this)}
               dateToHandler={this.onDateToChangeHandler.bind(this)} submit={this.onFilterSubmit.bind(this)} 
               dateHandler={this.dateHandler.bind(this)} itemFilterHandler={this.itemFilterHandler.bind(this)} 
               itemSet={this.state.itemSet} itemChangeHandler={this.itemChangeHandler.bind(this)}
               GByItemsHandler={this.GByItemsHandler.bind(this)} sortHandler={this.sortHandler.bind(this)}  />

            {table}
            </div>
        </div>
        
    )
}
}

export default ClientDetails;