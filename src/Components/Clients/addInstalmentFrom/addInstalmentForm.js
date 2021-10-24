import React,{Component} from 'react'
import axios from 'axios'

class addInstalmentForm extends Component {
    state = {
        cost:0,
        date:new Date()
    }

    onCostChangeHandler(e){
        this.setState({cost:e.target.value})
    }

    onDateChangeHandler(e){
        this.setState({date:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const body = {
            newInstalment : {
                cost:this.state.cost,
                date:this.state.date,
            },
            paid:false
        }
        if(this.props.remainder - this.state.cost <=0 ){
            body.paid=true;
        }
        console.log(body.paid)
        axios.post('http://localhost:5000/operations/instalment/'+this.props.id,body)
        .then(res=>{
            alert(res.data)
            if(res.data==='instalment added successfully'){
                this.props.reload();
                this.props.close();
            }
        })

    }

    render(){
        console.log(this.props.remainder)
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
            <div className="text-left">
                <div className="form-group text-left">
                    <label>Value</label>
                    <input type="number" className="form-control text-left" required
                    placeholder="Enter value" onChange={this.onCostChangeHandler.bind(this)} />
                </div>
                <div className="form-group text-left">
                    <label>Date</label>
                    <input type="date" className="form-control text-left" 
                    placeholder="Enter date" onChange={this.onDateChangeHandler.bind(this)} />
                </div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button className="btn btn-danger" onClick={this.props.close}>Cancel</button>
            </div>
          
            </form>
            
            
        )

    }
}

export default addInstalmentForm;