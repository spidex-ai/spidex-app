import React from 'react'
import { GradientBorderButton } from "@/components/ui/button";
import { Box } from "@chakra-ui/react";
import { ProfileWhiteIcon, LogoutIcon, ExampleAva, XIcon, GoogleWhiteIcon, EmailWhiteIcon } from "@/assets";
const Account: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      <Box className="flex justify-between gap-4">
        <Box className="flex items-center gap-2">
          <Box>
            <ProfileWhiteIcon />
          </Box>
          <Box>Account</Box>
        </Box>
        <Box className="flex items-center gap-2">
          <Box>
            <LogoutIcon />
          </Box>
          <Box>Log out</Box>
        </Box>
      </Box>
      <Box className="border boder-1 border-gray-800 p-8 rounded-2xl">
        <Box className="flex justify-between">
          <Box display="flex" gap={3}>
            <Box>
              <ExampleAva />
            </Box>
            <Box>
              <Box>0x45e61e2f23...99990z</Box>
              <Box>Joined on 3/19/2025</Box>
            </Box>
          </Box>

          <Box>
            <GradientBorderButton>Change profile picture</GradientBorderButton>
          </Box>
        </Box>

        <Box h="1px" w="100%" bg="#5D717D99" marginY="20px" />
        <Box>
          <Box className="text-xs text-[#5D717D]">User ID</Box>
          <Box className="text-xs mt-2">cm8fd5nqk01x4zpzjv7ud3udf</Box>
        </Box>

        <Box h="1px" w="100%" bg="#5D717D99" marginY="20px" />

        <Box>
          <Box className="text-xs text-[#5D717D]">Connected Wallet</Box>
          <Box className="text-xs mt-2">HTn8zrOU8elEdMvRIrKErdHOx6plJp4LQ</Box>
        </Box>
      </Box>

      <Box>
        <Box className="mb-3">Connected Account</Box>
        <Box className="border boder-1 border-gray-800 p-8 rounded-2xl">
          <Box className="flex justify-between">
            <Box className="flex gap-4">
              <Box className="flex items-center justify-center">
                <XIcon width={25} height={25} />
              </Box>
              <Box className="flex flex-col justify-center">
                <Box className="text-xs">Twitter</Box>
                <Box className="text-xs">Not connected</Box>
              </Box>
            </Box>
            <Box>
              <GradientBorderButton>Connect</GradientBorderButton>
            </Box>
          </Box>
          <Box h="1px" w="100%" bg="#5D717D99" marginY="20px" />
          <Box className="flex justify-between">
            <Box className="flex gap-4">
              <Box className="flex items-center justify-center">
                <GoogleWhiteIcon width={25} height={25} />
              </Box>
              <Box className="flex flex-col justify-center">
                <Box className="text-xs">Twitter</Box>
                <Box className="text-xs">Not connected</Box>
              </Box>
            </Box>
            <Box>
              <GradientBorderButton>Connect</GradientBorderButton>
            </Box>
          </Box>
          <Box h="1px" w="100%" bg="#5D717D99" marginY="20px" />
          <Box className="flex justify-between">
            <Box className="flex gap-4">
              <Box className="flex items-center justify-center">
                <EmailWhiteIcon width={25} height={25} />
              </Box>
              <Box className="flex flex-col justify-center">
                <Box className="text-xs">Twitter</Box>
                <Box className="text-xs">Not connected</Box>
              </Box>
            </Box>
            <Box>
              <GradientBorderButton>Connect</GradientBorderButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Account;
