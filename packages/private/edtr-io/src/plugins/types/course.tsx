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
import {
  editorContent,
  standardElements,
  Controls,
  serializedChild
} from '../entities/common'

export const courseTypeState = StateType.object({
  ...standardElements,
  title: StateType.string(),
  content: editorContent(),
  reasoning: editorContent(),
  meta_description: StateType.string(),
  'course-page': StateType.list(serializedChild('coursePageEntity'))
})

export const courseTypePlugin: StatefulPlugin<typeof courseTypeState> = {
  Component: CourseTypeEditor,
  state: courseTypeState
}

function CourseTypeEditor(props: StatefulPluginEditorProps<typeof courseTypeState>) {
  const { content, 'course-page': coursePages, license } = props.state

  return (
    <div>
      {content.render()}
      {coursePages.items.map(page => {
        return (
          <React.Fragment key={page.id}>
            {page.render({ skipControls: true })}
          </React.Fragment>
        )
      })}
      <div>
        <img src={license.iconHref.value} />
        {license.title.value}
      </div>
      <Controls />
    </div>
  )
}