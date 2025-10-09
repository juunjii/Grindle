import { ReactNode } from 'react'
import Image from "next/image";
import Link from 'next/link';


const RootLayout = ({ children } : { children: ReactNode  }) => {
  return (
    <div>{children}</div>
  )
}

export default RootLayout
