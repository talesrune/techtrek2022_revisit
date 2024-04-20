// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {Button, Grid, useTheme} from '@mui/material'

function App() {
  // const [count, setCount] = useState(0)
  const theme = useTheme();
  return (
   
    <div>

      <Button variant='contained'>Hello world</Button>
    </div>
    
  )
}

export default App
