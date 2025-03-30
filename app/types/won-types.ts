export type SupportedOAuthProviders = 'google' | 'github' | 'x' | 'discord' | 'meta' | 'apple'

export interface Achievement {
  id: string
  name: string
  description: string
  karmaAwarded: number
  awardedAt: string
}

export interface FluxUserStats {
  fluxCount: number
  reactionCount: number
  boostCount: number
  followerCount: number
  followingCount: number
  karmaScore: number
}

export interface FluxProfile {
  id: string
  handle: string
  displayName: string
  joinedFluxAt: string
  emailNotifications: boolean
  textNotifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'never'
  stats: FluxUserStats | null
}

export interface UserCredentials {
  id: string
  alias: string
  roles: string[]
}

export interface UserProfile {
  id: string
  alias: string
  fullName: string
  avatarUrl: string
  bio: string
  location: string
  joinReason: string
  nuclearLikes: string
  xUsername: string
  website: string
  email: string
  karmaScore: number
  joinedAt: string
  updatedAt: string
  fluxProfile: FluxProfile | null
  achievements: Achievement[] | null
}

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

export interface UserPreferences {
  theme: 'system' | 'light' | 'dark'
  emailNotifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'never'
  showOnlineStatus: boolean
}

export interface Flux {
  id: number
  author: FluxProfile
  replyTo: number | null
  content: string
  timestamp: string
  viewCount: number
  replyCount: number
  boostCount: number
  boosted: boolean
}
