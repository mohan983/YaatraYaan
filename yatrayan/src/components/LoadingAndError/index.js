import React from 'react'
import { Oval } from 'react-loader-spinner'
import { MdError } from 'react-icons/md'

export const LoadingView = () => (
  <Oval color="#0b69ff" height={50} width={50} />
)

export const FailureView = () => (
  <div style={{textAlign: 'center'}}>
    <MdError style={{ color: 'red', fontSize: '50px' }} />
    <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
    <p className="failure-description">
      We are having some trouble processing your request. Please try again.
    </p>
  </div>
)
