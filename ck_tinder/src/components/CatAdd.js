import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CatAdd extends Component {
  constructor(){
    super()
      this.state={
          cat: {
          color: '',
          breed: '',
          gender: 'Male',
          habitat: 'Indoor',
          personality: '',
          age: '',
        }
      }
    }
  handleChange(e){
    const target = e.target
    const attribute = target.name
    var cat = this.state.cat
    cat[attribute] = target.value
    this.setState({cat:cat})
  }
  handleSubmit(e){
    e.preventDefault()
    const params = {
      method: "POST",
      headers:  {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch('http://localhost:4000/create_cat', params).then((response)=>{
      if(response.ok){
        response.json().then((body)=>{
          this.setState({cat: body.cat})
        })
      }else{
        console.log("error")
      }
    })
  }
  render(){
    return(
  <div className="App">
    <div className="App-header">
      <h2>Cat List</h2>
      <div className="pull-right">
        <Link to="/">Back</Link>
      </div>
      <br></br>
    </div>
      <div className='container'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='row'>
            <div className='col-xs-12'>
              <label htmlFor='color'>Color</label>
                <input type='text' name='color' value={this.state.cat.color} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
            <label htmlFor='breed'>Breed</label>
              <input type='text' name='breed' value={this.state.cat.breed} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
            <label htmlFor="gender">Gender:</label>
              <select name='gender' value={this.state.cat.gender} onChange={this.handleChange.bind(this)} >
                <option value={this.state.cat.gender}>Male</option>
                <option value={this.state.cat.gender}>Female</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <label htmlFor="sel1">Habitat:</label>
                <select name='habitat' value={this.state.cat.habitat} onChange={this.handleChange.bind(this)}>
                  <option value={this.state.cat.habitat}>Indoor</option>
                  <option value={this.state.cat.habitat}>Outdoor</option>
                  <option value={this.state.cat.habitat}>Feral</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <label htmlFor='personality'>Personality</label>
                  <input type='text' name='personality' value={this.state.cat.personality} onChange={this.handleChange.bind(this)}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <label htmlFor='age'>Age</label>
                  <input type='text' name='age' value={this.state.cat.age} onChange={this.handleChange.bind(this)}/>
              </div>
            </div>
             <input className='btn btn-primary' type='submit' value='Save' />
          </form>
        </div>
      </div>
      )
    }
}
export default CatAdd;
