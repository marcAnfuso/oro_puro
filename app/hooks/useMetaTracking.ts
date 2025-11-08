"use client";

import { useCallback } from 'react';

interface EventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | boolean | undefined;
}

export function useMetaTracking() {
  const trackEvent = useCallback(async (
    eventName: string,
    customData: EventData = {}
  ) => {
    // Enviar evento via Pixel (client-side)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, customData);
      console.log(`Meta Pixel: Evento "${eventName}" enviado`, customData);
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
            // Meta puede usar estos datos para mejorar el matching
            // Se hashean automáticamente por Meta
          },
        }),
      });
      console.log(`Meta Conversions API: Evento "${eventName}" enviado al servidor`);
    } catch (error) {
      console.warn('Error al enviar evento a Conversions API:', error);
      // No fallar si el server-side tracking falla
    }
  }, []);

  // Eventos específicos predefinidos para facilitar el uso
  const trackLead = useCallback((source: string) => {
    // Disparar Purchase con valor estimado para ROAS tracking
    trackEvent('Purchase', {
      content_name: 'Solicitud de Usuario WhatsApp',
      content_category: 'Lead Generation',
      content_type: 'whatsapp_click',
      source: source, // 'main_button' o 'secondary_button'
      value: 2.5, // Valor estimado del lead para ROAS (entre $2-3 USD)
      currency: 'USD',
    });
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
