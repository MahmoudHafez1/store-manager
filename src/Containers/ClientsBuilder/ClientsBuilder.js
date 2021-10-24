import React,{Component} from 'react'
import axios from 'axios'
import ClientBox from '../../Components/Clients/ClientsBox/ClientsBox'
import Modal from '../../Components/UI/Modal/Modal'
import AddClientForm from '../../Components/Clients/AddClientForm/AddClientForm'
import './ClientsBuilder.css'

class ClientBuilder extends Component {
    state={
        addClientShow:false,
        clients:[]
    }

    reloadClients(){
        axios.get("http://localhost:5000/clients")
        .then(res=>{
            this.setState({clients:res.data})
        })
    }

    componentDidMount(){
        this.reloadClients()
    }

    deleteHandler(name){
        axios.delete("http://localhost:5000/clients/"+name)
        .then((res)=>{
            alert(res.data);
            this.reloadClients();
        })
        .catch(err=>{console.log(err)}); 
        axios.delete("http://localhost:5000/operations/client/"+name)
        .then(res=>{console.log(res.data)})    
    }

    addClientShow(){
        this.setState({addClientShow:true})
    }

    addClientClose(){
        this.setState({addClientShow:false})
    }

    render(){

        const displayClients = this.state.clients.length > 0 ?
        <div>
            <ClientBox clients={this.state.clients} delete={this.deleteHandler.bind(this)}
             reload={this.reloadClients.bind(this)} />
        </div>
        :null

        return(
            <div className="ClientsBuilder">
                <div className="BackBtnCont2">
                <button className="btn btn-outline-warning mb-1"
                 onClick={this.addClientShow.bind(this)} ><strong>Add New</strong></button>
                </div>
                
                {displayClients}
                <Modal show={this.state.addClientShow} modalClosed={this.addClientClose.bind(this)}>
                    <AddClientForm reload={this.reloadClients.bind(this)}
                    close={this.addClientClose.bind(this)} />
                </Modal>
            </div>
            
        )
    }
}

export default ClientBuilder