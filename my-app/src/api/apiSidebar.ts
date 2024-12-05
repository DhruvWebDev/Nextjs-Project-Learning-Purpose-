import { createClient } from "@/utils/supabase/client";

export const getSidebar = async (token: string,{user_id}) => {
  const supabase = await createClient(token);

  try {
    const { data, error } = await supabase
      .from("sidebar") // Replace with your table name
      .select("*") // Fetch all columns
      .eq("user_id", user_id); // Filter by user_id

    if (error) {
      console.error("Error fetching sidebar config from the database:", error.message);
      return null; // Handle the error appropriately
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching data:", err);
    return null; // Handle unexpected errors
  }
};
