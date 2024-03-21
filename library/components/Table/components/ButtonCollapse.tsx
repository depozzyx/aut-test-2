import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { TButtonCollapseProps } from '../types'

export const ButtonCollapse: React.FC<TButtonCollapseProps> = ({ isOpen, ...props }) => (
  <IconButton {...props}>
    <ArrowIcon direction={isOpen ? 'down' : 'up'} />
  </IconButton>
)
