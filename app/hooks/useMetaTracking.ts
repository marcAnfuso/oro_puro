"use client";

import { useCallback } from 'react';

interface EventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  external_id?: string;
  [key: string]: string | number | boolean | undefined;
}

export function useMetaTracking() {
  const trackEvent = useCallback(async (
    eventName: string,
    customData: EventData = {},
    externalId?: string
  ) => {
    // Enviar evento via Pixel (client-side) con external_id
    if (typeof window !== 'undefined' && window.fbq) {
      // Pasar external_id como opción avanzada para matching
      const options = externalId ? { external_id: externalId } : {};
      window.fbq('track', eventName, customData, options);
      console.log(`Meta Pixel: Evento "${eventName}" enviado`, { customData, externalId });
    }

    // Enviar evento via Conversions API (server-side) para mayor precisión
    try {
      await fetch('/api/meta-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventData: {
            source_url: window.location.href,
            custom_data: customData,
          },
          userData: {
            external_id: externalId, // Se hasheará en el servidor
          },
        }),
      });
      console.log(`Meta Conversions API: Evento "${eventName}" enviado al servidor con external_id:`, externalId);
    } catch (error) {
      console.warn('Error al enviar evento a Conversions API:', error);
      // No fallar si el server-side tracking falla
    }
  }, []);

  // Eventos específicos predefinidos para facilitar el uso
  const trackLead = useCallback((source: string, trackingId?: string) => {
    // Disparar evento personalizado ClickWhatsApp1 con external_id para matching
    trackEvent('ClickWhatsApp1', {
      content_name: 'Solicitud de Usuario WhatsApp',
      content_category: 'Lead Generation',
      content_type: 'whatsapp_click',
      source: source, // 'main_button' o 'secondary_button'
      value: 2.5, // Valor estimado del lead para ROAS (entre $2-3 USD)
      currency: 'USD',
      external_id: trackingId, // Incluir en custom_data también
    }, trackingId);
  }, [trackEvent]);

  const trackContact = useCallback((source: string) => {
    trackEvent('Contact', {
      content_name: 'Contacto via WhatsApp',
      content_category: 'Contact',
      source: source,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLead,
    trackContact,
  };
}
