import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectRoute'
import VIPRoute from '../components/VipRoure'
import Vs from './pages/Vs'
import Wishlist from './pages/Wish'
import Home from './pages/Home'
import Details from './pages/Details'

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
