import React from 'react'

export default { title: 'Showcase' }

export const showcase = () => (
  <div>
    <h2>Preact sample with CSS</h2>
    <preact-sample-css />
    <preact-sample-css color="orange" name="Prop changed" />
  </div>
)
