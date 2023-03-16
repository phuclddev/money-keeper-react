import MainLayout from './layouts/main';
import React, { Suspense } from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Account = React.lazy(() => import('./pages/Account'))
const AccountAdd = React.lazy(() => import('./pages/AccountAdd'))


function App() {
  return (
    <BrowserRouter>
    <MainLayout >
          <Routes>
            <Route path="/" element={
              <Home />
            }></Route>
             <Route path="/account" element={
              <Account />
            }></Route>
            <Route path="/account/add" element={
              <AccountAdd />
            }></Route>
          </Routes>
        </MainLayout>
        </BrowserRouter>
  )
}

export default App;
