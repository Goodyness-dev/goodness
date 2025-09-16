import React, { Suspense } from 'react';
import {useMediaQuery} from "react-responsive"
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import HackerRoom from '../Components/Hackerroom';
import CanvasLoder from '../Components/CanvasLoder';
import { calculateSizes } from '../Constants';
import Button from '../Components/Button';
const Hero = () => {

    const isMobile = useMediaQuery({maxWidth: 768})
    const isTABLET = useMediaQuery({minWidth: 768, maxWidth:1024})
    const isSmall = useMediaQuery({maxWidth: 440})
    const sizes = calculateSizes(isMobile, isTABLET,isSmall )
  return (
    <section className='min-h-screen w-full flex 
    flex-col relative'>
            <div className='w-full mx-auto flex flex-col
            sm:mt-36 mt-20 c-space gap-3'>
                <p className='sm:text-3xl text-2xl font-medium text-white text-center font-generalsans'> Hi, I am Alex  </p>
                <p className='hero_tag text-gray_gradient'>Take Your Project To The Moon</p>
            </div>

            <div className="flex justify-center items-center p-10 relative">
  <img 
    src="/mainimg.jpg" 
    alt="main-img"
    className="w-[500px] h-[500px] object-cover rounded-2xl shadow-2xl border border-gray-700/50
               transition-transform duration-500 hover:scale-105 hover:shadow-purple-500/40"
  />

  {/* Glow effect */}
  <div className="absolute inset-0 flex justify-center items-center -z-10">
    <div className="w-[700px] h-[500px] bg-purple-500/20 blur-3xl rounded-full"></div>
  </div>
</div>

            <div className=' bottom-7 left-0 right-0 w-full
            z-10 c-space'> 
            <a href='#about' className='w-fit'>
               <Button name="Let's work together"isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>

              </a>
              </div>
    </section>
  );
}

export default Hero;
