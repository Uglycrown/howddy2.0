import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {React , useState , useEffect} from 'react'
import { db } from '../firebase';
import Post from './Post'
import { useSession } from "next-auth/react";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => 
  onSnapshot(
      query(collection(db,'posts'), orderBy('timestamp', 'desc')), snapshot=>{
       setPosts(snapshot.docs);
   }
   ),

[db]);


console.log(posts)
const {data:session} = useSession();
  return (
    
      <div className='  h-full  w-full bg-gradient-to-r from-cyan-900 to-red-400  '>
         <h1 className='sm:mr-24 sticky text-center text-lg font-semibold font-serif italic '>Express Yourself By Posting...</h1>               
         {session && (
      posts.map((post)=>(
        <Post 
        key={post.id} 
        id={post.id} 
        username={post.data().username}
        userImg={post.data().profileImg} 
        img={post.data().image}
        caption={post.data().caption}
        />

     ))
      )}
          
    </div>
  )
}

export default Feed