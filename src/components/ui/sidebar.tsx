import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Coins,
  User,
} from "lucide-react";
import { Box, VStack, Flex, Text } from "@chakra-ui/react";

import {
  ArrowGrayIconDown,
  ChatIconBlink,
  CollapseIcon,
  LogoIcon,
  PlusBlinkIcon,
  ArrowGrayIcon,
  TokenWhiteIcon,
  ProfileWhiteIcon,
} from "@/assets";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box position="relative">
      <Box
        minH="100vh"
        bg="#0B1320"
        boxShadow="lg"
        transition="width 0.3s"
        w={isCollapsed ? "64px" : "256px"}
        padding="10px"
      >
        <Box marginTop="10px">
          <Box
            display="flex"
            paddingX="10px"
            paddingY="15px"
            justifyContent="space-between"
            height="100%"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <div>
                <LogoIcon width={25} height={25} />
              </div>
              {!isCollapsed && <Box transition="width 0.3s">Spidex AI</Box>}
            </Box>
            <Box>
              {isCollapsed ? (
                <Box
                  aria-label="Toggle Sidebar"
                  position="absolute"
                  left={isCollapsed ? "80px" : "200px"}
                  top="36px"
                  rounded="full"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  zIndex={2}
                  boxShadow="md"
                  cursor="pointer"
                >
                  <CollapseIcon width={20} height={20} />
                </Box>
              ) : (
                <Box
                  aria-label="Toggle Sidebar"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  zIndex={2}
                  boxShadow="md"
                  cursor="pointer"
                >
                  <CollapseIcon width={20} height={20} />
                </Box>
              )}
            </Box>
          </Box>

          <Box h="1px" w="100%" bg="#5D717D99" marginTop="10px" />

          <Box marginTop="20px" paddingX="10px" paddingY="15px">
            <Box display="flex" flexDirection="column" gap={4}>
              <Link to="/app/chat">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  cursor="pointer"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box>
                      <ChatIconBlink width={14} height={13} />
                    </Box>
                    {!isCollapsed && <Box>Chat</Box>}
                  </Box>
                  {!isCollapsed && (
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box cursor="pointer">
                        <PlusBlinkIcon width={14} height={14} />
                      </Box>
                      <Box cursor="pointer">
                        <ArrowGrayIconDown width={14} height={14} />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Link>

              <Link to="/app/token">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  cursor="pointer"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box>
                      <TokenWhiteIcon width={14} height={14} />
                    </Box>
                    {!isCollapsed && <Box>Token</Box>}
                  </Box>
                  {!isCollapsed && (
                    <Box>
                      <ArrowGrayIconDown width={14} height={14} />
                    </Box>
                  )}
                </Box>
              </Link>

              <Link to="/app/account">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  cursor="pointer"
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box>
                      <ProfileWhiteIcon width={14} height={14} />
                    </Box>
                    {!isCollapsed && <Box>Profile</Box>}
                  </Box>
                  {!isCollapsed && (
                    <Box>
                      <ArrowGrayIconDown width={14} height={14} />
                    </Box>
                  )}
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
