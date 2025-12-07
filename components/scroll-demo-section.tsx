"use client"

import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import Image from "next/image"

export function ScrollDemoSection() {
  return (
    <section className="bg-black">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-white">
              Experience the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Guarded Trading
              </span>
            </h2>
          </>
        }
      >
        <Image
          src="/dark-themed-dex-trading-interface-with-swap-card-s.jpg"
          alt="DOMEX Trading Interface"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  )
}
