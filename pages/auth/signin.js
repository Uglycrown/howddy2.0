
import {getProviders, signIn as SignIntoProvider} from "next-auth/react"
import Navbar from "../../components/Navbar";

function signin({ providers }) {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-40 px-14 text-center">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdEQ_pWrCwzFxdhtH0EcCnLLFq5YetmW271nwCsdg4piEA-pKW_YwLYyXXj_CqjZK6-ec&usqp=CAU" alt="" />
      <p>This app is currently in Testing, Login by Google</p>
      <div className=" mt-40">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      </div>
    </div>
      
    </>
  )
}

export async function getServerSideProps(){
    const providers = await getProviders();


return{
    props:{
        providers,
    },
};
}
export default signin