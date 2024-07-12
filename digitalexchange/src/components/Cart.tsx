"use client"
import { formatPrice } from "@/lib/utils"
import { Separator } from "./ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ShoppingCart } from "lucide-react"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
const Cart = () => {

    // itemCOunt will obliviously contain a dynamic value of number of items in our cart
    const itemCount = 0
    const fee = 1

    return <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingCart aria-hidden='true' className="h-6 w-6 flex shrink-0 text-gray-400 group-hover:text-gray-500"/>
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                0 
            </span>
        </SheetTrigger>

        {/* sheetcontent is the content of the sheet(side bar) which will be displayed when anything inside sheettrigger is clicked (span and shopping cart icon) to show the contents fo cart. hence sheet trigger contained items trigger the sheet to open and sheet content defines what sheet will display or contain*/}

        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Cart (0)</SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
                <>
                    <div className="flex w-full lex-col pr-6">
                        {/* cart logics */}
                        Cart Items
                    </div>
                    <div className="space-y-4 pr-6">
                        <Separator/>
                        <div className="space-y-1.5 text-sm">
                            <div className="flex">
                                <span className="flex-1">Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex">
                                <span className="flex-1">Transaction Fee</span>
                                <span>{formatPrice(fee)}</span>
                            </div>
                            {/* The total can be effectively calculated onmce we get dynamic value of cart contents  */}
                            <div className="flex">
                                <span className="flex-1">Total</span>
                                <span>{formatPrice(fee)}</span>
                            </div>
                        </div>

                        <SheetFooter>
                            {/* by defualt anything inside a sheet trigger component is wrapped in a button ad effectively is a button, inorder to prevent this default activity and add our own wrappings we use as child prop */}
                            <SheetTrigger asChild>
                                <Link 
                                 href="/cart" 
                                 className={buttonVariants({
                                    className: 'w-full'
                                })}>
                                    Continue to Checkout
                                </Link>
                            </SheetTrigger>
                        </SheetFooter>
                    </div>
                </>
            ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                    <div aria-hidden = 'true' className="relative mb-4 h-60 w-60 text-muted-foreground">
                        <Image 
                         src='/hippo-empty-cart.png'
                         fill
                         alt="Your cart seems to be empty!"
                        />
                    </div>
                    <div className="text-xl font-semibold">Your Cart is empty</div>
                    <SheetTrigger asChild>
                        <Link 
                        href='/products' 
                        className={buttonVariants({
                            variant: 'link',
                            size: 'sm',
                            className: 'text-sm text-muted-foreground'
                        })}>
                            Shop Now - Add Items to your Cart to Checkout
                        </Link>
                    </SheetTrigger>
                </div>
            )}
        </SheetContent>
        </Sheet>
}

export default Cart