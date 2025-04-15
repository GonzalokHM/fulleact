import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectRoute'
import VIPRoute from './components/VipRoure'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Details from './pages/Details'

const Vs = lazy(() => import('./pages/Vs'))
const Wishlist = lazy(() => import('./pages/Wish'))
const SearchResults = lazy(() => import('./pages/SearchResult'))
const GetVip = lazy(() => import('./pages/GetVip'))
const Profile = lazy(() => import('./pages/Profile'))
const VipSearch = lazy(() => import('./pages/VipSearch'))

function App() {
  const location = useLocation()
  const showSearchInput = location.pathname !== '/vipSearch'
  return (
    <div className='flex flex-col min-h-screen'>
      <Header showSearchInput={showSearchInput} />
      <main className='flex-grow '>
        <Suspense fallback={<Loader label='Cargando página...' />}>
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
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
