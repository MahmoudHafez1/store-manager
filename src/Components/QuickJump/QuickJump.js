import React,{Component} from 'react'
import axios from 'axios'

class QuickJump extends Component {

    state={
        items:[],
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        axios.get("http://localhost:5000/store/items")
        .then(res=>{
            this.setState({items:res.data})
        })
        .catch(err=>console.log(err))
    }
 
    onSubmit(e){
        e.preventDefault();
        const selectedItem = document.getElementById("quick-jump").value
        if(selectedItem==="quickJump"){
            alert("please select item to jump")
        }else{
            window.location.href = "http://localhost:3000/store/"+selectedItem+"/details"
        }
        
    }
    
    onJumpChange(e){
        this.setState({selectedItem:e.target.value})
    }

    render(){

        const items = this.state.items.length > 0 ? 
        this.state.items.map(item=>(
            <option value={item.name} key={item.name}>{item.name}</option>
        ))
        :null

        return(
            <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
                <select className="custom-select mr-2" id="quick-jump" onChange={this.onJumpChange.bind(this)} >
                    <option hidden value="quickJump">quick jump</option>
                    <optgroup label="items">
                        {items}
                    </optgroup>
                </select>
                <button type="submit" className="btn btn-outline-info">Go</button>
            </form>
            
        )
    }

 }

export default QuickJump;