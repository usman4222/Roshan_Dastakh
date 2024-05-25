import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import { Route, Routes, Navigate, Router } from 'react-router-dom'
import Statement from './Pages/Statement'
import GenralRoute from './routes/GenralRoute'
import TaxHistory from './Pages/TaxHistory'
import WithdrawHistory from './Pages/WithdrawHistory'
import ProfitHistroy from './Pages/ProfitHistroy'
import InvestmentHistory from './Pages/InvestmentHistory'
import Invest from './Pages/Invest'
import Withdraw from './Pages/Withdraw'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import Accounts from './Pages/Accounts'
import Nominee from './Pages/Nominee'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // Check if user is logged in by retrieving authentication state from local storage
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    console.log(localStorage.getItem('isLoggedIn'));
  }, [isLoggedIn]);
  return (
    <>
      <div className=" bg-teal-50">
            <Routes>
              {/* <Route path='/' element={<GenralRoute />} > */}
              <Route path="/" element={<GenralRoute />} >
                <Route path='' element={<Home />} />
                <Route path='e-statement' element={<Statement />} />
                <Route path='tax-history' element={<TaxHistory />} />
                <Route path='withdraw-history' element={<WithdrawHistory />} />
                <Route path='profit-history' element={<ProfitHistroy />} />
                <Route path='investment-history' element={<InvestmentHistory />} />
                <Route path='investment' element={<Invest />} />
                <Route path='withdraw' element={<Withdraw />} />
                <Route path='profile' element={<Profile />} />
                <Route path='accounts' element={<Accounts />} />
                <Route path='nominee' element={<Nominee />} />
              </Route>
              <Route path='/login' element={<Login />} ></Route>
            </Routes>
      </div>
    </>
  )
}

export default App
