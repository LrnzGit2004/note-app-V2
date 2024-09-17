"use client"

import Link from "next/link"
import Logo from '@/public/Logo.png'
import Image from "next/image"
import {ThemeToggle} from "./ThemeToggle"

import React from 'react'

export default function NavBar() {
  return (
    <nav className="max-w-[1200px] w-full mx-auto h-[90px] flex items-center justify-between border-b border-gray-300 p-5">
      <div>
        <Link href='/' className="flex items-center text-2xl md:text-4xl space-x-1">
            <Image width={70} height={70} src={Logo} alt="" />
            <p className="hidden sm:block font-semibold ">SaaS Notes</p>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle/>
      </div>
    </nav>
  )
}
