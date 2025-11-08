import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Almacenar visitas en memoria (se reinicia cuando reinicies el server)
const visitTracker = new Map<string, { count: number, firstVisit: Date, lastVisit: Date }>()

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || 'Unknown'
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'Unknown IP'
  const referrer = request.headers.get('referer') || request.headers.get('referrer') || 'Directo'
  const language = request.headers.get('accept-language')?.split(',')[0] || 'Unknown'

  // Parsear info del User-Agent
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent)
  const isTablet = /tablet|ipad/i.test(userAgent)
  const deviceType = isTablet ? '📱 Tablet' : isMobile ? '📱 Mobile' : '💻 Desktop'

  // Detectar navegador CON VERSIÓN
  let browser = '🌐 Unknown'
  let browserVersion = ''

  if (userAgent.includes('Edg/')) {
    const match = userAgent.match(/Edg\/([\d.]+)/)
    browserVersion = match ? match[1] : ''
    browser = `🌐 Edge ${browserVersion}`
  } else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
    const match = userAgent.match(/Chrome\/([\d.]+)/)
    browserVersion = match ? match[1] : ''
    browser = `🌐 Chrome ${browserVersion}`
  } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/([\d.]+)/)
    browserVersion = match ? match[1] : ''
    browser = `🌐 Safari ${browserVersion}`
  } else if (userAgent.includes('Firefox/')) {
    const match = userAgent.match(/Firefox\/([\d.]+)/)
    browserVersion = match ? match[1] : ''
    browser = `🌐 Firefox ${browserVersion}`
  }

  // Detectar OS CON VERSIÓN
  let os = '💾 Unknown OS'
  let osVersion = ''

  if (userAgent.includes('Windows NT')) {
    const match = userAgent.match(/Windows NT ([\d.]+)/)
    const version = match ? match[1] : ''
    const winVersions: { [key: string]: string } = {
      '10.0': '10/11',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7'
    }
    os = `💾 Windows ${winVersions[version] || version}`
  } else if (userAgent.includes('Mac OS X')) {
    const match = userAgent.match(/Mac OS X ([\d_]+)/)
    osVersion = match ? match[1].replace(/_/g, '.') : ''
    os = `💾 macOS ${osVersion}`
  } else if (userAgent.includes('Android')) {
    const match = userAgent.match(/Android ([\d.]+)/)
    osVersion = match ? match[1] : ''
    os = `💾 Android ${osVersion}`
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    const match = userAgent.match(/OS ([\d_]+)/)
    osVersion = match ? match[1].replace(/_/g, '.') : ''
    os = `💾 iOS ${osVersion}`
  } else if (userAgent.includes('Linux')) {
    os = '💾 Linux'
  }

  // Detectar MODELO DE DISPOSITIVO
  let deviceModel = ''

  // Samsung
  if (userAgent.includes('SM-')) {
    const match = userAgent.match(/SM-([A-Z0-9]+)/)
    deviceModel = match ? `📱 Samsung Galaxy ${match[1]}` : '📱 Samsung'
  }
  // iPhone
  else if (userAgent.includes('iPhone')) {
    deviceModel = '📱 iPhone'
  }
  // iPad
  else if (userAgent.includes('iPad')) {
    deviceModel = '📱 iPad'
  }
  // Xiaomi
  else if (userAgent.includes('Mi ') || userAgent.includes('Redmi')) {
    const match = userAgent.match(/(Mi|Redmi) ([A-Z0-9 ]+)/)
    deviceModel = match ? `📱 Xiaomi ${match[0]}` : '📱 Xiaomi'
  }
  // Motorola
  else if (userAgent.includes('moto')) {
    const match = userAgent.match(/moto ([a-z0-9 ]+)/i)
    deviceModel = match ? `📱 Motorola ${match[1]}` : '📱 Motorola'
  }

  // Detectar desde dónde viene (app social)
  let source = '🌍 Navegador directo'
  if (referrer.includes('facebook.com') || userAgent.includes('FBAN') || userAgent.includes('FBAV')) {
    source = '📘 Facebook'
  } else if (referrer.includes('instagram.com') || userAgent.includes('Instagram')) {
    source = '📸 Instagram'
  } else if (referrer.includes('whatsapp') || userAgent.includes('WhatsApp')) {
    source = '💬 WhatsApp'
  } else if (referrer.includes('twitter.com') || referrer.includes('t.co')) {
    source = '🐦 Twitter/X'
  } else if (referrer.includes('linkedin.com')) {
    source = '💼 LinkedIn'
  } else if (referrer.includes('google.com')) {
    source = '🔍 Google'
  } else if (referrer !== 'Directo') {
    source = `🔗 ${new URL(referrer).hostname}`
  }

  // Rastrear visitas
  const visitorKey = `${ip}-${userAgent}`
  const now = new Date()
  let visitInfo = visitTracker.get(visitorKey)

  if (!visitInfo) {
    visitInfo = { count: 1, firstVisit: now, lastVisit: now }
    visitTracker.set(visitorKey, visitInfo)
  } else {
    visitInfo.count++
    visitInfo.lastVisit = now
  }

  const isNewVisitor = visitInfo.count === 1
  const timeSinceLastVisit = visitInfo.count > 1
    ? Math.floor((now.getTime() - visitInfo.lastVisit.getTime()) / 1000 / 60)
    : 0

  // Obtener geolocalización (solo para IPs públicas, no localhost)
  let geoInfo = {
    city: 'Unknown',
    region: 'Unknown',
    country: 'Unknown',
    isp: 'Unknown',
    org: 'Unknown',
    timezone: 'Unknown',
    connectionType: 'Unknown'
  }

  // Solo hacer la llamada si no es localhost/IPv6 local
  const publicIp = ip.split(',')[0].trim()
  const isPublicIP = !publicIp.includes('localhost') &&
                     !publicIp.includes('127.0.0.1') &&
                     !publicIp.includes('::1') &&
                     publicIp.length < 50 // IPv6 públicas son más cortas

  if (isPublicIP) {
    try {
      const geoResponse = await fetch(`https://ipapi.co/${publicIp}/json/`, {
        signal: AbortSignal.timeout(2000) // timeout de 2 segundos
      })
      if (geoResponse.ok) {
        const geoData = await geoResponse.json()
        geoInfo = {
          city: geoData.city || 'Unknown',
          region: geoData.region || 'Unknown',
          country: geoData.country_name || 'Unknown',
          isp: geoData.org || 'Unknown',
          org: geoData.asn || 'Unknown',
          timezone: geoData.timezone || 'Unknown',
          connectionType: geoData.org?.toLowerCase().includes('fibertel') ||
                         geoData.org?.toLowerCase().includes('telecom')
            ? (geoData.org.toLowerCase().includes('fibertel') ? '🏠 WiFi Residencial (Fibertel)' : '📡 Red Móvil (Telecom)')
            : '🌐 Red Pública'
        }
      }
    } catch (error) {
      // Si falla la API, seguimos sin geo info
    }
  }

  // Log con formato ULTRA-MEJORADO
  console.log('\n' + '█'.repeat(80))
  console.log(`🔥🔥🔥 ${isNewVisitor ? '¡VISITANTE NUEVO!' : '¡VISITANTE RECURRENTE!'} 🔥🔥🔥`)
  console.log('█'.repeat(80))
  console.log(`\n📊 ESTADÍSTICAS DE VISITA:`)
  console.log(`   └─ Visita número: ${visitInfo.count}`)
  if (!isNewVisitor && timeSinceLastVisit > 0) {
    console.log(`   └─ Última visita hace: ${timeSinceLastVisit} minutos`)
  }
  console.log(`   └─ Primera visita: ${visitInfo.firstVisit.toLocaleString('es-AR')}`)

  console.log(`\n🌍 INFORMACIÓN DE UBICACIÓN:`)
  console.log(`   └─ IP: ${publicIp}`)
  if (isPublicIP && geoInfo.city !== 'Unknown') {
    console.log(`   └─ Ubicación: ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}`)
    console.log(`   └─ ISP/Proveedor: ${geoInfo.isp}`)
    console.log(`   └─ ASN: ${geoInfo.org}`)
    console.log(`   └─ Timezone: ${geoInfo.timezone}`)
    console.log(`   └─ Tipo de conexión: ${geoInfo.connectionType}`)
  }

  console.log(`\n💻 INFORMACIÓN DEL DISPOSITIVO:`)
  console.log(`   └─ Tipo: ${deviceType}`)
  if (deviceModel) console.log(`   └─ Modelo: ${deviceModel}`)
  console.log(`   └─ Navegador: ${browser}`)
  console.log(`   └─ Sistema: ${os}`)
  console.log(`   └─ Idioma: ${language}`)

  console.log(`\n🔗 INFORMACIÓN DE NAVEGACIÓN:`)
  console.log(`   └─ Origen: ${source}`)
  console.log(`   └─ URL visitada: ${request.url}`)
  console.log(`   └─ Timestamp: ${new Date().toLocaleString('es-AR')}`)

  console.log(`\n📱 USER-AGENT TÉCNICO:`)
  console.log(`   ${userAgent}`)
  console.log('█'.repeat(80) + '\n')

  return NextResponse.next()
}

// Aplicar middleware a todas las rutas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
