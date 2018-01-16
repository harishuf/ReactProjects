
import React, {Component} from 'react';
import Clock from './clock.jsx';
import './app.css';
import {Form,FormControl,Button} from 'react-bootstrap';

class App extends Component{
constructor(props){
  super(props);
  this.state={
    deadline:'August 22,2018',
    newDeadline:''
  }

}

changeDeadline(){
  //this.setState({deadline:'November 25,2017'})
  console.log('state',this.state);
  this.setState({deadline:this.state.newDeadline});
}

render(){
  return(
<div className="App">

<div className="App-title">CountDown to {this.state.deadline}</div>
<Clock deadline={this.state.deadline}/>
<Form inline>
<FormControl
  className="Deadline-input"
   placeholder='new date'
onChange={event=>this.setState({newDeadline:event.target.value})}

  />
<Button onClick={()=> this.changeDeadline()}>Submit</Button>
</Form>

</div>
)
}
}
export default App;
