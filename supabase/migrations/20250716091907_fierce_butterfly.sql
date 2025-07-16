/*
  # Authentication and User Management Schema

  This migration creates a comprehensive authentication system for the UniteVol platform
  supporting multiple user types: Volunteer, NGO, Project Lead, and She Leads.

  ## New Tables
  1. `user_profiles` - Extended user profile information for all user types
  2. `volunteer_profiles` - Specific data for volunteers
  3. `ngo_profiles` - Specific data for NGO representatives
  4. `project_lead_profiles` - Specific data for project leads
  5. `she_leads_profiles` - Specific data for She Leads members
  6. `user_skills` - Skills associated with users
  7. `user_availability` - Availability preferences for users

  ## Security
  - Enable RLS on all tables
  - Add policies for user data access based on authentication and roles
  - Ensure users can only access their own data and appropriate public information

  ## Features
  - Role-based user management
  - Profile completion tracking
  - Skills and availability management
  - Audit trails with timestamps
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('volunteer', 'ngo', 'project_lead', 'she_leads');

-- Create enum for profile completion status
CREATE TYPE profile_status AS ENUM ('incomplete', 'pending_review', 'approved', 'rejected');

-- Create enum for availability types
CREATE TYPE availability_type AS ENUM (
  'weekdays_full_time',
  'weekdays_part_time', 
  'weekends_only',
  'flexible',
  'one_time_events'
);

-- Main user profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role user_role NOT NULL,
  profile_status profile_status DEFAULT 'incomplete',
  phone text,
  location text,
  bio text,
  profile_image_url text,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  profile_completed_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Volunteer-specific profiles
CREATE TABLE IF NOT EXISTS volunteer_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  age integer CHECK (age >= 16 AND age <= 100),
  education text,
  current_organization text,
  linkedin_profile text,
  experience text,
  total_hours_contributed integer DEFAULT 0,
  events_participated integer DEFAULT 0,
  preferred_domains text[],
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- NGO-specific profiles  
CREATE TABLE IF NOT EXISTS ngo_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  ngo_name text NOT NULL,
  ngo_id text UNIQUE NOT NULL,
  website text,
  address text,
  established_year integer CHECK (established_year >= 1900 AND established_year <= EXTRACT(YEAR FROM now())),
  area_of_service text,
  registration_number text,
  tax_exemption_number text,
  description text,
  mission_statement text,
  vision_statement text,
  total_volunteers integer DEFAULT 0,
  total_projects integer DEFAULT 0,
  verification_status profile_status DEFAULT 'pending_review',
  verification_documents text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project Lead-specific profiles
CREATE TABLE IF NOT EXISTS project_lead_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  community_name text,
  linkedin_profile text NOT NULL,
  website text,
  professional_background text NOT NULL,
  leadership_experience text,
  project_domains text[],
  total_projects_led integer DEFAULT 0,
  total_volunteers_managed integer DEFAULT 0,
  success_stories text[],
  certifications text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- She Leads-specific profiles
CREATE TABLE IF NOT EXISTS she_leads_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  community_name text,
  linkedin_profile text NOT NULL,
  website text,
  professional_background text NOT NULL,
  leadership_roles text[],
  mentorship_experience text,
  focus_areas text[],
  achievements text[],
  speaking_engagements text[],
  publications text[],
  total_mentees integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  skill_level text CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_of_experience integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

-- User availability table
CREATE TABLE IF NOT EXISTS user_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  availability_type availability_type NOT NULL,
  days_of_week integer[] CHECK (array_length(days_of_week, 1) <= 7),
  time_slots jsonb,
  hours_per_week integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User sessions table for tracking login activity
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_start timestamptz DEFAULT now(),
  session_end timestamptz,
  ip_address inet,
  user_agent text,
  device_info jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_status ON user_profiles(profile_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON user_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_availability_user_id ON user_availability(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ngo_profiles_verification ON ngo_profiles(verification_status);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ngo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_lead_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE she_leads_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (is_active = true AND profile_status = 'approved');

-- RLS Policies for volunteer_profiles
CREATE POLICY "Volunteers can manage their own profile"
  ON volunteer_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Approved volunteer profiles are viewable"
  ON volunteer_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = volunteer_profiles.id 
      AND user_profiles.is_active = true 
      AND user_profiles.profile_status = 'approved'
    )
  );

-- RLS Policies for ngo_profiles
CREATE POLICY "NGOs can manage their own profile"
  ON ngo_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Approved NGO profiles are viewable"
  ON ngo_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = ngo_profiles.id 
      AND user_profiles.is_active = true 
      AND user_profiles.profile_status = 'approved'
    )
  );

-- RLS Policies for project_lead_profiles
CREATE POLICY "Project leads can manage their own profile"
  ON project_lead_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Approved project lead profiles are viewable"
  ON project_lead_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = project_lead_profiles.id 
      AND user_profiles.is_active = true 
      AND user_profiles.profile_status = 'approved'
    )
  );

-- RLS Policies for she_leads_profiles
CREATE POLICY "She Leads can manage their own profile"
  ON she_leads_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Approved She Leads profiles are viewable"
  ON she_leads_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = she_leads_profiles.id 
      AND user_profiles.is_active = true 
      AND user_profiles.profile_status = 'approved'
    )
  );

-- RLS Policies for user_skills
CREATE POLICY "Users can manage their own skills"
  ON user_skills
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "User skills are viewable by authenticated users"
  ON user_skills
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = user_skills.user_id 
      AND user_profiles.is_active = true
    )
  );

-- RLS Policies for user_availability
CREATE POLICY "Users can manage their own availability"
  ON user_availability
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for user_sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (id, email, role, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'volunteer')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_profiles_updated_at
  BEFORE UPDATE ON volunteer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ngo_profiles_updated_at
  BEFORE UPDATE ON ngo_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_lead_profiles_updated_at
  BEFORE UPDATE ON project_lead_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_she_leads_profiles_updated_at
  BEFORE UPDATE ON she_leads_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_availability_updated_at
  BEFORE UPDATE ON user_availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get user profile with role-specific data
CREATE OR REPLACE FUNCTION get_user_profile(user_uuid uuid)
RETURNS jsonb AS $$
DECLARE
  profile_data jsonb;
  role_data jsonb;
  user_role_type user_role;
BEGIN
  -- Get basic profile
  SELECT to_jsonb(up.*) INTO profile_data
  FROM user_profiles up
  WHERE up.id = user_uuid;
  
  IF profile_data IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Get user role
  SELECT role INTO user_role_type
  FROM user_profiles
  WHERE id = user_uuid;
  
  -- Get role-specific data
  CASE user_role_type
    WHEN 'volunteer' THEN
      SELECT to_jsonb(vp.*) INTO role_data
      FROM volunteer_profiles vp
      WHERE vp.id = user_uuid;
    WHEN 'ngo' THEN
      SELECT to_jsonb(np.*) INTO role_data
      FROM ngo_profiles np
      WHERE np.id = user_uuid;
    WHEN 'project_lead' THEN
      SELECT to_jsonb(plp.*) INTO role_data
      FROM project_lead_profiles plp
      WHERE plp.id = user_uuid;
    WHEN 'she_leads' THEN
      SELECT to_jsonb(slp.*) INTO role_data
      FROM she_leads_profiles slp
      WHERE slp.id = user_uuid;
  END CASE;
  
  -- Combine profile and role data
  RETURN profile_data || COALESCE(role_data, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user profile is complete
CREATE OR REPLACE FUNCTION is_profile_complete(user_uuid uuid)
RETURNS boolean AS $$
DECLARE
  user_role_type user_role;
  is_complete boolean := false;
BEGIN
  SELECT role INTO user_role_type
  FROM user_profiles
  WHERE id = user_uuid;
  
  CASE user_role_type
    WHEN 'volunteer' THEN
      SELECT (
        up.full_name IS NOT NULL AND up.full_name != '' AND
        up.phone IS NOT NULL AND up.phone != '' AND
        up.location IS NOT NULL AND up.location != '' AND
        vp.age IS NOT NULL AND
        vp.education IS NOT NULL AND vp.education != '' AND
        vp.current_organization IS NOT NULL AND vp.current_organization != '' AND
        vp.linkedin_profile IS NOT NULL AND vp.linkedin_profile != '' AND
        vp.experience IS NOT NULL AND vp.experience != ''
      ) INTO is_complete
      FROM user_profiles up
      JOIN volunteer_profiles vp ON up.id = vp.id
      WHERE up.id = user_uuid;
      
    WHEN 'ngo' THEN
      SELECT (
        up.full_name IS NOT NULL AND up.full_name != '' AND
        up.phone IS NOT NULL AND up.phone != '' AND
        np.ngo_name IS NOT NULL AND np.ngo_name != '' AND
        np.ngo_id IS NOT NULL AND np.ngo_id != '' AND
        np.website IS NOT NULL AND np.website != '' AND
        np.address IS NOT NULL AND np.address != '' AND
        np.established_year IS NOT NULL AND
        np.area_of_service IS NOT NULL AND np.area_of_service != ''
      ) INTO is_complete
      FROM user_profiles up
      JOIN ngo_profiles np ON up.id = np.id
      WHERE up.id = user_uuid;
      
    WHEN 'project_lead' THEN
      SELECT (
        up.full_name IS NOT NULL AND up.full_name != '' AND
        up.phone IS NOT NULL AND up.phone != '' AND
        plp.linkedin_profile IS NOT NULL AND plp.linkedin_profile != '' AND
        plp.professional_background IS NOT NULL AND plp.professional_background != ''
      ) INTO is_complete
      FROM user_profiles up
      JOIN project_lead_profiles plp ON up.id = plp.id
      WHERE up.id = user_uuid;
      
    WHEN 'she_leads' THEN
      SELECT (
        up.full_name IS NOT NULL AND up.full_name != '' AND
        up.phone IS NOT NULL AND up.phone != '' AND
        slp.linkedin_profile IS NOT NULL AND slp.linkedin_profile != '' AND
        slp.professional_background IS NOT NULL AND slp.professional_background != ''
      ) INTO is_complete
      FROM user_profiles up
      JOIN she_leads_profiles slp ON up.id = slp.id
      WHERE up.id = user_uuid;
  END CASE;
  
  RETURN COALESCE(is_complete, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;