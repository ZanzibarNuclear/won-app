export type ContentBlock =
  | PassageBlock
  | ImageBlock
  | VideoBlock

export interface PassageBlock {
  _id: string
  type: 'passage'
  label: string
  html: string
}

export interface ImageBlock {
  _id: string
  type: 'image'
  label: string
  imageSrc: string
  position?: string
  caption?: string
}

export interface VideoBlock {
  _id: string
  type: 'video'
  label: string
  url: string
}

export interface Transition {
  _id: string
  targetScene_id: string
  label: string
}

export interface Scene {
  _id: string
  title: string
  content: ContentBlock[]
  transitions?: Transition[]
}

export interface Chapter {
  _id: string
  title: string
  description?: string
  order: number
  createdAt?: Date
  updatedAt?: Date
  scenes: Scene[]
}

export interface StorylineSummary {
  _id: string
  title: string
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

function normalizeContentBlock(block: any): any {
  return {
    _id: block._id,
    type: block.type,
    label: block.label,
    html: block.html,
    ...(block.imageSrc ? { imageSrc: block.imageSrc } : {}),
    ...(block.position ? { position: block.position } : {}),
    ...(block.caption ? { caption: block.caption } : {}),
    ...(block.url ? { url: block.url } : {}),
  }
}

function normalizeScene(scene: any): Scene {
  return {
    _id: scene._id,
    title: scene.title,
    content: Array.isArray(scene.content)
      ? scene.content.map(normalizeContentBlock)
      : [],
    ...(scene.transitions ? { transitions: scene.transitions } : {}),
    ...(scene.content ? { content: scene.content } : {}),
  }
}

function normalizeChapter(chapter: any): Chapter {
  return {
    _id: chapter._id,
    title: chapter.title,
    order: chapter.order,
    description: chapter.description,
    createdAt: chapter.createdAt ? new Date(chapter.createdAt) : undefined,
    updatedAt: chapter.updatedAt ? new Date(chapter.updatedAt) : undefined,
    scenes: Array.isArray(chapter.scenes) ? chapter.scenes.map(normalizeScene) : [],
  }
}

export function normalizeStoryline(raw: any): Storyline {
  return {
    _id: raw._id,
    title: raw.title,
    description: raw.description,
    coverArt: raw.coverArt,
    createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : undefined,
    chapters: Array.isArray(raw.chapters) ? raw.chapters.map(normalizeChapter) : [],
  }
}
