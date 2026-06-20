import { useTheme } from "../ui/ThemeProvider";

export function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    tooltipStyle: {
      background: isDark ? "#0f1723" : "#ffffff",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
      borderRadius: "10px",
      color: isDark ? "#e8eef7" : "#1a2332",
    },
    gridStroke: isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.06)",
    axisStroke: isDark ? "#6b7c93" : "#94a3b8",
  };
}
