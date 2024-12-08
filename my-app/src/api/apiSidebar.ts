import { createClient } from "@/utils/supabase/client";

export const getSidebar = async (token: string, { user_id }) => {
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


export const addOptions = async (token, _, optionData) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabase = createClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `icon-${random}-${optionData?.user_id}`;

  const { error: storageError } = await supabase.storage
    .from("option-icon")
    .upload(fileName, optionData.optionIcon)// Ensures the correct MIME type

    if (storageError) {
      console.error("Error uploading organization icon", storageError);
      return; // Early return if there was an error
  }

  // Construct the public URL for the uploaded icon
  const optionIcon = `${supabaseUrl}/storage/v1/object/public/option-icon/${fileName}`;

  // Insert the organization data into the database
  const {  data, error: creatingOptionError } = await supabase
  .from("sidebar")
  .insert([{ ...optionData, optionIcon }])
  .select();


  if(creatingOptionError) {
    console.error("Error inserting new option", creatingOptionError)
  }

  return data;

}
