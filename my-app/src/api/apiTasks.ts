import { createClient } from "@/utils/supabase/client";

// TaskRequirement: user_id, label, text, id, completed

// Fetch tasks
export const getTaskData = async (token, _, taskRequirement) => {
  const supabase = createClient(token);

  const { data: taskData, error: fetchingTaskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", taskRequirement.user_id)
    .eq("labels", taskRequirement.label);

  if (fetchingTaskError) {
    console.error("Error fetching tasks", fetchingTaskError);
  }

  return taskData;
};

// Add a new task
export const addTask = async (token, _, taskRequirement) => {
  const supabase = createClient(token);

  const { data: addedTaskData, error: uploadingTaskError } = await supabase
    .from("tasks")
    .insert([taskRequirement])
    .select();

  if (uploadingTaskError) {
    console.error("Error adding tasks", uploadingTaskError);
  }

  return addedTaskData;
};

// Delete a task
export const deleteTask = async (token, _, taskId) => {
  const supabase = createClient(token);
  console.log("Id of the task", taskId)
  const { data: deletedTaskData, error: deletingTaskError } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId?.todoId);

  if (deletingTaskError) {
    console.error("Error deleting task", deletingTaskError);
  }
  console.log(deletedTaskData)

  return deletedTaskData;
};

// Update a task
export const updateTask = async (token, _, { id, ...completed }) => {
  const supabase = createClient(token);
  console.log(id,completed)

  const { data: updatedTaskData, error: updatingTaskError } = await supabase
    .from("tasks")
    .update(completed) // Pass fields to update, e.g., { completed: true }
    .eq("id", id);

  if (updatingTaskError) {
    console.error("Error updating task", updatingTaskError);
  }
  console.log(updatedTaskData)
  return updatedTaskData;
};
