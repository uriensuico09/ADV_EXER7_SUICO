"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { auth } from "@/services/firebase";
import { registerValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    useAuthentication();
    const { handleSubmit, register, formState:{errors}, reset} = registerValidation();
    const submitForm = async(values:any) => {
        console.log("Register form values",values)
        createUserWithEmailAndPassword(auth,values.email,values.password).then((response)=>{
            alert("User Register Successfully");
            reset();
            router.push(PROFILE_ROUTE)
        }).catch(e=>{
            console.log("catch ",e.message);
            alert("Something went wrong please try again");
        })
    }

    return (
        <div className="h-screen flex justify-center items-center bg-bg-color">
            <div className="w-1/2 rounded-md bg-white flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-mono font-semibold p-3 rounded-lg">Welcome</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <InputField
                        register={register}
                        error={errors.cnfPassword}
                        type="password"
                        placeholder="Enter Your Confirm Password Here..."
                        name="cnfPassword"
                        label="Confirm Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Already have account?  
                        <Link href={LOGIN_ROUTE}><span className="text-green-btn font-semibold text-md" > Login Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;