
import {PlusCircleIcon}  from '@heroicons/react/outline'
import{useSession ,signIn ,signOut} from "next-auth/react";
import {useRecoilState} from 'recoil'

import {modalState} from "../atom/modalAtom";
function Navbar() {
  const {data: session} = useSession();
  const[ open, setOpen] = useRecoilState(modalState);
        return (
                  
          <div className=" shadow-xl bg-white  sticky top-0 z-50 bg-gradient-to-r from-cyan-600 to-blue-600 ">
            <div  className=" text-center   font-semibold  font-Dancing  ">Hii {session?.user?.name} <i className="fa-solid fa-hand-wave"></i></div>
            <div className="flex justify-between max-w-6xl   ">
              <div className=" flex flex-col mt-1  cursor-pointer ">
              <img className="  h-10  " src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdEQ_pWrCwzFxdhtH0EcCnLLFq5YetmW271nwCsdg4piEA-pKW_YwLYyXXj_CqjZK6-ec&usqp=CAU' alt="" />
               <p className=" text- font-Koulen re pt-3 text-gray-500  font-medium uppercase">Howddy?</p>
              </div>
              

             
              
              {session? (
                 <div className="flex justify-between      cursor-pointer ">
                   <PlusCircleIcon onClick={()=> setOpen(true)} className=' cursor-pointer relative w-7 mt mr-8 '/>
                   <div className='flex flex-col mt  '>
                <img className="  w-14 h-14  rounded-full" src={session?.user.image} alt="" />
                <button onClick={() => signOut()} className="  text-red-700 font-bold hover:text-orange-500 ">SignOut</button>
                </div>
                    </div>
             

              ):(<div className=" ">
                   <img onClick={() => signIn()}  className=" mt-1  " src=" https://firebasestorage.googleapis.com/v0/b/howddy1-300b5.appspot.com/o/btn_google_signin_dark_focus_web.png?alt=media&token=ac3fa729-820e-4ac9-abcf-1891ae3138cc_focus_web.png " />
                </div>
              )} 
             

              
             

            </div>

          

          </div>
                               
         
                 
           
              
        

  )
}

export default Navbar