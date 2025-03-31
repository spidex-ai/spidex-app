import { ConnectWalletIcon, Google, NamiIcon, XLogin, Yoroi } from "@/assets";
import {
  Box,
  CloseButton,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  HStack,
  Portal,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  selectAuth,
  setNonce,
  setWallet,
  signIn,
  signOut,
} from "@/features/auth/authSlice";
import { connectX, getNouce, useSignMessage } from "@/features/auth/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@/hooks/useSocialLogin";
import { useSearchParams } from "react-router-dom";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { GradientButton, GradientButtonIcon } from "../ui/button";
// Define wallet methods
const WALLET_METHODS = [
  {
    name: "Lace",
    icon: <NamiIcon />,
    description: "Connect Lace Wallet",
  },
  {
    name: "Yoroi",
    icon: <Yoroi />,
    description: "Connect Yoroi Wallet",
  },
];

// Define social login methods
const SOCIAL_METHODS = [
  {
    id: "google",
    name: "Google",
    icon: <Google />,
    description: "Login With Google",
  },
  {
    id: "xlogin",
    name: "X",
    icon: <XLogin />,
    description: "Login With X",
  },
];

type ConnectWalletProps = {
  isCollapsed?: boolean;
};

const ConnectWallet = (props: ConnectWalletProps) => {
  const { isCollapsed } = props;
  // Wallet connection state
  const [walletConnecting, setWalletConnecting] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const processedCodeRef = useRef<string | null>(null);

  // Redux state
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  // Router state
  const [params] = useSearchParams();

  // Custom hooks
  const signInMutation = useSignMessage();
  const { signInWithGoogle } = useGoogleLogin();

  // Cardano wallet integration
  const {
    // isEnabled,
    stakeAddress,
    connect,
    signMessage,
    disconnect,
    // enabledWallet,
  } = useCardano({
    limitNetwork: NetworkType.MAINNET,
  });

  // Determine if any connection is in progress
  const anyConnectionInProgress = walletConnecting !== null || isConnecting;

  // Derive base URL for social login redirects
  const baseUrl = useMemo(
    () => window.location.href.split("/").slice(0, 3).join("/") + "/",
    []
  );

  const isConnected = useMemo(() => Boolean(auth?.userId), [auth]);

  const formattedAddress = useMemo(() => {
    if (!auth?.walletAddress && !auth?.username && !auth?.email) return "";
    if (!auth?.walletAddress && auth.email) return auth.email.split("@")[0];
    if (!auth?.walletAddress && auth.username) return auth.username;

    const addr = auth.walletAddress;
    if (addr.length <= 14) return addr;

    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  }, [auth?.userId]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  /**
   * Handle wallet connection success
   */
  const onWalletConnectSuccess = () => {
    handleSignMessage();
  };

  /**
   * Handle wallet connection error
   */
  const onWalletConnectError = (error: Error) => {
    console.log("Wallet connection error", error);
    if (error.name === "WrongNetworkTypeError") {
      console.log("WrongNetworkTypeError");
    } else if (error.name === "WalletExtensionNotFoundError") {
      console.log("WalletExtensionNotFoundError");
    } else {
      console.log("Error", error);
    }
    setWalletConnecting(null);
  };

  /**
   * Connect to Cardano wallet
   */
  const handleConnectWallet = async (walletName: string) => {
    if (anyConnectionInProgress) {
      console.log("Connection already in progress");
      return;
    }

    setWalletConnecting(walletName);
    dispatch(setWallet(walletName));

    connect(
      walletName,
      () => onWalletConnectSuccess(),
      (error: Error) => onWalletConnectError(error)
    );
  };
  console.log("walletConnecting", walletConnecting);

  /**
   * Sign message with connected wallet
   */
  const handleSignMessage = async () => {
    try {
      const nonce = await getNouce();
      if (!nonce) return;

      dispatch(setNonce(nonce));

      await signMessage(
        nonce,
        (signature: string, key: string | undefined) =>
          signInMutation.mutate({
            address: stakeAddress!,
            signature,
            publicKey: key || "",
            role: "user",
          }),
        () => {
          console.log("Sign message failed");
          disconnect();
        }
      );
    } catch (error) {
      console.log("Error", error);
    } finally {
      console.log("Sign message complete");
      setWalletConnecting(null);
    }
  };

  /**
   * Connect with Google
   */
  const handleConnectGoogle = () => {
    if (anyConnectionInProgress) return;
    setIsConnecting(true);
    signInWithGoogle();
  };

  /**
   * Connect with X (Twitter)
   */
  const handleConnectX = () => {
    if (anyConnectionInProgress) return;
    setIsConnecting(true);
    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=MFkxSjU3TjVWUGpMLVhYV08tblU6MTpjaQ&redirect_uri=${baseUrl}&scope=tweet.read%20users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = xAuthUrl;
  };

  /**
   * Handle X (Twitter) OAuth callback
   */
  const handleXCallback = async (code: string, redirectUri: string) => {
    try {
      if (isConnecting) return;

      setIsConnecting(true);
      const result = await connectX(code, redirectUri);

      if (result) {
        dispatch(signIn(result));
        console.log("X login successful");
        // remove code from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    } catch (error) {
      console.error("Error connecting X account:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle X login callback via URL params
  useEffect(() => {
    const socialConnectCode = params.get("code");
    if (socialConnectCode && socialConnectCode !== processedCodeRef.current) {
      processedCodeRef.current = socialConnectCode;
      handleXCallback(socialConnectCode, baseUrl);
    }
  }, [params, baseUrl]);

  // Render wallet connection option
  const renderWalletOption = (method: (typeof WALLET_METHODS)[0]) => {
    const isThisWalletConnecting = walletConnecting === method.name;
    const isDisabled = anyConnectionInProgress && !isThisWalletConnecting;

    return (
      <Box
        key={method.name}
        p={3}
        borderRadius="md"
        border="1px solid"
        borderColor={isThisWalletConnecting ? "blue.500" : "gray.200"}
        bg={isThisWalletConnecting ? "blue.50" : "white"}
        _hover={{
          borderColor: isDisabled ? "gray.200" : "blue.500",
          bg: isDisabled ? "white" : "blue.50",
        }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.5 : 1}
        transition="all 0.2s"
        onClick={() => !isDisabled && handleConnectWallet(method.name)}
      >
        <HStack justifyContent="space-between">
          <HStack>
            <Box
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {method.icon}
            </Box>
            <Box>
              <Text fontWeight="bold" color="black">
                {method.description}
              </Text>
            </Box>
          </HStack>

          {isThisWalletConnecting && <Spinner size="sm" color="blue.500" />}
        </HStack>
      </Box>
    );
  };

  // Render social login option
  const renderSocialOption = (method: (typeof SOCIAL_METHODS)[0]) => {
    const handleClick =
      method.id === "google" ? handleConnectGoogle : handleConnectX;

    const isThisConnecting = isConnecting && !walletConnecting;
    const isDisabled = anyConnectionInProgress && walletConnecting !== null;

    return (
      <Box
        key={method.id}
        p={3}
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        _hover={{
          borderColor: isDisabled ? "gray.200" : "blue.500",
          bg: isDisabled ? "white" : "blue.50",
        }}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.5 : 1}
        transition="all 0.2s"
        onClick={() => !isDisabled && handleClick()}
      >
        <HStack justifyContent="space-between">
          <HStack>
            <Box
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {method.icon}
            </Box>
            <Box>
              <Text fontWeight="bold" color="black">
                {method.description}
              </Text>
            </Box>
          </HStack>

          {isThisConnecting &&
            method.id === "xlogin" &&
            processedCodeRef.current && <Spinner size="sm" color="blue.500" />}
        </HStack>
      </Box>
    );
  };
  if (isConnected) {
    return (
      <MenuRoot>
        <MenuTrigger asChild>
          <GradientButton>{formattedAddress}</GradientButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="disconnect" onClick={handleSignOut}>
            Disconnect
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    );
  }

  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        {isCollapsed ? (
          <GradientButtonIcon>
            <ConnectWalletIcon />
          </GradientButtonIcon>
        ) : (
          <GradientButton>
            <div className="flex items-center gap-2">
              <div>
                <ConnectWalletIcon />
              </div>
              <div>Connect Wallet</div>
            </div>
          </GradientButton>
        )}
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent bgColor="white" maxWidth="450px">
            <DialogHeader>
              <DialogTitle color="black">Connect a wallet</DialogTitle>
              <DialogCloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="black"
                  _hover={{
                    color: "white",
                  }}
                />
              </DialogCloseTrigger>
            </DialogHeader>
            <DialogBody>
              {/* Wallet connection options */}
              <VStack align="stretch" mb={6}>
                <Text fontWeight="medium" color="gray.700" mb={1}>
                  Cardano Wallets
                </Text>
                {WALLET_METHODS.map(renderWalletOption)}
              </VStack>

              {/* Social login options */}
              <VStack align="stretch">
                <Text fontWeight="medium" color="gray.700" mb={1}>
                  Continue with
                </Text>
                {SOCIAL_METHODS.map(renderSocialOption)}
              </VStack>
            </DialogBody>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};

export default ConnectWallet;
