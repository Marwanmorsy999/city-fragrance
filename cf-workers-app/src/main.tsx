import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

const rootEl = typeof document !== 'undefined' ? document.getElementById('root') : null;
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const isAssetRequest = url.pathname.startsWith('/assets/') || url.pathname.endsWith('.html');

    if (isAssetRequest) {
      return fetch(request);
    }

    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>City Fragrance</title></head><body><div id="root"></div><script type="module" src="/assets/index.js"></script></body></html>`;
    return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
  },
};