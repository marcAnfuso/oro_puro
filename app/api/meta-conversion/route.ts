import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_CONVERSION_API_TOKEN;

    // Si no están configurados los tokens, solo loguear (no fallar)
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      console.warn('Meta Conversions API no configurada. Eventos solo se enviarán via Pixel (client-side)');
      return NextResponse.json({
        success: false,
        message: 'Meta Conversions API no configurada'
      }, { status: 200 });
    }

    const body = await request.json();
    const { eventName, eventData, userData } = body;

    // Obtener IP y User Agent del request
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';

    // Preparar datos para Meta Conversions API
    const conversionData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: eventData.source_url,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp.split(',')[0].trim(),
            client_user_agent: userAgent,
            ...userData,
          },
          custom_data: eventData.custom_data || {},
        },
      ],
    };

    // Enviar a Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversionData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Error al enviar evento a Meta:', result);
      return NextResponse.json({
        success: false,
        error: result
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (error) {
    console.error('Error en Meta Conversions API:', error);
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
}
