"use client"
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links-portal';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { signOut } from 'auth';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

// import { signOut } from '@/app/api/auth/[...nextauth]';

export default function SideNav() {

  const { data: session, status } = useSession();
  console.log("🚀 ~ SideNav ~ data:", session)
  const pathname = usePathname();

  return (
    
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-950 md:h-40"
        href="/"
      >
          <div style={{ height: "100%", width: "5%", backgroundColor: "brown", left: "0px" }}></div>
          <div style={{ height: "100%", width: "5%", backgroundColor: "chocolate", right: "0px", left: "auto" }}></div>
          <div className="w-4/5 pb-4 pl-4 ">
            <AcmeLogo />
          </div>

      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        {session ?   <Link
          key={"clientspace"}
          href={'/clientspace/order/'+session.user.id}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-orange-100 p-3 text-sm font-medium hover:text-orange-700 hover:bg-orange-500 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-orange-100 text-orange-700': pathname === '/clientspace/order/'+session.user.id,
            },
          )}
        >
             <ArrowRightIcon className="w-5 md:w-6" />  <span>Aquisição de Fotos</span>
        </Link> : ""  }
        

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      
        <p className='p-4 hidden md:block'>v1.0.0 | Em Desenvolvimento</p>
        {!session ?   <Link
            href="/login"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
          <ArrowRightIcon className="w-5 md:w-6" />  <span>Log in Manager</span>
        </Link> : ""}
        {session ?  <form 
            action={async () => {
          
            signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form> : ""}
       
      </div>
    </div>
  );
}
