import type { ParsedContent } from '@nuxt/content'
import type { Avatar, Badge, Link } from '#ui/types'

// for global types that are automatically loaded

export interface BlogPost extends ParsedContent {
  title: string
  description: string
  date: string
  image?: HTMLImageElement
  badge?: Badge
  authors?: ({
    name: string
    description?: string
    avatar: Avatar
  } & Link)[]
}

export interface FluxPost {
  postKey: string
  postedAt: string
  author: {
    display: string
    handle: string
    avatar: string
  }
  stats: {
    reactions: number
    views: number
    boosts: number
  }
  postContent: string
};
