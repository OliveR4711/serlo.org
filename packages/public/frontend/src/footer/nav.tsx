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
import * as React from 'react'
import { Icon } from '../icon.component'
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { getColor, getBreakpoint } from '../provider.component'
import styled from 'styled-components'

export interface NavChild {
  title: string
  url: string
  icon?: string
}
export interface NavEntry {
  title: string
  children: NavChild[]
}

export interface NavProps {
  navEntries: NavEntry[]
}

export function Nav(props: NavProps) {
  return (
    <FooterNavGrid fluid>
      <nav>
        <Row>
          {props.navEntries.map((category, index) => {
            const children = category.children.map((link, childindex) => {
              return (
                <NavLi key={index + childindex}>
                  <NavLink href={link.url}>
                    {link.icon && <Icon icon={link.icon} />} {link.title}
                  </NavLink>
                </NavLi>
              )
            })
            return (
              <ColWithPadding xs={12} md={6} lg key={index}>
                <CategoryHeader>{category.title}</CategoryHeader>
                <NavList>{children}</NavList>
              </ColWithPadding>
            )
          })}
        </Row>
      </nav>
    </FooterNavGrid>
  )
}

const FooterNavGrid = styled(Grid)`
  padding: 2rem 1.5rem 4rem !important;
  background-color: ${getColor('lightBackground')};
`

const ColWithPadding = styled(Col)`
  padding-right: 1rem;
`

const CategoryHeader = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #444;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  line-height: 1.35;
`

const NavLi = styled.li`
  display: inline;

  &:after {
    content: ' • ';
    color: #ccc;
    margin-right: 0.2rem;
  }
  &:last-child:after {
    content: '';
  }

  @media (min-width: ${getBreakpoint('lg')}) {
    display: block;
    margin-top: 0.3rem;
    &:after {
      display: none;
      content: '';
    }
  }
`

const NavLink = styled.a`
  color: #888;
  text-decoration: none;

  &:focus {
    text-decoration: none;
    color: #888;
  }
  &:hover {
    color: ${getColor('darkGray')};
    border-bottom: 2px solid #ccc;
  }
  &:hover,
  &:active {
    text-decoration: none;
  }
`
