import React from 'react'
import Link from "next/link"
import Nav from "./Nav"

export default function Header() {
  return (
    <header>
      <div className="bar">
        <nav>
          <Link href="/">
            <a>Sick Fits</a>
          </Link>
        </nav>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav/>
    </header>
  )
}
