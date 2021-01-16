import React from 'react'

export const decorators = [
  Story => (
    <div>
      <script src="preact-text.js" />
      <script src="react-text.js" />
      <Story />
    </div>
  ),
]
