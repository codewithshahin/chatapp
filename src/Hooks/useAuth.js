import React, { useContext } from 'react'
import { FirebaseContext } from '../Context/FirebaseContext'

const useAuth = () => useContext(FirebaseContext)

export default useAuth