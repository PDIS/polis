import React from 'react'
import { Box, Link, Heading } from 'theme-ui'
import KnowledgeBase from './knowledgeBase'
import strings from '../../strings/strings'
import JsxParser from 'react-jsx-parser'

const ExploreKnowledgeBase = () => {
  return (
    <Box>
      <Heading
        as="h3"
        sx={{ fontSize: [4], lineHeight: 'body', my: [2, null, 3] }}>
        {strings('home_explore')}
      </Heading>
      <Box sx={{ mb: [4, null, 5], maxWidth: '35em' }}>
        <Box style={{ mb: [5, null, 6] }}>
          <JsxParser components={{ Link }} jsx={strings('home_explore_content')}/>
        </Box>
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/1GR4r4LX8"
          e="👋"
          txt={strings('home_explore_item_1')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/M3kl50tZp"
          e="🏎"
          txt={strings('home_explore_item_2')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/yOgKP4cOJ"
          e="🔩"
          txt={strings('home_explore_item_3')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/yYRydgFpz"
          e="📖"
          txt={strings('home_explore_item_4')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/FFCfORSze"
          e="⚗️"
          txt={strings('home_explore_item_5')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/ciPWF73Ss"
          e="👾"
          txt={strings('home_explore_item_6')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/nCWjNfNRP"
          e="👹"
          txt={strings('home_explore_item_7')}
        />
        <KnowledgeBase
          url="https://roamresearch.com/#/app/polis-methods/page/CHakFRWFR"
          e="🗞"
          txt={strings('home_explore_item_8')}
        />
      </Box>
    </Box>
  )
}

export default ExploreKnowledgeBase
