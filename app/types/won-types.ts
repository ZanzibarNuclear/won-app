export type UserInfo = {
  id: string
  alias: string
  roles: string[]
  profile?: UserProfile
}

export type UserProfile = {
  id: string
  screen_name: string
  full_name: string
  avatar_url: string
  website: string
  join_reason: string
  nuclear_likes: string
  xUsername: string
  linkedin_profile_name: string
  joined_at: string
  updated_at: string
}
