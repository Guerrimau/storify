import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
                contained: {
                    color: "white"
                }
            }
        }
    },
    palette: {
        primary: {
            main: "#95D85A"
        }
    }
})