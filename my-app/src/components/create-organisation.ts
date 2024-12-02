'use client'

import { useState } from 'react'
import { saveOrganization } from '@/lib/organisation-storage'

export default function CreateOrganization(orgName:string, orgDescription:string) {

  const createFn = (orgName:string, orgDescription:string) => {
    const newOrg = {
      id: Date.now().toString(), // Simple ID generation
      name: orgName,
      description: orgDescription
    }
    saveOrganization(newOrg)
    console.log('Organization created and saved:', newOrg)
    // Here you would typically redirect to a dashboard or confirmation page
  }
  createFn(orgName, orgDescription)

  // ... rest of the component remains the same
}