"use client"
import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loading = () => {
  return (
    <Spinner label='Loading...' color='secondary' labelColor='secondary'></Spinner>
  )
}

export default Loading