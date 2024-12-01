import { ReactNode } from 'react'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import welcome from '@/public/logo_welcome.jpg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" inset-0 bg-grid-gray-200/50 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Card className="w-full max-w-md z-10 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center">
            <Image
              src={welcome}
              alt="Logo"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          {children}
        </div>
      </Card>
    </div>
  )
}

