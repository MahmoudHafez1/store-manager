import React,{Component} from 'react'
import './Dashboard.css'
import axios from 'axios'

class Dashboard extends Component {

  state = {
    operations:[]
  }

  componentDidMount(){
    axios.get("http://localhost:5000/operations")
    .then(res=>{
      this.setState({operations:res.data})
    })
  }


  render()
  {
    let index = 0;
    let classType = ""
        const rows =  this.state.operations.map(operation=>{
          if(operation.type==="Add"){
            classType="AddRow"
          }else {
            classType="WithdrawRow"
          }
            index++;
            return(
            <tr className={classType} key={index}>
                <th scope="row">{index}</th>
                <td>{operation.itemName}</td>
                <td>{operation.type}</td>
                <td>{operation.number}</td>
                <td>{operation.dealerName}</td>
                <td>{operation.date.toString().substring(0,10)}</td>
            </tr>
            )  
        })
    return(
      <div>
        <div className="DashboardContainer">
            <h3 style={{textAlign:"left"}}>All Operations (Sorted by Date) :</h3>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col">Operation</th>
                        <th scope="col">Quantity</th> 
                        <th scope="col">Client/Exporter</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {rows} 
                </tbody>
            </table>
            
        </div>

      </div>
      

    )
  }
}

export default Dashboard;
