import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './Context/AppContext.tsx'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css';
import "@mantine/notifications/styles.css";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
      <MantineProvider>
        <App />
        <Notifications/>
      </MantineProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
