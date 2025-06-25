const chapters = [
  {
    id: 'chapter-1',
    title: 'I',
    scenes: [
      {
        id: 'scene-1',
        title: 'Lost',
        contentBlocks: [
          {
            id: 'block-1a',
            type: 'passage',
            label: 'opener',
            html: '<p>Zanzibar split with his party a couple of days ago. He was starting to wonder if his hunch was right. Down to his last piece of jerky, he moved forward.</p>',
          },
        ],
      },
    ],
  },
  {
    id: 'chapter-2',
    title: 'II',
    scenes: [
      {
        id: 'scene-3',
        title: 'Found',
        contentBlocks: [
          {
            id: 'block-2a',
            type: 'passage',
            label: 'Sample passage block',
            html: '<p>This is the first passage block.</p>',
          },
          {
            id: 'block-2b',
            type: 'image',
            label: 'Sample image block',
            imageSrc: '/path/to/image.jpg',
            position: 'float-right',
            caption: 'An example image',
          },
          {
            id: 'block-2c',
            type: 'video',
            label: 'Sample video block',
            url: '/path/to/vid.mpeg',
          },
          {
            id: 'block-2d',
            type: 'passage',
            label: 'Choices choices',
            html: '<p>There are winners, and there are losers. Who...are you?</p>',
          },
        ],
        transitions: [
          { id: 'transition-1', targetSceneId: 'scene-4', label: 'Smart people go this way.' },
          { id: 'transition-1', targetSceneId: 'scene-5', label: 'Dummies prefer this way.' },
        ],
      },
      { id: 'scene-4', title: 'Happy Ending', content: 'Sorry, that was a bad choice. Who knew?' },
      { id: 'scene-5', title: 'Sad Ending', content: 'You made a great choice.' },
    ],
  },
]
export default {
  id: 'sl-1',
  title: 'Zanzibar Nuhero',
  description: 'An epic adventure awaits!',
  coverArt: '/path/to/storyline-image.jpg',
  chapters: chapters,
}
