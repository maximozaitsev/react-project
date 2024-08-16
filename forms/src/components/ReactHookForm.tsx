import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setReactHookFormData } from '../store/formSlice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
  name: string
  age: number
  email: string
  password: string
  gender: string
  termsAccepted: boolean
  picture: File | null
  country: string
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter should be uppercase')
    .required(),
  age: yup.number().positive('Age must be positive').integer().required(),
  email: yup.string().email('Invalid email').required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character',
    )
    .required(),
  gender: yup.string().required(),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  picture: yup
    .mixed<File>()
    .test(
      'fileSize',
      'File size is too large',
      (value) => !value || (value && value.size <= 1048576),
    )
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) =>
        !value || (value && ['image/jpeg', 'image/png'].includes(value.type)),
    )
    .required(),
  country: yup.string().required(),
})

const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()

  const onSubmit = (data: FormData) => {
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

      <label htmlFor="password">Password:</label>
      <input {...register('password')} type="password" id="password" />
      <p>{errors.password?.message}</p>

      <label htmlFor="gender">Gender:</label>
      <select {...register('gender')} id="gender">
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p>{errors.gender?.message}</p>

      <label htmlFor="termsAccepted">
        <input
          {...register('termsAccepted')}
          type="checkbox"
          id="termsAccepted"
        />
        Accept Terms and Conditions
      </label>
      <p>{errors.termsAccepted?.message}</p>

      <label htmlFor="picture">Upload Picture:</label>
      <input
        {...register('picture')}
        type="file"
        id="picture"
        accept=".png, .jpg, .jpeg"
      />
      <p>{errors.picture?.message}</p>

      <label htmlFor="country">Country:</label>
      <input {...register('country')} type="text" id="country" />
      <p>{errors.country?.message}</p>

      <button type="submit">Submit</button>
    </form>
  )
}

export default ReactHookForm
