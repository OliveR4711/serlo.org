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
import * as React from 'react'
import {
  StatefulPlugin,
  StatefulPluginEditorProps,
  StateType
} from '@edtr-io/core'
import { EditorInput } from '@edtr-io/editor-ui'
import { standardElements, Controls, editorContent } from './common'

export const coursePageState = StateType.object({
  ...standardElements,
  icon: StateType.string('explanation'),
  title: StateType.string(''),
  content: editorContent()
})

export const coursePagePlugin: StatefulPlugin<typeof coursePageState> = {
  Component: CoursePageEditor,
  state: coursePageState
}

function CoursePageEditor(
  props: StatefulPluginEditorProps<typeof coursePageState> & {
    skipControls?: boolean
  }
) {
  const { icon, content, title, changes, license } = props.state

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    title.set(e.target.value)
  }

  function handleMetaTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    meta_title.set(e.target.value)
  }
  function handleMetaDescriptionChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    meta_description.set(e.target.value)
  }
  function handleLicenseChange(e: React.ChangeEvent<HTMLInputElement>) {
    //TODO
  }

  return (
    <article>
      {icon()}
      <div className="page-header">
        <h1>
          {props.editable ? (
            <EditorInput
              placeholder="Titel"
              value={title.value}
              onChange={handleTitleChange}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}{' '}
        </h1>
      </div>
      {content.render()}
      {props.skipControls ? null : <Controls />}
    </article>
  )
}
