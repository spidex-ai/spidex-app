import { UserSpidex } from '@/hooks/core/useSpidexCore';

export const pfpURL = (user: UserSpidex, cacheBust: boolean = true) => {
  return `${process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_URL}/images/${user.id}?sv=${process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_STRING}${cacheBust ? `&t=${Date.now()}` : ''}`;
};
