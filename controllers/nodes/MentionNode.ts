/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Spread } from 'lexical'

import {
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedTextNode,
  $applyNodeReplacement,
  TextNode,
} from 'lexical'

export type SerializedMentionNode = Spread<
  {
    label: string
    id: string
  },
  SerializedTextNode
>

function convertMentionElement(
  domNode: HTMLElement,
  mentionId: string,
): DOMConversionOutput | null {
  const textContent = domNode.textContent

  if (textContent !== null) {
    const node = $createMentionNode(textContent, mentionId)
    return {
      node,
    }
  }

  return null
}

const mentionStyle = 'background-color: rgba(24, 119, 232, 0.2); padding: 3px'

export class MentionNode extends TextNode {
  __mention_name: string
  static __mention_id: string

  constructor(mentionName: string, mentionId: string, text?: string, key?: NodeKey) {
    super(text ?? mentionName, key)
    this.__mention_name = mentionName
    this.__mention_id = mentionId
  }

  static getType(): string {
    return 'mention'
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mention_name, node.__mention_id, node.__text, node.__key)
  }

  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    const node = $createMentionNode(serializedNode.label, serializedNode.id)
    node.setTextContent(serializedNode.text)
    node.setFormat(serializedNode.format)
    node.setDetail(serializedNode.detail)
    node.setMode(serializedNode.mode)
    node.setStyle(serializedNode.style)
    return node
  }

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      label: this.__mention_name,
      id: this.__mention_id,
      type: 'mention',
      version: 1,
    }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    dom.style.cssText = mentionStyle
    dom.className = 'mention'
    return dom
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span')
    element.setAttribute('data-lexical-mention', 'true')
    element.textContent = this.__text
    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute('data-lexical-mention')) {
          return null
        }
        return {
          conversion: (domNode: HTMLElement) => convertMentionElement(domNode, this.__mention_id),
          priority: 1,
        }
      },
    }
  }

  isTextEntity(): true {
    return true
  }

  canInsertTextBefore(): boolean {
    return false
  }

  canInsertTextAfter(): boolean {
    return false
  }
}

export function $createMentionNode(mentionName: string, mentionId: string): MentionNode {
  const mentionNode = new MentionNode(mentionName, mentionId)
  mentionNode.setMode('segmented').toggleDirectionless()
  return $applyNodeReplacement(mentionNode)
}

export function $isMentionNode(node: LexicalNode | null | undefined): node is MentionNode {
  return node instanceof MentionNode
}
