/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2020 Serlo Education e.V.
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
 * @copyright Copyright (c) 2013-2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import { createHintPlugin } from '@edtr-io/plugin-hint'
import * as React from 'react'

import { Controls, editorContent, entity, entityType } from './common'
import { RevisionHistory, Settings } from './helpers/settings'

export const textHintTypeState = entityType(
  {
    ...entity,
    // FIXME: hints don't have a title
    title: string(''),
    content: editorContent()
  },
  {}
)

const hintPlugin = createHintPlugin()

export const textHintTypePlugin: EditorPlugin<
  typeof textHintTypeState,
  { skipControls: boolean }
> = {
  Component: TextHintTypeEditor,
  state: textHintTypeState,
  config: {
    skipControls: false
  }
}

function TextHintTypeEditor(
  props: EditorPluginProps<typeof textHintTypeState, { skipControls: boolean }>
) {
  return (
    <React.Fragment>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      <hintPlugin.Component {...props} />
      {props.config.skipControls ? null : (
        <Controls subscriptions {...props.state} />
      )}
    </React.Fragment>
  )
}
