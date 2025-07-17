import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Log warning if using placeholder values
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-anon-key') {
  console.warn('⚠️ Using placeholder Supabase credentials. Please update your .env file with actual values.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helper functions
export const authHelpers = {
  // Sign up with role-specific data
  async signUp(email, password, userData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.name,
          role: userData.role
        }
      }
    })
    return { data, error }
  },

  // Sign in
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get user profile with role-specific data
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .rpc('get_user_profile', { user_uuid: userId })
    return { data, error }
  },

  // Check if profile is complete
  async isProfileComplete(userId) {
    const { data, error } = await supabase
      .rpc('is_profile_complete', { user_uuid: userId })
    return { data, error }
  },

  // Update user profile
  async updateUserProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Update role-specific profile
  async updateRoleProfile(role, userId, profileData) {
    const tableName = `${role}_profiles`
    const { data, error } = await supabase
      .from(tableName)
      .upsert({ id: userId, ...profileData })
      .select()
    return { data, error }
  },

  // Get user skills
  async getUserSkills(userId) {
    const { data, error } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Add user skill
  async addUserSkill(userId, skillData) {
    const { data, error } = await supabase
      .from('user_skills')
      .insert({ user_id: userId, ...skillData })
      .select()
    return { data, error }
  },

  // Get user availability
  async getUserAvailability(userId) {
    const { data, error } = await supabase
      .from('user_availability')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
    return { data, error }
  },

  // Update user availability
  async updateUserAvailability(userId, availabilityData) {
    const { data, error } = await supabase
      .from('user_availability')
      .upsert({ user_id: userId, ...availabilityData })
      .select()
    return { data, error }
  },

  // Record user session
  async recordUserSession(userId, sessionData) {
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({ user_id: userId, ...sessionData })
      .select()
    return { data, error }
  },

  // Get users by role (for admin/matching purposes)
  async getUsersByRole(role, filters = {}) {
    let query = supabase
      .from('user_profiles')
      .select(`
        *,
        ${role}_profiles (*)
      `)
      .eq('role', role)
      .eq('is_active', true)
      .eq('profile_status', 'approved')

    // Apply filters
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    const { data, error } = await query
    return { data, error }
  },

  // Search users with skills
  async searchUsersWithSkills(searchTerm, role = null) {
    let query = supabase
      .from('user_profiles')
      .select(`
        *,
        user_skills (
          skill_name,
          skill_level,
          years_of_experience
        )
      `)
      .eq('is_active', true)
      .eq('profile_status', 'approved')

    if (role) {
      query = query.eq('role', role)
    }

    if (searchTerm) {
      query = query.or(`full_name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
    }

    const { data, error } = await query
    return { data, error }
  }
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to user profile changes
  subscribeToUserProfile(userId, callback) {
    return supabase
      .channel(`user_profile_${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_profiles',
        filter: `id=eq.${userId}`
      }, callback)
      .subscribe()
  },

  // Subscribe to user sessions (for admin monitoring)
  subscribeToUserSessions(callback) {
    return supabase
      .channel('user_sessions')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'user_sessions'
      }, callback)
      .subscribe()
  }
}

export default supabase