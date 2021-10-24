import React,{Component} from 'react'
import axios from 'axios'
import ExporterBox from '../../Components/Exporters/ExportersBox/ExportersBox'
import Modal from '../../Components/UI/Modal/Modal'
import AddExporterForm from '../../Components/Exporters/AddExporterForm/AddExporterForm'
import './ExportersBuilder.css'

class ExporterBuilder extends Component {
    state={
        addExporterShow:false,
        exporters:[]
    }

    reloadExporters(){
        axios.get("http://localhost:5000/exporters")
        .then(res=>{
            this.setState({exporters:res.data})
        })
    }

    componentDidMount(){
        this.reloadExporters()
    }

    deleteHandler(name){
        axios.delete("http://localhost:5000/exporters/"+name)
        .then((res)=>{
            alert(res.data);
            this.reloadExporters();
        })
        .catch(err=>{console.log(err)}); 
        axios.delete("http://localhost:5000/operations/exporter/"+name)
        .then(res=>{console.log(res.data)})    
    }

    addExporterShow(){
        this.setState({addExporterShow:true})
    }

    addExporterClose(){
        this.setState({addExporterShow:false})
    }

    render(){

        const displayExporters = this.state.exporters.length > 0 ?
        <div>
            <ExporterBox exporters={this.state.exporters} delete={this.deleteHandler.bind(this)}
             reload={this.reloadExporters.bind(this)} />
        </div>
        :null

        return(
            <div className="ExportersBuilder">
                <div className="BackBtnCont2">
                    <button className="btn btn-outline-warning mb-1"
                    onClick={this.addExporterShow.bind(this)} ><strong>Add New</strong></button>
                </div>
                {displayExporters}
                <Modal show={this.state.addExporterShow} modalClosed={this.addExporterClose.bind(this)}>
                    <AddExporterForm reload={this.reloadExporters.bind(this)}
                    close={this.addExporterClose.bind(this)} />
                </Modal>
            </div>
            
        )
    }
}

export default ExporterBuilder