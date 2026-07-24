import { Outlet } from '@tanstack/react-router';
import { header } from './components/ui/header';
import { footer } from './components/ui/footer';

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>{header()}</header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>{footer()}</footer>
    </div>
  );
}
