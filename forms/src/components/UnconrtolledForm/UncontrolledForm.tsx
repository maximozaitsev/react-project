import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setUncontrolledFormData } from '../../store/formSlice'
import { useNavigate } from 'react-router-dom'

interface FormData {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: string
  termsAccepted: boolean
  picture: string
  country: string
}

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsAcceptedRef = useRef<HTMLInputElement>(null)
  const pictureRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      alert('Passwords do not match')
      return
    }

    if (pictureRef.current?.files?.[0]) {
      const file = pictureRef.current.files[0]
      if (file.size > 2000000) {
        alert('File too large')
        return
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Unsupported file format')
        return
      }
    }

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      termsAccepted: termsAcceptedRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0]
        ? URL.createObjectURL(pictureRef.current.files[0])
        : '',
      country: countryRef.current?.value || '',
    }

    dispatch(setUncontrolledFormData(formData))
    navigate('/')
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input ref={nameRef} type="text" id="name" name="name" />

      <label htmlFor="age">Age:</label>
      <input ref={ageRef} type="number" id="age" name="age" />

      <label htmlFor="email">Email:</label>
      <input ref={emailRef} type="email" id="email" name="email" />

      <label htmlFor="password">Password:</label>
      <input ref={passwordRef} type="password" id="password" name="password" />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        ref={confirmPasswordRef}
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />

      <label htmlFor="gender">Gender:</label>
      <select ref={genderRef} id="gender" name="gender">
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="termsAccepted">
        <input
          ref={termsAcceptedRef}
          type="checkbox"
          id="termsAccepted"
          name="termsAccepted"
        />
        Accept Terms and Conditions
      </label>

      <label htmlFor="picture">Upload Picture:</label>
      <input
        ref={pictureRef}
        type="file"
        id="picture"
        name="picture"
        accept=".png, .jpg, .jpeg"
      />

      <label htmlFor="country">Country:</label>
      <input ref={countryRef} type="text" id="country" name="country" />

      <button type="submit">Submit</button>
    </form>
  )
}

export default UncontrolledForm
