import { Text } from '@peiko/components/Text'
import {
  StepperContainer,
  StepContainer,
  Step,
  StepLabel,
  StepLine,
} from './Stepper.styles'
import { TStepperProps } from './types'

export const Stepper: React.FC<TStepperProps> = ({ steps, activeStep = 1 }) => (
  <StepperContainer>
    {steps.map((label, index) => (
      <>
        <StepContainer key={String(label + index)}>
          <Step isActive={index + 1 === activeStep}>
            <Text variant="f7">{index + 1}</Text>
          </Step>
          {label && <StepLabel isActive={index + 1 === activeStep}>{label}</StepLabel>}
        </StepContainer>
        {index < steps.length - 1 && <StepLine />}
      </>
    ))}
  </StepperContainer>
)
