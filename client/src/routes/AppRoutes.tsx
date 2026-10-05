import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { AddItem } from '../pages/listings/AddItem'
export const AppRoutes = () => {
    return(
      <Routes>
          <Route path='/add-item' element={ <AddItem/> } />
      </Routes>
    )
}
