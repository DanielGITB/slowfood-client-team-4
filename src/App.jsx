import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import LoginForm from './components/LoginForm'
import { authenticate } from './modules/auth'


class App extends Component {
  state = { foodItems: [] }

  componentDidMount () {
    axios.get('menu.json').then(response => {
      this.setState({
        foodItems: response.data
      })
    })
  }

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false})
    }
  }

  render () {
    const renderLogin = this.state.renderLoginForm ? (
      <LoginForm />
    ) : (
      <button
      id="login"
      onClick={() => this.setState({ renderLoginForm: true })}
      >
        Login
      </button>
    );
    const foodItems = this.state.foodItems;
    let menuList;

    if (foodItems.length > 0) {
      menuList = foodItems.map(foodItem => {
        return (
          <>
            <div class='meal_name'>{foodItem.name}</div>
            <div class='meal_desc'>{foodItem.desc}</div>
            <div class='meal_price'>{foodItem.price}</div>
          </>
        )
      })
    }

    return (
      <>
        <h1>Slowfood</h1>
        {renderLogin}
        <div className='foodlist'>{menuList}</div>

      </>
    )
  }
}

export default App
