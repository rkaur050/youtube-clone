import React, { useState } from 'react'
import './_categoriesBar.scss'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'

const keywords = [
    'All',
    'React js',
    'Diljit Dosanjh',
    'React Native',
    'use of API',
    'Lastest Punjabi Songs',
    'Music',
    'Algorithm Art ',
    'Guitar',
    'Hindi Songs',
    'Coding',
    'Doraemon',
    'Cricket',
    'Indian Pop Music',
    'BBC News',
    'News',
    'Redux',
  ]

export default function CategoriesBar() {

  const [activeElement,setActiveElement]=useState('All')
  
  const dispatch=useDispatch()

  const handleClick = (value) =>{
    setActiveElement(value)
    if (value === 'All') {
      dispatch(getPopularVideos()); // Fetch all videos
    } else {
      dispatch(getVideosByCategory(value)); // Fetch videos by category
    }
  }

  return (
    <div className='categoriesBar'>
      {
        keywords.map((value,i)=>(
          <span onClick={()=>handleClick(value)}
          className={activeElement===value?'active':''}
          key={value}>{value}</span>
        ))
      }
    </div>
  )
}
