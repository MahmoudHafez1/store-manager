import React,{Component} from 'react';
import axios from 'axios'
import './Login.css'

class Login extends Component {

    state = {
        userName:'',
        password:''
    }

    userNameHandler(e){
        this.setState({userName:e.target.value})
    }

    passwordHandler(e){
        this.setState({password:e.target.value})
    }

    onLogin(e){
        e.preventDefault();
        const userName = this.state.userName;
        const password = this.state.password;
        axios.get('http://localhost:5000/users/'+userName)
        .then(res=>{
            if(res.data==="nameNotFound"){
                this.props.setAuthintication(false,"wrong name")
            }else if(res.data===password){
                this.props.setAuthintication(true,"Welcome "+userName)
            }else{
                this.props.setAuthintication(false,"wrong password")
            }
        })  
    }

    render(){
        return(
            <section className="LoginSection">
                <form className="LoginFrom" onSubmit={this.onLogin.bind(this)}>
                    <div className="form-group text-left">
                        <label>Name</label>
                        <input type="text" className="form-control text-left" required
                        placeholder="Enter username" onChange={this.userNameHandler.bind(this)} />
                    </div>
                    <div className="form-group text-left">
                        <label>Password</label>
                        <input type="password" className="form-control text-left" required
                        placeholder="Enter password" onChange={this.passwordHandler.bind(this)} />
                    </div>
                    <button type="submit" className="form-control btn btn-primary mt-2">Login</button>
                </form>
            </section>
            
        )
    }

}

export default Login;