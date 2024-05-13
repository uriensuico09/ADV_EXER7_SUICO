"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import useAuthentication from "@/hooks/useAuthentication";
import { AuthContext } from "@/provider/AuthProvider";
import { profilePasswordValidation, profileValidation } from "@/validationSchema/profile";
import { updatePassword, updateProfile } from "firebase/auth";
import { useState } from "react";

const Profile = () => {
    useAuthentication();
    const {handleSubmit,register, formState:{errors}} = profileValidation();

    const {handleSubmit:passwordHandleSubmit, register: registerPassword, formState:{errors:passwordErrors}} = profilePasswordValidation();
    const {user}:any = AuthContext();

    const [visibleForm, setVisibility] = useState<any>();

    const userInfo = user.user;

    const submitForm = async({name}:{name ?:string | null }) => {
        if(name){
            updateProfile(userInfo,{
                displayName:name,
            }).then((response)=>{
                console.log("profile updated");
                setVisibility("");
            }).catch((e)=>{
                console.log("failed to update profile ",e.message)
            })
        }
    }

    const submitPasswordForm  = ({password}:{password?:string|null}) =>{
        if(password){
            updatePassword(userInfo,password).then((response)=>{
                console.log("password changed");
                setVisibility("");
            }).catch((e)=>{
                console.log("failed to changes password ",e.message)
            })
        }
    }

    return (
        <div className="h-screen max:h-screen-auto flex justify-center items-center bg-bg-color">
            <div className="w-1/2 rounded-md bg-white flex justify-between flex-col font-mono">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-mono font-semibold p-3 rounded-lg">Welcome Back {userInfo?.displayName}</span>
                </div>
                <div className="flex items-start justify-evenly flex-col w-1/2 self-center ">
                    <div className="text-black font-bold text-lg">Email: {userInfo?.email}</div>
                    <div className="text-black font-bold text-lg">Name: {userInfo?.displayName}</div>
                </div>

                <div className="flex w-full items-center justify-around my-4">
                    <span className="cursor-pointer py-1 px-2 bg-custom-blue rounded-md text-white" onClick={()=>setVisibility("profile")}>Update Profile</span>
                    <span className="cursor-pointer py-1 px-2 bg-custom-blue rounded-md text-white" onClick={()=>setVisibility("password")}>Change Password</span>
                </div>

                {visibleForm === 'profile' &&
                    <>
                        <div className="h-28 w-full justify-center flex items-center">
                            <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Update Profile</span>
                        </div>
                        
                        <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                            <InputField
                                register={register}
                                error={errors.name}
                                type="text"
                                placeholder="Enter Your Name Here..."
                                name="name"
                                label="Full Name"
                            />
                            <SubmitButton label="Update" />
                        </form>
                    </>
                }
                {visibleForm === 'password' &&
                <>
                    <div className="h-28 w-full justify-center flex items-center">
                        <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Change Password</span>
                    </div>
                    <form onSubmit={passwordHandleSubmit(submitPasswordForm)} className="h-full w-1/2 mx-auto ">
                        <InputField
                            register={registerPassword}
                            error={passwordErrors.password}
                            type="password"
                            placeholder="Enter Your Password Here..."
                            name="password"
                            label="Password"
                        />
                        <SubmitButton label="Update" />
                    </form>
                </>
                }
            </div>
        </div>
    )
}

export default Profile;