import { useState } from 'react';
import { ChevronDown, ChevronRight, Download, Book, FileText } from 'lucide-react';
import book1Cover from 'figma:asset/eff35c8ee306882ac1ea1d436efaa31b2f9e201d.png';
import book2Cover from 'figma:asset/32ad784bc5ca18ac5c2735a081f537b64bb0594f.png';
import { AIAssistantWidget } from './AIAssistantWidget';

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface Category {
  id: string;
  title: string;
  titleEn: string;
  chapters: Chapter[];
}

const travelNotes: Category[] = [
  {
    id: 'zhejiang',
    title: '浙游日记',
    titleEn: 'Zhejiang Travel Diaries',
    chapters: [
      {
        id: 'zhe-1',
        title: '浙游日记（一）',
        content: `癸丑之三月晦，自宁海出西门。云散日朗，人意山光，俱有喜态。三十里，至梁皇山。闻此地于菟夹道，月伤数十人，遂止宿。

是夜，月甚明。有客坐月下，与予对饮。舟子二三，亦来环坐。正酣间，一客闻猛虎吼声，色变而言曰："此处多虎，何宜于夜以饮。"予闻之笑而不止。

翌日，过方山。至太宁寺，有古松参天，遂憩其下。僧话往日，言此地多猛虎，伤人甚多。予顾谓同行者曰："此亦妄言耳。自昔以来，人与虎岂有不两立者哉？"众皆笑之。

行二十里，至王爱山。山势陡绝，石径盘纡。循级而上，历险峻者数处。及至峰顶，远近诸山，历历在目。烟云出没，移时异状。予因坐石上观之，久之不能去。

晚宿于岭下小寺。寺僧年老，问予所从来。予告之以游山之意。僧笑曰："公真好游者也。然此间山水，尚有胜于此者，当为公道之。"予喜而谢之。`
      },
      {
        id: 'zhe-2',
        title: '浙游日记（二）',
        content: `四月初一日，早起，登天台山。天台去宁海百二十里，路经天门岭，岭势高峻，登陟甚难。

行二十里，至华顶峰。峰顶有寺，僧房整洁。予入寺少憩，寺僧献茶甚佳。问之，乃云此茶产于峰顶，岁不过数斤，极为珍贵。

自寺后攀登而上，石磴千级，两旁古木森森，浓荫蔽日。行至半山，有飞泉悬挂，声如雷鸣。立于泉下，水珠飞溅，清凉透骨。

登峰顶，四望诸山，皆在足下。云海茫茫，时有山峰出没其间，如岛屿浮沉。正值夕阳西下，霞光万道，照耀峰峦，奇幻莫测。予叹曰："天台之胜，果不虚也！"

是夜宿于峰顶寺中。夜半，月明如昼，出寺观望，见银河横天，众星历历，下视诸峰，若在云雾中。清风徐来，松涛阵阵，恍若仙境。

翌日下山，经琼台、桐柏，访石梁飞瀑。瀑布悬挂于两崖之间，下有深潭，水色碧绿。观瀑良久，方才离去。`
      }
    ]
  },
  {
    id: 'jiangxi',
    title: '江右游日记',
    titleEn: 'Jiangxi Travel Diaries',
    chapters: [
      {
        id: 'jiang-1',
        title: '江右游日记（一）',
        content: `庚申九月初一日，自南昌启程，往游庐山。舟行赣江，两岸山色青翠，村落人烟，点缀其间，颇有佳趣。

行五十里，至吴城镇。镇居鄱阳湖口，舟楫辐辏，商贾云集，甚为繁盛。予于镇上购备数日粮食，乃登舟西行。

入鄱阳湖，湖面广阔无际，烟波浩渺。远望庐山诸峰，隐约在云雾间。湖中多渔舟，张帆点点，如鸥鸟浮水。予倚船观之，心旷神怡。

傍晚，风起浪涌，舟人惶恐，欲寻港避风。予笑曰："大丈夫游天下，岂畏风浪哉？"舟人闻言，稍安。然风浪愈大，舟摇甚剧，予亦不免有惧色。

幸赖舟人善驾，历险而进，至落星石下，得一港湾，遂泊舟宿焉。是夜风声怒号，浪击船舷，达旦不绝。`
      }
    ]
  },
  {
    id: 'chu',
    title: '楚游日记',
    titleEn: 'Chu Travel Diaries',
    chapters: [
      {
        id: 'chu-1',
        title: '楚游日记（一）',
        content: `甲戌三月，予自江西入楚，首访武昌。武昌古称江夏，临长江而建，形胜之地也。

登黄鹤楼，楼高数层，飞檐翘角，气象雄伟。凭栏远眺，大江东去，帆影点点。对岸汉阳，树木葱茏，晴川历历可数。予思崔颢诗句："昔人已乘黄鹤去，此地空余黄鹤楼。"不禁慨然。

楼下有碑记，记载楼之沿革。予细读之，知此楼屡毁屡建，然其名不替。足见江山不老，人文永存。

是日晴朗，江面波光粼粼。有渔舟数十，撒网捕鱼，鸥鸟翔集。予坐楼上观之，移时不倦。

午后，访蛇山，山不甚高，而盘旋起伏，状如长蛇，故名。山上有古寺，寺中有古松，粗可数围。寺僧云，此松已历千年，仍然苍翠如新。

晚归客栈，途经市井，见人烟稠密，店铺林立，颇具繁华景象。予叹曰："楚地虽远，而商贸通达，文化昌盛，不愧为荆楚重镇。"`
      }
    ]
  },
  {
    id: 'guangxi',
    title: '粤西游日记',
    titleEn: 'Guangxi Travel Diaries',
    chapters: [
      {
        id: 'guang-1',
        title: '粤西游日记（一）',
        content: `丁丑二月，予入粤西，首至桂林。桂林山水，甲天下之名，久已耳闻，今得亲历，方知名不虚传。

舟行漓江，两岸峰峦奇秀，千姿百态。或如笋拔地，或如屏列岸，或如兽蹲伏，或如人端坐，变化万千，不可胜数。江水清澈见底，游鱼历历可数。倒影映江中，山水相映成趣。

至黄布滩，水势平缓，江面如镜。山峰倒映其中，清晰如画。予立船头观之，叹为观止。舟人云："此处为漓江最佳景处，每有游客至此，莫不赞叹。"

是日天气晴朗，云淡风轻。两岸村落，竹树掩映，炊烟袅袅。农人荷锄归来，水牛悠然吃草。予观此景，恍若画中游。

傍晚，至阳朔，投宿于江边客栈。栈前有古榕树，枝叶扶疏，浓荫蔽日。予坐树下纳凉，见明月初升，照江面如银，群峰隐约，如梦如幻。此情此景，终身难忘。`
      }
    ]
  },
  {
    id: 'yunnan',
    title: '滇游日记',
    titleEn: 'Yunnan Travel Diaries',
    chapters: [
      {
        id: 'dian-1',
        title: '滇游日记（一）',
        content: `己卯三月，予至云南，自普洱启程，往游滇西诸山。滇地僻远，山川奇绝，风物殊异，与中原大不相同。

行十余日，至大理。大理古为南诏国都，城垣宏丽，街市整齐。城西有苍山，连峰十九，常年积雪。城东有洱海，水波万顷，渔歌互答。山水之间，风景如画。

登苍山，山路崎岖，石磴如梯。两旁林木茂密，多珍禽异兽。行至半山，有溪流飞瀑，清澈甘甜。及至峰顶，下视洱海，如明镜置于翠屏之间。远眺四周，群山环绕，云海苍茫。

山顶有寺，寺僧皆白衣，与中土异。僧云，此处佛法传自天竺，与汉地不同。予与之论道，颇有启发。

下山访三塔，塔高十余丈，巍峨壮观。塔身雕刻精美，历经千年，犹自完好。塔旁有碑，记载建塔始末。予细读之，感古人之用心良苦。`
      },
      {
        id: 'dian-2',
        title: '滇游日记（二）',
        content: `离大理，西行至丽江。丽江居玉龙雪山之麓，纳西人所居也。城中小桥流水，杨柳依依，别具风情。

纳西人善歌舞，男女皆着奇服，言语与中土迥异。然待客甚厚，予所到之处，莫不殷勤款待。予尝其食，多鱼肉，少米粟，烹调亦异。

访玉龙雪山，山势巍峨，白雪皑皑，如玉龙蟠卧。山上有冰川，千年不化。予欲登顶，然山势险峻，土人云无人能至峰顶。予不甘心，强行而上，至半山，雪深没膝，气喘难继，不得已而返。

山下有泉，清冽甘美。泉旁有巨石，纳西人奉为神石，每岁祭祀。予观之，知各地风俗不同，然敬畏自然之心，则天下皆同也。

是夜宿于纳西人家中。主人设火塘，一家环坐，烤肉饮酒，歌舞达旦。予虽言语不通，然亦能感其热情。予以中土笔墨相赠，彼大喜，以玉佩相报。临别，依依不舍。`
      }
    ]
  }
];

export function TravelNotesPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['zhejiang']);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(travelNotes[0].chapters[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('zhejiang');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleChapterClick = (chapter: Chapter, categoryId: string) => {
    setSelectedChapter(chapter);
    setSelectedCategory(categoryId);
  };

  const handleChapterDownload = (chapter: Chapter) => {
    alert(`下载章节：${chapter.title}\n\nDownload: ${chapter.title}\n\n此为演示功能，实际应用中将下载对应的PDF文件。`);
  };

  const handleFullDownload = () => {
    alert('下载完整《徐霞客游记》\n\nDownload: Complete Travel Diaries of Xu Xiake\n\n此为演示功能，实际应用中将下载完整版PDF文件。');
  };

  return (
    <div className="w-full flex min-h-[600px]">
      {/* Left Sidebar - Chapter Navigation */}
      <div 
        className="w-80 border-r overflow-y-auto flex-shrink-0"
        style={{ 
          backgroundColor: '#f5f2f0',
          borderColor: '#959d8b',
          maxHeight: '800px',
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(101, 93, 37, 0.02) 50px,
              rgba(101, 93, 37, 0.02) 51px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(101, 93, 37, 0.02) 50px,
              rgba(101, 93, 37, 0.02) 51px
            )
          `
        }}
      >
        {/* Header */}
        <div 
          className="sticky top-0 p-4 border-b z-10"
          style={{ 
            backgroundColor: '#655d25',
            borderColor: '#3d1b0b'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Book className="w-5 h-5" style={{ color: '#f5f2f0' }} />
            <h2 className="text-lg" style={{ color: '#f5f2f0' }}>徐霞客游记</h2>
          </div>
          <p className="text-xs" style={{ color: '#959d8b' }}>
            The Travel Diaries of Xu Xiake
          </p>
        </div>

        {/* Categories and Chapters */}
        <div className="p-4 space-y-2">
          {travelNotes.map(category => (
            <div key={category.id} className="space-y-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-md"
                style={{
                  backgroundColor: expandedCategories.includes(category.id) ? '#655d25' : '#636c53',
                  color: '#f5f2f0'
                }}
              >
                <div className="flex items-center gap-2">
                  {expandedCategories.includes(category.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div className="text-left">
                    <div className="text-sm">{category.title}</div>
                    <div className="text-xs opacity-80">{category.titleEn}</div>
                  </div>
                </div>
                <div 
                  className="px-2 py-1 rounded text-xs"
                  style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                >
                  {category.chapters.length}篇
                </div>
              </button>

              {/* Chapters */}
              {expandedCategories.includes(category.id) && (
                <div className="ml-4 space-y-1">
                  {category.chapters.map(chapter => (
                    <div
                      key={chapter.id}
                      className="flex items-center gap-2 group"
                    >
                      <button
                        onClick={() => handleChapterClick(chapter, category.id)}
                        className="flex-1 p-2 rounded text-sm text-left transition-all hover:shadow-sm"
                        style={{
                          backgroundColor: selectedChapter.id === chapter.id ? '#959d8b' : '#ffffff',
                          color: selectedChapter.id === chapter.id ? '#f5f2f0' : '#3d1b0b',
                          border: `1px solid ${selectedChapter.id === chapter.id ? '#655d25' : '#959d8b'}`
                        }}
                      >
                        {chapter.title}
                      </button>
                      <button
                        onClick={() => handleChapterDownload(chapter)}
                        className="p-2 rounded transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                        style={{ 
                          backgroundColor: '#655d25',
                          color: '#f5f2f0'
                        }}
                        title="下载此章节"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Book Downloads Section */}
        <div 
          className="m-4 p-4 rounded-lg border-2"
          style={{ 
            backgroundColor: '#ffffff',
            borderColor: '#655d25',
            borderStyle: 'dashed'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4" style={{ color: '#655d25' }} />
            <h3 className="text-sm" style={{ color: '#655d25' }}>相关书籍下载</h3>
          </div>
          <div className="space-y-3">

            {/* Book 1 */}
            <div
              className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              onClick={() => {
                window.open(
                  'https://drive.google.com/file/d/1vt8K2TAEEvu8ynpKtTXTzWI1GYFeIKpr/view?usp=drive_link',
                  '_blank'
                );
              }}
            >
              <img 
                src={book1Cover} 
                alt="徐霞客游记（一）"
                className="w-full h-auto"
              />
              <div 
                className="p-2 group-hover:bg-opacity-90 transition-colors"
                style={{ backgroundColor: '#636c53' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#f5f2f0' }}>徐霞客游记（一）</span>
                  <Download className="w-3 h-3" style={{ color: '#f5f2f0' }} />
                </div>
              </div>
            </div>
            
            {/* Book 2 */}
            <div
              className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              onClick={() => {
                window.open(
                  'https://drive.google.com/file/d/1vt8K2TAEEvu8ynpKtTXTzWI1GYFeIKpr/view?usp=drive_link',
                  '_blank'
                );
              }}
            >
              <img 
                src={book2Cover} 
                alt="徐霞客游记（一）经典版"
                className="w-full h-auto"
              />
              <div 
                className="p-2 group-hover:bg-opacity-90 transition-colors"
                style={{ backgroundColor: '#636c53' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#f5f2f0' }}>徐霞客游记（一）</span>
                  <Download className="w-3 h-3" style={{ color: '#f5f2f0' }} />
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Header */}
        <div 
          className="p-6 border-b"
          style={{ 
            backgroundColor: '#f5f2f0',
            borderColor: '#959d8b',
            backgroundImage: `linear-gradient(135deg, rgba(101, 93, 37, 0.05) 0%, transparent 100%)`
          }}
        >
          <h1 className="text-2xl mb-2" style={{ color: '#655d25' }}>
            {selectedChapter.title}
          </h1>
          <p className="text-sm" style={{ color: '#636c53' }}>
            {travelNotes.find(cat => cat.id === selectedCategory)?.title} · 
            {travelNotes.find(cat => cat.id === selectedCategory)?.titleEn}
          </p>
        </div>

        {/* Content Body */}
        <div 
          className="flex-1 overflow-y-auto p-8"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div 
            className="max-w-3xl mx-auto p-8 rounded-lg shadow-lg"
            style={{ 
              backgroundColor: '#f5f2f0',
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 31px,
                  rgba(101, 93, 37, 0.1) 31px,
                  rgba(101, 93, 37, 0.1) 32px
                )
              `,
              border: '3px double #655d25'
            }}
          >
            {/* Decorative Corner */}
            <div 
              className="w-12 h-12 mb-4"
              style={{
                backgroundImage: `linear-gradient(135deg, #655d25 0%, transparent 100%)`,
                clipPath: 'polygon(0 0, 100% 0, 0 100%)'
              }}
            />

            <div 
              className="text-justify leading-loose whitespace-pre-line"
              style={{ 
                color: '#3d1b0b',
                lineHeight: '2.2',
                textIndent: '2em'
              }}
            >
              {selectedChapter.content}
            </div>

            {/* Seal Mark */}
            <div className="flex justify-end mt-8">
              <div 
                className="w-16 h-16 rounded flex items-center justify-center text-xs transform rotate-12"
                style={{ 
                  backgroundColor: '#655d25',
                  color: '#f5f2f0',
                  border: '2px solid #3d1b0b'
                }}
              >
                徐霞客
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Full Download Button */}
        <div 
          className="p-4 border-t flex justify-center"
          style={{ 
            backgroundColor: '#f5f2f0',
            borderColor: '#959d8b'
          }}
        >
          <button
            onClick={handleFullDownload}
            className="flex items-center gap-3 px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: '#655d25',
              color: '#f5f2f0'
            }}
          >
            <Download className="w-5 h-5" />
            <span>下载完整《徐霞客游记》</span>
            <span className="text-xs opacity-75">Download Complete Edition</span>
          </button>
        </div>
      </div>

      {/* Decorative Scroll Pattern */}
      <style>{`
        @keyframes scrollFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
      
      <AIAssistantWidget onNavigateToBookBoy={() => onNavigate?.('chat')} />
    </div>
  );
}