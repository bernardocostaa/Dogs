import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPassowordLost from './LoginPassowordLost'
import LoginPassowordReset from './LoginPassowordReset'
import { UserContext } from '../../UserContext'
import styles from './Login.module.css'
import NotFound from '../NotFound'

const Login = () => {
  const {login} = React.useContext(UserContext)

  if(login === true) return <Navigate to="/conta" />
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='criar' element={<LoginCreate/>} />
          <Route path='perdeu' element={<LoginPassowordLost/>} />
          <Route path='resetar' element={<LoginPassowordReset/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  )
}

export default Login