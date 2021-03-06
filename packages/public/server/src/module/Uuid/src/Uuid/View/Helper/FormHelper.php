<?php
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
namespace Uuid\View\Helper;

use Csrf\Form\CsrfForm;
use Zend\View\Helper\AbstractHelper;
use Zend\Form\Form;

class FormHelper extends AbstractHelper
{
    public function __invoke()
    {
        return $this;
    }

    public function getTrashForm($objectID)
    {
        $url = $this->getView()->url('uuid/trash', ['id' => $objectID]);
        /** @var Form $form */
        $form = new CsrfForm('uuid-trash');
        $form->setAttribute('action', $url);
        return $form;
    }
    public function getPurgeForm($objectID)
    {
        $url = $this->getView()->url('uuid/purge', ['id' => $objectID]);
        /** @var Form $form */
        $form = new CsrfForm('uuid-purge');
        $form->setAttribute('action', $url);
        return $form;
    }
}
