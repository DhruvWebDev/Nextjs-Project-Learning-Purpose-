

export const saveThemeForOrg = (theme:string) => {
  const validThemes = ["light", "dark", "system"]; // Valid theme modes

  if (!validThemes.includes(theme)) {
      console.error(`Invalid theme: ${theme}. Please use "light", "dark", or "system".`);
      return;
  }

  try {
      // Save the selected theme to localStorage
      localStorage.setItem("organisationTheme", theme);
      console.log(`Theme "${theme}" saved successfully!`);
  } catch (error) {
      console.error("Error saving theme to localStorage:", error);
  }
};

export const getThemeForOrg = () => {
  try {
      const theme = localStorage.getItem("organisationTheme");

      // Return theme if it exists, otherwise return default "system"
      return theme || "dark";
  } catch (error) {
      console.error("Error retrieving theme from localStorage:", error);
      return "system"; // Fallback to "system"
  }
};