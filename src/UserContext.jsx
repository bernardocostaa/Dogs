import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api'
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

export const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setloading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const userLogout = React.useCallback (async function (){
    setData(null)
    setError(null)
    setLogin(false)
    setLogin(false)
    window.localStorage.removeItem('token')
  },[])

  React.useEffect(()=>{
    async function autoLogin(){
      const token = window.localStorage.getItem('token')
      if(token){
        try{
          setError(null)
          setloading(true)
          const {url, options} = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url,options)
          if(!response.ok) throw new Error('Token invalido')
          await getUser(token)
        }catch(err){
          userLogout()
        }finally{
          setloading(false)
        }
      }else{
        setLogin(false)
      }
    }
    autoLogin()
  },[userLogout])

  async function getUser(token){
    const {url, options} = USER_GET(token)
    const response = await fetch(url,options)
    const json = await response.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username,password){
    try{
      setError(null)
      setloading(true)
      const {url, options} = TOKEN_POST({username,password})
      const tokenRes = await fetch(url,options)
      if(!tokenRes.ok) throw new Error(`ERROR: Usuario invalido`)
      const {token} = await tokenRes.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    }catch(err){
      setError(err.message)
      setLogin(false)
    }finally{
      setloading(false)
    }
  }

  return (
    <UserContext.Provider value={{userLogin,userLogout,data,login,loading,error}}>
      {children}
    </UserContext.Provider>
  )
}
