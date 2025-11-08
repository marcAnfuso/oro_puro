'use client'

import { useEffect } from 'react'

export default function Tracker() {
  useEffect(() => {
    // Función para enviar eventos al servidor
    const track = async (type: string, data: any) => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, ...data })
        })
      } catch (error) {
        // Silencioso - no mostrar errores al usuario
      }
    }

    // 1. TRACKING DE CLICKS
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Obtener info del elemento clickeado
      const tagName = target.tagName.toLowerCase()
      const text = target.textContent?.trim().substring(0, 100) || ''
      const id = target.id || ''
      const className = target.className || ''

      let elementDescription = tagName
      if (id) elementDescription += `#${id}`
      if (className && typeof className === 'string') {
        const classes = className.split(' ').slice(0, 2).join('.')
        if (classes) elementDescription += `.${classes}`
      }

      const href = target instanceof HTMLAnchorElement ? target.href : ''

      track('click', {
        element: elementDescription,
        text: text,
        href: href
      })
    }

    // 2. TRACKING DE SELECCIÓN DE TEXTO
    let lastSelection = ''
    const handleSelection = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim() || ''

      // Solo trackear si hay texto seleccionado y es diferente al anterior
      if (text && text.length > 3 && text !== lastSelection) {
        lastSelection = text
        track('selection', { text: text.substring(0, 200) })
      }
    }

    // 3. TRACKING DE COPIAR TEXTO
    const handleCopy = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim() || ''

      if (text) {
        track('copy', { text: text.substring(0, 200) })
      }
    }

    // 4. TRACKING DE BATERÍA
    const trackBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery: any = await (navigator as any).getBattery()

          track('battery', {
            level: Math.round(battery.level * 100),
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime
          })

          // Trackear cuando cambie el estado de carga
          battery.addEventListener('chargingchange', () => {
            track('battery', {
              level: Math.round(battery.level * 100),
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            })
          })
        } catch (error) {
          // No disponible en este navegador/dispositivo
        }
      }
    }

    // 5. TRACKING DE INFO DE PANTALLA
    const trackScreen = () => {
      track('screen', {
        width: screen.width,
        height: screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1
      })
    }

    // 6. TRACKING DE TIEMPO EN PÁGINA
    let startTime = Date.now()
    const trackTime = () => {
      const timeSpent = (Date.now() - startTime) / 1000
      if (timeSpent > 5) { // Solo trackear si pasó más de 5 segundos
        track('time', { seconds: timeSpent })
      }
    }

    // Agregar event listeners
    document.addEventListener('click', handleClick)
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('copy', handleCopy)

    // Trackear info inicial
    trackBattery()
    trackScreen()

    // Trackear tiempo al salir de la página
    window.addEventListener('beforeunload', trackTime)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseup', handleSelection)
      document.removeEventListener('copy', handleCopy)
      window.removeEventListener('beforeunload', trackTime)
    }
  }, [])

  // Este componente no renderiza nada visible
  return null
}
