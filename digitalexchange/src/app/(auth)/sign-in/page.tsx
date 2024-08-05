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
import { trpc } from "@/trpc/client"
import {toast} from 'sonner'
import { ZodError } from "zod"
import { useRouter, useSearchParams } from "next/navigation"

const Page = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const isSeller = searchParams.get('as') === 'seller'
    const origin = searchParams.get('origin')

    const continueAsSeller = () => {
        router.push("?as=seller")
    }

    const continueAsBuyer = () => {
        router.replace('/sign-in', undefined)
    }

    const { 
        register, 
        handleSubmit, 
        formState: {errors} 
        } = useForm<TAuthCredentialsValidator>({
            resolver: zodResolver(AuthCredentialValidatior),
        })

       

        const {mutate: signIn, isPending} = trpc.auth.signIn.useMutation({
            onSuccess: () => {
                
                toast.success('Signed in Successfully')
                router.refresh()

                if(origin){
                    router.push(`/${origin}`)
                    return
                }

                if(isSeller){
                    router.push('/sell')
                    return
                }

                router.push('/')
            },

            onError: (err) => {
                if(err.data?.code === 'UNAUTHORIZED'){
                    toast.error('Invalid Email or Password')
                }
            }
        })

        const onSubmit = ({email, password} : TAuthCredentialsValidator) => {
            signIn({email,password})
        }

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                     <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20"/>
                        <h1 className="text-2xl font-bold">
                            Sign in to your {isSeller ? 'seller' : ''} Account
                        </h1>
                        <Link className={buttonVariants({
                            variant: 'link',
                            className: "gap-1.5"
                        })} href="/sign-up">
                            Don&apos;t have an account?
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
                                    {errors?.email && (
                                        <p className="text-sm text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password" className="mb-2">Password</Label>

                                    <Input 
                                     type="password"
                                     {...register("password")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.password
                                    })} 
                                    placeholder="Passowrd"
                                    />
                                    {errors?.password && (
                                        <p className="text-sm text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <Button>Sign in</Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div aria-hidden = 'true' className="absolute inset-0 flex items-center">
                                <span className="w-full border-t"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>

                        {isSeller ? (
                                <Button 
                                 onClick={continueAsBuyer}
                                 variant='secondary'
                                 disabled={isPending}>
                                    Continue as Customer
                                </Button>
                            ): (
                                <Button
                                 onClick={continueAsSeller}
                                 variant='secondary'
                                 disabled={isPending}>
                                    Continue as Seller
                                </Button>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page