import blockquote from '@serlo-org/editor-plugin-blockquote'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import image from '@splish-me/editor-plugin-image'
import injection from '@serlo-org/editor-plugin-injection'
import spoiler from '@serlo-org/editor-plugin-spoiler'
import table from '@serlo-org/editor-plugin-table'
import { v4 } from 'uuid'

import markdownToSlate from './markdownToSlate'

const createPlugins = ({ normalized, elements }) => {
  const split = normalized
    .split(/(§\d+§)/)
    .map(s => s.trim())
    .filter(s => s !== '')

  if (!split.length) {
    return [
      {
        cells: [markdownToSlate('')]
      }
    ]
  }
  return split.map(markdown => {
    // console.log(markdown)
    const elementIDMatch = /§(\d+)§/.exec(markdown)
    // console.log(elementID)
    if (elementIDMatch !== null) {
      return {
        cells: [createPluginCell(elements[elementIDMatch[1]])]
      }
    } else {
      return {
        cells: [markdownToSlate(markdown)]
      }
    }
  })
}
const createPluginCell = elem => {
  switch (elem.name) {
    case 'table':
      return {
        content: {
          plugin: {
            name: table.name,
            version: table.version
          },
          state: {
            src: elem.src
          }
        }
      }
    case 'spoiler':
      return {
        content: {
          plugin: {
            name: spoiler.name,
            version: spoiler.version
          },
          state: {
            title: elem.title,
            content: {
              type: '@splish-me/editor-core/editable',
              state: {
                id: v4(),
                cells: [
                  {
                    id: v4(),
                    rows: createPlugins(elem.content)
                  }
                ]
              }
            }
          }
        }
      }
    case 'blockquote':
      return {
        content: {
          plugin: {
            name: blockquote.name,
            version: blockquote.version
          },
          state: {
            child: {
              type: '@splish-me/editor-core/editable',
              state: {
                id: v4(),
                cells: [
                  {
                    id: v4(),
                    rows: createPlugins(elem.content)
                  }
                ]
              }
            }
          }
        }
      }
    case 'injection':
      return {
        content: {
          plugin: {
            name: injection.name,
            version: injection.version
          },
          state: {
            description: elem.description,
            src: elem.src
          }
        }
      }
    case 'geogebra':
      return {
        content: {
          plugin: {
            name: geogebra.name,
            version: geogebra.version
          },
          state: {
            description: elem.description,
            src: elem.src
          }
        }
      }
    case 'image':
      return {
        content: {
          plugin: {
            name: image.name,
            version: image.version
          },
          state: {
            description: elem.description,
            title: elem.title,
            src: elem.src,
            href: elem.href ? elem.href : undefined
          }
        }
      }
    default:
      return {
        content: {
          plugin: {
            name: elem.name
          },
          state: {
            ...elem
          }
        }
      }
  }
}

export default createPlugins
