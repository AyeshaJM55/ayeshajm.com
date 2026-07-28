import svgPaths from "./svg-nibwaflor1";

function Group2() {
  return (
    <div className="-translate-x-1/2 [word-break:break-word] absolute contents font-['Raleway:SemiBold',sans-serif] font-semibold leading-[normal] left-0 text-[20px] text-black top-0 uppercase">
      <p className="absolute h-[44px] left-0 top-0 w-[97px]">Services</p>
      <p className="absolute h-[22px] left-0 top-0 w-[75px]">About</p>
      <p className="absolute left-0 top-0 w-[143px]">Ayesha J.</p>
      <p className="absolute h-[22px] left-0 top-0 w-[118px]">portfolio</p>
      <p className="absolute h-[44px] left-0 top-0 w-[96px]">Contact</p>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="absolute bottom-[33.33%] flex items-center justify-center left-1/4 right-1/4 top-[33.33%]" style={{ containerType: "size" }}>
      <div className="-rotate-90 -scale-x-100 flex-none h-[100cqw] w-[100cqh]">
        <div className="relative size-full" data-name="arrow-left">
          <div className="absolute inset-[-6.25%_-9.38%]">
            <svg className="block size-full" fill="none" height="13.5" preserveAspectRatio="none" viewBox="0 0 9.5 13.5" width="9.5">
              <g id="arrow-left">
                <path d={svgPaths.p31449bc0} id="Vector 190" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="-translate-x-full [word-break:break-word] absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[1.389] left-[116px] text-[22px] text-right text-white top-0 w-[116px]">Book a call</p>
      <div className="absolute flex h-[24px] items-center justify-center left-0 top-0 w-[18.579px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[24px] relative w-[18.579px]" data-name="arrow-left">
            <ArrowLeft />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-black border-2 border-black border-solid h-[52px] left-0 top-0 w-[155px]" />
      <Group />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="contents relative size-full">
      <Group2 />
      <Group1 />
    </div>
  );
}