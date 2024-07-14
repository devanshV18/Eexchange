"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/Icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthCredentialValidatior, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validators"

const Page = () => {

    const { 
        register, 
        handleSubmit, 
        formState: {errors} 
        } = useForm<TAuthCredentialsValidator>({
            resolver: zodResolver(AuthCredentialValidatior),
        })


        const onSubmit = ({email, password} : TAuthCredentialsValidator) => {
            
        }

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                     <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20"/>
                        <h1 className="text-2xl font-bold">
                            Create an Acoount
                        </h1>
                        <Link className={buttonVariants({
                            variant: 'link',
                            className: "gap-1.5"
                        })} href="/sign-in">
                            Already have an Account? Sign In
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                     </div>

                     {/* //signup form */}
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email" className="mb-2">Email</Label>
                                    
                                    <Input 
                                     {...register("email")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email
                                    })} 
                                    placeholder="you@example.com"
                                    />
                                </div>

                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password" className="mb-2">Password</Label>

                                    <Input 
                                     {...register("password")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.password
                                    })} 
                                    placeholder="Passowrd"
                                    />
                                </div>
                                <Button>Sign Up</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page