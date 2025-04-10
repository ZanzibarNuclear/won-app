export type SupportedOAuthProviders = 'google' | 'github' | 'discord' | 'spotify'

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
  screenName: string
  avatarUrl: string
  bio: string
  location: string
  website: string
  nuclearLikes: string
  joinReason: string
  xUsername: string
  alias: string
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
