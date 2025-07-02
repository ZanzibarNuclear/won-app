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

// --- Transition ---
export interface Transition {
  targetSceneId: string
  label: string
  prompt: string
}

// --- Scene ---
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

function normalizeContentBlock(block: any): ContentBlock {
  switch (block.type) {
    case 'passage':
      return {
        _id: block._id,
        type: 'passage',
        label: block.label,
        html: block.html,
        createdAt: block.createdAt ? new Date(block.createdAt) : undefined,
        updatedAt: block.updatedAt ? new Date(block.updatedAt) : undefined,
      }
    case 'image':
      return {
        _id: block._id,
        type: 'image',
        label: block.label,
        imageSrc: block.imageSrc,
        position: block.position,
        caption: block.caption,
        createdAt: block.createdAt ? new Date(block.createdAt) : undefined,
        updatedAt: block.updatedAt ? new Date(block.updatedAt) : undefined,
      }
    case 'video':
      return {
        _id: block._id,
        type: 'video',
        label: block.label,
        url: block.url,
        createdAt: block.createdAt ? new Date(block.createdAt) : undefined,
        updatedAt: block.updatedAt ? new Date(block.updatedAt) : undefined,
      }
    default:
      throw new Error(`Unknown ContentBlock type: ${block.type}`)
  }
}

function normalizeScene(scene: any): Scene {
  return {
    _id: scene._id,
    title: scene.title,
    content: Array.isArray(scene.content)
      ? scene.content.map(normalizeContentBlock)
      : [],
    transitions: Array.isArray(scene.transitions)
      ? scene.transitions.map((t: any) => ({
        targetSceneId: t.targetSceneId,
        label: t.label,
        prompt: t.prompt,
      }))
      : [],
    createdAt: scene.createdAt ? new Date(scene.createdAt) : undefined,
    updatedAt: scene.updatedAt ? new Date(scene.updatedAt) : undefined,
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
