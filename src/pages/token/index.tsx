import { Box, Grid } from "@chakra-ui/react";
import { TokenWhiteIcon } from "@/assets";
import { InputSearch } from "@/components/ui/input-group";
import TokenCard from "@/components/_app/token-card";

const Token = () => {
  const token = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <Box display="flex" alignItems="center" gap={2}>
        <Box>
          <TokenWhiteIcon width={25} height={25} />
        </Box>
        <Box>Token</Box>
      </Box>

      <Box className="my-4">
        <Box marginBottom={2}>Search</Box>
        <Box>
          <InputSearch />
        </Box>
      </Box>

      <Box className="my-4">
        <Box className="my-4">
          <Box className="my-4">Trending Tokens</Box>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {token.map(() => {
                return (
                  <TokenCard
                    name="Cardano"
                    symbol="ADA"
                    price={0.2345}
                    priceChangePercentage={25.78}
                    volume24h="123,456"
                  />
                );
              })}
            </Grid>
          </Box>
        </Box>
        <Box>
          <Box className="my-4">Smart Money Inflows</Box>
          <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {token.map(() => {
                return (
                  <TokenCard
                    name="Cardano"
                    symbol="ADA"
                    price={0.2345}
                    priceChangePercentage={25.78}
                    volume24h="123,456"
                  />
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Token;
