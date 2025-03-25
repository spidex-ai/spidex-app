import { firebaseAuth } from "@/api/firebase";
import { connectGoogle, connectX } from "@/features/auth/authAPI";
import { signIn } from "@/features/auth/authSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";

export const useGoogleLogin = () => {
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result?.user;
      const idToken = await user?.getIdToken?.();

      if (idToken) {
        const loginResponse = await connectGoogle(idToken);
        dispatch(signIn(loginResponse));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signInWithGoogle };
};

export const useXLogin = () => {
  const dispatch = useDispatch();

  const signInWithX = async (code: string, redirectUri: string) => {
    try {
      const loginResponse = await connectX(code, redirectUri);
      dispatch(signIn(loginResponse));
    } catch (error) {
      console.log(error);
    }
  };

  return { signInWithX };
}
