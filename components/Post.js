import React, { useEffect } from 'react'
import { useState } from 'react';
import {HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,   PaperAirplaneIcon, 
   DotsVerticalIcon ,EmojiHappyIcon} from '@heroicons/react/outline'
   import{HeartIcon as HeartIconFilled} from "@heroicons/react/solid";
   import { useSession } from "next-auth/react";
import { deleteDoc, addDoc, collection, onSnapshot, orderBy ,query,serverTimestamp, setDoc,doc} from 'firebase/firestore';
import { db } from '../firebase';
import Moment  from 'react-moment';




const Post = ({id, username, userImg, img, caption}) => {

  
  const {data:session} = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasLiked] = useState(false);

  useEffect(()=>
    onSnapshot(
      query(
        collection(db, "posts" , id, "comments"),
        orderBy("timestamp", "desc")
      ),
    (snapshot) => setComments(snapshot.docs)
    ),
    [db ,id]
  )

  useEffect((

  ) => 
  onSnapshot(collection(db, "posts" , id ,"likes"), (snapshot)=>
       setLikes(snapshot.docs)
  ),
  [db ,id]
  );

  useEffect(
    () => setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    ),
    [likes]
  );

  const likePost = async (e) =>{
    if(hasliked){
      await deleteDoc(doc(db, "posts" ,id, "likes", session.user.uid));
  }else{
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid),{
          username: session.user.username,
          });

  }

  };
  
  

  const sendComment = async (e) =>{
    e.preventDefault();
  
    const commentToSend = comment;
    await addDoc(collection(db,"posts" , id, "comments"),{
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    });
  };


  
  return (
    <div className=' flex place-content-center     mt-5 '>
      <div className='  w-fit bg-gradient-to-r from-cyan-500 to-blue-500  sm:w-4/6'> 
                
                {/* top */}
                  <div className=' m-3 flex justify-between  text-center'>
                    <div className='flex'>
                  <img className=' w-6 h-6 rounded-full' src={userImg}alt="" />
                  <p>{username}</p>
                  </div>
                  <DotsVerticalIcon className=' h-6'/>
                  </div>
              <div>
                <img className=' w-fit  object-cover' src={img}  alt=""  />
              </div>
              {session && (
              <div className=' flex  justify-between '>
               <div className='flex  '> 
               {hasliked ? (
           <HeartIconFilled onClick={likePost} className="btnv h-7 text-red-600" />
       ):(
        <HeartIcon onClick={likePost} className="btn h-7"/> 
       )}
                <ChatIcon className=' btn h-7'/>
                <PaperAirplaneIcon className=' -mt-0-5 ml-2 btn h-7 ' />
                </div > 

               <div className='w-7 h-7'> <DotsHorizontalIcon/></div>               
              
             </div>
              )}
              
              {/* caption */}
          


              <p className=" pt-1 pl-1 truncate">
       {likes.length >0 &&(
           <p className="font-bold ">{likes.length} likes</p>
       )}
   </p>


       <p className="p-3 truncate">
           <span className=" font-bold">{username } : </span>
           {caption}
       </p>
   
            {/* comment */}
              
              {comments.length>0 &&(
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                  {comments.map((comment)=>(
                    <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                      <img className='h-7 rounded-full'
                       src={comment.data().userImage} alt="#" />
                      <p className='text-sm flex-1'>
                        <span className='font-bold'>
                          {comment.data().username}
                        </span>{" "}
                         {comment.data().comment}
                      </p>
                      <Moment fromNow className=" pr-5 text-xs">
                        {comment.data().timestamp?.toDate()}
                      </Moment>
                    </div>
                  ))}
                </div>
              )}
          

            {/* input */}

            <form className="flex items-center p-4">
       <EmojiHappyIcon className="h-7 pr-2" />
       <input type="text"
       value={comment}
       onChange={e=> setComment(e.target.value)}
           placeholder="Add a comment..." 
       className=" border-2 rounded-md flex-1 outline-none"/>
       <button 
       disabled={!comment.trim()}
       onClick={sendComment}
       className="font-semibold text-pink-200 pl-2">post</button>
       </form>
            
             
     
      </div>
      
      </div>
      
   
  )
}

export default Post