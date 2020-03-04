import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import LoginForm from './components/LoginForm'

// let foodlist = [
//   ['potatis', 'plockad på dom hallänska vidderna', 98],
//   ['fisk', 'lax', 130],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210],
//   ['kött', 'entrecote', 210]
// ]

class App extends Component {
  state = { foodItems: [] }

  componentDidMount () {
    axios.get('menu.json').then(response => {
      this.setState({
        foodItems: response.data
      })
    })
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
