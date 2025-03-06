import React from 'react'
import SignIn from './SignIn'

const Landing = () => {
  return (
    <div className='flex justify-center items-center text-5xl'>
      <span>
        Welcome to ytnotes.co
        Here you can submit youtube url and get ai generated ,edit text images , links etc:
        Store it 
      </span>
      <SignIn />
    </div>
  )
}

export default Landing
