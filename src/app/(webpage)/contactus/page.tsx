import Contactusbanner from '@/components/contactusbanner';
import Milanotorino from '@/components/milanotorino';
import React from 'react';

// Fetch company data from the API
async function fetchCompanyData() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/company/getCompany`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // Disable caching for this request
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null; // Return null if the request fails
    }

    return await res.json(); // Parse and return the JSON data
  } catch (error) {
    console.error('Error fetching company data:', error);
    return null; // Handle unexpected errors
  }
}

const Page = async () => {
  const companyData = await fetchCompanyData();

  // Handle cases where companyData is null
  if (!companyData) {
    return (
      <div>
        <h1>Error Loading Data</h1>
        <p>Unable to fetch company data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Contactusbanner companyData={companyData} />
      <Milanotorino />
    </div>
  );
};

export default Page;
