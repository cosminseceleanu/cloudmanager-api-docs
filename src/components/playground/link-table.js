/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, THead, Th, TBody, Tr, Td } from '@adobe/gatsby-theme-aio/src/components/Table'
import { LinkOut } from '@adobe/gatsby-theme-aio/src/components/WorkflowIcons'
import { ActionButton, Text } from '@adobe/gatsby-theme-aio/src/components/ActionButton'
import CustomRequestDialog from './custom-request-dialog'
import { Edit } from '@adobe/gatsby-theme-aio/src/components/Icons'
import TemplatedRequestDialog from './template-request-dialog'

const LinkTable = ({
  links,
  setRequest,
  response,
  schema,
}) => {
  const [customDialogOpen, setCustomDialogOpen] = useState(null)
  const [templatedDialogOpen, setTemplatedDialogOpen] = useState(null)

  return (
      <Table width="100%">
          <THead>
            <Tr>
              <Th>rel</Th>
              <Th>href</Th>
              <Th>actions</Th>
            </Tr>
          </THead>
        <TBody>
        {Object.keys(links).map(rel => {
          const href = links[rel].href
          const templated = links[rel].templated
          const description = schema && schema.properties && schema.properties[rel] && schema.properties[rel].description
          const onSubmit = (req) => {
            setCustomDialogOpen(null)
            setTemplatedDialogOpen(null)
            setRequest(req)
          }
          return (
          <Tr key={rel}>
            <Td>
              <code className="spectrum-Code spectrum-Code--sizeS">{rel}</code>
              {description && (<div>{description}</div>)}
            </Td>
            <Td>
              <code className="spectrum-Code spectrum-Code--sizeS">{href}</code>
            </Td>
            <Td>
              <ActionButton title="GET Request" aria-label="GET Request" onClick={() => {
                if (templated) {
                  setTemplatedDialogOpen(rel)
                } else {
                  setRequest({ method: 'GET', path: href, body: '' })
                }
              }}>
                <LinkOut />
                <Text>GET Request</Text>
              </ActionButton>
              &nbsp;
              <ActionButton title="Customize Request" aria-label="Customize Request" onClick={() => setCustomDialogOpen(rel)}>
                <Edit />
                <Text>Custom Request</Text>
              </ActionButton>
              {(customDialogOpen === rel) && <CustomRequestDialog path={href} currentResponse={response} onSubmit={onSubmit} onCancel={() => setCustomDialogOpen(null)} />}
              {(templatedDialogOpen === rel) && <TemplatedRequestDialog path={href} currentResponse={response} onSubmit={onSubmit} onCancel={() => setTemplatedDialogOpen(null)} />}
            </Td>
          </Tr>)
        })}
        </TBody>
      </Table>
  )
}

LinkTable.propTypes = {
  setRequest: PropTypes.func.isRequired,
  links: PropTypes.object,
  response: PropTypes.object.isRequired,
  schema: PropTypes.object,
}

export default LinkTable
