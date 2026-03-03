import img202601260959081 from "figma:asset/7af0e207a697340907c7b44e0ce1c5b4c35c67d1.png";
import img202601260959241 from "figma:asset/6edf0f6ec9a16e852b5db1ba981dde0b0ef353c7.png";
import img202601260959421 from "figma:asset/4a806b50a4fd068e269addcd5e039f9cc81046fc.png";

export default function Frame() {
  return (
    <div className="bg-white pointer-events-none relative size-full">
      <div className="absolute h-[119px] left-[6px] rounded-[4px] top-[24px] w-[55px]" data-name="截屏2026-01-26 09.59.08 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={img202601260959081} />
        <div aria-hidden="true" className="absolute border-0 border-solid border-white inset-0 rounded-[4px] shadow-[0px_4px_6px_0px_rgba(90,90,90,0.25)]" />
      </div>
      <div className="absolute h-[120px] left-[69px] rounded-[4px] top-[43px] w-[55px]" data-name="截屏2026-01-26 09.59.24 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={img202601260959241} />
        <div aria-hidden="true" className="absolute border-0 border-solid border-white inset-0 rounded-[4px] shadow-[0px_4px_6px_0px_rgba(90,90,90,0.25)]" />
      </div>
      <div className="absolute h-[119px] left-[132px] rounded-[4px] top-[22px] w-[55px]" data-name="截屏2026-01-26 09.59.42 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[4px] size-full" src={img202601260959421} />
        <div aria-hidden="true" className="absolute border-0 border-solid border-white inset-0 rounded-[4px] shadow-[0px_4px_6px_0px_rgba(90,90,90,0.25)]" />
      </div>
    </div>
  );
}