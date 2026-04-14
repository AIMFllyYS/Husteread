import { InteractiveBentoGallery, type MediaItemType } from "@/components/ui";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "读书会现场",
    desc: "《百年的孤独》精读分享会，思想在字里行间碰撞。",
    url: "https://images.unsplash.com/photo-1529148482759-b35b25c5f217?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
  },
  {
    id: 2,
    type: "image",
    title: "文学与电影",
    desc: "书影音主题对谈，探索叙事的多种可能。",
    url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1600x1000/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "图书馆角落",
    desc: "在静谧的午后，与古人进行一场跨越时空的对话。",
    url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x1000/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "草坪读诗夜",
    desc: "星空下的诗意栖居，让灵魂在韵律中自由呼吸。",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1400x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Sunlight 沙龙",
    desc: "阳光洒在书页上，也洒在每一个热爱阅读的心灵里。",
    url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1100x1200/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "咖啡与哲学",
    desc: "苦涩的咖啡与深邃的思想，是午后最完美的搭配。",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1500x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "二手书交换",
    desc: "每一本书都是一段旅程，交换书籍，也是交换彼此的故事。",
    url: "https://images.unsplash.com/photo-1524578974012-ef36c84b4233?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x1000/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 8,
    type: "image",
    title: "人文讲坛",
    desc: "聆听大师的教诲，开阔视野，提升境界。",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 9,
    type: "image",
    title: "深夜书房",
    desc: "一盏孤灯，一卷好书，是深夜里最温暖的慰藉。",
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 10,
    type: "image",
    title: "书友合影",
    desc: "因为阅读而相遇，因为志趣而同行。",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    fallbackUrl: "https://dummyimage.com/1200x900/f0ece4/7E1518.png&text=HUSTERead+Gallery",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background font-serif">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="光影志"
        description="记录读书会的每一个精彩瞬间，定格那些与书、与友相伴的温暖时光。"
      />
    </div>
  );
}
