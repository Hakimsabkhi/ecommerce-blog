import Contactusbanner from '@/components/contactusbanner';
import Milanotorino from '@/components/milanotorino';
import React from 'react';

  async function fetchCompanyData() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/company/getCompany`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next:{revalidate:0}
      });
    if (!res.ok) {
       console.log('Failed to fetch data');
    }
    return res.json();
  }
    /* const totalImages = slideData.length;
    const currentSlide = slideData[page - 1]; */
   
const Page = async () => {
    const companyData = await fetchCompanyData();
    return (
        <div>
            <Contactusbanner companyData={companyData}/>
            <Milanotorino/>
        </div>
    );
}

export default Page;
