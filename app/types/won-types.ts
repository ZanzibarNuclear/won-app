// these types require import, which may be good separation for limited use

export type SupportedOAuthProviders = 'google' | 'github' | 'discord' // | 'spotify' | 'apple' | 'facebook' | 'x'

export interface Achievement {
  id: string
  name: string
  description: string
  karmaAwarded: number
  awardedAt: string
}

export interface ApiKeys {
  createdAt: string
  description: string
  expiresAt: string
  id: number
  keyHash: string;
  lastUsedAt: string
  revokedAt: string
  userId: string
}

export interface Flux {
  id: number
  authorId: number
  author: {
    alias: string
    handle: string
    avatar: string
  }
  reactingTo: number | null;
  content: string;
  views: number
  boosts: number
  reactions: number
  postedAt: string
  updatedAt: string
}

export interface FluxAuthor {
  id: number
  handle: string
  alias: string
  avatar: string
  joinedAt: string
  followers: number
  following: number
}

export interface FluxUser {
  id: number
  userId: string
  followers: number
  following: number
  createdAt: string
}

export interface FluxesReturned {
  items: Flux[]
  total: number
  hasMore: boolean
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

export interface FluxProfileDeltas {
  handle: string
  displayName: string
  emailNotifications: boolean
  textNotifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'never'
}

export interface UserCredentials {
  id: string
  alias: string
  roles: string[]
}

export interface PublicUserProfile {
  alias: string | null
  avatar: string | null
  bio: string | null
  createdAt: Date
  glamShot: string | null
  handle: string | null
  karmaScore: number
  location: string | null
  website: string | null
  whyJoined: string | null
  whyNuclear: string | null
}

export interface UserProfile {
  id: string
  alias: string | null
  handle: string | null
  fullName: string | null
  avatar: string | null
  glamShot: string | null
  bio: string | null
  location: string | null
  website: string | null
  whyJoined: string | null
  whyNuclear: string | null
  karmaScore: number
  createdAt: Date
  updatedAt: Date
}

export interface UserProfileDeltas {
  alias: string | null
  handle: string | null
  fullName: string | null
  avatar: string | null
  glamShot: string | null
  bio: string | null
  location: string | null
  website: string | null
  whyJoined: string | null
  whyNuclear: string | null
}

export type NameTag = {
  alias: string
  handle: string
  avatar: string
}


export type UserInfo = {
  id: string
  alias: string
  roles: string[]
  profile?: UserProfile
  fluxUser?: FluxUser
}

export interface Users {
  alias: string
  createdAt: string
  email: string
  emailVerifiedAt: string
  id: string
  lastSignInAt: string
  systemBot: boolean
  updatedAt: string
}

export interface UserPreferences {
  theme: 'system' | 'light' | 'dark'
  emailNotifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'never'
  showOnlineStatus: boolean
}

export interface UsersReturned {
  items: Users[]
  total: number
  hasMore: boolean
}

