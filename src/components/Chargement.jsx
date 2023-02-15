import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Chargement() {
  return (
    <div className='loading'>
      <CircularProgress size={30} sx={{color: "#fff"}} />
    </div>
  )
}
