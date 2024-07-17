"use client";

import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "joy-ui" }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
};

export default ThemeRegistry;
