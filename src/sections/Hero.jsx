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

            <div className='w-full h-full absolute inset-0'>
              <Canvas className='w-full h-full'>
                <Suspense fallback={<CanvasLoder/>}>

                </Suspense>
                <PerspectiveCamera makeDefault position={[0,0,30]}/>
                 
               
                  <HackerRoom 
                  scale={sizes.deskScale}
                  position={sizes.deskPosition}
                   rotation={[0,280,0]}/>
                
                 <ambientLight intensity={1}/>
                 <directionalLight position={[10 ,10,10]} intensity={0.5}/>
              </Canvas>
            </div>
            <div className='absolute bottom-7 left-0 right-0 w-full
            z-10 c-space'> 
            <a href='#about' className='w-fit'>
               <Button name="Let's work together"isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>

              </a>
              </div>
    </section>
  );
}

export default Hero;
