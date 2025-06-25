export type ContentBlock =
  | PassageBlock
  | ImageBlock
  | VideoBlock

export interface PassageBlock {
  id: string
  type: 'passage'
  label: string
  html: string
}

export interface ImageBlock {
  id: string
  type: 'image'
  label: string
  imageSrc: string
  position?: string
  caption?: string
}

export interface VideoBlock {
  id: string
  type: 'video'
  label: string
  url: string
}

export interface Transition {
  id: string
  targetSceneId: string
  label: string
}

export interface Scene {
  id: string
  title: string
  contentBlocks?: ContentBlock[]
  transitions?: Transition[]
}

export interface Chapter {
  id: string
  title: string
  scenes: Scene[]
}

export interface AdventureStoryline {
  id: string
  title: string
  description: string
  coverArt: string
  chapters: Chapter[]
}