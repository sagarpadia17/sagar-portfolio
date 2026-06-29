import { useState, useEffect } from 'react'

export function useScrollSpy(ids, offset = 80) {
  const [activeId, setActiveId] = useState(ids[0] || '')

  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY + offset + 1
      let current = ids[0] || ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      return current
    }

    const onScroll = () => setActiveId(getActive())

    // Run once after paint so lazy-loaded sections have had a chance to mount
    const raf = requestAnimationFrame(() => setActiveId(getActive()))
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids, offset])

  return activeId
}
