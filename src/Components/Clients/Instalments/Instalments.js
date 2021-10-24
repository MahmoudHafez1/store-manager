import React,{Component} from 'react'
import axios from 'axios'
import './Instalments.css'
import InstalmentCard from '../InstalmentCard/InstalmentCard';
import Modal from '../../UI/Modal/Modal'
import AddInstalmentForm from '../addInstalmentFrom/addInstalmentForm'

class Instalments extends Component {

    state = {
        operations:[],
        addInstalmentShow:false,
        totalCredit:0,
        allInstalment:false,
        currentId:"",
        currentRemainder:0
    }

    componentDidMount(){
        this.getOperations();
    }

    getOperations(){ 
        this.setState({totalCredit:0})
        const data = {
            allInstalment:this.state.allInstalment
        };
        console.log(data)
        axios.post("http://localhost:5000/operations/dealerCredit/"+this.props.name,data)
        .then(async(res)=>{   
            console.log(res.data)
           const operations = [
            ...res.data
           ]    
           operations.forEach(operation=>{
                let currentCredit = this.state.totalCredit;
                let sum = 0;
                operation.instalments.forEach(instalment=>sum+=Number(instalment.cost));
                operation.paid=sum;
                operation.remainder=operation.cost-sum;
                currentCredit+=operation.cost-sum;
                this.setState({totalCredit:currentCredit})
                
           })
           await this.setState({operations:operations}) 
        })
    }

    addInstalmentOpen(id,remainder){
        this.setState({currentId:id})
        this.setState({addInstalmentShow:true})
        this.setState({currentRemainder:remainder})
    }

    addInstalmentClose(){
        this.setState({addInstalmentShow:false})
    }

    async instalmentFilterHandler(e){
        if(e.target.value==="all")
            await this.setState({allInstalment:true})
        else await this.setState({allInstalment:false})
        this.getOperations();
    }


    render(){
        return(
            <div className="Instalments">
                <div className="InstalmentHeader">
                    <div className="text-left">
                        <h2 className="text-left text-white">Credit & Instalments:</h2>
                        
                        <div className="form-check form-check-inline mt-2">
                            <input className="form-check-input" type="radio" name="InstalmentFilter"
                            value="hide" defaultChecked onChange={this.instalmentFilterHandler.bind(this)}  />
                            <label className="form-check-label text-white mr-2" >Hide Done</label>
                            <input className="form-check-input" type="radio" name="InstalmentFilter" 
                            value="all" onChange={this.instalmentFilterHandler.bind(this)}   />
                            <label className="form-check-label text-white mr-2" >Show all</label>
                        </div>
                    </div>
                    <div className="CreditCard">
                        <div className="CreditCardHeader">
                            <h4>Credit</h4>
                        </div>
                        <div className="CreditCardBody">
                            <h3>{this.state.totalCredit}</h3>
                        </div>
                    </div>
                </div>
                {this.state.operations.length >0 ?
                <table className=" table table-striped table-dark ">
                    <thead>
                    <tr style={{background:"#161616"}}>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th> 
                        <th scope="col">Date</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Paid</th>
                        <th scope="col">Remainder</th>
                        <th scope="col" colSpan="2"></th>
                    </tr>
                    </thead>
                        {this.state.operations.map(operation=>{
                            return(
                            <InstalmentCard key={operation._id} id={operation._id} itemName={operation.itemName} quantity={operation.number}
                            date={operation.date.toString().substring(0,10)} cost={operation.cost}
                            paid={operation.paid} remainder={operation.remainder} instalments={operation.instalments}
                            addInstalment={this.addInstalmentOpen.bind(this)} />
                            )
                        })}
                    </table> 
                    :null}

                    {this.state.addInstalmentShow ? 
                    <Modal show={this.state.addInstalmentShow} modalClosed={this.addInstalmentClose.bind(this)}>
                        <AddInstalmentForm id={this.state.currentId} close={this.addInstalmentClose.bind(this)}
                        reload={this.getOperations.bind(this)} remainder={this.state.currentRemainder} />
                    </Modal>:null}
            </div>
            
        )
    }
}

export default Instalments;