/*import React from 'react'

const MainLayout = ({children}) => {
  return <div className='container mx-auto my-32'>{children}</div>

}

export default MainLayout */

import { checkUser } from "@/lib/checkUser";

export default async function MainLayout({ children }) {
  await checkUser(); // runs server-side only ✅
  return (
    <div className="container mx-auto my-32">
      {children}
    </div>
  );
}
