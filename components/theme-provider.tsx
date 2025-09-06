"use client"

import * as React from "react"

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: (theme: string) => {},
})

const ThemeProvider = ({
  attribute,
  children,
  defaultTheme,
  storageKey,
}: {
  attribute: string
  children: React.ReactNode
  defaultTheme: string
  storageKey?: string
}) => {
  const [theme, setTheme] = React.useState(defaultTheme)

  React.useEffect(() => {
    const root = window.document.documentElement

    root.setAttribute(attribute, theme)
  }, [theme, attribute])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
  return React.useContext(ThemeContext)
}

export { ThemeProvider, useTheme }
