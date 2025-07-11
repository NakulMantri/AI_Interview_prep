"use client" //authentication on server side is recommended,though seems to be much more complicated but still//
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { toast } from "sonner"
import FormField from './FormField';
import  { useRouter } from "next/navigation"

import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

  const authFormSchema = (type:FormType)=>{
    return z.object({
      name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
      email:z.string().email(),
      password:z.string().min(8),
    })
  }



const AuthForm = ({type}:{type:FormType}) => {
const router = useRouter();
const formSchema = authFormSchema(type)

 //Define the form
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  try{

     if(type==='sign-up')
        {

         const {name,email,password} =values;

         const userCredentials = await createUserWithEmailAndPassword(auth,email,password);



         const result = await signUp({
          uid:userCredentials.user.uid,
          name:name!,
          email,
          password,


         })

         if(!result?.success){
           toast.error(result?.message, { position: 'top-center' })
         }



          toast.success('Account created successfully,Please sign in.',{position:'top-center'})
         router.push('/sign-in')
        }else
        {
         const {email,password} = values;

         const userCredential = await signInWithEmailAndPassword(auth,email,password);

         const idToken = await userCredential.user.getIdToken();


         if(!idToken){
          toast.error('Sign in failed', { position: 'top-center' })
          return;
         }
        await signIn({
          email,idToken
        })
          
         toast.success('Sign in successfully.',{position:'top-center'});
         router.push('/')
        }

  }catch(error)
  {
    console.log(error);
    toast.error('There was an error')
  }




    console.log(values)
  }
  
const isSignIn = type ==='sign-in' 
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flexflex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-6 justify-center">
           <Image 
                src="/logo.svg" 
                alt="logo" 
                height={32} width={38}/>
                <h2 className="text-primary-100">Prep-Up</h2>
            </div>
            <h3 className="mt-4">Brush up your interview prep with AI</h3>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit) } className="w-full space-y-6 mt-4 form">
                   {!isSignIn &&(
                    <FormField control={form.control} name="name" label="Name"  placeholder="Your Name"/>
                   )}

                  <FormField control={form.control} 
                  
                  name="email" label="Email"  placeholder="Your email address" type="email"/>
                   <FormField control={form.control} name="password" label="Password"  placeholder="Your Password" type="password"/>


                    <Button type="submit" className="btn">{isSignIn ? 'Sign-In':'Create an Account'}</Button>
                </form>
                </Form>

                <p className="text-center mt-3">
               {isSignIn ?'No account yet?':'Have an account already?'}
               <Link href={!isSignIn ?"/sign-in":"/sign-up"} className="font-bold text-user-primary mt-4 ml-1">
               {!isSignIn ? 'Sign In':'Sign up'}
               </Link>
                </p>
    </div>
    </div>
  )
}


export default AuthForm
