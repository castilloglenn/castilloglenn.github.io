// Tailwind CDN runtime configuration.
// Must load after the Tailwind CDN script and before the markup is styled.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        display: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
};
