import React, { useEffect, useState } from 'react'
import './_comments.scss'
import Comment from '../comment/Comment'
import numeral from "numeral";
import { useDispatch, useSelector } from 'react-redux'
import {  getCommentsById } from '../../redux/actions/comments.actions'

const Comments = ({videoId,video: { statistics }}) => {

  const {commentCount}=statistics;

  const dispatch=useDispatch(); 

  useEffect(()=>{
    dispatch(getCommentsById(videoId))
  },[dispatch,videoId])  

   
  const {photoURL}=useSelector(state=>state.auth?.user || {});

  const comments=useSelector(state=>state.commentList.comments)

  const _comments=comments?.map(comment=>comment.snippet.topLevelComment.snippet)
  
  const [text,setText]=useState('')

  
  return (
    <div className='comments'>
        <p> {numeral(commentCount).format("0.a")} Comments</p>
        <div className="comments__form d-flex w-100 my-2">
            <img src={photoURL?photoURL:'/images/dp.png'} alt="profile"/>
            <form  className="d-flex flex-grow-1">
                <input type="text" className="flex-grow-1" placeholder='Write a comment...' value={text} onChange={e=>setText(e.target.value)}/>
                <button className="border-0 p-2">Comment</button>
            </form>
        </div>
        <div className="comments__list">
            {
                _comments?.map((comment,i)=>(
                <Comment comment={comment} key={i}/>))
            }
        </div>
    </div>
  )
}

export default Comments
