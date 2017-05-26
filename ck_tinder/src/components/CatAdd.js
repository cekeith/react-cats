import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {updateCats} from '../actions'


class CatAdd extends Component {
  constructor(props){
    super(props)
    this.state={
        cat: {
        color: '',
        breed: '',
        gender: 'Male',
        habitat: 'Indoor',
        personality: '',
        age: ''
      },
      message: ''
    }
  }
  handleChange(e){
    let target = e.target
    let cat = this.state.cat
    cat[target.name] = target.value
    this.setState({
      cat: cat
    })
  }

  handleSubmit(e){
    var appScope = this
    e.preventDefault()
    // set up the headers and request
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    }
    
    // send state to the backend server
    fetch("http://localhost:4000/create_cat", params).then(function(response){
      // if post is successful update the message to be successful
      // and update the state to equal what we get back from the server
      if(response.status === 200){
        response.json().then(function(body){
          appScope.setState({
            cat: body.cat,
            message: 'successfully created cat profile'
          })
          updateCats()
        })
      } else {
        this.setState({
          message: 'error'
        })
        // else update the message to say there was a failure
      }
    }).catch(function(error){
      this.setState({
        message: 'there was an error: ' + error.errors.join("\n")
      })
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
