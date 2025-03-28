import { Box, Textarea, TextareaProps } from '@chakra-ui/react'
import * as React from 'react'
import SendIcon from '@/assets/icons/send-icon.svg?react'

const InputChat: React.FC = (props: TextareaProps) => {
  return (
    <Box>
       <Box position='relative'>
            <Textarea {...props} className='w-full py-3 px-4 pl-10 pb-12 lg:min-h-[100px] min-h-[50px] pr-12 resize-none' />
            <Box
                   className="right-3 bottom-3 !px-6 !py-2"
            >
                <SendIcon />
            </Box>
       </Box>
    </Box>
  )
}

export default InputChat