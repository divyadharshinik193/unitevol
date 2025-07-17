import React, { createContext, useContext, useState, useEffect } from 'react';
import { authHelpers, subscriptions } from '../lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  // Subscribe to profile changes when user is set
  useEffect(() => {
    if (user?.id) {
      const subscription = subscriptions.subscribeToUserProfile(
        user.id,
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setUserProfile(prev => ({ ...prev, ...payload.new }));
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user?.id]);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      const { user: currentUser, error: userError } = await authHelpers.getCurrentUser();
      
      if (userError) {
        // Handle 'Auth session missing!' as a normal state, not an error
        if (userError.message === 'Auth session missing!') {
          setUser(null);
          setError(null);
          return;
        }
        throw userError;
      }

      if (currentUser) {
        setUser(currentUser);
        await loadUserProfile(currentUser.id);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId) => {
    try {
      const { data: profile, error: profileError } = await authHelpers.getUserProfile(userId);
      
      if (profileError) {
        throw profileError;
      }

      setUserProfile(profile);
    } catch (err) {
      console.error('Profile loading error:', err);
      setError(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signInError } = await authHelpers.signIn(email, password);
      
      if (signInError) {
        throw signInError;
      }

      if (data.user) {
        setUser(data.user);
        await loadUserProfile(data.user.id);

        // Record login session
        await authHelpers.recordUserSession(data.user.id, {
          ip_address: null, // Will be handled by Supabase
          user_agent: navigator.userAgent,
          device_info: {
            platform: navigator.platform,
            language: navigator.language,
            screenInfo: {
              width: window.screen.width,
              height: window.screen.height
            }
          }
        });
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: signUpError } = await authHelpers.signUp(
        userData.email,
        userData.password,
        userData
      );
      
      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        setUser(data.user);
        // Profile will be created automatically by the database trigger
        await loadUserProfile(data.user.id);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Update session end time if we have an active session
      // This would require tracking the current session ID

      const { error: signOutError } = await authHelpers.signOut();
      
      if (signOutError) {
        throw signOutError;
      }

      setUser(null);
      setUserProfile(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData, roleSpecificData = null) => {
    try {
      setLoading(true);
      setError(null);

      if (!user?.id) {
        throw new Error('No authenticated user');
      }

      // Update main profile
      const { data: updatedProfile, error: profileError } = await authHelpers.updateUserProfile(
        user.id,
        profileData
      );

      if (profileError) {
        throw profileError;
      }

      // Update role-specific profile if provided
      if (roleSpecificData && userProfile?.role) {
        const { error: roleError } = await authHelpers.updateRoleProfile(
          userProfile.role,
          user.id,
          roleSpecificData
        );

        if (roleError) {
          throw roleError;
        }
      }

      // Reload complete profile
      await loadUserProfile(user.id);

      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSkills = async (skills) => {
    try {
      setError(null);

      if (!user?.id) {
        throw new Error('No authenticated user');
      }

      // This would typically involve removing old skills and adding new ones
      // For now, we'll just add new skills
      const skillPromises = skills.map(skill => 
        authHelpers.addUserSkill(user.id, skill)
      );

      await Promise.all(skillPromises);
      
      // Reload profile to get updated skills
      await loadUserProfile(user.id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateAvailability = async (availabilityData) => {
    try {
      setError(null);

      if (!user?.id) {
        throw new Error('No authenticated user');
      }

      const { error: availabilityError } = await authHelpers.updateUserAvailability(
        user.id,
        availabilityData
      );

      if (availabilityError) {
        throw availabilityError;
      }

      // Reload profile to get updated availability
      await loadUserProfile(user.id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const checkProfileCompletion = async () => {
    try {
      if (!user?.id) {
        return false;
      }

      const { data: isComplete, error } = await authHelpers.isProfileComplete(user.id);
      
      if (error) {
        throw error;
      }

      return isComplete;
    } catch (err) {
      console.error('Profile completion check error:', err);
      return false;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    updateSkills,
    updateAvailability,
    checkProfileCompletion,
    // Helper methods
    isAuthenticated: !!user,
    isProfileComplete: userProfile?.profile_status === 'approved',
    userRole: userProfile?.role,
    // Clear error
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;