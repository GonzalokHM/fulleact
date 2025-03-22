import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectRoute'
import VIPRoute from './components/VipRoure'
import Vs from './pages/Vs'
import Wishlist from './pages/Wish'
import Home from './pages/Home'
import Details from './pages/Details'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import SearchResults from './pages/SearchResult'
import GetVip from './pages/GetVip'
import Profile from './pages/Profile'
import VipSearch from './pages/VipSearch'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Details />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search-results' element={<SearchResults />} />
          <Route path='/getvip' element={<GetVip />} />
          <Route path='*' element={<NotFound />} />

          <Route
            path='/wishlist'
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/compare'
            element={
              <VIPRoute>
                <Vs />
              </VIPRoute>
            }
          />
          <Route
            path='/vipSearch'
            element={
              <VIPRoute>
                <VipSearch />
              </VIPRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
