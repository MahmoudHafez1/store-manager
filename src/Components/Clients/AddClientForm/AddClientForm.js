import axios from 'axios';
import React,{Component} from 'react';

class AddClientForm extends Component{

    state={
        name:"",
        phone:0,
        address:""
    }

    onNameChangeHandler(e){
        this.setState({name:e.target.value})
    }

    onPhoneChangeHandler(e){
        this.setState({phone:e.target.value})
    }

    onAddressChangeHandler(e){
        this.setState({address:e.target.value})
    }


    onSubmit(e){
        e.preventDefault();
        const client = {
            name:this.state.name,
            phone:Number(this.state.phone),
            address:this.state.address
        }

        axios.post("http://localhost:5000/clients",client)
        .then((res)=>{
            alert(res.data);
            this.props.reload();
            this.props.close()
        })
        .catch((err)=>alert(err.data))
        
    }
    

    render(){
        
        return(
            <form  onSubmit={this.onSubmit.bind(this)} >
                <div className="form-group text-left">
                    <label>Name</label>
                    <input type="text" className="form-control text-left" name="name" id="inputName"
                     placeholder="ُEnter name" required onChange={this.onNameChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>Phone</label>
                    <input type="text" className="form-control text-left" name="phone" id="inputNumber" 
                    placeholder="Enter number" onChange={this.onPhoneChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>Address</label>
                    <input type="text" className="form-control text-left" name="phone" id="inputAddress" 
                    placeholder="Enter address" onChange={this.onAddressChangeHandler.bind(this)} />
                </div>
                <div className="text-left">
                    <button type="submit" className="btn btn-primary ">Add</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={this.props.close}>cancel</button>
                </div>
            </form>
        )
    }
    
}

export default AddClientForm;