import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setUncontrolledFormData } from '../store/formSlice'

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  // Add other refs for the rest of the fields

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      // Add other fields here
    }

    dispatch(setUncontrolledFormData(formData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input ref={nameRef} type="text" id="name" name="name" />
      <label htmlFor="age">Age:</label>
      <input ref={ageRef} type="number" id="age" name="age" />
      <label htmlFor="email">Email:</label>
      <input ref={emailRef} type="email" id="email" name="email" />
      {/* Add other inputs here */}
      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
