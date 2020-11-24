import React from 'react'
import Layout from './lander-layout'
import { Heading, Box, Text, Link } from 'theme-ui'
import ExploreKnowledgeBase from './exploreKnowledgeBase'
import Press from './press'
import strings from '../../strings/strings'
import JsxParser from 'react-jsx-parser'

const Index = () => {
  return (
    <Layout>
      <Heading as="h1" sx={{ my: [4, null, 5], fontSize: [6, null, 7] }}>
        {strings('home_title')}
      </Heading>
      <Heading
        as="h3"
        sx={{
          fontSize: [3, null, 4],
          lineHeight: 'body',
          mb: [4, null, 5]
        }}>
        {strings('home_subtitle')}
      </Heading>
      <Box sx={{ mb: [4, null, 5] }}>
        <Text>
          {strings('home_content')}
        </Text>
      </Box>
      <Heading
        as="h3"
        sx={{ fontSize: [4], lineHeight: 'body', mb: [2, null, 3] }}>
        {strings('home_getstart')}
      </Heading>
      <Box sx={{ mb: [4, null, 5] }}>
        <JsxParser components={{ Link }} jsx={strings('home_getstart_content')}/>
      </Box>
      <Press />
      <ExploreKnowledgeBase />
      <Heading
        as="h3"
        sx={{ fontSize: [4], lineHeight: 'body', my: [2, null, 3] }}>
        {strings('home_contribute')}
      </Heading>
      <Box sx={{ mb: [4, null, 5] }}>
        <JsxParser components={{ Link }} jsx={strings('home_contribute_content')}/>
      </Box>
    </Layout>
  )
}

export default Index
