import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsomorphicLayoutEffect } from 'react-use'

type TProtalProps = {
  portalId: string
}

export const Portal: React.FC<TProtalProps> = ({ portalId, children }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    // Dynamically create a div that will be used as the portal node
    // in case the "portal-root" doesn't exist in some contexts (like storybook or other envs)
    ref.current = document.createElement('div')
    const portalRoot = document.getElementById(portalId) || document.body
    portalRoot.appendChild(ref.current)

    setMounted(true)

    return () => {
      if (ref.current) {
        portalRoot.removeChild(ref.current)
      }
    }
  }, [])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
