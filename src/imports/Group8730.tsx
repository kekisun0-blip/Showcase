import img20250828100153583 from "figma:asset/85263ff0a09ffda766ecb5820da0a331c70a3833.png";
import imgImage from "figma:asset/cec4661fa5526aac86bde8e9b6f91bbe707427fe.png";
import imgImage1 from "figma:asset/359d0572d5a1c1ed2e29f99ff937d951e2d50251.png";
import img9D9Fda3A793D49C4Bf009451E834Ee6A1 from "figma:asset/0d7519c9e6e0aaec5eb9611ef15f2e86421b08d3.png";
import img202511051318031 from "figma:asset/87d32e5b4ea6229c72fdd99c8229a891b52ce6bd.png";
import img1280X1280 from "figma:asset/a9f6cd150e4e97c4972e9dbe9cb71655ed1533ce.png";
import img202511051325061 from "figma:asset/cb1d7800356e2eb141b73bfc498e54345c0b3823.png";
import imgImage2 from "figma:asset/70275d705251c591db7bd82d0a90677d339667d0.png";
import img202511051322581 from "figma:asset/d852a5c580fcc4a481db8b7bdcbca40acbffae60.png";
import img202511041639121 from "figma:asset/0393aa6ad31c6c45034821d52d072fe272b46581.png";
import img1280X12802 from "figma:asset/2c12399d97182e448390e7a973ff8c5a190c7bce.png";

function Frame11() {
  return <div className="absolute h-[29px] left-[54px] top-[35px] w-[157px]" />;
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[17px] not-italic top-[41px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">小程序-光储助手</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">{`解决的最核心问题是客诉，既满足客户满意度的同时减少了人力成本 `}</p>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white border border-[#f94f4f] border-solid h-[336px] left-0 overflow-clip rounded-[16px] shadow-[0px_0px_8px_0px_rgba(110,138,255,0.48),0px_6px_12px_0px_rgba(154,174,255,0.41)] top-0 w-[268px]" data-name="Card 1">
      <div className="absolute h-[417px] left-[36px] pointer-events-none rounded-[8px] top-[147px] w-[193px]" data-name="微信图片_20250828100153_58 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={img20250828100153583} />
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
      <Frame11 />
      <Frame />
    </div>
  );
}

function SecondaryButton() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26.178px] items-center justify-center left-[1.63px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[1.87px] w-[70.869px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">营销中心</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Card />
      <SecondaryButton />
    </div>
  );
}

function Frame12() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">市场发布计划管理系统</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">各业务部门在全球化管理产品上市计划信息系统</p>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white h-[336px] left-[292px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-0 w-[268px]" data-name="Card 1">
      <Frame12 />
      <Frame1 />
      <div className="absolute h-[727px] left-[37.75px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-full left-[0.03%] max-w-none top-0 w-[99.95%]" src={imgImage} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton1() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[293.75px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[2px] w-[90px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">产品研发中心</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[292px] top-0">
      <Card1 />
      <SecondaryButton1 />
    </div>
  );
}

function Frame13() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">自动排产系统</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">{` Al基于"订单-资源-产能"全数据自动计算全局排产最优方案`}</p>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white h-[336px] left-[584px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-0 w-[268px]" data-name="Card 1">
      <Frame13 />
      <Frame2 />
      <div className="absolute h-[201px] left-[36.5px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-[75.62%] left-[-2.25%] max-w-none top-0 w-[104.5%]" src={imgImage1} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton2() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[585.5px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[2px] w-[89px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">生产运营中心</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[584px] top-0">
      <Card2 />
      <SecondaryButton2 />
    </div>
  );
}

function Frame14() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">工厂数字化看板</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">ATE平台的在线监测、待包装产品的实时统计、组装UPH产出的实时监测</p>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-white h-[336px] left-[876px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-0 w-[268px]" data-name="Card 1">
      <Frame14 />
      <Frame3 />
      <div className="absolute h-[199px] left-[36.25px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="9d9fda3a-793d-49c4-bf00-9451e834ee6a 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={img9D9Fda3A793D49C4Bf009451E834Ee6A1} />
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton3() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[877.25px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[2px] w-[89px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">生产运营中心</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[876px] top-0">
      <Card3 />
      <SecondaryButton3 />
    </div>
  );
}

function Frame15() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">政申通-政府项目爬虫</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">AI自动爬取适合公司申报的政府项目并给出分析报告</p>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-white h-[336px] left-0 overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[360px] w-[268px]" data-name="Card 1">
      <Frame15 />
      <Frame4 />
      <div className="absolute h-[321px] left-[37px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="截屏2025-11-05 13.18.03 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={img202511051318031} />
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton4() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[2px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[362px] w-[88px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">业务支持中心</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-[360px]">
      <Card4 />
      <SecondaryButton4 />
    </div>
  );
}

function Frame16() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">超级BOM</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">AI超级BOM分析与设计辅助系统，实现系统间的高效协同</p>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-white h-[336px] left-[292px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[360px] w-[268px]" data-name="Card 1">
      <Frame16 />
      <Frame5 />
      <div className="absolute h-[204px] left-[36.75px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="1280X1280">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-[49.02%] left-[-0.21%] max-w-none top-0 w-[100.41%]" src={img1280X1280} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton5() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[293.75px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[362px] w-[90px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">产品研发中心</p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[292px] top-[360px]">
      <Card5 />
      <SecondaryButton5 />
    </div>
  );
}

function Frame17() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">工厂智能排班系统</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">通过输入工序需求、人员需求等信息，自动进行员工排班</p>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-white h-[336px] left-[584px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[360px] w-[268px]" data-name="Card 1">
      <Frame17 />
      <Frame6 />
      <div className="absolute h-[300px] left-[38px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="截屏2025-11-05 13.25.06 1">
        <img alt="" className="absolute inset-0 max-w-none object-contain rounded-[8px] size-full" src={img202511051325061} />
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton6() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[585.5px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[362px] w-[95px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">生产运营中心</p>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[584px] top-[360px]">
      <Card6 />
      <SecondaryButton6 />
    </div>
  );
}

function Frame18() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">MES物料管理小程序</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">通过微信小程序扫码和信息录入完成物料各个生命周期的维护</p>
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-white h-[336px] left-[876px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[360px] w-[268px]" data-name="Card 1">
      <div className="absolute h-[386px] left-[37.25px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="image">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-[106.06%] left-[-1.62%] max-w-none top-[-6%] w-[104.32%]" src={imgImage2} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
      <Frame18 />
      <Frame7 />
    </div>
  );
}

function SecondaryButton7() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[877.25px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[362px] w-[95px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">生产运营中心</p>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[876px] top-[360px]">
      <Card7 />
      <SecondaryButton7 />
    </div>
  );
}

function Frame19() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">政申通-综合信息查询</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">辅助人工填写申报信息,应对复杂表格和网站, 快速高效的查询真实业务数据</p>
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-white h-[336px] left-0 overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[720px] w-[268px]" data-name="Card 1">
      <div className="absolute h-[260px] left-[37px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="截屏2025-11-05 13.22.58 1">
        <img alt="" className="absolute inset-0 max-w-none object-contain rounded-[8px] size-full" src={img202511051322581} />
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
      <Frame19 />
      <Frame8 />
    </div>
  );
}

function SecondaryButton8() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[2px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[722px] w-[95px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">业务支持中心</p>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-0 top-[720px]">
      <Card8 />
      <SecondaryButton8 />
    </div>
  );
}

function Frame20() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">EHS法律法规日期确认器</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">为了减少人工巡检EHS法规工作量,使用AI自动联网分析EHS更新情况</p>
      </div>
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-white h-[336px] left-[292px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[720px] w-[268px]" data-name="Card 1">
      <Frame20 />
      <Frame9 />
      <div className="absolute h-[197px] left-[37.75px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="截屏2025-11-04 16.39.12 1">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-[56.88%] left-0 max-w-none top-[-0.01%] w-full" src={img202511041639121} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton9() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26px] items-center justify-center left-[293.75px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[722px] w-[92px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">业务支持中心</p>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[292px] top-[720px]">
      <Card9 />
      <SecondaryButton9 />
    </div>
  );
}

function Frame21() {
  return <div className="absolute h-[29px] left-[55px] top-[36px] w-[157px]" />;
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] items-center leading-[0] left-[18px] not-italic top-[42px] w-[232px]">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center relative shrink-0 text-[#9285d7] text-[20px] text-center tracking-[-0.4px] w-full">
        <p className="leading-[1.45] whitespace-pre-wrap">飞书应用-自动化测试报告</p>
      </div>
      <div className="flex flex-col font-['PingFang_SC:Light',sans-serif] justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.07px] w-full">
        <p className="leading-[1.4] whitespace-pre-wrap">一键生成测试报告，提效降本，解放测试团队重复劳动</p>
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-white h-[336px] left-[584px] overflow-clip rounded-[16px] shadow-[0px_6px_12px_0px_rgba(154,174,255,0.41)] top-[720px] w-[268px]" data-name="Card 1">
      <Frame21 />
      <Frame10 />
      <div className="absolute h-[206px] left-[37.5px] pointer-events-none rounded-[8px] top-[148px] w-[193px]" data-name="1280X1280 (2)">
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <img alt="" className="absolute h-[87.38%] left-[-0.03%] max-w-none top-0 w-[100.07%]" src={img1280X12802} />
        </div>
        <div aria-hidden="true" className="absolute border-4 border-[#e4e6ef] border-solid inset-0 rounded-[8px]" />
      </div>
    </div>
  );
}

function SecondaryButton10() {
  return (
    <div className="absolute bg-[#fff5fa] content-stretch flex h-[26.178px] items-center justify-center left-[585.63px] p-[12px] rounded-br-[16px] rounded-tl-[16px] top-[721.87px] w-[70.869px]" data-name="Secondary button">
      <div className="flex flex-col font-['PingFang_SC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a68094] text-[12px] tracking-[-0.06px] whitespace-nowrap">
        <p className="leading-[1.45]">质量中心</p>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[584px] top-[720px]">
      <Card10 />
      <SecondaryButton10 />
    </div>
  );
}

export default function Group11() {
  return (
    <div className="relative size-full">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
    </div>
  );
}