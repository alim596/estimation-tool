import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="flex flex-col w-full h-full mx-auto">
      
      {/* Top Bar */}
      <header className="flex items-center h-[160px] justify-between px-16 py-9">
        {/* Left: Logo & Tagline */}
        <div className="flex items-center space-x-3">
          {/* Adjust src to your actual logo */}
            <Image
              src="/images/radity-logo-light.svg"
              alt="Radity Logo"
              width={0}
              height={0}
              style={{width:'150px', height: "75px" }}
              />
        </div>
        
        {/* Right: "Back to radity.com" Link */}
        <Link href="https://radity.com"
                className='flex items-center px-6 w-fit h-fit gap-4 text-[#1D4ED8]
                           text-[20px] font-bold hover:opacity-80'>
            <span>Back to radity.com</span>
            <Image
              src="/icons/goto-icon.svg"
              alt="go to"
              width={36}
              height={36}
            />
        </Link>
      </header>
      
      {/* Main Hero Content */}
      <div className="bg-[linear-gradient(130deg,_#1D4ED8_0%,_#2A72D5_60%,_#5DFDCB_100%)]
        flex flex-col h-fit items-center justify-center overflow-hidden">
        <Image
          src="/images/header.svg"
          alt="Calculator & Phone illustration"
          width={1440}
          height={750}
          className="mx-auto -mt-20"
        />
      </div>
    </div>
  );
}
