import React,{Component} from 'react'
import './EditTools.css'
import Modal from '../../UI/Modal/Modal'
import EditGoodsFrom from '../EditGoodsFrom/EditGoodsForm'

class EditTools extends Component {

    state = {
        visible:false,
        editShow:false,
    }

    editToolsHandler(){
        const currentState = this.state.visible;
        if(currentState){
            this.setState({visible:false})
            document.getElementById(this.props.name+"editToolBar").style.display="none"
        }else{
            this.setState({visible:true})
            document.getElementById(this.props.name+"editToolBar").style.display="inline-block"
        }
    }

    closeEditForm(){
        this.setState({editShow:false})
    }

    showEditForm(){
        this.setState({editShow:true})
    }

    render(){
        return(
            
            <div className="EditTools">
                <img src={require("../../../assets/icons/icon-setting.png")} className="EditToolsToggle"
                onClick={this.editToolsHandler.bind(this)} alt="setting" />
                <div className="editToolBar" id={this.props.name+"editToolBar"}>
                    <img src={require("../../../assets/icons/icon-edit.png")} alt="edit-icon"  className="EditTool" onClick={this.showEditForm.bind(this)}  />
                    <img src={require("../../../assets/icons/icon-delete.png")} alt="delete-icon" className="EditTool" onClick={()=>this.props.delete(this.props.name)}  />
                </div>
                <Modal show={this.state.editShow} modalClosed={this.closeEditForm.bind(this)}>
                    <EditGoodsFrom image={this.props.image} name={this.props.name} type={this.props.type} reload={this.props.reload} close={this.closeEditForm.bind(this)} />
                </Modal>
            </div>
        )
    }
}

export default EditTools;
