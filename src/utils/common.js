import {useCallback, useRef, useState} from 'react'

export const menu = () => {
  document.querySelector('.sidebar').classList.toggle('close')
  document.querySelector('.sidebar').classList.toggle('open')
}

export const isLink = (str) => {
  if (
    str.search(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gi
    ) === -1
  ) {
    return false
  } else {
    return true
  }
}

export const colors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#8e44ad',
  '#e74c3c',
  '#95a5a6',
  '#d35400',
  '#f1c40f',
  '#16a085',
  '#0abde3',
  '#10ac84',
  '#00d2d3',
  '#54a0ff',
  '#5f27cd',
  '#c8d6e5',
  '#576574',
  '#01a3a4',
  '#ff9ff3',
  '#feca57',
]
