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
  object,
  string
} from '@edtr-io/plugin'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  serializedChild,
  HeaderInput,
  entityType
} from './common'
import { Settings } from './helpers/settings'

export const videoTypeState = entityType(
  {
    ...entity,
    content: serializedChild('video'),
    title: string(),
    description: editorContent(),
    reasoning: editorContent()
  },
  {}
)

export const videoTypePlugin: StatefulPlugin<typeof videoTypeState> = {
  Component: VideoTypeEditor,
  state: videoTypeState
}

function VideoTypeEditor(
  props: StatefulPluginEditorProps<typeof videoTypeState>
) {
  const { title, content, description } = props.state

  return (
    <section>
      <Settings
        id={props.state.id.value}
        onSwitchRevision={props.state.replaceOwnState}
      />
      <div className="page-header">
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder="Titel"
              value={title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                title.set(e.target.value)
              }}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <article>
        <section>{content.render()}</section>
        <section>{description.render()}</section>
      </article>
      <Controls subscriptions {...props.state} />
    </section>
  )
}
