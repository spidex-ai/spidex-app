export const getLogoUrl = (logo: string) => {
    if (!logo) return "";
    console.log({ logo });
    if (logo.startsWith("data:image")) return logo;
    return `data:image/png;base64,${logo}`;
  };