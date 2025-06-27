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
  contentBlocks: ContentBlock[]
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

function normalizeContentBlock(block: any): any {
  return {
    id: block.id,
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
    id: scene.id,
    title: scene.title,
    contentBlocks: Array.isArray(scene.contentBlocks)
      ? scene.contentBlocks.map(normalizeContentBlock)
      : [],
    ...(scene.transitions ? { transitions: scene.transitions } : {}),
    ...(scene.content ? { content: scene.content } : {}),
  }
}

function normalizeChapter(chapter: any): Chapter {
  return {
    id: chapter.id,
    title: chapter.title,
    scenes: Array.isArray(chapter.scenes) ? chapter.scenes.map(normalizeScene) : [],
  }
}

export function normalizeStoryline(raw: any): AdventureStoryline {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    coverArt: raw.coverArt,
    chapters: Array.isArray(raw.chapters) ? raw.chapters.map(normalizeChapter) : [],
  }
}
