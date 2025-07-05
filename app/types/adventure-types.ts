export interface ContentBlockBase {
  _id?: string
  type: 'passage' | 'image' | 'video'
  label: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PassageBlock extends ContentBlockBase {
  type: 'passage'
  html: string
}

export interface ImageBlock extends ContentBlockBase {
  type: 'image'
  imageSrc: string
  position?: string
  caption?: string
}

export interface VideoBlock extends ContentBlockBase {
  type: 'video'
  url: string
}

export type ContentBlock = PassageBlock | ImageBlock | VideoBlock

export interface Transition {
  _id?: string
  toSceneId: string
  label: string
  prompt: string
}

export interface Scene {
  _id?: string
  chapterId: string
  title: string
  content: ContentBlock[]
  transitions?: Transition[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Chapter {
  _id: string
  title: string
  description?: string
  order: number
  createdAt?: Date
  updatedAt?: Date
  scenes: Scene[]
  openingSceneId?: string
}

export interface StorylineSummary {
  _id: string
  title: string
  author: string
  description?: string
  coverArt?: string
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

export interface Storyline extends StorylineSummary {
  chapters: Chapter[]
}

export interface Campaign {
  _id: string
  name: string
  storylineId: string
  players: string[]
}

export interface AdventureSummary {
  _id: string
  title: string
  overview?: string
  trailer?: string
  coverArt?: string
}

export interface Adventure extends AdventureSummary {
  storylines: Storyline[]
  scenes: Scene[]
}
