import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Market Place for high-quality{' '} 
            <span className="text-blue-600">Digital Assets</span>.
        </h1>

        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to DigitalExchange. Every asset/kit on this platform is verified by our team to ensure best quality standards
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {/* <Link href=""></Link> */}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
