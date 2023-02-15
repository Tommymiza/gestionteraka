import React from 'react'
import Chargement from "./Chargement"

export default function Staff({data, wait}) {
  return wait ? (
    <Chargement />
  ) : (
    <div></div>
  )
}
