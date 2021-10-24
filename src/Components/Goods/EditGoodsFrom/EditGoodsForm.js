import React,{Component} from 'react'
import axios from 'axios'

class EditFrom extends Component {

    state={
        newName:this.props.name,
        newImage:this.props.image
    }

    onNameChangeHandler(e){
        this.setState({newName:e.target.value})
    }

    onFileChangeHandler(e){
        const path = e.target.value;
        const start = path.lastIndexOf("\\")+1;
        const imageName = path.substring(start);
        this.setState({newImage:imageName})
    }

    onSubmitHandler(e){
        e.preventDefault();
        const updatedData = {
            newName:this.state.newName,
            newImage:this.state.newImage
        }
        axios.patch("http://localhost:5000/store/edit/"+this.props.name,updatedData)
        .then(res=>{
            alert(res.data)
            this.props.reload()
            this.props.close()
            if(res.data==="Updated Successfully"){
                if(this.props.type==="category"){
                    axios.patch("http://localhost:5000/store/editParents/"+this.props.name,updatedData)
                    .then(res=>{console.log(res)})
                }else {
                    axios.patch("http://localhost:5000/operations/item/"+this.props.name,updatedData)
                    .then(res=>console.log(res.data))
                }
            }   
        })
        .catch(err=>console.log(err))
    }

    

    render(){
        return(
            <form  onSubmit={this.onSubmitHandler.bind(this)}>
                <div className="form-group text-left">
                    <input type="text" className="form-control text-left" name="name" id="inputName"
                     placeholder="ُEnter name" required defaultValue={this.props.name} onChange={this.onNameChangeHandler.bind(this)} />
                </div>
                <div className="text-left form-group">
                    <input type="file"  className="form-control-file" onChange={this.onFileChangeHandler.bind(this)} />
                </div>
                <div className="text-left">
                    <button type="submit" className="btn btn-primary ">update</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={this.props.close}>cancel</button>
                </div>

            </form>
            
        )
    }
    
} 

export default EditFrom;