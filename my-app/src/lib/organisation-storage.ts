interface Organization {
    id: string;
    name: string;
    description: string;
  }
  
  export const saveOrganization = (org: Organization) => {
    // Step 1: Get existing data from localStorage
    const existingData = localStorage.getItem('currentOrganisation')
  
    // Step 2: Parse the existing data or initialize an empty array if there's no existing data
    //The function will parse the stringified array from localStorage into a JavaScript array
    const organizations = existingData ? JSON.parse(existingData) : []
  
    // Step 3: Add the new organization to the array
      organizations.push(org)

      // Step 4: Save the updated array back to localStorage
      localStorage.setItem('currentOrganisation', JSON.stringify(organizations))
    }
  
  
  export const getOrganization = (): Organization | null => {
    const orgString = localStorage.getItem('currentOrganization');
    return orgString ? JSON.parse(orgString) : null;
  }
  
  export const removeOrganization = () => {
    localStorage.removeItem('currentOrganization');
  }