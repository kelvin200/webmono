import { NodeLayers } from '../src/renderer/layers'

export default { title: 'Layers' }

export const layersDefault = () => (
  <NodeLayers
    type="LAYERS"
    width={960}
    height={540}
    childNodes={[
      {
        passiveMovements: [
          {
            direction: 'L',
          },
        ],
        type: 'IMG',
        url: '/assets/mountain.png',
      },
      {
        passiveMovements: [
          {
            direction: 'R',
          },
        ],
        type: 'IMG',
        url: '/assets/mountain2.png',
      },
    ]}
  />
)
