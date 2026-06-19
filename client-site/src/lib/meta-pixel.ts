declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaEventParams = Record<string, string | number | boolean>;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function fireMetaEvent(eventName: string, params?: MetaEventParams) {
  if (typeof window === 'undefined') return false;

  const shouldWait =
    typeof window.fbq === 'function' ||
    window.location.pathname.includes('/short-landing') ||
    window.location.pathname.includes('/thanks');
  if (!shouldWait) return false;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, params || {});
      await wait(150);
      return true;
    }
    await wait(100);
  }

  return false;
}

export function fireMetaLead() {
  return fireMetaEvent('Lead');
}

export function fireMetaContact(contentName: 'phone_call' | 'telegram') {
  return fireMetaEvent('Contact', { content_name: contentName });
}

export {};
