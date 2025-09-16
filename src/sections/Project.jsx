import React, { Suspense, useState } from 'react';
import { myProjects } from '../Constants/index';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { useMediaQuery } from "react-responsive";
import CanvasLoder from '../Components/CanvasLoder';
import DemoComputer from '../Components/DemoComputer';

const Project = () => {
  const [selectedProjectIndex, setselectedProjectIndex] = useState(0);
  const currentproject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  // Detect mobile screen
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleNavigation = (direction) => {
    setselectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="c-space my-20">
      <p className="head-text">My Work</p>

      <div
        className={`grid ${isMobile ? "grid-cols-1" : "lg:grid-cols-2"} mt-12 gap-5 w-full`}
      >
        {/* LEFT: Project Info */}
        <div className="flex flex-col gap-5 relative sm:p-10 px-5 shadow-2xl shadow-black-200">
          {/* Spotlight image */}
          <div className="absolute top-0 right-0">
            <img
              src={currentproject.spotlight}
              alt="spotlight"
              className="w-full h-64 sm:h-96 object-cover rounded-xl"
            />
          </div>

          {/* Logo */}
          <div
            className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
            style={currentproject.logoStyle}
          >
            <img
              src={currentproject.logo}
              alt="logo"
              className="w-10 h-10 shadow-sm"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 text-white-600 my-5 relative z-10">
            <p className="text-white text-xl sm:text-2xl font-semibold animatedText">
              {currentproject.title}
            </p>
            <p className="text-sm sm:text-base animatedText">{currentproject.desc}</p>
            <p className="text-sm sm:text-base animatedText">{currentproject.subdesc}</p>
          </div>

          {/* Tags + Link */}
          <div className="flex items-center justify-between flex-wrap gap-5 relative z-10">
            <div className="flex items-center gap-3">
              {currentproject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentproject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check live site</p>
              <img
                src="/assets/arrow-up.png"
                className="w-3 h-3"
                alt="arrow"
              />
            </a>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-7 relative z-10">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left-arrow"
                className="w-4 h-4"
              />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right-arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>

        {/* RIGHT: 3D Model */}
        <div
          className={`border border-black-300 bg-black-200 rounded-lg ${
            isMobile ? "h-72" : "h-96 md:h-full"
          }`}
        >
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoder />}>
                <group
                  scale={isMobile ? 2 : 2}
                  position={isMobile ? [0, -2, 0] : [0, -3, 0]}
                  rotation={[0, 0.8, -0]}
                  
                >
                  <DemoComputer texture={currentproject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}
            enableRotate={!isMobile} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Project;
