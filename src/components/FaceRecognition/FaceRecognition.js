import React from 'react'
import './FaceRecognition.css'

export default function FaceRecognition( {imageUrl, box} ) {
  return (
    <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputimage' alt='' src= {imageUrl}  width='500px' heigh='auto' />
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow }}></div>
        </div>
        
    </div>
  )
}
