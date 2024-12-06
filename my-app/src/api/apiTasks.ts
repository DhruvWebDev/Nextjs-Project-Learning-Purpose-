import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getSidebarConfig = async (token, _, userId) => {
  try {
    // Replace "tasks" with your actual table name
    const { data, error } = await supabase
      .from("tasks") // Replace "tasks" with your table name
      .select("*")   // Fetch all columns
      .eq("user_id", userId); // Filter where user_id equals userId

    if (error) {
      console.error("Error fetching tasks:", error);
      return null; // Handle the error gracefully
    }

    return data; // Return the filtered tasks
  } catch (err) {
    console.error("Unexpected error:", err);
    return null; // Handle unexpected errors
  }
};

export const addTasks = (token,_, taskData) => {
  // Add tasks to the sidebar
  const supabase = createClient(token)

  const {}
}
