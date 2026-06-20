// Tailwind CDN runtime configuration.
// Must load after the Tailwind CDN script and before the markup is styled.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', "cursive"],
        body: ['"Quicksand"', "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#fff6f2",
        "cream-2": "#fde9ef",
        blush: "#fbd5e3",
        rose: "#f6a5c0",
        "rose-deep": "#e7799f",
        plum: "#6b4f5b",
        "plum-soft": "#9a7d88",
      },
    },
  },
};
