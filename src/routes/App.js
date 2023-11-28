import '../assets/css/App.css';
import '../scss/style.scss'
import React, {Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from '../states/store'
import { getAuthToken } from '../connections/helpers/token';

const Signin = React.lazy(() => import('../views/pages/Signin'))
const RutaPrivada = React.lazy(() => import('./RutaPrivada'))
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

getAuthToken()

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path='/signin' name="Signin" element={<Signin />}/>
            <Route path="*" name="Home" element={<DefaultLayout />} />         
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
