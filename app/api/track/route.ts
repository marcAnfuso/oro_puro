import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'Unknown IP'
    const userAgent = request.headers.get('user-agent') || 'Unknown'

    // Parsear User-Agent para info básica
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const deviceType = isMobile ? '📱' : '💻'

    // Detectar navegador
    let browser = 'Unknown'
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome'
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Edg')) browser = 'Edge'

    const timestamp = new Date().toLocaleString('es-AR')

    // Manejar diferentes tipos de eventos
    switch (data.type) {
      case 'click':
        console.log('\n' + '🖱️ '.repeat(40))
        console.log(`🖱️  CLICK DETECTADO! 🖱️`)
        console.log('🖱️ '.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`📍 Elemento clickeado: ${data.element}`)
        if (data.text) console.log(`📝 Texto del elemento: "${data.text}"`)
        if (data.href) console.log(`🔗 Link: ${data.href}`)
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break

      case 'selection':
        console.log('\n' + '✂️ '.repeat(40))
        console.log(`✂️  TEXTO SELECCIONADO! ✂️`)
        console.log('✂️ '.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`📝 Texto seleccionado: "${data.text}"`)
        console.log(`📏 Longitud: ${data.text.length} caracteres`)
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break

      case 'copy':
        console.log('\n' + '📋'.repeat(40))
        console.log(`📋 ¡COPIARON TEXTO! 📋`)
        console.log('📋'.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`📝 Texto copiado: "${data.text}"`)
        console.log(`📏 Longitud: ${data.text.length} caracteres`)
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break

      case 'battery':
        const batteryEmoji = data.charging ? '🔌' : '🔋'
        const batteryStatus = data.charging ? 'CARGANDO' : 'Descargando'
        console.log('\n' + batteryEmoji.repeat(40))
        console.log(`${batteryEmoji} INFO DE BATERÍA ${batteryEmoji}`)
        console.log(batteryEmoji.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`🔋 Nivel de batería: ${data.level}%`)
        console.log(`${batteryEmoji} Estado: ${batteryStatus}`)
        if (data.chargingTime && data.chargingTime !== Infinity) {
          console.log(`⏱️  Tiempo hasta carga completa: ${Math.round(data.chargingTime / 60)} minutos`)
        }
        if (data.dischargingTime && data.dischargingTime !== Infinity) {
          console.log(`⏱️  Tiempo restante: ${Math.round(data.dischargingTime / 60)} minutos`)
        }
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break

      case 'screen':
        console.log('\n' + '🖥️ '.repeat(40))
        console.log(`🖥️  INFO DE PANTALLA 🖥️`)
        console.log('🖥️ '.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`📱 Resolución: ${data.width}x${data.height}`)
        console.log(`🖼️  Ventana del navegador: ${data.windowWidth}x${data.windowHeight}`)
        console.log(`🎨 Profundidad de color: ${data.colorDepth} bits`)
        console.log(`📏 Pixel ratio: ${data.pixelRatio}x`)
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break

      case 'time':
        console.log('\n' + '⏰'.repeat(40))
        console.log(`⏰ TIEMPO EN PÁGINA ⏰`)
        console.log('⏰'.repeat(40))
        console.log(`${deviceType} Usuario: ${ip.split(',')[0].trim()} (${browser})`)
        console.log(`⏱️  Tiempo total: ${Math.round(data.seconds)} segundos (${Math.round(data.seconds / 60)} minutos)`)
        console.log(`📅 ${timestamp}`)
        console.log('─'.repeat(80) + '\n')
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en tracking:', error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
