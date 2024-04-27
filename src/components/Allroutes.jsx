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
import Blogedit from '../Pages/Blogedit'
import Blogadd from '../Pages/Blogadd'
import ProductAdd from '../Pages/ProductAdd'
import ProductEdit from '../Pages/ProductEdit'
import ReviewEdit from '../Pages/ReviewEdit'
import MetaEdit from '../Pages/MetaEdit'
import TeamEdit from '../Pages/TeamEdit'
import EventCatEdit from '../Pages/EventCatEdit'
import EventEdit from '../Pages/EventEdit'
import EventAdd from '../Pages/EventAdd'
import Login from '../Pages/login'


const Allroutes = () => {
  return (
    <div>
        <Routes>
          <Route path='/login' element={<Login />}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/about-us' element={<About/>}/>
            <Route path='/gallery' element={<Gallary/>}/>
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
            <Route path='/blog/edit/:id' element={<Blogedit/>}/>
            <Route path='/blog/add' element={<Blogadd/>}/>
            <Route path='/product/add' element={<ProductAdd/>}/>
            <Route path='/product/edit/:id' element={<ProductEdit/>}/>
            <Route path='/review/edit/:id' element={<ReviewEdit/>}/>
            <Route path='/meta/edit/:id' element={<MetaEdit/>}/>
            <Route path='/team/edit/:id' element={<TeamEdit/>}/>
            <Route path='/event-catagory/edit/:id' element={<EventCatEdit/>}/>
            <Route path='/event/edit/:id' element={<EventEdit/>}/>
            <Route path='/event/add' element={<EventAdd/>}/>
        </Routes>
    </div>
  )
}

export default Allroutes