import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log('AuthContext: Getting initial session...');
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);

        // Handle invalid refresh token error
        if (error.message && error.message.includes('Refresh Token Not Found')) {
          console.log('Invalid refresh token detected, clearing session...');
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
        }
      } else {
        console.log('AuthContext: Session loaded:', session ? 'User logged in' : 'No session');
        setSession(session);
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle different auth events
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery initiated');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    console.log('AuthContext: Attempting sign up for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
          display_name: name || ''
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      console.error('Sign up error:', error);
      return { error };
    }

    console.log('AuthContext: Sign up successful:', data);
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthContext: Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Sign in error:', error);
      return { error };
    }

    console.log('AuthContext: Sign in successful');
    return { error: null };
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔵 Initiating Google sign in...');
      console.log('🔵 Current origin:', window.location.origin);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
          skipBrowserRedirect: false
        }
      });

      if (error) {
        console.error('🔴 Google OAuth error:', error);
        return { error };
      }

      console.log('✅ Google OAuth URL generated:', data?.url);

      // Force redirect if Supabase doesn't do it automatically
      if (data?.url) {
        console.log('🚀 Forcing redirect to:', data.url);
        window.location.href = data.url;
      }

      return { error: null };
    } catch (err: any) {
      console.error('🔴 Google sign in exception:', err);
      return { error: err };
    }
  };

   const signOut = async () => {
     const { error } = await supabase.auth.signOut();
     if (error) {
       console.error('Sign out error:', error);
     }
   };

   const resetPassword = async (email: string) => {
     // Always use the custom domain for consistency
     const redirectTo = 'https://qubitquantumai.com/reset-password';
     
     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
       redirectTo: redirectTo,
       captchaToken: undefined // Disable captcha for now
     });
     
     if (error) {
       console.error('Password reset error:', error);
       return { error };
     }

     return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};