/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2019 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2019 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import {
  StatefulPlugin,
  StatefulPluginEditorProps,
  list,
  object
} from '@edtr-io/plugin'
import * as React from 'react'

import { editorContent, entity, Controls, serializedChild } from './common'

export const textExerciseGroupTypeState = object({
  ...entity,
  content: editorContent(),
  'grouped-text-exercise': list(serializedChild('type-text-exercise'))
})

export const textExerciseGroupTypePlugin: StatefulPlugin<
  typeof textExerciseGroupTypeState
> = {
  Component: TextExerciseGroupTypeEditor,
  state: textExerciseGroupTypeState
}

function TextExerciseGroupTypeEditor(
  props: StatefulPluginEditorProps<typeof textExerciseGroupTypeState>
) {
  const { content, 'grouped-text-exercise': children } = props.state

  return (
    <article className="exercisegroup">
      <section className="row">{content.render()}</section>
      {children.map((child, index) => {
        return (
          <section className="row" key={child.id}>
            <div className="col-sm-1 hidden-xs">
              <em>{String.fromCharCode(97 + index)})</em>
            </div>
            <div className="col-sm-11 col-xs-12">
              {child.render({ skipControls: true })}
            </div>
          </section>
        )
      })}
      <Controls subscriptions {...props.state} />
    </article>
  )
}
