import { NodeLayers } from '../src/container/live/layers'

export default { title: 'Layers' }

export const layersDefault = () => (
  <NodeLayers
    type="LAYERS"
    style={{
      width: 960,
      height: 540,
    }}
    childNodes={[
      {
        passiveMovements: [
          {
            direction: 'L',
          },
        ],
        type: 'IMG',
        url: '/assets/sky.jpg',
        style: {
          bottom: 0,
          animation: 'none',
        },
      },
      {
        passiveMovements: [
          {
            direction: 'L',
          },
        ],
        type: 'IMG',
        url: '/assets/mountain3.png',
        style: {
          bottom: -10,
        },
      },
      {
        passiveMovements: [
          {
            direction: 'L',
          },
        ],
        type: 'IMG',
        url: '/assets/mountain1.png',
        style: {
          bottom: -10,
        },
      },
      {
        passiveMovements: [
          {
            direction: 'R',
          },
        ],
        type: 'IMG',
        url: '/assets/mountain2.png',
        style: {
          bottom: -40,
        },
      },
    ]}
  />
)
