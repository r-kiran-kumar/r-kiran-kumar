// ============================================================================
// ChronoSparkSolutions — A Software Company
// © 2026 ChronoSparkSolutions. All rights reserved.
//
// Project     : R Kiran Kumar
// File        : api.js
// Description : api helper module.
// Website     : https://www.chronosparksolutions.com/
// Copyright   : https://www.chronosparksolutions.com/copyright
// ============================================================================

/**
 * Safe client-side fetch helper that ensures the response is valid JSON.
 * Gracefully handles session timeouts (401), Next.js dev reloads (404/500 HTML pages), and database connection errors.
 */
export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } else {
    // If it's a redirect or unauthorized page
    if (response.status === 401) {
      throw new Error('Your session has expired or you are unauthorized. Please refresh the page to log in again.');
    }
    if (response.status === 404) {
      throw new Error('The requested API endpoint was not found (status 404). This can happen during dev server reloads.');
    }
    // Fallback text snippet
    const text = await response.text().catch(() => '');
    const snippet = text ? `: ${text.substring(0, 60)}...` : '';
    throw new Error(`Server returned non-JSON response (status ${response.status})${snippet}`);
  }
}
