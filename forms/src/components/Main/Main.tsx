import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Main.css'

const Main: React.FC = () => {
  const uncontrolledData = useSelector(
    (state: RootState) => state.form.uncontrolledFormData,
  )
  const reactHookData = useSelector(
    (state: RootState) => state.form.reactHookFormData,
  )

  return (
    <div className="main">
      <h2>Form Data Overview</h2>
      <div>
        <h3>Uncontrolled Form Data</h3>
        {uncontrolledData ? (
          <pre>{JSON.stringify(uncontrolledData, null, 2)}</pre>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
      <div>
        <h3>React Hook Form Data</h3>
        {reactHookData ? (
          <pre>{JSON.stringify(reactHookData, null, 2)}</pre>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  )
}

export default Main
