"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = Omit<
  React.ComponentProps<typeof NextThemesProvider>,
  "nonce" | "scriptProps"
> & {
  nonce?: string;
};

export function ThemeProvider({ children, nonce, ...props }: ThemeProviderProps) {
  // Pass suppressHydrationWarning to prevent hydration mismatches
  // The script is rendered by next-themes internally with suppressHydrationWarning already set
  const scriptProps = { suppressHydrationWarning: true };

  return (
    <NextThemesProvider
      {...props}
      nonce={nonce}
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}