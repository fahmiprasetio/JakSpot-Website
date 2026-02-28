'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: string[]; // array of destination slugs
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

function getStorageKey(userId: string) {
  return `jakspot_favorites_${userId}`;
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (loading) return;
    if (!user) {
      setFavorites([]);
      return;
    }
    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch {
      setFavorites([]);
    }
  }, [user, loading]);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(favorites));
  }, [favorites, user]);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      if (!user) {
        // Redirect to signin if not logged in
        window.location.href = '/signin';
        return;
      }
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
    },
    [user],
  );

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
