import { Box } from "@chakra-ui/react"
import { TokenWhiteIcon } from "@/assets"

const Token = () => {
  return (
    <div>
      <Box display="flex" alignItems="center" gap={2}>
        <Box>
          <TokenWhiteIcon width={25} height={25} />
        </Box>
        <Box>Token</Box>
      </Box>

      <Box>
        <Box>Search</Box>
      </Box>

    <Box>
      <Box>
        <Box>Trending Tokens</Box>
        <Box>

          
        </Box>
      </Box>
      <Box>Smart Money Inflows</Box>
    </Box>

    </div>
  )
}

export default Token