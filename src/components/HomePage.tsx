import { useState } from 'react';
import { X, User, BookOpen } from 'lucide-react';
import heroImage from 'figma:asset/c34cafb04a9bc0944013b0ca4048a7b2bb8e31ba.png';
import { AIAssistantWidget } from './AIAssistantWidget';

export function HomePage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [showPersonDialog, setShowPersonDialog] = useState(false);
  const [showBookDialog, setShowBookDialog] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Hero Image - Full width */}
      <div className="relative w-full h-full">
        <img 
          src={heroImage} 
          alt="徐霞客山水画"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        
        {/* Clickable Person Hotspot */}
        <button
          onClick={() => setShowPersonDialog(true)}
          className="absolute z-10"
          style={{ 
            top: '25%',
            right: '15%',
            width: '8%',
            height: '28%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(101, 93, 37, 0.3)';
            e.currentTarget.style.outline = '2px dashed rgba(101, 93, 37, 0.8)';
            e.currentTarget.style.outlineOffset = '4px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.outline = 'none';
          }}
          title="点击查看徐霞客生平"
          aria-label="查看人物介绍"
        />

        {/* Clickable Book Hotspot */}
        <button
          onClick={() => setShowBookDialog(true)}
          className="absolute z-10"
          style={{ 
            top: '32%',
            right: '21%',
            width: '5.5%',
            height: '16%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(99, 108, 83, 0.3)';
            e.currentTarget.style.outline = '2px dashed rgba(99, 108, 83, 0.8)';
            e.currentTarget.style.outlineOffset = '4px';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.outline = 'none';
          }}
          title="点击查看《徐霞客游记》介绍"
          aria-label="查看游记介绍"
        />
      </div>

      {/* Person Dialog */}
      {showPersonDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
          onClick={() => setShowPersonDialog(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col"
            style={{ backgroundColor: '#f5f2f0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-6 border-b flex justify-between items-center flex-shrink-0"
              style={{ 
                backgroundColor: '#655d25',
                borderColor: '#3d1b0b'
              }}
            >
              <h2 className="text-2xl" style={{ color: '#f5f2f0' }}>徐霞客 / Xu Xiake</h2>
              <button 
                onClick={() => setShowPersonDialog(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#f5f2f0' }} />
              </button>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto" style={{ color: '#3d1b0b' }}>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>基本信息 / Basic Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="opacity-75">本名：</span>徐弘祖</div>
                  <div><span className="opacity-75">字：</span>振之</div>
                  <div><span className="opacity-75">号：</span>霞客</div>
                  <div><span className="opacity-75">生卒年：</span>1587年1月5日—1641年3月8日</div>
                  <div className="col-span-2"><span className="opacity-75">籍贯：</span>南直隶江阴县（今江苏江阴市）</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>生平事迹 / Biography</h3>
                <p className="leading-relaxed mb-3">
                  徐霞客出身于江南望族，自幼好学，博览群书。22岁开始出游，此后三十余年间，足迹遍及大江南北。他不畏艰险，深入人迹罕至之地，对岩溶地貌、江河源流等进行了详细考察，纠正了古籍中的许多错误。
                </p>
                <p className="leading-relaxed opacity-90">
                  他的游记详实准确，文笔优美，既是重要的科学文献，也是优秀的文学作品。《徐霞客游记》被后世誉为"千古奇人、千古奇书"。
                </p>
                <p className="leading-relaxed mt-3 opacity-75 text-sm">
                  Xu Xiake was born into a prominent family in Jiangnan. From age 22, he began his travels that lasted over 30 years, covering vast regions of China. He fearlessly explored remote areas, conducting detailed investigations of karst landforms and river sources, correcting many errors in ancient texts. His travel diaries are both important scientific documents and excellent literary works.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>主要成就 / Major Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>首次正确描述中国西南地区岩溶地貌，比欧洲学者早近两百年</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>考察长江源，纠正《禹贡》等古籍的错误记载</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>详细记录了云南、贵州、广西等地的地理、民俗</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>开创了地理学实地考察的科学方法</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Dialog */}
      {showBookDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8"
          onClick={() => setShowBookDialog(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl flex flex-col"
            style={{ backgroundColor: '#f5f2f0' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-6 border-b flex justify-between items-center flex-shrink-0"
              style={{ 
                backgroundColor: '#655d25',
                borderColor: '#3d1b0b'
              }}
            >
              <h2 className="text-2xl" style={{ color: '#f5f2f0' }}>徐霞客游记 / Travel Diaries</h2>
              <button 
                onClick={() => setShowBookDialog(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" style={{ color: '#f5f2f0' }} />
              </button>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto" style={{ color: '#3d1b0b' }}>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>著作概况 / Overview</h3>
                <p className="leading-relaxed mb-3">
                  《徐霞客游记》是徐霞客根据自己的亲身历用日记体裁撰写的一部地理名著。全书共60余万字，记录了作者1613年至1639年间旅行观察所得，涵盖了地理、水文、地质、植物等多方面内容。
                </p>
                <p className="leading-relaxed opacity-75 text-sm">
                  The Travel Diaries of Xu Xiake is a geographical masterpiece written in diary format based on his personal experiences. The complete work contains over 600,000 characters, recording the author's travel observations from 1613 to 1639, covering geography, hydrology, geology, botany and many other aspects.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>主要内容 / Main Contents</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>浙游日记</p>
                    <p className="text-xs opacity-75">Zhejiang Travel Diaries</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>江右游日记</p>
                    <p className="text-xs opacity-75">Jiangxi Travel Diaries</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>楚游日记</p>
                    <p className="text-xs opacity-75">Chu Travel Diaries</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>粤西游日记</p>
                    <p className="text-xs opacity-75">Guangxi Travel Diaries</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>黔游日记</p>
                    <p className="text-xs opacity-75">Guizhou Travel Diaries</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(101, 93, 37, 0.1)' }}>
                    <p className="mb-1" style={{ color: '#655d25' }}>滇游日记</p>
                    <p className="text-xs opacity-75">Yunnan Travel Diaries</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>历史价值 / Historical Value</h3>
                <p className="leading-relaxed mb-3">
                  《徐霞客游记》不仅是一部重要的科学文献，也是中国古代散文的杰作。它以科学严谨的态度记录了大量地理现象，纠正了前人的诸多谬误，被誉为"世界上最早的喀斯特地貌考察记录"。同时，其文字优美，描写生动，具有很高的文学价值。
                </p>
                <p className="leading-relaxed opacity-75 text-sm">
                  The Travel Diaries is not only an important scientific document but also a masterpiece of ancient Chinese prose. It scientifically records numerous geographical phenomena, correcting many previous errors, and is known as "the world's earliest systematic record of karst landforms." Its beautiful prose also holds significant literary value.
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-3" style={{ color: '#655d25' }}>后世影响 / Legacy</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>被翻译成多国文字，在国际上享有盛誉</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>为后世地理学研究提供了宝贵的第一手资料</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lg" style={{ color: '#655d25' }}>•</span>
                    <span>激励了无数探险家和地理学家继续探索未知世界</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <AIAssistantWidget onNavigateToBookBoy={() => onNavigate?.('chat')} />
    </div>
  );
}