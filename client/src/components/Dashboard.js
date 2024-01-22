import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './Navbar'

function Dashboard (props) {
  const { user } = props
  const name = (user.name !== undefined) ? user.name : ''
  let timeOfDay
  const date = new Date()
  const hours = date.getHours()
  if (hours < 12) {
    timeOfDay = 'Morning'
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'Afternoon'
  } else {
    timeOfDay = 'Evening'
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
      <h2 className="text-2xl font-bold text-blue-500">{`Good ${timeOfDay}, ${name}`}</h2>
      </header>
      <Router>
        <nav className="flex-1">
          <Navbar name={name} user={user} />
        </nav>
      </Router>
    </div>
  )
}

export default Dashboard