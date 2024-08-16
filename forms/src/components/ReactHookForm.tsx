import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setReactHookFormData } from '../store/formSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter should be uppercase')
    .required(),
  age: yup.number().positive('Age must be positive').integer().required(),
  email: yup.string().email('Invalid email').required(),
  // Add other field validations here
})

const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    dispatch(setReactHookFormData(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register('name')} type="text" id="name" />
      <p>{errors.name?.message}</p>

      <label htmlFor="age">Age:</label>
      <input {...register('age')} type="number" id="age" />
      <p>{errors.age?.message}</p>

      <label htmlFor="email">Email:</label>
      <input {...register('email')} type="email" id="email" />
      <p>{errors.email?.message}</p>

      {/* Add other inputs here */}

      <button type="submit">Submit</button>
    </form>
  )
}

export default ReactHookForm
