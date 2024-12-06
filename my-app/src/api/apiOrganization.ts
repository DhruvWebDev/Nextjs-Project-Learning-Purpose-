import { createClient } from "@/utils/supabase/client";

export const createOrganization = async (token, _, orgData) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabase = createClient(token);
    // Generate a unique file name for the icon
    const random = Math.floor(Math.random() * 90000);
    const fileName = `icon-${random}-${orgData.user_id}`;
            const { error: storageError } = await supabase.storage
        .from("organization-icon")
        .upload(fileName, orgData.organizationIcon)// Ensures the correct MIME type
        
        if (storageError) {
            console.error("Error uploading organization icon", storageError);
            return; // Early return if there was an error
        }

    // Construct the public URL for the uploaded icon
    const organizationIcon = `${supabaseUrl}/storage/v1/object/public/organization-icon/${fileName}`;

    // Insert the organization data into the database
    const { error: creatingOrgError } = await supabase
        .from("organization")
        .insert([{ ...orgData, organizationIcon }]);

    if (creatingOrgError) {
        console.error("Error creating organization", creatingOrgError);
        return; // Early return if there was an error
    }

    console.log("Organization created successfully");
};




