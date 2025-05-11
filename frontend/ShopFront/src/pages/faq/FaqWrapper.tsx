import { MantineProvider } from '@mantine/core'
import React from 'react'
import Faq from './Faq'
import "@mantine/core/styles.css"
function FaqWrapper() {
  return (
   <MantineProvider>
    <Faq/>
   </MantineProvider>
  )
}

export default FaqWrapper
