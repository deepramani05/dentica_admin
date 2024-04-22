import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Users from '../Pages/User'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Gallary from '../Pages/Gallary'
import Contacts from '../Pages/Contact'
import Career from '../Pages/Career'
import Blog from '../Pages/Blog'
import Products from '../Pages/Products'
import Review from '../Pages/Review'
import Meta from '../Pages/Meta'
import Stl from '../Pages/Stl'
import EventCat from '../Pages/EventCat'
import Event from '../Pages/Event'
import Team from '../Pages/Team'
import Edit from '../Pages/Edit'
import Gallaryedit from '../Pages/Gallaryedit'


const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/about-us' element={<About/>}/>
            <Route path='/gallary' element={<Gallary/>}/>
            <Route path='/contact' element={<Contacts/>}/>
            <Route path='/career' element={<Career/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/product' element={<Products/>}/>
            <Route path='/review' element={<Review/>}/>
            <Route path='/meta' element={<Meta/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/stl' element={<Stl/>}/>
            <Route path='/event-catagory' element={<EventCat/>}/>
            <Route path='/event' element={<Event/>}/>
            <Route path='/about/edit' element={<Edit/>}/>
            <Route path='/gallary/edit/:id' element={<Gallaryedit/>}/>
        </Routes>
    </div>
  )
}

export default Allroutes