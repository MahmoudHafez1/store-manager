import React,{Component} from 'react'
import axios from 'axios'

class EditClientFrom extends Component {

    state={
        newName:this.props.name,
        newPhone:this.props.phone,
        newAddress:this.props.address
    }

    onNameChangeHandler(e){
        this.setState({newName:e.target.value})
    }

    onPhoneChangeHandler(e){
        this.setState({newPhone:e.target.value})
    }

    onAddressChangeHandler(e){
        this.setState({newAddress:e.target.value})
    }

    onSubmitHandler(e){
        e.preventDefault();
        const updatedData = {
            newName:this.state.newName,
            newPhone:this.state.newPhone,
            newAddress:this.state.newAddress
        }
        axios.patch("http://localhost:5000/clients/edit/"+this.props.name,updatedData)
        .then(res=>{
            alert(res.data)
            if(res.data==="Updated Successfully"){
                axios.patch("http://localhost:5000/operations/client/"+this.props.name,updatedData)
                .then(res=>{
                console.log(res.data)
                window.location.href="http://localhost:3000/clients/"+this.state.newName
                })
            }
        })
        .catch(err=>console.log(err))      
    }

    render(){
        return(
            <form  onSubmit={this.onSubmitHandler.bind(this)}>
                <div className="form-group text-left">
                    <label>Name</label>
                    <input type="text" className="form-control text-left" 
                     placeholder="ُEnter name" required defaultValue={this.props.name} onChange={this.onNameChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>Phone</label>
                    <input type="text" className="form-control text-left" 
                     placeholder="ُEnter phone" defaultValue={this.props.phone} onChange={this.onPhoneChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>Address</label>
                    <input type="text" className="form-control text-left" 
                     placeholder="ُEnter address" defaultValue={this.props.address} onChange={this.onAddressChangeHandler.bind(this)} />
                </div>
                <div className="text-left">
                    <button type="submit" className="btn btn-primary ">update</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={this.props.close}>cancel</button>
                </div>

            </form>
            
        )
    }
    
} 

export default EditClientFrom;