# 🚀 Next.js 開發與介紹

## 📖 專案介紹
提供簡易的 AI Agent 聊天界面，使用者可以與 AI 代理進行對話。  
Next.js 框架可整合 React ⚛️ 與多項前端技術，提供高效能的開發體驗。  

## ⚙️ 安裝過程
```bash
$ npx create-next-app@latest
Need to install the following packages:
create-next-app@15.3.3
>> Ok to proceed? (y) -> y

>> What is your project named? nextjs
>> Would you like to use TypeScript? No / Yes -> Yes -> Yes
>> Would you like to use ESLint? No / Yes -> Yes
>> Would you like to use Tailwind CSS? No / Yes -> Yes
>> Would you like your code inside a src/ directory? No / Yes -> Yes
>> Would you like to use App Router? (recommended) No / Yes -> Yes
>> Would you like to use Turbopack for next dev?  No / Yes -> No
>> Would you like to customize the import alias (@/* by default)? No / Yes -> Yes
>> What import alias would you like configured? @/* -> 直接 Enter
```

## 📂 專案結構
```bash
├── components                  # 🧩 組件目錄
│   ├── AgentMessage.tsx        # 🤖 AI 代理訊息組件
│   ├── ChatInput.tsx           # 💬 聊天輸入組件
│   ├── ConversationList.tsx    # 📜 對話列表組件
│   └── UserMessage.tsx         # 🙋‍♂️ 使用者訊息組件
├── eslint.config.mjs           # 🔍 ESLint 設定檔
├── next.config.ts              # ⚙️ Next.js 配置檔
├── next-env.d.ts               # 🌐 Next.js 環境定義檔
├── package.json                # 📦 Node.js 專案設定，包含依賴項
├── package-lock.json           # 🔒 Node.js 依賴鎖定檔案
├── postcss.config.mjs          # 🎨 PostCSS 設定檔
├── public                      # 🌍 公共資源目錄
│   ├── file.svg                # 📄 檔案圖示
│   ├── globe.svg               # 🌐 地球圖示
│   ├── next.svg                # ⚡ Next.js 標誌
│   ├── vercel.svg              # 🚀 Vercel 標誌
│   └── window.svg              # 🪟 窗口圖示
├── README.md                   # 📖 專案說明文件
├── src                         # 💻 源碼目錄
│   └── app                     # 📱 Next.js 應用程式目錄
│       ├── favicon.ico         # 🖼️ 網站圖示
│       ├── globals.css         # 🎨 全局樣式
│       ├── layout.tsx          # 🗂️ 全局佈局
│       └── page.tsx            # 🏠 首頁組件
├── styles                      # 🎨 樣式目錄
│   └── chat.module.css         # 💬 聊天樣式 -> 用於聊天界面的樣式
├── tsconfig.json               # 📝 TypeScript 設定檔
└── types                       # 📚 類型定義目錄
    └── MessageTypes            # ✉️ 訊息類型 - 定義目錄
        └── index.ts            # 📝 定義訊息類型的 TypeScript 檔案
```