import React from 'react'

import { InputProps } from 'models/common'
import StyledInput from './Wrapper'

function LocationInput(props: InputProps) {
  return (
    <StyledInput {...props} />
  )
}

export default LocationInput