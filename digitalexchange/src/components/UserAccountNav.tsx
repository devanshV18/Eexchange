"use client"

import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import { DropdownMenuContent } from "./ui/dropdown-menu"
import { User } from "@/payload/payload-types"
import Link from "next/link"


const UserAccountNav = ({user} : {user: User}) => {
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button variant='ghost' size='sm' className='relative'>My Account</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-60" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm text-black">
                        {user.email}
                    </p>
                </div>
            </div>

            <DropdownMenuSeparator/>

            <div className="hover:bg-gray-200">
                <DropdownMenuItem asChild className="cursor-pointer ml-2">
                    <Link href="/sell">Seller Dashboard</Link>
                </DropdownMenuItem>
            </div>


            <div className="hover:bg-gray-200">
                <DropdownMenuItem className="cursor-pointer ml-2">
                    Log Out
                </DropdownMenuItem>
            </div>

        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserAccountNav