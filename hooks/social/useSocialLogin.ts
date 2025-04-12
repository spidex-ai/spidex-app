import { useSpidexCoreContext } from "@/app/_contexts";
import { firebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const useGoogleLogin = () => {
    const { connectGoogle, connectX } = useSpidexCoreContext();

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result?.user;
            const idToken = await user?.getIdToken?.();

            if (idToken) {
                await connectGoogle(idToken);
            }
        } catch (error: any) {
            throw error;
        }
    };

    return { signInWithGoogle };
};

export const useXLogin = () => {
    const { connectX } = useSpidexCoreContext();

    const signInWithX = async (code: string, redirectUri: string) => {
        try {
            const result = await connectX(code, redirectUri);
            return result;
        } catch (error: any) {
            throw error;
        }
    };

    return { signInWithX };
}
