// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import DashBoard from './components/Dashboard';
import Swap from './components/Swap';
import MultiCurrency from './components/MultiCurrency';
import Login from './components/Login';
import CloseAccount from './components/CloseAccount';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()


const App = () => {
  // const [count, setCount] = useState(0)
  // const theme = useTheme();
  return (
    // <Button variant='contained'>Hello world</Button>
    <QueryClientProvider client={queryClient}>    
    <BrowserRouter>
    {/* <div> */}
      
    
      <Routes>
        <Route path='/' element={<DashBoard/>}/>
        <Route path='/swap' element={<Swap/>}/>
        <Route path='/mcurrency' element={<MultiCurrency/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/closeaccount' element={<CloseAccount/>}/>

      </Routes>
     
      
    {/* </div> */}
    </BrowserRouter>
    </QueryClientProvider>
    
  )
}

export default App
