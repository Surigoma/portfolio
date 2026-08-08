export type Language = "ja" | "en";
export type SkillLevel = "studies_only" | "hobby" | "hobby_with_work" | "works_only";
export type SkillTag = "frontend" | "backend" | "server" | "library" | "hardware" | "cli_software" | "gui_software" | "language" | "cloud" | "devops" | "tools";
export type SkillId = "React" | "Vue" | "Python" | "Linux" | "C" | "C++" | "C#" | "circuit_development" | "Go" | "TypeScript" | "embedded" | "CI/CD" | "AWS" | "Kubernetes" | "AI-assisted_development";
type LocalizedText = Record<Language, string>;

export const skillText = {
  ja: {
    title: "スキル",
    level: "レベル",
    tag: "タグ",
    all: "すべて",
    levels: { studies_only: "勉強のみ", hobby: "趣味", hobby_with_work: "趣味も仕事も", works_only: "仕事のみ" },
    tags: { frontend: "フロントエンド", backend: "バックエンド", server: "サーバー", library: "ライブラリ", hardware: "ハード", cli_software: "CLI", gui_software: "GUI", language: "言語", cloud: "クラウド", devops: "DevOps", tools: "開発ツール" },
  },
  en: {
    title: "Skills",
    level: "Skill Level",
    tag: "Tags",
    all: "ALL",
    levels: { studies_only: "Studies Only", hobby: "Hobby", hobby_with_work: "Hobby with Work", works_only: "Works Only" },
    tags: { frontend: "FrontEnd", backend: "BackEnd", server: "Server", library: "Library", hardware: "Hardware", cli_software: "CLI", gui_software: "GUI", language: "Language", cloud: "Cloud", devops: "DevOps", tools: "Development Tools" },
  },
} satisfies Record<Language, { title: string; level: string; tag: string; all: string; levels: Record<SkillLevel, string>; tags: Record<SkillTag, string> }>;

export type SkillData = {
  id: SkillId;
  title: LocalizedText;
  description: Record<Language, string[]>;
  level: { type: SkillLevel; maybe?: boolean; length?: number; beforeYear?: number; prefix?: "years" | "months" };
  tags: SkillTag[];
};

export const skills: SkillData[] = [
  {
    id: "React", title: { ja: "React", en: "React" },
    description: { ja: ["仕事で触り始めて、このページを作る際に採用するほど気に入っています。", "単方向参照で構成が複雑になりにくい点が好みです。"], en: ["I started using React at work and liked it enough to use it for this site.", "I like how its one-way data flow helps keep the structure clear."] },
    level: { type: "hobby_with_work", maybe: true, beforeYear: 2022, prefix: "years" }, tags: ["frontend"],
  },
  {
    id: "Vue", title: { ja: "Vue", en: "Vue" },
    description: { ja: ["手軽で書きやすい一方、利用したライブラリにはメンテナンス面の課題も感じました。"], en: ["Vue was easy to write, although some of the libraries I used had maintenance issues."] },
    level: { type: "studies_only", length: 2, prefix: "months" }, tags: ["frontend"],
  },
  {
    id: "Python", title: { ja: "Python", en: "Python" },
    description: { ja: ["2012年頃から継続的に触っています。", "仕事で使い始めてから、メイン言語になりつつあります。"], en: ["I have used Python regularly since around 2012.", "After using it at work, it has gradually become my main language."] },
    level: { type: "hobby_with_work", beforeYear: 2017, prefix: "years" }, tags: ["frontend", "backend", "server", "cli_software"],
  },
  {
    id: "Linux", title: { ja: "Linux", en: "Linux" },
    description: { ja: ["自宅サーバーを始めた頃からUbuntuを使っています。", "仕事ではカーネル空間とユーザーランドの両方を扱いました。"], en: ["I have used Ubuntu since building my first home server.", "At work, I have worked in both kernel space and userland."] },
    level: { type: "hobby_with_work", beforeYear: 2015, prefix: "years" }, tags: ["server", "cli_software"],
  },
  {
    id: "C", title: { ja: "C", en: "C" },
    description: { ja: ["Linux系の開発で利用し、数年間にわたり仕事で継続的に使用しました。"], en: ["I used C for Linux development and worked with it professionally for several years."] },
    level: { type: "works_only", beforeYear: 2015, prefix: "years" }, tags: ["backend", "cli_software", "language"],
  },
  {
    id: "C++", title: { ja: "C++", en: "C++" },
    description: { ja: ["AVRやESP32などの組み込み開発と、友人のゲーム開発用ライブラリで利用しました。", "主に趣味の開発で使用しています。"], en: ["I used C++ for embedded development with AVR and ESP32, and for a friend's game-development library.", "Most of my C++ experience comes from personal projects."] },
    level: { type: "hobby_with_work", beforeYear: 2015, prefix: "years" }, tags: ["cli_software", "language", "hardware"],
  },
  {
    id: "C#", title: { ja: "C#", en: "C#" },
    description: { ja: ["Windows向けGUIツールの作成で使用しました。", "旧Twitterクライアント向けライブラリや、電光掲示板の制御ツールを制作しました。"], en: ["I used C# to create GUI tools for Windows.", "Projects included a library for the former Twitter client and a control tool for an electronic bulletin board."] },
    level: { type: "hobby", beforeYear: 2016, prefix: "years" }, tags: ["gui_software", "library", "language"],
  },
  {
    id: "circuit_development", title: { ja: "回路設計", en: "Circuit Development" },
    description: { ja: ["高専時代に専門分野として学び、趣味でも電子工作を続けています。", "製品化には至っていませんが、仕事で回路設計を行った経験もあります。", "PCBE、Eagle、KiCadを使用してきました。"], en: ["I studied circuit development at a technical college and continue electronics as a hobby.", "I also have professional circuit-design experience, although those designs were not commercialized.", "I have used PCBE, Eagle, and KiCad."] },
    level: { type: "hobby", beforeYear: 2010, prefix: "years" }, tags: ["hardware"],
  },
  {
    id: "Go", title: { ja: "Go", en: "Go" },
    description: { ja: ["趣味で学習を始め、安定性を重視するソフトウェアで採用しています。"], en: ["I started learning Go as a hobby and use it for software where stability is important."] },
    level: { type: "hobby", beforeYear: 2024, prefix: "years" }, tags: ["backend", "language", "cli_software"],
  },
  {
    id: "TypeScript", title: { ja: "TypeScript", en: "TypeScript" },
    description: { ja: ["Reactを用いたフロントエンド開発で使用しています。", "DMXBOXの管理画面と、このポートフォリオサイトで採用しています。"], en: ["I use TypeScript for frontend development with React.", "It is used for the DMXBOX administration interface and this portfolio site."] },
    level: { type: "hobby_with_work" }, tags: ["frontend", "language"],
  },
  {
    id: "embedded", title: { ja: "組み込み開発", en: "Embedded Development" },
    description: { ja: ["組み込みLinux、AVR、ESP32などを用いたソフトウェア・ファームウェア開発の経験があります。", "割り込み、ハードウェアタイマー、マルチコア処理などを扱っています。"], en: ["I have experience developing embedded Linux software and firmware for AVR and ESP32.", "My work includes interrupts, hardware timers, and multicore processing."] },
    level: { type: "hobby_with_work" }, tags: ["hardware", "backend"],
  },
  {
    id: "CI/CD", title: { ja: "CI/CD", en: "CI/CD" },
    description: { ja: ["GitHub ActionsやWebhookを用いた、自動ビルド・デプロイ環境を構築しています。"], en: ["I build automated build and deployment workflows using GitHub Actions and webhooks."] },
    level: { type: "hobby_with_work" }, tags: ["devops", "server"],
  },
  {
    id: "AWS", title: { ja: "AWS", en: "AWS" },
    description: { ja: ["仕事でAWSを利用したクラウド環境の開発・運用経験があります。"], en: ["I have professional experience developing and operating cloud environments on AWS."] },
    level: { type: "works_only" }, tags: ["cloud", "server", "devops"],
  },
  {
    id: "Kubernetes", title: { ja: "Kubernetes", en: "Kubernetes" },
    description: { ja: ["仕事でKubernetesを利用したコンテナ環境の開発・運用経験があります。"], en: ["I have professional experience developing and operating container environments with Kubernetes."] },
    level: { type: "works_only" }, tags: ["server", "devops"],
  },
  {
    id: "AI-assisted_development", title: { ja: "AI支援開発", en: "AI-assisted Development" },
    description: { ja: ["生成AIを要件整理、設計、実装、レビュー、ドキュメント作成に活用しています。", "提案をそのまま採用せず、既存コードとの整合性や実行結果を検証しながら開発を効率化しています。"], en: ["I use generative AI for requirements analysis, design, implementation, review, and documentation.", "Rather than accepting suggestions as-is, I verify them against the existing code and execution results to improve development efficiency."] },
    level: { type: "hobby_with_work" }, tags: ["tools"],
  },
];

export type WorkData = { id: string; title: LocalizedText; description?: LocalizedText; skills: SkillId[]; tags?: string[]; href?: string; featured?: boolean };
export const works: WorkData[] = [
  { id: "DMXBOX", title: { ja: "DMXBOX", en: "DMXBOX" }, description: { ja: "raspi-DMXBoxの後継として、安定した運用を重視して開発した照明制御システムです。", en: "A lighting-control system developed as the successor to raspi-DMXBox, with an emphasis on reliable operation." }, skills: ["Go", "React", "TypeScript"], tags: ["Go", "React", "TypeScript", "Linux", "Hardware"], href: "https://github.com/Surigoma/DMXBOX", featured: true },
  { id: "portfolio", title: { ja: "ポートフォリオサイト", en: "Portfolio" }, description: { ja: "スキルや制作物を分かりやすく紹介するために制作した、多言語対応のポートフォリオサイトです。", en: "This bilingual portfolio site presents my skills and projects in a clear, responsive interface." }, skills: ["React", "TypeScript", "CI/CD", "AI-assisted_development"], tags: ["React", "TypeScript", "MUI"], href: "https://github.com/Surigoma/portfolio" },
  { id: "IRIG2JJY-M5", title: { ja: "IRIG2JJY-M5", en: "IRIG2JJY-M5" }, description: { ja: "IRIG時刻信号を標準電波JJYのタイムコード信号へ変換する、小型のハードウェアです。", en: "A compact hardware project that converts an IRIG time signal into a standard JJY time-code signal." }, skills: ["C++", "circuit_development", "embedded"], tags: ["C++", "ESP32", "Hardware"], href: "https://github.com/Surigoma/IRIG2JJY-M5" },
  { id: "webhook-updater", title: { ja: "webhook-updater", en: "webhook-updater" }, skills: ["Python"], href: "https://github.com/Surigoma/webhook-updater" },
  { id: "raspi-dmxbox", title: { ja: "raspi-DMXBox", en: "raspi-DMXBox" }, skills: ["Python"], href: "https://github.com/Surigoma/raspi-DMXBox" },
  { id: "ledDisplay", title: { ja: "ledDisplay", en: "ledDisplay" }, skills: ["Python"], href: "https://github.com/Surigoma/ledDisplay" },
  { id: "work_linux_enbedded", title: { ja: "組み込みLinux開発", en: "Embedded Linux Development" }, skills: ["Linux", "C", "C++", "embedded"] },
  { id: "hobby_linux", title: { ja: "自宅サーバー構築", en: "Building a home server" }, skills: ["Linux"] },
  { id: "electronic_bulletin_borad", title: { ja: "電光掲示板", en: "Electronic bulletin board" }, skills: ["C#", "circuit_development"], href: "https://github.com/Surigoma/Electronicboard" },
  { id: "twitry", title: { ja: "Twitry（旧Twitterクライアント用ライブラリ）", en: "Twitry (Library for the former Twitter client)" }, skills: ["C#"], href: "https://github.com/Surigoma/Twitry" },
];
export const listedWorks = works.filter((work) => work.description && work.tags);
