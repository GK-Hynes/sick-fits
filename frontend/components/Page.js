import React from 'react'
import Header from "./Header"

export default function Page({children}) {
  return (
    <div>
      <Header/>
      <h2>Page Component</h2>
      {children}
    </div>
  )
}
