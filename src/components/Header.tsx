'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export function Header() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-primary">
            <Link href="/">WebDevTutor</Link>
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {user?.name || user?.email || 'User'}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={login}>
              Login with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
