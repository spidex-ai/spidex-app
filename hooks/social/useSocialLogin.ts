import { useSpidexCoreContext } from '@/app/_contexts';
import { firebaseAuth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const useGoogleLogin = () => {
  const { connectGoogle } = useSpidexCoreContext();

  const signInWithGoogle = async (referralCode?: string) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result?.user;
      const idToken = await user?.getIdToken?.();

      if (idToken) {
        await connectGoogle(idToken, referralCode);
      }
    } catch (error: any) {
      throw error;
    }
  };

  return { signInWithGoogle };
};

export const useXLogin = () => {
  const { connectX } = useSpidexCoreContext();

  const signInWithX = async (
    code: string,
    redirectUri: string,
    referralCode?: string
  ) => {
    try {
      const result = await connectX(code, redirectUri, referralCode);
      return result;
    } catch (error: any) {
      throw error;
    }
  };

  return { signInWithX };
};

export const useDiscordLogin = () => {
  const { connectDiscord } = useSpidexCoreContext();

  const signInWithDiscord = async (
    code: string,
    redirectUri: string,
    referralCode?: string
  ) => {
    try {
      const result = await connectDiscord(code, redirectUri, referralCode);
      return result;
    } catch (error: any) {
      throw error;
    }
  };

  return { signInWithDiscord };
};

export const useTelegramLogin = () => {
  const { connectTelegram } = useSpidexCoreContext();

  const signInWithTelegram = async (
    id: string,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_date: number,
    hash: string,
    referralCode?: string
  ) => {
    try {
      const result = await connectTelegram(
        id,
        first_name,
        last_name,
        username,
        photo_url,
        auth_date,
        hash,
        referralCode
      );
      return result;
    } catch (error: any) {
      throw error;
    }
  };

  return { signInWithTelegram };
};
