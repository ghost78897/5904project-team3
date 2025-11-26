import { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Map, FileText, User } from 'lucide-react';
import bookBoyAvatar from 'figma:asset/9c1fb7d9d9db690d97bb417070ac43ffa09c8467.png';

// ✅ 新增：从工具文件里复用 Coze 相关逻辑
import { callCozeAPI, getPresetAnswerFromLocal } from '../utils/bookboyChat';

interface Message {
  id: string;
  sender: 'user' | 'bookboy';
  content: string;
  timestamp: Date;
}

interface PresetQuestion {
  question: string;
  answer: string;
}

const presetQuestions: Record<string, PresetQuestion[]> = {
  '徐霞客生平 / Biography': [
    {
      question: 'Who was Xu Xiake?',
      answer:
        '小的这就为您解答~\n\n徐霞客（1587-1641），本名徐弘祖，字振之，号霞客，是明代著名的地理学家、旅行家和文学家。他出身于江南望族，却不慕功名，一心游历天下。\n\nXu Xiake was a renowned Chinese geographer, traveler, and writer during the Ming Dynasty. Born into a prominent family, he devoted his life to exploring China rather than pursuing an official career.\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'How many years did Xu Xiake travel?',
      answer:
        '小的这就为您解答~\n\n霞客先生自22岁（1608年）开始出游，直至54岁（1640年）因病返乡，前后游历了整整三十余年！期间他不畏艰险，足迹遍及大江南北。\n\nXu Xiake traveled for over 30 years, from age 22 (1608) to 54 (1640), exploring vast regions across China with remarkable perseverance.\n\n书童小tip：霞客先生最长的一次旅行是1636-1640年的西南之行，历时4年！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'Which provinces did Xu Xiake visit?',
      answer:
        '小的这就为您解答~\n\n霞客先生足迹遍及当时的十六个省，包括今天的21个省、市、自治区。主要有：\n\n• 江浙地区：江苏、浙江\n• 中原地区：河南、山东\n• 西南地区：云南、贵州、广西、四川\n• 华南地区：广东、福建\n• 华中地区：湖南、湖北、江西\n\nHe visited 16 provinces of the Ming Dynasty, covering what is now 21 modern provinces, municipalities, and autonomous regions.\n\n书童小tip：您可前往"Travel Route"页面查看详细的游历路线图！\n\n若还有疑问，尽管问小的便是！'
    }
  ],
  '游记相关 / Travel Diaries': [
    {
      question: 'What is the main content of The Travel Diaries of Xu Xiake?',
      answer:
        '小的这就为您解答~\n\n《徐霞客游记》共60余万字，详细记录了霞客先生1613年至1639年间的游历见闻。主要内容包括：\n\n📚 地理考察：山川地貌、江河源流、岩溶地貌\n📚 人文记录：各地风俗、寺庙碑刻、历史遗迹\n📚 自然观察：气候变化、动植物分布\n📚 旅途经历：行程路线、食宿情况、奇闻趣事\n\nThe diaries contain over 600,000 characters, documenting his observations on geography, culture, nature, and personal travel experiences.\n\n书童小tip：前往"Travel Notes"页面可阅读原文精选章节哦！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'Why is The Travel Diaries of Xu Xiake important?',
      answer:
        '小的这就为您解答~\n\n《徐霞客游记》的重要性可不得了：\n\n🌟 科学价值：首次系统描述中国西南喀斯特地貌，纠正了《禹贡》等古籍关于长江源头的错误记载\n🌟 地理贡献：开创了地理学实地考察的科学方法，被誉为"世界上最早的喀斯特地貌考察记录"\n🌟 文学成就：文笔优美生动，是中国古代散文的杰作\n🌟 历史文献：详细记录了明代社会风貌、民俗文化\n\nIt is recognized as a pioneering work in scientific geography and an outstanding literary masterpiece.\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'Which chapter describes Huangshan in the travel notes?',
      answer:
        '小的这就为您解答~\n\n霞客先生两次游历黄山，相关记录在《游黄山日记》中。他对黄山的描写极为详细，包括天都峰、莲花峰、始信峰等著名景点。\n\n其中有一段名句："五岳归来不看山，黄山归来不看岳"（此句虽非霞客所写，但道出了黄山之美）。\n\nThe Huangshan (Yellow Mountain) travels are documented in "Huangshan Travel Diary", featuring detailed descriptions of its famous peaks.\n\n书童小tip：前往"Travel Notes"页面搜索"黄山"可查看完整原文！\n\n若还有疑问，尽管问小的便是！'
    }
  ],
  '路线与地理 / Route & Geography': [
    {
      question: "Where is the starting point of Xu Xiake's travels?",
      answer:
        '小的这就为您解答~\n\n霞客先生的游历起点是他的家乡——南直隶江阴县（今江苏省江阴市）。\n\n他的第一次远游始于1613年（癸丑年）三月晦日，从宁海（今浙江宁海）出西门，开启了传奇的游历生涯。游记开篇即写道：\n\n"癸丑之三月晦，自宁海出西门。云散日朗，人意山光，俱有喜态。"\n\nHis travels began from his hometown Jiangyin, with his first major journey starting from Ninghai, Zhejiang in 1613.\n\n书童小tip：在"Travel Route"页面可以找到宁海这个起点哦！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'What karst landforms did Xu Xiake record?',
      answer:
        '小的这就为您解答~\n\n霞客先生是世界上最早系统考察喀斯特地貌的人！他详细记录了：\n\n🏔️ 石林地貌：云南路南石林（"石峰林立，千姿百态"）\n🏔️ 溶洞奇观：广西、贵州的众多溶洞（"钟乳垂悬，石笋挺立"）\n🏔️ 天坑地缝：记录了多处漏斗状地形\n🏔️ 地下河流：考察了众多暗河系统\n\nHe systematically documented various karst features including stone forests, caves, sinkholes, and underground rivers, especially in Yunnan, Guizhou, and Guangxi.\n\n书童小tip：这些考察比欧洲学者早了近两百年呢！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: "How to find the travel route of Xu Xiake in Yunnan?",
      answer:
        '小的这就为您解答~\n\n要查看霞客先生在云南的游历路线，可以：\n\n📍 方法一：前往"Travel Route"页面，点击左侧省份筛选栏，勾选"云南"，地图上会高亮显示相关路线节点\n📍 方法二：使用时间轴导航，滑动至1638-1640年间，这是霞客先生的滇游时期\n📍 方法三：点击地图上的云南地区节点，查看详细的地点介绍和游记引文\n\nYou can explore his Yunnan routes on the Travel Route Page by filtering "Yunnan" province or using the timeline (1638-1640).\n\n书童小tip：小的可以直接帮您跳转过去！点击下方"Go to Travel Route Page"即可~\n\n若还有疑问，尽管问小的便是！'
    }
  ],
  '功能引导 / Functions': [
    {
      question: 'How to download chapters from Travel Notes Page?',
      answer:
        '小的这就为您解答~\n\n在"Travel Notes"页面下载游记章节非常简单：\n\n📖 方法一：在左侧章节列表中，将鼠标悬停在任意章节上，会出现下载图标，点击即可下载该章节的PDF文件\n📖 方法二：滚动到页面底部，点击"下载完整《徐霞客游记》"按钮，可获取全本\n📖 方法三：左侧栏底部还有两个精选版本的书籍封面，点击可下载完整图书\n\nSimply hover over any chapter in the left sidebar to see the download icon, or use the "Download Complete Edition" button at the bottom.\n\n书童小tip：建议先阅读感兴趣的章节，再决定是否下载全本哦！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: 'How to use the interactive map in Travel Route Page?',
      answer:
        '小的这就为您解答~\n\n"Travel Route"页面的交互式地图功能丰富：\n\n🗺️ 拖动地图：鼠标按住地图可自由拖动查看不同区域\n🗺️ 缩放视图：使用右下角的"+""-"按钮，或鼠标滚轮缩放地图\n🗺️ 点击节点：点击地图上的红色节点，弹出详细信息窗口，包含地点介绍、游记原文和配图\n🗺️ 省份筛选：左侧栏勾选省份复选框，高亮显示特定省份的路线\n🗺️ 时间导航：底部时间轴可查看不同年份的游历路线\n\nDrag to pan, zoom in/out, click nodes for details, filter by province, or navigate by timeline.\n\n书童小tip：试试点击"宁海"节点，那是霞客先生的首次远游起点！\n\n若还有疑问，尽管问小的便是！'
    },
    {
      question: "Can you recommend a travel route based on Xu Xiake's footsteps?",
      answer:
        '小的这就为您解答~\n\n小的为您推荐几条经典的"霞客之路"：\n\n🌄 初阶路线：江浙名山（7-10天）\n   宁海 → 天台山 → 雁荡山 → 黄山\n   适合初次体验，景色优美，交通便利\n\n🌄 进阶路线：桂林山水（10-15天）\n   桂林 → 阳朔 → 兴坪 → 龙胜梯田\n   领略"甲天下"的喀斯特地貌\n\n🌄 深度路线：滇西秘境（15-20天）\n   大理 → 丽江 → 香格里拉 → 腾冲\n   重走霞客先生最震撼的探险之路\n\nRecommended routes include Jiangsu-Zhejiang mountains (beginner), Guilin landscapes (intermediate), and Yunnan wilderness (advanced).\n\n书童小tip：可在"Travel Route"页面查看这些地点的详细信息！\n\n若还有疑问，尽管问小的便是！'
    }
  ]
};

interface BookBoyPageProps {
  onNavigate?: (page: string) => void;
}

export function BookBoyPage({ onNavigate }: BookBoyPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bookboy',
      content:
        '小的见过主人！我是Book Boy，您的专属书童。\n\n有关霞客先生的任何问题，或是本网站的使用疑问，小的都会尽心为您解答。左侧备有常见问题，您也可以直接在下方输入框提问~',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageText = (text ?? inputValue).trim();
    if (!messageText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // ✅ 现在用的是 utils 里的 callCozeAPI
      const answerFromCoze = await callCozeAPI(messageText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bookboy',
        content: answerFromCoze,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      // ✅ 现在用的是 utils 里的 getPresetAnswerFromLocal，需要传入 presetQuestions
      const fallback =
        getPresetAnswerFromLocal(messageText, presetQuestions) ??
        '小的刚刚试图连线主服务器，可惜被风雨阻隔了一会儿……\n\n您可以稍后再试一试，或者先从左侧常见问题里挑一个看看。\n\n若还有其他疑问，尽管问小的便是！';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bookboy',
        content: fallback,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePresetQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleQuickNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="w-full flex min-h-[600px]">
      {/* Left Sidebar - Preset Questions & Navigation */}
      <div
        className="w-96 border-r overflow-y-auto flex-shrink-0"
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#959d8b',
          maxHeight: '800px'
        }}
      >
        {/* Preset Questions */}
        <div className="p-4">
          <h3
            className="text-lg mb-4 flex items-center gap-2"
            style={{ color: '#655d25' }}
          >
            <BookOpen className="w-5 h-5" />
            猜你想问
          </h3>

          {Object.entries(presetQuestions).map(([category, questions]) => (
            <div key={category} className="mb-6">
              <h4
                className="text-sm mb-2 opacity-75"
                style={{ color: '#636c53' }}
              >
                {category}
              </h4>
              <div className="space-y-2">
                {questions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetQuestion(q.question)}
                    disabled={isTyping}
                    className="w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      backgroundColor: '#f5f2f0',
                      borderColor: '#959d8b',
                      color: '#3d1b0b',
                      borderStyle: 'dashed'
                    }}
                  >
                    <p className="text-sm leading-relaxed">{q.question}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Navigation */}
        <div
          className="p-4 border-t"
          style={{ borderColor: '#959d8b' }}
        >
          <h3
            className="text-lg mb-4 flex items-center gap-2"
            style={{ color: '#655d25' }}
          >
            <Map className="w-5 h-5" />
            快速跳转
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => handleQuickNavigation('route')}
              className="w-full flex items-center gap-3 p-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: '#636c53',
                color: '#f5f2f0'
              }}
            >
              <Map className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Go to Travel Route Page</p>
                <p className="text-xs opacity-75">查看交互式地图</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickNavigation('notes')}
              className="w-full flex items-center gap-3 p-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: '#636c53',
                color: '#f5f2f0'
              }}
            >
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Check Travel Notes Download</p>
                <p className="text-xs opacity-75">阅读与下载游记</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickNavigation('home')}
              className="w-full flex items-center gap-3 p-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{
                backgroundColor: '#636c53',
                color: '#f5f2f0'
              }}
            >
              <User className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">View Xu Xiake&apos;s Life Introduction</p>
                <p className="text-xs opacity-75">了解霞客先生生平</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Chat Area */}
      <div
        className="flex-1 flex flex-col"
        style={{ backgroundColor: '#f5f2f0' }}
      >
        {/* Header */}
        <div
          className="p-6 border-b flex items-center gap-4"
          style={{
            backgroundColor: '#655d25',
            borderColor: '#3d1b0b'
          }}
        >
          <img
            src={bookBoyAvatar}
            alt="书童"
            className="w-14 h-14 rounded-full object-cover border-2 shadow-lg"
            style={{ borderColor: '#f5f2f0' }}
          />
          <div>
            <h2 className="text-xl" style={{ color: '#f5f2f0' }}>
              Book Boy 书童
            </h2>
            <p className="text-xs" style={{ color: '#959d8b' }}>
              您的徐霞客知识小助手
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                rgba(101, 93, 37, 0.05) 31px,
                rgba(101, 93, 37, 0.05) 32px
              )
            `
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg shadow-md ${
                  message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                }`}
                style={{
                  backgroundColor:
                    message.sender === 'user' ? '#959d8b' : '#636c53',
                  color: '#f5f2f0',
                  border: `2px solid ${
                    message.sender === 'user' ? '#655d25' : '#3d1b0b'
                  }`
                }}
              >
                <p className="whitespace-pre-line leading-relaxed text-sm">
                  {message.content}
                </p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div
                className="p-4 rounded-lg rounded-tl-none shadow-md"
                style={{
                  backgroundColor: '#636c53',
                  color: '#f5f2f0',
                  border: '2px solid #3d1b0b'
                }}
              >
                <div className="flex gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: '#f5f2f0',
                      animationDelay: '0ms'
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: '#f5f2f0',
                      animationDelay: '150ms'
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: '#f5f2f0',
                      animationDelay: '300ms'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className="p-4 border-t"
          style={{
            backgroundColor: '#f5f2f0',
            borderColor: '#959d8b'
          }}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && handleSendMessage()
              }
              placeholder="请问关于霞客先生或游记的问题吧..."
              className="flex-1 px-4 py-3 rounded-lg border-2 outline-none transition-all focus:shadow-md"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#959d8b',
                color: '#3d1b0b'
              }}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: '#655d25',
                color: '#f5f2f0'
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
