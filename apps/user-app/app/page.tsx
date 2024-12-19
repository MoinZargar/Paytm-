import Link from 'next/link'
import { Button } from "@repo/ui/button";
import { ArrowRight, Wallet, RefreshCw, Shield } from 'lucide-react'

export default  function HomePage(){
    return(
        <div className="w-full">
         <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-white">
                <div className="space-y-3 ml-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none leading-[1.2] mt-0 mb-4 line-height-[1.4]">
                    Simplify Your Payments with PayWallet
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl ml-4 mb-8 mt-4">
                    Securely manage your money, make instant transfers, and enjoy a seamless digital payment experience.
                  </p>
                </div>
                <div className="flex flex-row gap-2 min-[400px]:flex-row ml-4">
                  <Link href="/signup">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 shadow-md transition duration-300 ease-in-out hover:scale-105">
                      Get Started
                    </Button>
                  </Link>
                  
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-20 bg-blue-600"></div>
                  <div className="absolute top-24 left-4 right-4 bottom-4 bg-gray-100 rounded-xl p-4">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow">
                      <h3 className="font-semibold text-lg mb-2">Wallet Balance</h3>
                      <p className="text-3xl font-bold">₹10,000</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-3 shadow-md transition duration-300 ease-in-out hover:scale-105">Add Money</Button>
                      <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-3 shadow-md transition duration-300 ease-in-out hover:scale-105">Send Money</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Wallet className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Add Money to Wallet</h3>
                <p className="text-gray-600">Easily add funds to your wallet using various payment methods.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">P2P Money Transfer</h3>
                <p className="text-gray-600">Send money to friends and family instantly, anytime, anywhere.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">Advanced encryption and security measures to protect your money.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Using PayWallet Today</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with billion of people who trust PayWallet for their digital payment needs. It's free to sign up!
                
                
                
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 shadow-md transition duration-300 ease-in-out hover:scale-105">
                    Create Your Wallet
                    
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500"> 2024 PayWallet. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
        </div>
       
    
  );
}
