/* eslint-env jest */
import { expect, expectSlate } from './common'
import split from '../src/split'

import spoiler from '@serlo-org/editor-plugin-spoiler'
import blockquote from '@serlo-org/editor-plugin-blockquote'
import injection from '@serlo-org/editor-plugin-injection'
import geogebra from '@serlo-org/editor-plugin-geogebra'
import image from '@splish-me/editor-plugin-image'

import { slatePlugin } from '@serlo-org/editor-plugins/lib/slate'

const cases = [
  {
    description: 'Simple Layout no split',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem ipsum' }]
            },
            {
              cells: [{ size: 12, raw: 'dolor adipiscing amet' }]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem ipsum')]
                    }
                  ]
                }
              ]
            },
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('dolor adipiscing amet')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with block element',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n![image](url)\n ipsum' }]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: image.name,
                              version: image.version
                            },
                            state: {
                              description: 'image',
                              src: 'url'
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('ipsum')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with injection',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n>[alttext](url)\n ipsum' }]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: injection.name,
                              version: injection.version
                            },
                            state: {
                              description: 'alttext',
                              src: 'url'
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('ipsum')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with spoiler',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: 'Lorem \n/// title\nmarkdowntext\n///\n ipsum'
                }
              ]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: spoiler.name,
                              version: spoiler.version
                            },
                            state: {
                              title: 'title',
                              content: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [expectSlate('markdowntext')]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('ipsum')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with image in spoiler',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: '/// title\nmarkdowntext with image ![image](url)\n///'
                }
              ]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: spoiler.name,
                              version: spoiler.version
                            },
                            state: {
                              title: 'title',
                              content: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [
                                            expectSlate(
                                              'markdowntext with image'
                                            )
                                          ]
                                        },
                                        {
                                          cells: [
                                            {
                                              content: {
                                                plugin: {
                                                  name: image.name,
                                                  version: image.version
                                                },
                                                state: {
                                                  description: 'image',
                                                  src: 'url'
                                                }
                                              }
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with geogebra injection',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [{ size: 12, raw: 'Lorem \n>[alttext](ggt/url)\n ipsum' }]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: geogebra.name,
                              version: geogebra.version
                            },
                            state: {
                              description: 'alttext',
                              src: 'url'
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('ipsum')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Layout with linked block element',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  raw: 'Lorem \n[![image](imageurl)](linkurl)\n ipsum'
                }
              ]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: image.name,
                              version: image.version
                            },
                            state: {
                              description: 'image',
                              src: 'imageurl',
                              href: 'linkurl'
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('ipsum')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Empty columns layout',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                { size: 3, raw: 'Lorem ipsum' },
                { size: 3, raw: 'dolor adipiscing amet' },
                { size: 3, raw: '' },
                { size: 3, raw: '' }
              ]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSlate('Lorem ipsum')]
                    }
                  ]
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSlate('dolor adipiscing amet')]
                    }
                  ]
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSlate('')]
                    }
                  ]
                },
                {
                  size: 3,
                  rows: [
                    {
                      cells: [expectSlate('')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    description: 'Blockquote',
    input: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  // raw: 'Ausgehend von der Normalparabelkann man jede beliebige Parabel konstruieren.Dazu benutzt man die  [Scheitelform](/2073): \n\n>%%f\\left(x\\right)=a(x-d)^2+e%%'
                  raw: 'Lorem \n> ipsum\n> dolor\n\n>sit amet\n\nconsectetur'
                }
              ]
            }
          ]
        }
      ]
    },
    output: {
      cells: [
        {
          rows: [
            {
              cells: [
                {
                  size: 12,
                  rows: [
                    {
                      cells: [expectSlate('Lorem')]
                    },
                    {
                      cells: [
                        {
                          content: {
                            plugin: {
                              name: blockquote.name,
                              version: blockquote.version
                            },
                            state: {
                              child: {
                                type: '@splish-me/editor-core/editable',
                                state: {
                                  cells: [
                                    {
                                      rows: [
                                        {
                                          cells: [
                                            expectSlate(
                                              '<p>ipsum dolor</p><p>sit amet</p>'
                                            )
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      cells: [expectSlate('consectetur')]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
]

cases.forEach(testcase => {
  describe('Transformes Serlo Layout to new Layout', () => {
    it(testcase.description, () => {
      expect(split(testcase.input), 'to equal', testcase.output)
    })
  })
})
