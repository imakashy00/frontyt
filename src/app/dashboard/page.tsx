import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your YouTube video notes and organize content",
}
const page = () => {
  return (
    <div className='flex flex-1 justify-center items-center text-5xl'>
      how to use the platform
    </div>
  )
}

export default page
