import React from 'react'
import UserHead from './UserHead'
import { Route, Routes } from 'react-router-dom'
import Feed from '../Feed/Feed'
import UserPhotoPost from './UserPhotoPost'
import UserStats from './UserStats'
import { UserContext } from '../../UserContext'
import Head from '../Helper/Head'

const User = () => {
  const {data} = React.useContext(UserContext)
  return (
    <section className='container'>
      <Head title="Minha Conta" />
      <UserHead />
      <Routes>
        <Route path='/' element={<Feed user={data.id} />} />
        <Route path='postar' element={<UserPhotoPost />} />
        <Route path='estatisticas' element={<UserStats />} />
      </Routes>
    </section>
  )
}

export default User