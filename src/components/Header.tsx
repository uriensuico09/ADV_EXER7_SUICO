"use client";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { AuthContext } from "@/provider/AuthProvider";
import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const {user}:any = AuthContext();
    const router = useRouter();
    const logOut = () => {
        signOut(auth).then((response)=>{
            router.push(LOGIN_ROUTE);
        }).catch((e)=>{
            console.log("Logout Catch ",e.message)
        })
    }

    return (
        <header className="h-20 bg-custom-blue flex px-10">
            <nav className="w-full mx-auto flex justify-between items-center px-2 text-white font-mono font-semibold text-xl">
                <Link href={HOME_ROUTE}><div>ADV_102</div></Link>
                <ul className="flex gap-4">
                    {!user?.isLogin &&
                        <>
                            <Link href={LOGIN_ROUTE}><li>LOGIN</li></Link>
                            <Link href={REGISTER_ROUTE}><li>REGISTER</li></Link>
                        </>
                    }
                    {user?.isLogin &&
                        <>
                            <Link href={PROFILE_ROUTE}><li>PROFILE</li></Link>
                            <li className=" cursor-pointer" onClick={logOut}>LOGOUT</li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;