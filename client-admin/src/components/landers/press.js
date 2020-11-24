import React from 'react'
import { Box, Link, Heading } from 'theme-ui'
import strings from '../../strings/strings'
import JsxParser from 'react-jsx-parser'

const Press = () => {
  return (
    <Box>
      <Heading
        as="h3"
        sx={{ fontSize: [4], lineHeight: 'body', my: [2, null, 3] }}>
        {strings('home_read')}
      </Heading>
      <Box sx={{ mb: [4, null, 5], maxWidth: '35em' }}>
        <JsxParser components={{ Link }} jsx={strings('home_read_content')}/>
      </Box>
    </Box>
  )
}

export default Press
