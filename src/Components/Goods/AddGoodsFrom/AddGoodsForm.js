import axios from 'axios';
import React,{Component} from 'react';

class GoodsFrom extends Component{

    state={
        name:"",
        number:0,
        type:"category",
        image:null,
    }

    onNameChangeHandler(e){
        this.setState({name:e.target.value})
    }

    onNumberChangeHandler(e){
        this.setState({number:e.target.value})
    }

    onTypeChangeHandler(e){
        if(e.target.value==="category"){
            this.setState({number:0})
        }
        this.setState({type:e.target.value})
    }

    onFileChangeHandler(e){
        const path = e.target.value;
        const start = path.lastIndexOf("\\")+1;
        const imageName = path.substring(start);
        this.setState({image:imageName})
    }

    onSubmit(e){
        e.preventDefault();
        const goods = {
            name:this.state.name,
            number:Number(this.state.number),
            type:this.state.type,
            parent:this.props.parent,
            image:this.state.image
        }

        axios.post("http://localhost:5000/store/"+this.props.parent,goods)
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
                <div className="text-left form-group">
                    <label >Choose Image</label>
                    <input type="file" required className="form-control-file" onChange={this.onFileChangeHandler.bind(this)} />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" >Type</label>
                    </div>
                    <select className="custom-select" onChange={this.onTypeChangeHandler.bind(this)} id="inputGroupSelect01">
                        <option value="category" defaultValue >Category</option>
                        <option value="item">Item</option>
                    </select>
                </div>
                <div className="form-group text-left">
                    <label>Name</label>
                    <input type="text" className="form-control text-left" name="name" id="inputName"
                     placeholder="ُEnter name" required onChange={this.onNameChangeHandler.bind(this)} />
                </div>
                {this.state.type==="item"?
                    <div className="form-group text-left">
                        <label>Number</label>
                        <input type="number" className="form-control text-left" name="number" id="inputNumber" 
                        placeholder="Enter number" onChange={this.onNumberChangeHandler.bind(this)} />
                    </div>:null}
                <div className="text-left">
                    <button type="submit" className="btn btn-primary ">Add</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={this.props.close}>cancel</button>
                </div>
            </form>
        )
    }
    
}

export default GoodsFrom;