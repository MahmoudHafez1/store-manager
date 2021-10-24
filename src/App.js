import React, { Component } from 'react';
import {Route,BrowserRouter} from 'react-router-dom' ;
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Containers/Dashboard/Dashboard'
import StoreBuilder from './Containers/StoreBuilder/StoreBuilder'
import GoodsDetails from './Containers/GoodsDetails/GoodsDetails'
import ClientBuilder from './Containers/ClientsBuilder/ClientsBuilder'
import ClientDetails from './Containers/ClientDetails/ClientDetails'
import ExporterBuilder from './Containers/ExportersBuilder/ExportersBuilder'
import ExporterDetails from './Containers/ExporterDetails/ExporterDetails'
import Login from './Components/Login/Login';

class App extends Component {

  state={
    authinticated:sessionStorage.getItem('authinticated') || false
  }

  /*

  componentDidMount(){
    
      let session = sessionStorage.getItem('ref');
  
      if (session == null) {
  
          localStorage.removeItem('authinticated');
  
      }
      sessionStorage.setItem('ref', 1);
  
  }
  */

  setAuthintication(passed,message){
    if(passed){
      alert(message);
      this.setState({authinticated:true})
      sessionStorage.setItem('authinticated', true)
    }else{
      alert(message)
    }
  }

  render () {
    return (
      this.state.authinticated?
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Dashboard} />
          <Route path="/store/:parent" exact render={(props) => (
              <StoreBuilder key={props.match.params.parent} {...props} />)
            } />
          <Route path="/store/:name/details" render={(props) => (
              <GoodsDetails key={props.match.params.name} {...props} />)
            } />
          <Route path="/clients" exact component={ClientBuilder} /> 
          <Route path="/clients/:name" render={(props) => (
              <ClientDetails key={props.match.params.name} {...props} />)
            } />   
          <Route path="/exporters" exact component={ExporterBuilder} /> 
          <Route path="/exporters/:name" render={(props) => (
              <ExporterDetails key={props.match.params.name} {...props} />)
            } />   
        </div>
      </BrowserRouter>
      :
      <Login setAuthintication={this.setAuthintication.bind(this)} />

      
    );
  }
}

export default App;
