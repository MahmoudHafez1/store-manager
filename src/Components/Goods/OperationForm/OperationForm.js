import axios from 'axios';
import React,{Component} from 'react';

class AddRemFrom extends Component{

    state={
        type:"Add",
        number:0,
        cost:0,
        dealer:"undefined",
        clients:[{name:"there are no Clients"}],
        exporters:[{name:"there are no Exporters"}],
        dealerType:"Exporter",
        date:new Date()
    }

    componentDidMount(){
        axios.get("http://localhost:5000/clients")
        .then(res=>{
            this.setState({clients:res.data})
        })
        axios.get("http://localhost:5000/exporters")
        .then(res=>{
            this.setState({exporters:res.data})
        })
    }

    onTypeChangeHandler(e){
        this.setState({type:e.target.value})
        if(e.target.value==="Add"){
            this.setState({dealerType:"Exporter"})
        }else{
            this.setState({dealerType:"Client"})
        }
    }

    onNumberChangeHandler(e){
        this.setState({number:e.target.value})
    }

    onDealerChangeHandler(e){
        this.setState({dealer:e.target.value})
    }

    onDateChangeHandler(e){
        this.setState({date:e.target.value})
    }

    onCostChangeHandler(e){
        this.setState({cost:e.target.value})
    }


    onSubmit(e){
        e.preventDefault();
        if(document.getElementById("selectDealer").value==="undefined"){
            alert("please choose Client/Exporter")
        }else{

            const goodsOperation = {
                number:Number(this.state.number),
                type:this.state.type,
            }
            const newOperation ={
                itemName:this.props.name,
                dealerName:this.state.dealer,
                type:this.state.type,
                number:Number(this.state.number),
                date:this.state.date,
            }
            if(this.state.type==="Withdraw"){
                newOperation.cost=this.state.cost;
                if(this.state.cost>0){
                    newOperation.paid=false;
                }else{
                    newOperation.paid=true;
                }
            }
           // console.log(newOperation)
    
            axios.post("http://localhost:5000/operations",newOperation)
            .then((res)=>{
                if(res.data==='Successful Operation'){
                    axios.patch("http://localhost:5000/store/operation/"+this.props.name,goodsOperation)
                    .then((res)=>{
                        if(res.data==="Succeed"){
                            alert('Successful Operation')
                            this.props.reload();
                            this.props.close();
                        }else{
                            alert("Report this issue to the adminstrator")
                        }
                    
                    }).catch((err)=>alert(err.data))
                }else{
                    alert(res.data)
                }
            })
            .catch(err=>console.log(err))
    
            
        }
                
    }
    

    render(){

        const names = this.state.dealerType === "Client" ?
         this.state.clients.map(client=>(
            <option value={client.name} key={client.name}>{client.name}</option>
         ))
        :this.state.exporters.map(exporter=>(
            <option value={exporter.name} key={exporter.name}>{exporter.name}</option>
         ))
        
        return(
            <form onSubmit={this.onSubmit.bind(this)} >
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" >Type</label>
                    </div>
                    <select className="custom-select" onChange={this.onTypeChangeHandler.bind(this)} >
                        <option value="Add">Add</option>
                        <option value="Withdraw">Withdraw</option>
                    </select>
                </div>
                <div className="form-group text-left">
                    <label>Quantity</label>
                    <input type="number" className="form-control text-left" required
                    placeholder="Enter quantity" onChange={this.onNumberChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>{this.state.dealerType}</label>
                    <select className="form-control" required id="selectDealer"
                    onChange={this.onDealerChangeHandler.bind(this)}>
                        <option value="undefined" defaultValue >Choose...</option>
                        {names}
                    </select>
                </div>
                <div className="form-group text-left">
                    <label>Date</label>
                    <input type="date" className="form-control text-left"  
                    placeholder="Enter date" onChange={this.onDateChangeHandler.bind(this)} />
                </div>
                {this.state.type==="Withdraw"?
                <div className="form-group text-left">
                <label>Cost</label>
                <input type="number" className="form-control text-left" required
                placeholder="Enter cost" onChange={this.onCostChangeHandler.bind(this)} />
                </div>
                :null}
                <div className="text-left">
                    <button type="submit" className="btn btn-primary">Done</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={this.props.close}>Cancel</button>
                </div>
            </form>
        )
    }
    
}

export default AddRemFrom;