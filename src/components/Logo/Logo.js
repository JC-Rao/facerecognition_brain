import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'

export default function Logo() {
  return (
    <div className='ma4 mt0'>
       <Tilt className='Tilt br2 shadow-2' options={{ max: 55}} style={{ height: 150, width: 150 }}>
          <div className='Tilt-inner pa3'><img style={{paddingTop: '10px', width: '100px'}} alt='logo 'src={brain}/> </div>
       </Tilt>
    </div>
  )
}
