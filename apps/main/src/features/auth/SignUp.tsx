import { useState } from 'react'
import { Tutorial } from './containers/Tutorial'
import { CreateAccount } from './containers/CreateAccount'

import { Steps } from './constants'

export const SignUp: React.FC = () => {
  const [step, setStep] = useState<Steps.tutorial | Steps.form>(Steps.tutorial)

  const handleStarted = () => {
    setStep(Steps.form)
  }

  switch (step) {
    case Steps.tutorial:
      return <Tutorial handleStarted={handleStarted} />
    case Steps.form:
      return <CreateAccount />
    default:
      return <></>
  }
}
