export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex justify-center h-screen">
        <div className="bg-white w-full mt-20 md:mt-32 max-w-96 max-h-fit py-12 flex justify-center items-center border border-[#999999] rounded-3xl">
            {children}
        </div>    
    </div>  
    );
  }