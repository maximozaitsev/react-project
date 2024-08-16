import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormData {
  name: string
  age: number
  email: string
  password: string
  gender: string
  termsAccepted: boolean
  picture: string
  country: string
}

interface FormState {
  uncontrolledFormData: FormData | null
  reactHookFormData: FormData | null
  countries: string[]
}

const initialState: FormState = {
  uncontrolledFormData: null,
  reactHookFormData: null,
  countries: ['USA', 'Canada', 'UK'], // Add your country list here
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledFormData = action.payload
    },
    setReactHookFormData(state, action: PayloadAction<FormData>) {
      state.reactHookFormData = action.payload
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload
    },
  },
})

export const { setUncontrolledFormData, setReactHookFormData, setCountries } =
  formSlice.actions

export default formSlice.reducer
