import React,{Component} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import GoodsCards from '../../Components/Goods/GoodsCards/GoodsCards'
import Modal from '../../Components/UI/Modal/Modal'
import AddGoodsForm from '../../Components/Goods/AddGoodsFrom/AddGoodsForm';
import OperationForm from '../../Components/Goods/OperationForm/OperationForm'
import './StoreBuilder.css'

class StoreBuilder extends Component {

    state = {
        selectedGoods:[],
        pervParent:"root",
        addGoodsShow:false,
        operationFormShow:false,
    };

    componentDidMount(){
        this.reloadGoods()
        if(this.props.match.params.parent !== "root"){
            axios.get("http://localhost:5000/store/parent/"+this.props.match.params.parent)
            .then(res=>{
                this.setState({pervParent:res.data})
            })   
        }   
    }

    reloadGoods(){
        axios.get("http://localhost:5000/store/"+this.props.match.params.parent)
        .then(async(res)=>{
            await this.setState({selectedGoods:res.data})
        })
    }

    deleteCheckHandler(name){
        axios.get("http://localhost:5000/store/child/"+name)
        .then(res=>{
            if(res.data){
               alert("Category is not Empty !")
            }else {
                const conf = window.confirm("Do you want to delete this element")
                if(conf){
                    this.deleteHandler(name);
                }
            }
        })
    }

    deleteHandler(name){
        axios.delete("http://localhost:5000/store/"+name)
        .then((res)=>{
            alert(res.data);
            this.reloadGoods();
        })
        .catch(err=>{console.log(err)}); 
        axios.delete("http://localhost:5000/operations/item/"+name)
        .then(res=>{console.log(res.data)})    
    }
  
    addGoodsShow(){
        this.setState({addGoodsShow:true})
    }

    addGoodsClose(){
        this.setState({addGoodsShow:false})
    }

   async operationFormShow(name){
            this.setState({operationFormShow:true})
       await this.setState({currentGoods:name})
    }

    operationFormClose(){
        this.setState({operationFormShow:false})
    }


    render(){
        console.log(this.props.match.params.parent)

        const displayItems = this.state.selectedGoods.length > 0 ? 
        (   <div >
                <GoodsCards goods={this.state.selectedGoods} 
                    delete={this.deleteCheckHandler.bind(this)}
                    operationFormShow={this.operationFormShow.bind(this)}
                    reload={this.reloadGoods.bind(this)} />
            </div>
        ):null;

        return (
           <div>
               
               <div className="StoreActions">
                    <button className="btn btn-outline-warning" onClick={this.addGoodsShow.bind(this)} ><strong>Add New</strong></button>
                    {this.props.match.params.parent==="root"? null
                    :<Link to={"/store/"+this.state.pervParent}>
                        <button className="btn btn-secondary" >back</button>
                     </Link>}
               </div>
               {displayItems}
               <Modal show={this.state.addGoodsShow} modalClosed={this.addGoodsClose.bind(this)}>
                    <AddGoodsForm parent={this.props.match.params.parent} reload={this.reloadGoods.bind(this)}
                    close={this.addGoodsClose.bind(this)} />
                </Modal>
                <Modal show={this.state.operationFormShow} modalClosed={this.operationFormClose.bind(this)}>
                    <OperationForm name={this.state.currentGoods} reload={this.reloadGoods.bind(this)}
                        close={this.operationFormClose.bind(this)} />
                </Modal>
               
           </div>
        )
    }
}

export default StoreBuilder;
