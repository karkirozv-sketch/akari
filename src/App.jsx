import { useEffect, useMemo, useRef, useState } from "react";
import {
  GENRE_OPTIONS,
  TAG_OPTIONS,
  FORMAT_OPTIONS,
  TEAM_ROLE_OPTIONS as OPTIONS_TEAM_ROLE_OPTIONS,
  TEAM_PERMISSION_OPTIONS as OPTIONS_TEAM_PERMISSION_OPTIONS,
} from "./data/options";

const STORAGE_USERS = "akari_users_local_v1";
const STORAGE_SESSION = "akari_session_local_v1";
const STORAGE_LIST = "akari_my_list_v1";
const STORAGE_PROGRESS = "akari_progress_v1";
const STORAGE_THEME = "akari_theme_v1";
const STORAGE_PROFILE = "akari_profile_v1";
const STORAGE_CHAPTER_LIKES = "akari_chapter_likes_v1";
const STORAGE_PAGE_COMMENTS = "akari_page_comments_v1";
const STORAGE_TITLE_COMMENTS = "akari_title_comments_v1";
const STORAGE_TITLE_VIEWS = "akari_title_views_v1";
const STORAGE_TITLE_RATINGS = "akari_title_ratings_v1";
const STORAGE_NOTIFICATION_SETTINGS = "akari_notification_settings_v1";
const STORAGE_READING_ACTIVITY = "akari_reading_activity_v1";
const STORAGE_FRIENDS = "akari_friends_v1";
const STORAGE_TEAMS = "akari_teams_v1";

const EXTRA_GENRES = GENRE_OPTIONS;

const EXTRA_TAGS = TAG_OPTIONS;

const CREATE_FORMAT_OPTIONS = FORMAT_OPTIONS;
const CREATE_PUBLISHER_OPTIONS = ["Akari", "Shounen Jump", "Young Animal", "D&C Media", "Shueisha", "Kodansha"];
const CREATE_AUTHOR_OPTIONS = ["Chugong", "Кэнтаро Миура", "Гэгэ Акутами"];
const CREATE_ARTIST_OPTIONS = ["DUBU", "Кэнтаро Миура", "Гэгэ Акутами"];
const CREATE_TEAM_OPTIONS = ["Akari Team", "Akari Dark", "Akari Shounen", "Fond de l'Air", "Reactlv Lab"];
const CREATE_VOICE_TEAM_OPTIONS = ["Akari Voice", "AniVoice", "No Voice Team"];
const CREATE_FRANCHISE_OPTIONS = ["Solo Leveling", "Berserk", "Jujutsu Kaisen"];


function createEmptyCatalogFilters() {
  return {
    genres: [],
    tags: [],
    types: [],
    formats: [],
    statuses: [],
    translations: [],
    chaptersFrom: "",
    chaptersTo: "",
    yearFrom: "",
    yearTo: "",
    ratingFrom: "",
    ratingTo: "",
    ratingCountFrom: "",
    ratingCountTo: "",
  };
}

const titles = [
  {
    id: "solo-leveling",
    name: "Поднятие уровня в одиночку",
    shortName: "Solo Leveling",
    author: "Chugong",
    type: "Манхва",
    format: "Веб",
    year: "2018 г.",
    status: "Завершён",
    translation: "Продолжается",
    views: "27 928",
    rating: "9.41",
    ratingCount: "54",
    genres: ["Экшен", "Фэнтези", "Прокачка", "Подземелья", "Монстры"],
    cover: "https://placehold.co/500x700/180000/ff3b3b?text=Solo+Leveling",
    description:
      "Охотник низшего ранга получает шанс стать сильнейшим. После загадочного события он открывает систему прокачки, которая меняет его жизнь.",
    team: "Akari Team",
    chapters: [
      {
        id: "ch-1",
        name: "Том 1 Глава 1",
        subtitle: "Пробуждение",
        date: "02.12.2024",
        pages: [
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+1",
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+2",
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+3",
        ],
      },
      {
        id: "ch-2",
        name: "Том 1 Глава 2",
        subtitle: "Система",
        date: "03.12.2024",
        pages: [
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+2-1",
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+2-2",
        ],
      },
      {
        id: "ch-3",
        name: "Том 1 Глава 3",
        subtitle: "Первый бой",
        date: "04.12.2024",
        pages: [
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+3-1",
          "https://placehold.co/900x1300/111/ff4444?text=Solo+Leveling+3-2",
        ],
      },
    ],
  },
  {
    id: "berserk",
    name: "Берсерк",
    shortName: "Berserk",
    author: "Кэнтаро Миура",
    type: "Манга",
    format: "Танкобон",
    year: "1989 г.",
    status: "Онгоинг",
    translation: "Продолжается",
    views: "31 404",
    rating: "9.70",
    ratingCount: "128",
    genres: ["Тёмное фэнтези", "Драма", "Экшен", "Сэйнэн"],
    cover: "https://placehold.co/500x700/050505/dedede?text=Berserk",
    description:
      "Мрачная история воина, меча, судьбы и мести. Гатс идёт через боль, предательство и войну, сражаясь против мира и самого рока.",
    team: "Akari Dark",
    chapters: [
      {
        id: "ch-1",
        name: "Том 1 Глава 1",
        subtitle: "Чёрный мечник",
        date: "02.12.2024",
        pages: [
          "https://placehold.co/900x1300/050505/dedede?text=Berserk+1",
          "https://placehold.co/900x1300/050505/dedede?text=Berserk+2",
        ],
      },
      {
        id: "ch-2",
        name: "Том 1 Глава 2",
        subtitle: "Метка",
        date: "03.12.2024",
        pages: [
          "https://placehold.co/900x1300/050505/dedede?text=Berserk+2-1",
          "https://placehold.co/900x1300/050505/dedede?text=Berserk+2-2",
        ],
      },
    ],
  },
  {
    id: "jujutsu-kaisen",
    name: "Дзюдзюцу Кайсен",
    shortName: "Jujutsu Kaisen",
    author: "Гэгэ Акутами",
    type: "Манга",
    format: "Журнал",
    year: "2018 г.",
    status: "Онгоинг",
    translation: "Продолжается",
    views: "19 811",
    rating: "8.92",
    ratingCount: "76",
    genres: ["Сёнэн", "Экшен", "Магия", "Проклятия"],
    cover: "https://placehold.co/500x700/101020/8ab4ff?text=Jujutsu+Kaisen",
    description:
      "Проклятия, маги и битвы на грани жизни. Юдзи Итадори оказывается втянут в мир проклятий после встречи с опасным артефактом.",
    team: "Akari Shounen",
    chapters: [
      {
        id: "ch-1",
        name: "Том 1 Глава 1",
        subtitle: "Рёмен Сукуна",
        date: "02.12.2024",
        pages: [
          "https://placehold.co/900x1300/101020/8ab4ff?text=JJK+1",
          "https://placehold.co/900x1300/101020/8ab4ff?text=JJK+2",
        ],
      },
      {
        id: "ch-2",
        name: "Том 1 Глава 2",
        subtitle: "Проклятие",
        date: "03.12.2024",
        pages: [
          "https://placehold.co/900x1300/101020/8ab4ff?text=JJK+2-1",
          "https://placehold.co/900x1300/101020/8ab4ff?text=JJK+2-2",
        ],
      },
    ],
  },
];

const statuses = ["Хочу читать", "Читаю", "Прочитано", "Любимое"];

const defaultNotifications = [
  {
    id: "n1",
    type: "chapter",
    title: "Новая глава",
    text: "У тайтла «Поднятие уровня в одиночку» появилась новая глава.",
    time: "сейчас",
    unread: true,
  },
  {
    id: "n2",
    type: "moderationApproved",
    title: "Модерация",
    text: "Модератор одобрил вашу заявку на добавление тайтла.",
    time: "недавно",
    unread: true,
  },
  {
    id: "n3",
    type: "commentReply",
    title: "Ответ на комментарий",
    actorName: "Виноград",
    text: "Виноград ответил на ваш комментарий.",
    time: "месяц назад",
    unread: false,
  },
  {
    id: "n4",
    type: "friendRequest",
    title: "Заявка в друзья",
    actorName: "Resuba",
    text: "Resuba хочет добавить вас в друзья.",
    time: "месяц назад",
    unread: false,
  },
];

const defaultNotificationSettings = {
  browserEnabled: false,
  completedFromList: true,
  newTitles: false,
  friendRequests: true,
  oldCommentRepliesOff: false,
  earlyAccessChaptersOff: false,
  cardsOff: false,
  listReading: true,
  listPlanning: false,
  listDropped: false,
  listCompleted: false,
  listFavorite: true,
  listEveryFewDays: true,
};

const defaultFriendsState = {
  friends: [
    { id: "friend-1", name: "KirLli", date: "08.02.2023", avatar: "https://placehold.co/120x120/1b1b1f/e6e6e6?text=K" },
    { id: "friend-2", name: "helixboom@hex.", date: "09.02.2023", avatar: "https://placehold.co/120x120/f7b8cf/111?text=H" },
    { id: "friend-3", name: "sanya-tarakan", date: "25.02.2023", avatar: "https://placehold.co/120x120/26344b/b9d7ff?text=S" },
    { id: "friend-4", name: "Приветик)", date: "15.02.2024", avatar: "https://placehold.co/120x120/2e2e36/f2f2f2?text=П" },
    { id: "friend-5", name: "Ruler", date: "27.09.2022", avatar: "https://placehold.co/120x120/e8ccff/2b2140?text=R" },
  ],
  incoming: [
    { id: "incoming-1", name: "Resuba", date: "месяц назад", avatar: "https://placehold.co/120x120/3a3a42/f87171?text=R" },
    { id: "incoming-2", name: "Виноград", date: "3 дня назад", avatar: "https://placehold.co/120x120/353946/dbeafe?text=В" },
  ],
  outgoing: [
    { id: "outgoing-1", name: "Legendary Cloud", date: "02.03.2024", avatar: "https://placehold.co/120x120/aec8ff/111?text=L" },
  ],
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function MenuIcon({ children }) {
  return (
    <span className="monoIcon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

function notificationVisualType(item) {
  const text = `${item?.type || ""} ${item?.title || ""} ${item?.text || ""}`.toLowerCase();

  if (text.includes("friend") || text.includes("друз")) return "friend";
  if (text.includes("reply") || text.includes("ответ") || text.includes("комментар")) return "reply";
  if (text.includes("reject") || text.includes("отклон")) return "moderationReject";
  if (text.includes("approve") || text.includes("одобр")) return "moderationApprove";
  if (text.includes("модерац") || text.includes("moderation")) return "moderation";
  if (text.includes("глава") || text.includes("chapter")) return "chapter";

  return "default";
}

function NotificationAvatar({ item }) {
  const type = notificationVisualType(item);

  if (type === "reply") {
    return (
      <div className="notificationIconAvatar notificationIconReply" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v7C20 13.88 18.88 15 17.5 15H9l-4.3 4.1c-.64.61-1.7.16-1.7-.72V5.5Zm2.5-.5a.5.5 0 0 0-.5.5v10.55L8.2 14H17.5a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11Z" />
        </svg>
      </div>
    );
  }

  if (type === "friend") {
    return (
      <div className="notificationIconAvatar notificationIconFriend" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2C5.9 13 3 15.25 3 18.05V20h9.35A6.5 6.5 0 0 1 12 18c0-1.86.78-3.54 2.03-4.72A8.9 8.9 0 0 0 9.5 13Zm8.5 1v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2Z" />
        </svg>
      </div>
    );
  }

  if (type === "moderationApprove" || type === "moderationReject" || type === "moderation") {
    return (
      <div className={`notificationIconAvatar ${type === "moderationReject" ? "notificationIconReject" : "notificationIconModeration"}`} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 2 5 5v6c0 4.55 2.9 8.8 7 10 4.1-1.2 7-5.45 7-10V5l-7-3Zm3.55 7.9-4.45 4.45-2.15-2.15 1.25-1.25.9.9 3.2-3.2 1.25 1.25Z" />
        </svg>
      </div>
    );
  }

  if (type === "chapter") {
    return (
      <div className="notificationIconAvatar notificationIconChapter" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H8a2 2 0 0 0-2 2H4V4.5Zm3 .5v10h9V5H8Zm0 2h7v2H8V7Zm0 3h7v2H8v-2Z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="notificationIconAvatar notificationIconDefault" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5c0-3.1-1.65-5.65-4.5-6.32V4a2.5 2.5 0 0 0-5 0v.68C6.65 5.35 5 7.9 5 11v5l-1.7 2v1h17.4v-1L19 16Z" />
      </svg>
    </div>
  );
}

export default function App() {
  const teamDescriptionDraftRef = useRef("");
  const [users, setUsers] = useState(() => readStorage(STORAGE_USERS, []));
  const [session, setSession] = useState(() => readStorage(STORAGE_SESSION, null));
  const [view, setView] = useState("catalog");
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_THEME) || "dark");

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [confirmClearNotificationsOpen, setConfirmClearNotificationsOpen] = useState(false);
  const [bellNotificationsCleared, setBellNotificationsCleared] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const [readerSettingsOpen, setReaderSettingsOpen] = useState(false);
  const [readerChaptersOpen, setReaderChaptersOpen] = useState(false);

  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [titleTab, setTitleTab] = useState("about");
  const [settingsTab, setSettingsTab] = useState("profile");
  const [profileListFilter, setProfileListFilter] = useState("Все");
  const [profileTitleQuery, setProfileTitleQuery] = useState("");
  const [profileCommentQuery, setProfileCommentQuery] = useState("");
  const [profileCommentPage, setProfileCommentPage] = useState(1);
  const [, setRelativeTimeTick] = useState(0);
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const [chaptersDesc, setChaptersDesc] = useState(false);

  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPassword2, setAuthPassword2] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const [selectedTitleId, setSelectedTitleId] = useState(null);
  const [reader, setReader] = useState(null);

  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Все");
  const [catalogMode, setCatalogMode] = useState("home");
  const [catalogFilters, setCatalogFilters] = useState(() => createEmptyCatalogFilters());
  const [activeCatalogFilters, setActiveCatalogFilters] = useState(() => createEmptyCatalogFilters());
  const [catalogSort, setCatalogSort] = useState("popular");
  const [catalogError, setCatalogError] = useState("");
  const [homeActivityPeriod, setHomeActivityPeriod] = useState("day");
  const [homeUpdatePage, setHomeUpdatePage] = useState("reading");
  const [statsPeriod, setStatsPeriod] = useState("7");
  const [statsChartType, setStatsChartType] = useState("line");
  const [readingActivity, setReadingActivity] = useState(() => readStorage(STORAGE_READING_ACTIVITY, []));

  const [suggestForm, setSuggestForm] = useState({
    cover: "",
    background: "",
    originalName: "",
    russianName: "",
    englishName: "",
    altNames: "",
    type: "Манга",
    status: "Онгоинг",
    year: "",
    country: "",
    age: "18+ (RX)",
    translation: "Продолжается",
    uploadMode: "Создатель и переводчики",
    noMarking: true,
    obscene: false,
    drugs: false,
    format: "",
    publisher: "",
    author: "",
    artist: "",
    genres: "",
    tags: "",
    team: "",
    voiceTeam: "",
    franchise: "",
    sourceLinks: "",
    description: "",
  });
  const [suggestMessage, setSuggestMessage] = useState("");
  const [teamForm, setTeamForm] = useState({
    cover: "",
    background: "",
    name: "",
    altNames: "",
    vk: "",
    discord: "",
    site: "",
    description: "",
    isRepresentative: false,
  });
  const [teamMessage, setTeamMessage] = useState("");
  const [createPickerOpen, setCreatePickerOpen] = useState(null);
  const [createPickerQuery, setCreatePickerQuery] = useState("");

  const [myList, setMyList] = useState(() => readStorage(STORAGE_LIST, {}));
  const [progress, setProgress] = useState(() => readStorage(STORAGE_PROGRESS, {}));
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [chapterLikes, setChapterLikes] = useState(() => readStorage(STORAGE_CHAPTER_LIKES, {}));
  const [pageComments, setPageComments] = useState(() => readStorage(STORAGE_PAGE_COMMENTS, {}));
  const [titleComments, setTitleComments] = useState(() => readStorage(STORAGE_TITLE_COMMENTS, {}));
  const [titleViews, setTitleViews] = useState(() => readStorage(STORAGE_TITLE_VIEWS, {}));
  const [titleRatings, setTitleRatings] = useState(() => readStorage(STORAGE_TITLE_RATINGS, {}));
  const [notificationSettings, setNotificationSettings] = useState(() =>
    readStorage(STORAGE_NOTIFICATION_SETTINGS, defaultNotificationSettings)
  );
  const [friendsState, setFriendsState] = useState(() => readStorage(STORAGE_FRIENDS, defaultFriendsState));
  const [teams, setTeams] = useState(() => readStorage(STORAGE_TEAMS, []));
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [teamEditTab, setTeamEditTab] = useState("info");
  const [teamMemberSearchOpen, setTeamMemberSearchOpen] = useState(false);
  const [teamMemberQuery, setTeamMemberQuery] = useState("");
  const [editingTeamMemberId, setEditingTeamMemberId] = useState(null);
  const [deleteTeamMemberId, setDeleteTeamMemberId] = useState(null);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const [searchTab, setSearchTab] = useState("titles");
  const [friendsTab, setFriendsTab] = useState("friends");
  const [friendsQuery, setFriendsQuery] = useState("");
  const [notificationSettingsMessage, setNotificationSettingsMessage] = useState("");
  const [ratingModalTitleId, setRatingModalTitleId] = useState(null);
  const [ratingDraft, setRatingDraft] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [titleCommentText, setTitleCommentText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [titleReplyToCommentId, setTitleReplyToCommentId] = useState(null);
  const [commentAttachSearchOpen, setCommentAttachSearchOpen] = useState(null);
  const [commentAttachQuery, setCommentAttachQuery] = useState("");
  const [commentAttachedTitle, setCommentAttachedTitle] = useState(null);
  const [titleCommentAttachedTitle, setTitleCommentAttachedTitle] = useState(null);
  const [commentPinnedDraft, setCommentPinnedDraft] = useState(false);
  const [titleCommentPinnedDraft, setTitleCommentPinnedDraft] = useState(false);
  const [commentAuthorMode, setCommentAuthorMode] = useState({ type: "user", id: "self" });
  const [titleCommentAuthorMode, setTitleCommentAuthorMode] = useState({ type: "user", id: "self" });
  const [commentAuthorPickerOpen, setCommentAuthorPickerOpen] = useState(null);
  const [titleCommentSort, setTitleCommentSort] = useState("new");

  const [readerSettings, setReaderSettings] = useState({
    mode: "vertical",
    readerTheme: "dark",
    fit: "width",
    brightness: 100,
    width: 100,
    hideNumbers: false,
    clickArea: "image",
    scale: "none",
  });

  const [profile, setProfile] = useState(() =>
    readStorage(STORAGE_PROFILE, {
      nickname: "",
      avatar: "",
      banner: "",
      gender: "Не указан",
      about: "",
    })
  );

  const [profileDraft, setProfileDraft] = useState(() =>
    readStorage(STORAGE_PROFILE, {
      nickname: "",
      avatar: "",
      banner: "",
      gender: "Не указан",
      about: "",
    })
  );

  const [profileMessage, setProfileMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setRelativeTimeTick((tick) => tick + 1), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!catalogError) return;
    const timer = setTimeout(() => setCatalogError(""), 3200);
    return () => clearTimeout(timer);
  }, [catalogError]);

  useEffect(() => localStorage.setItem(STORAGE_USERS, JSON.stringify(users)), [users]);

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_SESSION);
  }, [session]);

  useEffect(() => localStorage.setItem(STORAGE_LIST, JSON.stringify(myList)), [myList]);
  useEffect(() => localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress)), [progress]);
  useEffect(() => localStorage.setItem(STORAGE_THEME, theme), [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
    setProfileDraft(profile);
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CHAPTER_LIKES, JSON.stringify(chapterLikes));
  }, [chapterLikes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PAGE_COMMENTS, JSON.stringify(pageComments));
  }, [pageComments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TITLE_COMMENTS, JSON.stringify(titleComments));
  }, [titleComments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TITLE_VIEWS, JSON.stringify(titleViews));
  }, [titleViews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TITLE_RATINGS, JSON.stringify(titleRatings));
  }, [titleRatings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTIFICATION_SETTINGS, JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_READING_ACTIVITY, JSON.stringify(readingActivity));
  }, [readingActivity]);

  useEffect(() => {
    localStorage.setItem(STORAGE_FRIENDS, JSON.stringify(friendsState));
  }, [friendsState]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TEAMS, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    if (!reader) return;

    const title = titles.find((item) => item.id === reader.titleId);
    const chapter = title?.chapters[reader.chapterIndex];
    if (!title || !chapter) return;

    const key = `${reader.titleId}-${reader.chapterIndex}`;

    if (reader.pageIndex >= chapter.pages.length - 1) {
      setChapterLikes((prev) => ({ ...prev, [key]: true }));
    }
  }, [reader]);

  const allGenres = useMemo(() => {
    return ["Все", ...new Set([...titles.flatMap((title) => title.genres || []), ...EXTRA_GENRES])];
  }, []);

  const allTags = useMemo(() => {
    return [...new Set([...titles.flatMap((title) => title.tags || []), ...EXTRA_TAGS])];
  }, []);

  const catalogFilterOptions = useMemo(() => {
    return {
      type: [...new Set(titles.map((title) => title.type).filter(Boolean))],
      format: [...new Set(titles.map((title) => title.format).filter(Boolean))],
      year: [...new Set(titles.map((title) => title.year).filter(Boolean))],
      status: [...new Set(titles.map((title) => title.status).filter(Boolean))],
      translation: [...new Set(titles.map((title) => title.translation).filter(Boolean))],
      genres: allGenres.filter((item) => item !== "Все"),
      tags: allTags,
    };
  }, [allGenres, allTags]);

  const selectedTitle = titles.find((title) => title.id === selectedTitleId);
  const myListTitles = titles.filter((title) => myList[title.id]);
  const visibleBellNotifications = bellNotificationsCleared ? [] : notifications;
  const unreadCount = bellNotificationsCleared ? 0 : notifications.filter((item) => item.unread).length;
  const bellChapterCount = visibleBellNotifications.filter((item) => item.title.toLowerCase().includes("глава") || item.text.toLowerCase().includes("глава")).length;

  function getTitleYear(title) {
    const year = String(title.year || "").match(/\d{4}/)?.[0];
    return year ? Number(year) : null;
  }

  function titleSearchText(title) {
    return [
      title.name,
      title.shortName,
      title.author,
      title.type,
      title.format,
      title.status,
      title.translation,
      ...(title.genres || []),
      ...(title.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function sortCatalogTitles(list) {
    const sorted = [...list];

    sorted.sort((a, b) => {
      const ratingA = getTitleRatingData(a.id).average || Number(a.rating || 0);
      const ratingB = getTitleRatingData(b.id).average || Number(b.rating || 0);
      const viewsA = getTitleViews(a.id) || Number(String(a.views || "0").replace(/\D/g, "")) || 0;
      const viewsB = getTitleViews(b.id) || Number(String(b.views || "0").replace(/\D/g, "")) || 0;
      const chaptersA = a.chapters?.length || 0;
      const chaptersB = b.chapters?.length || 0;
      const yearA = getTitleYear(a) || 0;
      const yearB = getTitleYear(b) || 0;
      const nameA = a.name || "";
      const nameB = b.name || "";

      if (catalogSort === "rating") return ratingB - ratingA;
      if (catalogSort === "views") return viewsB - viewsA;
      if (catalogSort === "chapters") return chaptersB - chaptersA;
      if (catalogSort === "year") return yearB - yearA;
      if (catalogSort === "updated") return chaptersB - chaptersA;
      if (catalogSort === "added") return yearB - yearA;
      if (catalogSort === "name-az") return nameA.localeCompare(nameB, "ru");
      if (catalogSort === "name-ya") return nameB.localeCompare(nameA, "ru");
      if (catalogSort === "asc") return ratingA - ratingB;

      return ratingB - ratingA || viewsB - viewsA || nameA.localeCompare(nameB, "ru");
    });

    return sorted;
  }

  const myTeams = teams.filter((team) => team.ownerId === currentUserId() || (team.memberIds || []).includes(currentUserId()));

  const searchModalTitles = titles.filter((title) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return titleSearchText(title).includes(search);
  });

  const searchModalTeams = teams.filter((team) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return [team.name, team.altNames, plainTextFromHtml(team.description), team.ownerName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  function getPeriodTitleViews(title, period = homeActivityPeriod) {
    const totalViews = getTotalTitleViews(title);
    const chaptersCount = title.chapters?.length || 1;
    const periodFactor = {
      day: 0.08,
      week: 0.35,
      month: 1,
    }[period] || 0.08;

    return Math.max(1, Math.round(totalViews * periodFactor + chaptersCount * (period === "day" ? 3 : period === "week" ? 10 : 24)));
  }

  function homePeriodLabel(period = homeActivityPeriod) {
    if (period === "week") return "за неделю";
    if (period === "month") return "за месяц";
    return "за день";
  }

  function openHomeUpdateSection(sectionId) {
    setHomeUpdatePage(sectionId);
    setCatalogMode("homeUpdateList");
    setCatalogOpen(false);
    setView("catalog");
    closeFloatingMenus();
  }

  function closeHomeUpdateSection() {
    setCatalogMode("home");
    setHomeUpdatePage("reading");
    setView("catalog");
    closeFloatingMenus();
  }

  const popularHomeTitles = useMemo(() => {
    const prepared = titles
      .map((title) => {
        const totalViews = getTotalTitleViews(title);
        const rating = getTitleRatingData(title.id).average || Number(title.rating || 0);

        return {
          title,
          totalViews,
          rating,
          isMainPopular: totalViews >= 200000,
        };
      })
      .sort((a, b) => {
        if (b.isMainPopular !== a.isMainPopular) return Number(b.isMainPopular) - Number(a.isMainPopular);
        return b.totalViews - a.totalViews || b.rating - a.rating || b.title.chapters.length - a.title.chapters.length;
      });

    return prepared.slice(0, 8);
  }, [titleViews, titleRatings]);



  const homeUpdateColumns = useMemo(() => {
    const prepared = titles.map((title) => ({
      title,
      totalViews: getTotalTitleViews(title),
      periodViews: getPeriodTitleViews(title, homeActivityPeriod),
      rating: getTitleRatingData(title.id).average || Number(title.rating || 0),
      chaptersCount: title.chapters?.length || 0,
      year: getTitleYear(title) || 0,
    }));

    return [
      {
        id: "reading",
        title: "Сейчас читают",
        items: [...prepared]
          .sort((a, b) => b.periodViews - a.periodViews || b.totalViews - a.totalViews)
          .slice(0, 3),
      },
      {
        id: "rising",
        title: "Набирают популярность",
        items: [...prepared]
          .sort((a, b) => (b.periodViews * b.rating) - (a.periodViews * a.rating) || b.totalViews - a.totalViews)
          .slice(0, 3),
      },
      {
        id: "popular",
        title: "Популярное",
        items: [...prepared]
          .sort((a, b) => b.totalViews - a.totalViews || b.rating - a.rating || b.chaptersCount - a.chaptersCount)
          .slice(0, 3),
      },
    ];
  }, [titleViews, titleRatings, homeActivityPeriod]);

  const homeNewTitles = useMemo(() => {
    return [...titles]
      .sort((a, b) => (getTitleYear(b) || 0) - (getTitleYear(a) || 0) || b.chapters.length - a.chapters.length)
      .slice(0, 6);
  }, [titleViews, titleRatings]);

  const homeLatestUpdatedTitles = useMemo(() => {
    return [...titles]
      .sort((a, b) => b.chapters.length - a.chapters.length || getTotalTitleViews(a) - getTotalTitleViews(b))
      .slice(0, 6);
  }, [titleViews, titleRatings]);

  const homeUpdateFullSections = useMemo(() => {
    const prepared = titles.map((title) => ({
      title,
      totalViews: getTotalTitleViews(title),
      periodViews: getPeriodTitleViews(title, homeActivityPeriod),
      rating: getTitleRatingData(title.id).average || Number(title.rating || 0),
      chaptersCount: title.chapters?.length || 0,
      year: getTitleYear(title) || 0,
      lastChapterDate: title.chapters?.[title.chapters.length - 1]?.date || "",
    }));

    const sections = {
      reading: {
        id: "reading",
        title: "Сейчас читают",
        subtitle: `тайтлы с высокой активностью ${homePeriodLabel(homeActivityPeriod)}`,
        items: [...prepared].sort((a, b) => b.periodViews - a.periodViews || b.totalViews - a.totalViews),
      },
      rising: {
        id: "rising",
        title: "Набирают популярность",
        subtitle: `тайтлы, которые быстрее всего набирают визиты ${homePeriodLabel(homeActivityPeriod)}`,
        items: [...prepared].sort((a, b) => (b.periodViews * b.rating) - (a.periodViews * a.rating) || b.totalViews - a.totalViews),
      },
      popular: {
        id: "popular",
        title: "Популярное",
        subtitle: "самые просматриваемые тайтлы",
        items: [...prepared].sort((a, b) => b.totalViews - a.totalViews || b.rating - a.rating || b.chaptersCount - a.chaptersCount),
      },
      new: {
        id: "new",
        title: "Новинки",
        subtitle: "недавно добавленные и свежие тайтлы",
        items: [...prepared].sort((a, b) => b.year - a.year || b.chaptersCount - a.chaptersCount),
      },
      latest: {
        id: "latest",
        title: "Последние обновления",
        subtitle: "тайтлы, у которых недавно выходили главы",
        items: [...prepared].sort((a, b) => b.chaptersCount - a.chaptersCount || a.totalViews - b.totalViews || b.year - a.year),
      },
    };

    return sections;
  }, [titleViews, titleRatings, homeActivityPeriod]);

  const activeHomeUpdateSection = homeUpdateFullSections[homeUpdatePage] || homeUpdateFullSections.reading;

  const filteredTitles = sortCatalogTitles(
    titles.filter((title) => {
      const titleGenres = title.genres || [];
      const titleTags = title.tags || [];
      const searchText = titleSearchText(title);

      const activeGenres = [...new Set([
        ...(genre !== "Все" ? [genre] : []),
        ...activeCatalogFilters.genres,
      ])];

      const titleYear = getTitleYear(title);
      const titleRating = getTitleRatingData(title.id).average || Number(title.rating || 0);
      const titleRatingCount = getTitleRatingData(title.id).count || Number(title.ratingCount || 0);
      const chaptersCount = title.chapters.length;

      const inRange = (value, from, to) => {
        const hasFrom = String(from).trim() !== "";
        const hasTo = String(to).trim() !== "";
        const min = hasFrom ? Number(from) : null;
        const max = hasTo ? Number(to) : null;

        if ((hasFrom || hasTo) && (value === null || value === undefined || Number.isNaN(Number(value)))) return false;
        if (hasFrom && Number.isFinite(min) && Number(value) < min) return false;
        if (hasTo && Number.isFinite(max) && Number(value) > max) return false;
        return true;
      };

      const inYearRange = (value, from, to) => {
        const hasFrom = String(from).trim() !== "";
        const hasTo = String(to).trim() !== "";
        const min = hasFrom ? Number(from) : null;
        const max = hasTo ? Number(to) : null;

        if ((hasFrom || hasTo) && (value === null || value === undefined || Number.isNaN(Number(value)))) return false;
        if (hasFrom && Number.isFinite(min) && Number(value) < min) return false;
        if (hasTo && Number.isFinite(max) && Number(value) > max) return false;
        return true;
      };

      const matchesQuery = !query.trim() || searchText.includes(query.trim().toLowerCase());
      const matchesGenres = activeGenres.length === 0 || activeGenres.every((item) => titleGenres.includes(item));
      const matchesTags = activeCatalogFilters.tags.length === 0 || activeCatalogFilters.tags.every((item) => titleTags.includes(item));
      const matchesTypes = activeCatalogFilters.types.length === 0 || activeCatalogFilters.types.includes(title.type);
      const matchesFormats = activeCatalogFilters.formats.length === 0 || activeCatalogFilters.formats.includes(title.format);
      const matchesStatuses = activeCatalogFilters.statuses.length === 0 || activeCatalogFilters.statuses.includes(title.status);
      const matchesTranslations = activeCatalogFilters.translations.length === 0 || activeCatalogFilters.translations.includes(title.translation);
      const matchesChapters = inRange(chaptersCount, activeCatalogFilters.chaptersFrom, activeCatalogFilters.chaptersTo);
      const matchesYear = inYearRange(titleYear, activeCatalogFilters.yearFrom, activeCatalogFilters.yearTo);
      const matchesRating = inRange(titleRating, activeCatalogFilters.ratingFrom, activeCatalogFilters.ratingTo);
      const matchesRatingCount = inRange(titleRatingCount, activeCatalogFilters.ratingCountFrom, activeCatalogFilters.ratingCountTo);

      return (
        matchesQuery &&
        matchesGenres &&
        matchesTags &&
        matchesTypes &&
        matchesFormats &&
        matchesStatuses &&
        matchesTranslations &&
        matchesChapters &&
        matchesYear &&
        matchesRating &&
        matchesRatingCount
      );
    })
  );

  const filteredProfileTitles = (profileListFilter === "Все"
    ? myListTitles
    : myListTitles.filter((title) => myList[title.id] === profileListFilter)
  ).filter((title) => {
    const search = profileTitleQuery.trim().toLowerCase();
    if (!search) return true;

    return [title.name, title.shortName, title.author, ...(title.genres || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  const continueReadingItems = useMemo(() => {
    return Object.entries(progress)
      .map(([key, pageIndex]) => {
        const lastDash = key.lastIndexOf("-");
        if (lastDash === -1) return null;

        const titleId = key.slice(0, lastDash);
        const chapterIndex = Number(key.slice(lastDash + 1));
        const title = titles.find((item) => item.id === titleId);
        const chapter = title?.chapters[chapterIndex];

        if (!title || !chapter) return null;

        return {
          key,
          titleId,
          title,
          chapter,
          chapterIndex,
          pageIndex: Number(pageIndex) || 0,
          totalPages: chapter.pages.length,
        };
      })
      .filter(Boolean);
  }, [progress]);


  const profileStats = useMemo(() => {
    const now = new Date();
    const daysCount = Number(statsPeriod) || 7;
    const days = Array.from({ length: daysCount }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (daysCount - 1 - index));
      return date.toISOString().slice(0, 10);
    });

    const activityByDay = Object.fromEntries(days.map((day) => [day, 0]));
    readingActivity.forEach((item) => {
      if (item.kind !== "manga") return;
      if (item.day in activityByDay) activityByDay[item.day] += 1;
    });

    const progressChapters = Object.keys(progress).length;
    const activityManga = readingActivity.filter((item) => item.kind === "manga").length;
    const mangaChapters = Math.max(progressChapters, activityManga);

    if (mangaChapters > 0 && readingActivity.length === 0 && days.length > 0) {
      activityByDay[days[days.length - 1]] = mangaChapters;
    }

    const graph = days.map((day) => ({
      day,
      label: day.slice(5).split("-").reverse().join("."),
      value: activityByDay[day] || 0,
    }));

    return {
      mangaChapters,
      ranobeChapters: 0,
      animeEpisodes: 0,
      totalMinutes: mangaChapters * 7,
      graph,
      maxGraphValue: Math.max(1, ...graph.map((item) => item.value)),
    };
  }, [progress, readingActivity, statsPeriod]);


  const profileCommentItems = useMemo(() => {
    const ownId = currentUserId();
    const ownName = usernameFromSession();
    const items = [];
    let orderIndex = 0;

    Object.entries(titleComments).forEach(([titleId, comments]) => {
      const title = titles.find((item) => item.id === titleId);
      (comments || []).forEach((comment) => {
        const isMine = comment.authorId ? comment.authorId === ownId : comment.author === ownName;
        if (!isMine) return;
        orderIndex += 1;
        items.push({
          id: `title-${titleId}-${comment.id}`,
          source: "title",
          type: "К тайтлу",
          titleId,
          titleName: title?.name || "Тайтл",
          chapterName: "",
          text: comment.text || "",
          time: comment.time || "сейчас",
          createdAt: comment.createdAt || "",
          orderIndex,
          rawId: comment.id,
        });
      });
    });

    Object.entries(pageComments).forEach(([key, comments]) => {
      const parts = key.split("-");
      const pageIndex = Number(parts.pop());
      const chapterIndex = Number(parts.pop());
      const titleId = parts.join("-");
      const title = titles.find((item) => item.id === titleId);
      const chapter = title?.chapters?.[chapterIndex];

      (comments || []).forEach((comment) => {
        const isMine = comment.authorId ? comment.authorId === ownId : comment.author === ownName;
        if (!isMine) return;
        orderIndex += 1;
        items.push({
          id: `page-${key}-${comment.id}`,
          source: "page",
          type: "К главе",
          key,
          titleId,
          titleName: title?.name || "Тайтл",
          chapterName: chapter ? `${chapter.name}, стр. ${pageIndex + 1}` : `Страница ${pageIndex + 1}`,
          text: comment.text || "",
          time: comment.time || "сейчас",
          createdAt: comment.createdAt || "",
          orderIndex,
          rawId: comment.id,
        });
      });
    });

    const search = profileCommentQuery.trim().toLowerCase();
    const filtered = search
      ? items.filter((item) => `${item.titleName} ${item.chapterName} ${plainTextFromHtml(item.text)}`.toLowerCase().includes(search))
      : items;

    return filtered.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA || timeB) return timeB - timeA;
      return b.orderIndex - a.orderIndex;
    });
  }, [titleComments, pageComments, profileCommentQuery, session, profile]);

  const PROFILE_COMMENTS_PER_PAGE = 20;
  const profileCommentTotalPages = Math.max(1, Math.ceil(profileCommentItems.length / PROFILE_COMMENTS_PER_PAGE));
  const safeProfileCommentPage = Math.min(profileCommentPage, profileCommentTotalPages);
  const pagedProfileCommentItems = profileCommentItems.slice(
    (safeProfileCommentPage - 1) * PROFILE_COMMENTS_PER_PAGE,
    safeProfileCommentPage * PROFILE_COMMENTS_PER_PAGE
  );

  useEffect(() => {
    setProfileCommentPage(1);
  }, [profileCommentQuery]);

  useEffect(() => {
    if (profileCommentPage > profileCommentTotalPages) {
      setProfileCommentPage(profileCommentTotalPages);
    }
  }, [profileCommentPage, profileCommentTotalPages]);

  const profileHistoryItems = useMemo(() => {
    return Object.entries(progress)
      .map(([key, pageIndex]) => {
        const lastDash = key.lastIndexOf("-");
        if (lastDash === -1) return null;
        const titleId = key.slice(0, lastDash);
        const chapterIndex = Number(key.slice(lastDash + 1));
        const title = titles.find((item) => item.id === titleId);
        const chapter = title?.chapters?.[chapterIndex];
        if (!title || !chapter) return null;
        return {
          key,
          titleId,
          chapterIndex,
          title,
          chapter,
          pageIndex: Number(pageIndex) || 0,
          totalPages: chapter.pages.length,
        };
      })
      .filter(Boolean)
      .reverse();
  }, [progress]);

  function sortedChapters(title) {
    const list = title.chapters.map((chapter, index) => ({ chapter, realIndex: index }));
    return chaptersDesc ? [...list].reverse() : list;
  }

  function resetAuth() {
    setAuthEmail("");
    setAuthPassword("");
    setAuthPassword2("");
    setAuthMessage("");
  }

  function closeFloatingMenus() {
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
    setTeamMenuOpen(false);
  }

  function openCatalog() {
    setCatalogMode("home");
    setView("catalog");
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
    setReaderSettingsOpen(false);
    setReaderChaptersOpen(false);
    setStatusMenuOpen(false);
  }

  function openTitle(id) {
    setSelectedTitleId(id);
    setTitleTab("about");
    setView("title");
    setTitleViews((prev) => ({
      ...prev,
      [id]: Number(prev[id] || 0) + 1,
    }));
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
    setReaderSettingsOpen(false);
    setReaderChaptersOpen(false);
    setStatusMenuOpen(false);
    setTitleReplyToCommentId(null);
    setTitleCommentText("");
  }

  function openTeam(id) {
    setSelectedTeamId(id);
    setView("team");
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
    setTeamMenuOpen(false);
    setUserInfoOpen(false);
  }

  function openTeamEdit(id) {
    const team = teams.find((item) => item.id === id);
    if (!team) return;

    setSelectedTeamId(id);
    setTeamForm({
      cover: team.cover || "",
      background: team.background || "",
      name: team.name || "",
      altNames: team.altNames || "",
      vk: team.vk || "",
      discord: team.discord || "",
      site: team.site || "",
      description: team.description || "",
      isRepresentative: Boolean(team.isRepresentative),
    });
    setTeamMessage("");
    setTeamEditTab("info");
    setTeamMemberSearchOpen(false);
    setTeamMemberQuery("");
    setView("teamEdit");
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
    setTeamMenuOpen(false);
    setUserInfoOpen(false);
  }

  function register(event) {
    event.preventDefault();
    setAuthMessage("");

    const email = authEmail.trim().toLowerCase();

    if (!email || !authPassword || !authPassword2) {
      setAuthMessage("Введите email и два раза пароль.");
      return;
    }

    if (authPassword.length < 6) {
      setAuthMessage("Пароль должен быть минимум 6 символов.");
      return;
    }

    if (authPassword !== authPassword2) {
      setAuthMessage("Пароли не совпадают.");
      return;
    }

    const exists = users.some((user) => user.email === email);

    if (exists) {
      setAuthMessage("Такой email уже зарегистрирован.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      email,
      password: authPassword,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setSession({ id: newUser.id, email: newUser.email, createdAt: newUser.createdAt });

    setProfile((prev) => ({
      ...prev,
      nickname: prev.nickname || email.split("@")[0],
    }));

    resetAuth();
    setView("catalog");
  }

  function login(event) {
    event.preventDefault();
    setAuthMessage("");

    const email = authEmail.trim().toLowerCase();

    if (!email || !authPassword) {
      setAuthMessage("Введите email и пароль.");
      return;
    }

    const user = users.find((item) => item.email === email && item.password === authPassword);

    if (!user) {
      setAuthMessage("Неверный email или пароль.");
      return;
    }

    setSession({ id: user.id, email: user.email, createdAt: user.createdAt });
    resetAuth();
    setView("catalog");
  }

  function logout() {
    setSession(null);
    setCatalogOpen(false);
    setBurgerOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setReaderSettingsOpen(false);
    setReaderChaptersOpen(false);
    setUserInfoOpen(false);
    setView("catalog");
  }

  function addOrUpdateList(titleId, status) {
    setMyList((prev) => ({ ...prev, [titleId]: status }));
    setStatusMenuOpen(false);
  }

  function removeFromList(titleId) {
    setMyList((prev) => {
      const copy = { ...prev };
      delete copy[titleId];
      return copy;
    });
    setStatusMenuOpen(false);
  }

  function recordReadingActivity(titleId, chapterIndex, kind = "manga") {
    const day = new Date().toISOString().slice(0, 10);
    const key = `${titleId}-${chapterIndex}-${day}`;

    setReadingActivity((prev) => {
      if (prev.some((item) => item.key === key)) return prev;

      return [
        ...prev,
        {
          key,
          titleId,
          chapterIndex,
          kind,
          day,
          minutes: 7,
          createdAt: new Date().toISOString(),
        },
      ];
    });
  }

  function startReading(titleId, chapterIndex = 0) {
    const key = `${titleId}-${chapterIndex}`;
    setTitleViews((prev) => ({
      ...prev,
      [titleId]: Number(prev[titleId] || 0) + 1,
    }));
    const savedPage = progress[key] || 0;

    setReader({
      titleId,
      chapterIndex,
      pageIndex: savedPage,
    });

    setProgress((prev) => (key in prev ? prev : { ...prev, [key]: savedPage }));
    recordReadingActivity(titleId, chapterIndex);
    setReplyToCommentId(null);
    setView("reader");
    setReaderSettingsOpen(false);
    setReaderChaptersOpen(false);
    closeFloatingMenus();
  }

  function changePage(direction) {
    if (!reader) return;

    const title = titles.find((item) => item.id === reader.titleId);
    const chapter = title?.chapters[reader.chapterIndex];
    if (!title || !chapter) return;

    const maxIndex = chapter.pages.length - 1;
    const nextPage = Math.max(0, Math.min(maxIndex, reader.pageIndex + direction));
    const key = `${reader.titleId}-${reader.chapterIndex}`;

    setReader({ ...reader, pageIndex: nextPage });
    setProgress((prev) => ({ ...prev, [key]: nextPage }));
  }

  function handleReaderClick(event) {
    if (readerSettingsOpen || readerChaptersOpen) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isLeftSide = clickX < rect.width / 2;

    if (isLeftSide) changePage(-1);
    else changePage(1);
  }

  function toggleChapterLike(titleId, chapterIndex) {
    const key = `${titleId}-${chapterIndex}`;

    setChapterLikes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function commentAuthorOptions() {
    const current = {
      type: "user",
      id: "self",
      userId: session?.id || "guest",
      name: `Вы: ${usernameFromSession()}`,
      displayName: usernameFromSession(),
      avatar: profile.avatar || "",
    };

    const teamOptions = myTeams.map((team) => ({
      type: "team",
      id: team.id,
      teamId: team.id,
      name: team.name,
      displayName: team.name,
      avatar: team.cover || "",
    }));

    return [current, ...teamOptions];
  }

  function authorModeForTarget(target) {
    return target === "title" ? titleCommentAuthorMode : commentAuthorMode;
  }

  function setAuthorModeForTarget(target, value) {
    if (target === "title") setTitleCommentAuthorMode(value);
    else setCommentAuthorMode(value);
  }

  function currentCommentAuthor(target) {
    const mode = authorModeForTarget(target);
    const options = commentAuthorOptions();
    return options.find((item) => item.type === mode.type && item.id === mode.id) || options[0];
  }

  function addPageComment(titleId, chapterIndex, pageIndex) {
    const text = sanitizeCommentHtml(commentText);
    if (!stripCommentText(text) && !commentAttachedTitle) return;

    const authorOption = currentCommentAuthor("page");
    const key = `${titleId}-${chapterIndex}-${pageIndex}`;
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    setPageComments((prev) => ({
      ...prev,
      [key]: [
        {
          id,
          parentId: replyToCommentId,
          authorId: authorOption.type === "user" ? (session?.id || "guest") : `team:${authorOption.teamId}`,
          author: authorOption.displayName,
          avatar: authorOption.avatar || "",
          authorType: authorOption.type,
          authorTeamId: authorOption.teamId || "",
          text,
          time: new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          createdAt: new Date().toISOString(),
          attachedTitleId: commentAttachedTitle?.id || null,
        },
        ...(prev[key] || []),
      ],
    }));

    setCommentText("");
    setReplyToCommentId(null);
    setCommentAttachedTitle(null);
    setCommentPinnedDraft(false);
    setCommentAuthorPickerOpen(null);
  }

  function addTitleComment(titleId) {
    const text = sanitizeCommentHtml(titleCommentText);
    if (!stripCommentText(text) && !titleCommentAttachedTitle) return;

    const authorOption = currentCommentAuthor("title");
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    setTitleComments((prev) => {
      const existingComments = prev[titleId] || [];
      const newComment = {
        id,
        parentId: titleReplyToCommentId,
        authorId: authorOption.type === "user" ? (session?.id || "guest") : `team:${authorOption.teamId}`,
        author: authorOption.displayName,
        avatar: authorOption.avatar || "",
        authorType: authorOption.type,
        authorTeamId: authorOption.teamId || "",
        text,
        time: "только что",
        createdAt: new Date().toISOString(),
        score: 0,
        votes: {},
        attachedTitleId: titleCommentAttachedTitle?.id || null,
        pinned: Boolean(titleCommentPinnedDraft),
        pinnedBy: titleCommentPinnedDraft ? (authorOption.type === "team" ? `team:${authorOption.teamId}` : (session?.id || "guest")) : "",
        pinnedByName: titleCommentPinnedDraft ? authorOption.displayName : "",
        pinnedAt: titleCommentPinnedDraft ? new Date().toISOString() : "",
      };

      return {
        ...prev,
        [titleId]: [
          newComment,
          ...existingComments.map((comment) => (
            titleCommentPinnedDraft
              ? { ...comment, pinned: false, pinnedBy: "", pinnedByName: "", pinnedAt: "" }
              : comment
          )),
        ],
      };
    });

    setTitleCommentText("");
    setTitleReplyToCommentId(null);
    setTitleCommentAttachedTitle(null);
    setTitleCommentPinnedDraft(false);
    setCommentAuthorPickerOpen(null);
  }

  function deleteTitleComment(titleId, commentId) {
    setTitleComments((prev) => {
      const comments = prev[titleId] || [];
      const idsToDelete = new Set([commentId]);
      let changed = true;

      while (changed) {
        changed = false;
        comments.forEach((comment) => {
          if (comment.parentId && idsToDelete.has(comment.parentId) && !idsToDelete.has(comment.id)) {
            idsToDelete.add(comment.id);
            changed = true;
          }
        });
      }

      return {
        ...prev,
        [titleId]: comments.filter((comment) => !idsToDelete.has(comment.id)),
      };
    });

    if (titleReplyToCommentId === commentId) setTitleReplyToCommentId(null);
  }

  function reportTitleComment() {
    alert("Жалоба отправлена локально. Позже подключим модерацию.");
  }

  function renderTeamDescriptionEditor(value, placeholder) {
    const editorKey = `team-description-${selectedTeamId || view}-${teamEditTab}`;
    teamDescriptionDraftRef.current = value || "";

    return (
      <div className="createDescriptionBox teamDescriptionBox">
        <div className="createDescriptionToolbar teamDescriptionToolbar">
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "bold"); }} title="Жирный"><b>B</b></button>
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "italic"); }} title="Курсив"><i>I</i></button>
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "underline"); }} title="Подчёркивание"><u>U</u></button>
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "strike"); }} title="Зачёркивание"><s>S</s></button>
          <span></span>
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "quote"); }} title="Цитата">”</button>
          <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool("team", "spoiler"); }} title="Спойлер">⊝</button>
        </div>

        <div
          key={editorKey}
          className="teamDescriptionEditable commentEditable"
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          dir="ltr"
          dangerouslySetInnerHTML={{ __html: sanitizeCommentHtml(value || "") }}
          onInput={(event) => { teamDescriptionDraftRef.current = event.currentTarget.innerHTML; }}
          onBlur={(event) => updateTeamField("description", event.currentTarget.innerHTML)}
          onPaste={(event) => {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
            teamDescriptionDraftRef.current = event.currentTarget.innerHTML;
          }}
        />
      </div>
    );
  }

  const TEAM_ROLE_OPTIONS = OPTIONS_TEAM_ROLE_OPTIONS;
  const TEAM_PERMISSION_OPTIONS = OPTIONS_TEAM_PERMISSION_OPTIONS;
  const TEAM_ROLE_PERMISSIONS = {
    "Админ": TEAM_PERMISSION_OPTIONS,
    "Модератор": ["Редактирование участников", "Управление анкетой"],
    "Переводчик": ["Редактирование глав"],
    "Тайпер": ["Редактирование глав"],
    "Клинер": ["Редактирование глав"],
    "Редактор": ["Редактирование глав"],
    "Эдитор": ["Редактирование глав"],
    "Заливщик": ["Заливка глав"],
    "Бета": ["Редактирование глав"],
    "Участник": [],
  };

  function permissionsFromRoles(roles = []) {
    return [...new Set(roles.flatMap((role) => TEAM_ROLE_PERMISSIONS[role] || []))];
  }

  function allKnownUsers() {
    return [
      { id: currentUserId(), name: usernameFromSession(), avatar: profile.avatar || "" },
      ...users.map((user) => ({
        id: user.id || user.email || user.name,
        name: user.nickname || user.name || user.email?.split("@")[0] || "Пользователь",
        avatar: user.avatar || "",
      })),
      ...(friendsState.friends || []).map((friend) => ({ id: friend.id, name: friend.name, avatar: friend.avatar || "" })),
      ...(friendsState.incoming || []).map((friend) => ({ id: friend.id, name: friend.name, avatar: friend.avatar || "" })),
      ...(friendsState.outgoing || []).map((friend) => ({ id: friend.id, name: friend.name, avatar: friend.avatar || "" })),
      { id: "demo-user-1", name: "Приветик)", avatar: "https://placehold.co/120x120/2e2e36/f2f2f2?text=П" },
      { id: "demo-user-2", name: "Ruler", avatar: "https://placehold.co/120x120/e8ccff/2b2140?text=R" },
      { id: "demo-user-3", name: "Resuba", avatar: "https://placehold.co/120x120/3a3a42/f87171?text=R" },
      { id: "demo-user-4", name: "Виноград", avatar: "https://placehold.co/120x120/353946/dbeafe?text=В" },
    ];
  }

  function getTeamMembers(team = selectedTeam) {
    if (!team) return [];

    const savedMembers = Array.isArray(team.members) && team.members.length > 0
      ? team.members
      : [
          {
            id: team.ownerId || currentUserId(),
            name: team.ownerName || usernameFromSession(),
            avatar: profile.avatar || "",
            role: "Админ",
            permissions: ["Управление анкетой", "Заливка глав", "Редактирование глав", "Удаление глав", "Редактирование команды", "Редактирование участников", "Управление финансами"],
          },
        ];

    return savedMembers.map((member) => {
      const fallbackRoles = member.id === team.ownerId ? ["Админ"] : [member.role || "Участник"];
      const roles = Array.isArray(member.roles) && member.roles.length > 0
        ? member.roles
        : String(member.role || "").split("|").map((item) => item.trim()).filter(Boolean);

      return {
        ...member,
        name: displayNameForUser(member.id, member.name || team.ownerName || "Пользователь"),
        avatar: avatarForUser(member.id, member.avatar || ""),
        roles: roles.length > 0 ? roles : fallbackRoles,
        role: roles.length > 0 ? roles[0] : fallbackRoles[0],
        permissions: member.permissions || (member.id === team.ownerId ? ["Управление анкетой", "Заливка глав", "Редактирование глав", "Удаление глав", "Редактирование команды", "Редактирование участников", "Управление финансами"] : ["Заливка глав", "Редактирование глав"]),
      };
    });
  }

  function teamCandidateUsers() {
    const seen = new Set();
    return allKnownUsers().filter((user) => {
      const key = String(user.id || user.name || "").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function addMemberToSelectedTeam(user) {
    if (!selectedTeamId || !user) return;

    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== selectedTeamId) return team;

        const members = getTeamMembers(team);
        if (members.some((member) => member.id === user.id)) return team;

        return {
          ...team,
          memberIds: [...new Set([...(team.memberIds || []), user.id])],
          members: [
            ...members,
            {
              id: user.id,
              name: user.name,
              avatar: user.avatar || "",
              role: "Участник",
              roles: ["Участник"],
              permissions: ["Заливка глав", "Редактирование глав"],
            },
          ],
          updatedAt: new Date().toISOString(),
        };
      })
    );

    setTeamMemberSearchOpen(false);
    setTeamMemberQuery("");
  }

  function removeMemberFromSelectedTeam(memberId) {
    if (!selectedTeamId) return;

    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== selectedTeamId) return team;

        const nextMembers = getTeamMembers(team).filter((member) => member.id !== memberId);
        const nextOwnerId = memberId === team.ownerId ? (nextMembers[0]?.id || currentUserId()) : team.ownerId;

        return {
          ...team,
          ownerId: nextOwnerId,
          ownerName: memberId === team.ownerId ? (nextMembers[0]?.name || usernameFromSession()) : team.ownerName,
          memberIds: nextMembers.map((member) => member.id),
          members: nextMembers,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  function updateTeamMember(memberId, patch) {
    if (!selectedTeamId) return;

    setTeams((prev) =>
      prev.map((team) => {
        if (team.id !== selectedTeamId) return team;

        return {
          ...team,
          members: getTeamMembers(team).map((member) =>
            member.id === memberId
              ? {
                  ...member,
                  ...patch,
                  role: Array.isArray(patch.roles) && patch.roles.length > 0 ? patch.roles[0] : member.role,
                }
              : member
          ),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  function toggleTeamMemberRole(memberId, roleName) {
    const member = getTeamMembers(selectedTeam).find((item) => item.id === memberId);
    if (!member) return;

    const current = Array.isArray(member.roles) ? member.roles : [member.role || "Участник"];
    let next = current.includes(roleName)
      ? current.filter((role) => role !== roleName)
      : [...current.filter((role) => role !== "Участник"), roleName];

    if (next.length === 0) next = ["Участник"];

    const manualPermissions = Array.isArray(member.permissions) ? member.permissions : [];
    const nextPermissions = [...new Set([...manualPermissions, ...permissionsFromRoles(next)])];
    updateTeamMember(memberId, { roles: next, permissions: nextPermissions });
  }

  function toggleTeamMemberPermission(memberId, permissionName) {
    const member = getTeamMembers(selectedTeam).find((item) => item.id === memberId);
    if (!member) return;

    const current = Array.isArray(member.permissions) ? member.permissions : [];
    const next = current.includes(permissionName)
      ? current.filter((permission) => permission !== permissionName)
      : [...current, permissionName];

    updateTeamMember(memberId, { permissions: next });
  }

  function stripCommentText(value) {
    return plainTextFromHtml(value).trim();
  }

  function decodeHtmlEntities(value) {
    let text = String(value || "");

    for (let index = 0; index < 4; index += 1) {
      const next = text
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&#x27;/gi, "'");

      if (next === text) break;
      text = next;
    }

    return text;
  }

  function plainTextFromHtml(value) {
    let text = decodeHtmlEntities(value);

    for (let index = 0; index < 4; index += 1) {
      const next = text
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
        .replace(/<br\s*\/?>(?![^<]*>)/gi, " ")
        .replace(/<\/div>/gi, " ")
        .replace(/<\/p>/gi, " ")
        .replace(/<blockquote[^>]*>/gi, " ")
        .replace(/<\/blockquote>/gi, " ")
        .replace(/<[^>]+>/g, " ");

      const decoded = decodeHtmlEntities(next);
      if (decoded === text) {
        text = decoded;
        break;
      }
      text = decoded;
    }

    return text
      .replace(/ /g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function timeAgo(value, fallback = "только что") {
    if (!value) return fallback || "только что";

    const date = new Date(value);
    const time = date.getTime();
    if (!Number.isFinite(time)) return fallback || "только что";

    const diffMs = Date.now() - time;
    if (diffMs < 0) return "только что";

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    const plural = (number, one, few, many) => {
      const mod10 = number % 10;
      const mod100 = number % 100;
      if (mod10 === 1 && mod100 !== 11) return one;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
      return many;
    };

    if (diffMs < minute) return "только что";
    if (diffMs < hour) {
      const count = Math.floor(diffMs / minute);
      return `${count} ${plural(count, "минуту", "минуты", "минут")} назад`;
    }
    if (diffMs < day) {
      const count = Math.floor(diffMs / hour);
      return `${count} ${plural(count, "час", "часа", "часов")} назад`;
    }
    if (diffMs < month) {
      const count = Math.floor(diffMs / day);
      return `${count} ${plural(count, "день", "дня", "дней")} назад`;
    }
    if (diffMs < year) {
      const count = Math.floor(diffMs / month);
      return `${count} ${plural(count, "месяц", "месяца", "месяцев")} назад`;
    }

    const count = Math.floor(diffMs / year);
    return `${count} ${plural(count, "год", "года", "лет")} назад`;
  }

  function commentTime(comment) {
    return timeAgo(comment?.createdAt, comment?.time || "только что");
  }

  function sanitizeCommentHtml(value) {
    return String(value || "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\sstyle=("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/javascript:/gi, "");
  }

  function applyCommentTool(target, tool) {
    const commandMap = {
      bold: "bold",
      italic: "italic",
      underline: "underline",
      strike: "strikeThrough",
    };

    if (commandMap[tool]) {
      document.execCommand(commandMap[tool], false, null);
      return;
    }

    if (tool === "quote") {
      document.execCommand("formatBlock", false, "blockquote");
      return;
    }

    if (tool === "spoiler") {
      document.execCommand("insertHTML", false, '<span class="commentSpoiler">скрытый текст</span>');
      return;
    }

    if (tool === "spoilerBlock") {
      document.execCommand("insertHTML", false, '<div class="commentSpoilerBlock">скрытый многострочный текст</div>');
      return;
    }

    if (tool === "image") {
      document.execCommand("insertHTML", false, '<span class="commentImageStub">[изображение: ЛГБТ и эротика запрещены]</span>');
      return;
    }

    if (tool === "book") {
      setCommentAttachSearchOpen(target);
      setCommentAttachQuery("");
      return;
    }

    if (tool === "sticker") {
      alert("Стикеры подключим позже.");
    }
  }

  function attachedTitleForTarget(target) {
    return target === "title" ? titleCommentAttachedTitle : commentAttachedTitle;
  }

  function setAttachedTitleForTarget(target, title) {
    if (target === "title") setTitleCommentAttachedTitle(title);
    else setCommentAttachedTitle(title);
  }

  function clearAttachedTitleForTarget(target) {
    if (target === "title") setTitleCommentAttachedTitle(null);
    else setCommentAttachedTitle(null);
  }

  function pinnedDraftForTarget(target) {
    return target === "title" ? titleCommentPinnedDraft : commentPinnedDraft;
  }

  function setPinnedDraftForTarget(target, value) {
    if (target === "title") setTitleCommentPinnedDraft(value);
    else setCommentPinnedDraft(value);
  }

  function canPinCommentsForTitle() {
    return Boolean(session);
  }

  function toggleTitleCommentPin(titleId, commentId) {
    if (!canPinCommentsForTitle()) return;

    setTitleComments((prev) => {
      const comments = prev[titleId] || [];
      const targetComment = comments.find((comment) => comment.id === commentId);
      const nextPinned = !targetComment?.pinned;
      const pinOwnerId = session?.id || "guest";
      const pinOwnerName = usernameFromSession();

      return {
        ...prev,
        [titleId]: comments.map((comment) => {
          if (comment.id !== commentId) {
            return nextPinned
              ? { ...comment, pinned: false, pinnedBy: "", pinnedByName: "", pinnedAt: "" }
              : comment;
          }

          return {
            ...comment,
            pinned: nextPinned,
            pinnedBy: nextPinned ? pinOwnerId : "",
            pinnedByName: nextPinned ? pinOwnerName : "",
            pinnedAt: nextPinned ? new Date().toISOString() : "",
          };
        }),
      };
    });
  }

  function renderAttachedTitleCard(titleId) {
    const title = titles.find((item) => item.id === titleId);
    if (!title) return null;

    return (
      <button type="button" className="attachedTitleCard" onClick={() => openTitle(title.id)}>
        <span className="attachedTitleCover">
          {title.cover ? <img src={title.cover} alt={title.name} /> : title.name.slice(0, 1)}
        </span>
        <span>
          <small>{title.status || title.releaseStatus || "Тайтл"}</small>
          <b>{title.name}</b>
          <em>{title.type || "Манга"}{title.year ? ` · ${title.year} г.` : ""}</em>
        </span>
      </button>
    );
  }

  function renderCommentAuthorPicker(target) {
    const selected = currentCommentAuthor(target);
    const options = commentAuthorOptions();

    return (
      <div className="commentAuthorPickerWrap">
        <button
          type="button"
          className="commentAuthorPickerButton"
          onClick={() => setCommentAuthorPickerOpen(commentAuthorPickerOpen === target ? null : target)}
        >
          от: <b>{selected.type === "user" ? "своего имени" : selected.displayName}</b>
        </button>

        {commentAuthorPickerOpen === target && (
          <div className="commentAuthorPickerPopover">
            <div className="commentAuthorPickerHead">
              <b>Автор комментария</b>
              <button type="button" onClick={() => setCommentAuthorPickerOpen(null)}>×</button>
            </div>
            {options.map((option) => (
              <button
                type="button"
                key={`${option.type}-${option.id}`}
                className={selected.type === option.type && selected.id === option.id ? "active" : ""}
                onClick={() => {
                  setAuthorModeForTarget(target, { type: option.type, id: option.id });
                  setCommentAuthorPickerOpen(null);
                }}
              >
                <span className="commentAuthorPickerAvatar">
                  {option.avatar ? <img src={option.avatar} alt={option.displayName} /> : option.displayName.slice(0, 1).toUpperCase()}
                </span>
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderCommentEditor(target, value, placeholder, submitLabel, onSubmit) {
    const setter = target === "title" ? setTitleCommentText : setCommentText;
    const editorKey = `${target}-${target === "title" ? titleReplyToCommentId || "root" : replyToCommentId || "root"}`;
    const attachedTitle = attachedTitleForTarget(target);
    const canPin = target === "title" && canPinCommentsForTitle() && !titleReplyToCommentId;
    const isPinnedDraft = pinnedDraftForTarget(target);
    const attachResults = commentAttachQuery.trim().length > 0
      ? titles.filter((title) => {
          const haystack = [title.name, title.originalName, title.englishName, ...(title.aliases || [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(commentAttachQuery.trim().toLowerCase());
        }).slice(0, 8)
      : [];

    return (
      <div className="commentEditor compactCommentEditor">
        {attachedTitle && (
          <div className="commentAttachedPreview">
            {renderAttachedTitleCard(attachedTitle.id)}
            <button type="button" onClick={() => clearAttachedTitleForTarget(target)}>×</button>
          </div>
        )}

        <div
          key={editorKey}
          className="commentEditable"
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          dir="ltr"
          onInput={(event) => {
            const html = event.currentTarget.innerHTML;
            const cleanText = stripCommentText(html);

            if (!cleanText) {
              setter("");
              if (html && html !== "<br>" && html !== "<div><br></div>") event.currentTarget.innerHTML = "";
              return;
            }

            setter(html);
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" || event.key === "Delete") {
              window.setTimeout(() => {
                const html = event.currentTarget.innerHTML;
                const cleanText = stripCommentText(html);
                if (!cleanText) {
                  setter("");
                  event.currentTarget.innerHTML = "";
                } else {
                  setter(html);
                }
              }, 0);
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
            setter(event.currentTarget.innerHTML);
          }}
        />

        <div className="commentEditorBottom">
          <div className="commentFormatToolbar">
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "bold"); }} title="Жирный"><b>B</b></button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "italic"); }} title="Курсив"><i>I</i></button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "underline"); }} title="Подчёркивание"><u>U</u></button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "strike"); }} title="Зачёркивание"><s>S</s></button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "quote"); }} title="Цитата">”</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "spoiler"); }} title="Скрытый текст">◒</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "spoilerBlock"); }} title="Скрытый текст многострочный">▧</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "image"); }} title="Изображение">▣</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "book"); }} title="Прикрепить тайтл">▤</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "sticker"); }} title="Стикеры">☻</button>
          </div>

          <div className="commentEditorActions">
            <button
              type="button"
              className="commentCancelButton"
              onClick={(event) => {
                const editor = event.currentTarget.closest(".commentEditor")?.querySelector(".commentEditable");
                if (editor) editor.innerHTML = "";

                if (target === "title") {
                  setTitleCommentText("");
                  setTitleReplyToCommentId(null);
                  setTitleCommentAttachedTitle(null);
                  setTitleCommentPinnedDraft(false);
                } else {
                  setCommentText("");
                  setReplyToCommentId(null);
                  setCommentAttachedTitle(null);
                  setCommentPinnedDraft(false);
                }
              }}
            >Отмена</button>
            <button
              type="button"
              className="commentSubmitButton"
              onClick={(event) => {
                onSubmit();
                const editor = event.currentTarget.closest(".commentEditor")?.querySelector(".commentEditable");
                if (editor) editor.innerHTML = "";
              }}
              disabled={!stripCommentText(value) && !attachedTitle}
            >{submitLabel}</button>
          </div>
        </div>

        <div className="commentEditorMetaLine">
          {canPin && (
            <button type="button" onClick={() => setPinnedDraftForTarget(target, !isPinnedDraft)}>
              закрепить: <b>{isPinnedDraft ? "да" : "нет"}</b>
            </button>
          )}
          {renderCommentAuthorPicker(target)}
        </div>

        {commentAttachSearchOpen === target && (
          <div className="attachTitlePopover">
            <div className="attachTitleSearch">
              <span>⌕</span>
              <input
                autoFocus
                value={commentAttachQuery}
                onChange={(event) => setCommentAttachQuery(event.target.value)}
                placeholder="Поиск тайтлов"
              />
              <button type="button" onClick={() => setCommentAttachSearchOpen(null)}>×</button>
            </div>
            <div className="attachTitleResults">
              {commentAttachQuery.trim().length === 0 ? (
                <p>Начни вводить название.</p>
              ) : attachResults.length === 0 ? (
                <p>Ничего не найдено.</p>
              ) : (
                attachResults.map((title) => (
                  <button
                    type="button"
                    key={title.id}
                    onClick={() => {
                      setAttachedTitleForTarget(target, title);
                      setCommentAttachSearchOpen(null);
                      setCommentAttachQuery("");
                    }}
                  >
                    <span className="attachedTitleCover">
                      {title.cover ? <img src={title.cover} alt={title.name} /> : title.name.slice(0, 1)}
                    </span>
                    <span>
                      <small>{title.status || title.releaseStatus || "Тайтл"}</small>
                      <b>{title.name}</b>
                      <em>{title.type || "Манга"}{title.year ? ` · ${title.year} г.` : ""}</em>
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  function deleteProfileComment(item) {
    if (!item) return;

    if (item.source === "title") {
      setTitleComments((prev) => {
        const comments = prev[item.titleId] || [];
        const idsToDelete = new Set([item.rawId]);
        let changed = true;

        while (changed) {
          changed = false;
          comments.forEach((comment) => {
            if (comment.parentId && idsToDelete.has(comment.parentId) && !idsToDelete.has(comment.id)) {
              idsToDelete.add(comment.id);
              changed = true;
            }
          });
        }

        return {
          ...prev,
          [item.titleId]: comments.filter((comment) => !idsToDelete.has(comment.id)),
        };
      });
      return;
    }

    if (item.source === "page") {
      setPageComments((prev) => {
        const comments = prev[item.key] || [];
        const idsToDelete = new Set([item.rawId]);
        let changed = true;

        while (changed) {
          changed = false;
          comments.forEach((comment) => {
            if (comment.parentId && idsToDelete.has(comment.parentId) && !idsToDelete.has(comment.id)) {
              idsToDelete.add(comment.id);
              changed = true;
            }
          });
        }

        return {
          ...prev,
          [item.key]: comments.filter((comment) => !idsToDelete.has(comment.id)),
        };
      });
    }
  }

  function renderCommentText(text) {
    const raw = String(text || "");

    if (raw.includes("<")) {
      return <span dangerouslySetInnerHTML={{ __html: sanitizeCommentHtml(raw) }} />;
    }

    const parts = raw
      .split(/(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\|\|[^|]+\|\||\*[^*]+\*)/g)
      .filter(Boolean);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("__") && part.endsWith("__")) return <u key={index}>{part.slice(2, -2)}</u>;
      if (part.startsWith("~~") && part.endsWith("~~")) return <s key={index}>{part.slice(2, -2)}</s>;
      if (part.startsWith("||") && part.endsWith("||")) return <span key={index} className="commentSpoiler">{part.slice(2, -2)}</span>;
      if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
      return <span key={index}>{part}</span>;
    });
  }

  function deletePageComment(titleId, chapterIndex, pageIndex, commentId) {
    const key = `${titleId}-${chapterIndex}-${pageIndex}`;

    setPageComments((prev) => {
      const comments = prev[key] || [];
      const idsToDelete = new Set([commentId]);
      let changed = true;

      while (changed) {
        changed = false;

        comments.forEach((comment) => {
          if (comment.parentId && idsToDelete.has(comment.parentId) && !idsToDelete.has(comment.id)) {
            idsToDelete.add(comment.id);
            changed = true;
          }
        });
      }

      return {
        ...prev,
        [key]: comments.filter((comment) => !idsToDelete.has(comment.id)),
      };
    });

    if (replyToCommentId === commentId) setReplyToCommentId(null);
  }

  function reportPageComment() {
    alert("Жалоба отправлена локально. Позже подключим модерацию.");
  }

  function updateSuggestField(field, value) {
    setSuggestForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSuggestImageUpload(event, field) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setSuggestForm((prev) => ({ ...prev, [field]: String(fileReader.result) }));
    };

    fileReader.readAsDataURL(file);
  }

  function updateTeamField(field, value) {
    setTeamForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTeamImageUpload(event, field) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setTeamForm((prev) => ({ ...prev, [field]: String(fileReader.result) }));
    };

    fileReader.readAsDataURL(file);
  }

  function saveTeamEdit(event) {
    event.preventDefault();

    const name = teamForm.name.trim();

    if (!name || !selectedTeamId) {
      setTeamMessage("Введите название команды.");
      return;
    }

    setTeams((prev) =>
      prev.map((team) =>
        team.id === selectedTeamId
          ? {
              ...team,
              cover: teamForm.cover,
              background: teamForm.background,
              name,
              altNames: teamForm.altNames.trim(),
              vk: teamForm.vk.trim(),
              discord: teamForm.discord.trim(),
              site: teamForm.site.trim(),
              description: (teamDescriptionDraftRef.current || teamForm.description).trim(),
              isRepresentative: teamForm.isRepresentative,
              updatedAt: new Date().toISOString(),
            }
          : team
      )
    );

    setTeamMessage("Команда сохранена.");
    setTimeout(() => {
      setTeamMessage("");
      openTeam(selectedTeamId);
    }, 450);
  }

  function resetTeamForm() {
    setTeamForm({
      cover: "",
      background: "",
      name: "",
      altNames: "",
      vk: "",
      discord: "",
      site: "",
      description: "",
      isRepresentative: false,
    });
  }

  function submitTeam(event) {
    event.preventDefault();

    const name = teamForm.name.trim();

    if (!name) {
      setTeamMessage("Введите название команды.");
      return;
    }

    const id = crypto.randomUUID ? crypto.randomUUID() : `team-${Date.now()}`;
    const newTeam = {
      id,
      ownerId: currentUserId(),
      ownerName: usernameFromSession(),
      memberIds: [currentUserId()],
      members: [{
        id: currentUserId(),
        name: usernameFromSession(),
        avatar: profile.avatar || "",
        role: "Админ",
        permissions: ["Управление анкетой", "Заливка глав", "Редактирование глав", "Удаление глав", "Редактирование команды", "Редактирование участников", "Управление финансами"],
      }],
      cover: teamForm.cover,
      background: teamForm.background,
      name,
      altNames: teamForm.altNames.trim(),
      vk: teamForm.vk.trim(),
      discord: teamForm.discord.trim(),
      site: teamForm.site.trim(),
      description: (teamDescriptionDraftRef.current || teamForm.description).trim(),
      isRepresentative: teamForm.isRepresentative,
      createdAt: new Date().toISOString(),
      titlesCount: 0,
      likesCount: 0,
      chaptersCount: 0,
      chaptersPerMonth: 0,
      followersCount: 1,
    };

    setTeams((prev) => [newTeam, ...prev]);
    setTeamMessage(
      teamForm.isRepresentative
        ? "Команда создана. Вы отмечены представителем команды."
        : "Команда создана."
    );

    resetTeamForm();
    setTimeout(() => {
      setTeamMessage("");
      openTeam(id);
    }, 500);
  }

  function addSuggestChip(field, label) {
    const current = String(suggestForm[field] || "").trim();
    const value = window.prompt(label || "Введите значение");
    if (!value?.trim()) return;

    updateSuggestField(field, current ? `${current}, ${value.trim()}` : value.trim());
  }

  function suggestValues(field) {
    return String(suggestForm[field] || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function setSuggestValues(field, values) {
    updateSuggestField(field, values.join(", "));
  }

  function toggleSuggestValue(field, value) {
    const values = suggestValues(field);
    const exists = values.includes(value);
    setSuggestValues(field, exists ? values.filter((item) => item !== value) : [...values, value]);
  }

  function createPickerOptions(field) {
    const baseGenres = Array.from(new Set([...titles.flatMap((title) => title.genres), ...EXTRA_GENRES]));

    const map = {
      format: CREATE_FORMAT_OPTIONS,
      publisher: CREATE_PUBLISHER_OPTIONS,
      author: CREATE_AUTHOR_OPTIONS,
      artist: CREATE_ARTIST_OPTIONS,
      genres: baseGenres,
      tags: EXTRA_TAGS,
      team: CREATE_TEAM_OPTIONS,
      voiceTeam: CREATE_VOICE_TEAM_OPTIONS,
      franchise: CREATE_FRANCHISE_OPTIONS,
    };

    return map[field] || [];
  }

  function openCreatePicker(field) {
    setCreatePickerOpen((prev) => (prev === field ? null : field));
    setCreatePickerQuery("");
  }

  function renderCreateAddLine(field, label, prompt) {
    const selectedValues = suggestValues(field);
    const pickerFields = [
      "format",
      "publisher",
      "author",
      "artist",
      "genres",
      "tags",
      "team",
      "voiceTeam",
      "franchise",
    ];
    const isPicker = pickerFields.includes(field);
    const options = createPickerOptions(field);
    const needsSearch = ["publisher", "author", "artist", "team", "voiceTeam", "franchise"].includes(field);
    const queryText = createPickerOpen === field ? createPickerQuery.trim().toLowerCase() : "";
    const visibleOptions = options.filter((item) => item.toLowerCase().includes(queryText));

    return (
      <div className="createAddLine" key={field}>
        <div className="createAddTop">
          <span>{label}</span>
          {(field === "publisher" || field === "author" || field === "artist" || field === "team") && (
            <button
              type="button"
              className="createSmallLink"
              onClick={() => alert("Позже подключим отдельное создание через модерацию.")}
            >
              Создать нового
            </button>
          )}
        </div>

        <div className="createAddBoxWrap">
          <div className="createAddBox">
            <button
              type="button"
              className="createAddButton"
              onClick={() => (isPicker ? openCreatePicker(field) : addSuggestChip(field, prompt))}
            >
              + Добавить
            </button>

            {selectedValues.length > 0 && (
              <div className="createSelectedChips">
                {selectedValues.map((item) => (
                  <button type="button" key={item} onClick={() => toggleSuggestValue(field, item)}>
                    {item} ×
                  </button>
                ))}
              </div>
            )}
          </div>

          {createPickerOpen === field && isPicker && (
            <div className="createPickerDropdown">
              <div className="createPickerSearch">
                <span>⌕</span>
                <input
                  autoFocus
                  value={createPickerQuery}
                  onChange={(event) => setCreatePickerQuery(event.target.value)}
                  placeholder="Фильтр по названию"
                />
              </div>

              {needsSearch && createPickerQuery.trim().length < 2 ? (
                <div className="createPickerEmpty">Пожалуйста, введите минимум 2 символа</div>
              ) : visibleOptions.length > 0 ? (
                <div className="createPickerOptions">
                  {visibleOptions.map((item) => (
                    <button type="button" key={item} onClick={() => toggleSuggestValue(field, item)}>
                      <span className={selectedValues.includes(item) ? "checkedBox" : "emptyBox"}></span>
                      {item}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="createPickerEmpty">Ничего не найдено</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function resetSuggestForm() {
    setSuggestForm({
      cover: "",
      background: "",
      originalName: "",
      russianName: "",
      englishName: "",
      altNames: "",
      type: "Манга",
      status: "Онгоинг",
      year: "",
      country: "",
      age: "18+ (RX)",
      translation: "Продолжается",
      uploadMode: "Создатель и переводчики",
      noMarking: true,
      obscene: false,
      drugs: false,
      format: "",
      publisher: "",
      author: "",
      artist: "",
      genres: "",
      tags: "",
      team: "",
      voiceTeam: "",
      franchise: "",
      sourceLinks: "",
      description: "",
    });
  }

  function submitSuggestion(event) {
    event.preventDefault();

    if (!suggestForm.russianName.trim() && !suggestForm.originalName.trim() && !suggestForm.englishName.trim()) {
      setSuggestMessage("Введите хотя бы одно название тайтла.");
      return;
    }

    if (!suggestForm.year.trim()) {
      setSuggestMessage("Укажите год релиза.");
      return;
    }

    setSuggestMessage("Заявка сохранена локально. Ваш тайтл отправится на модерацию.");
    resetSuggestForm();
  }

  function getContinueText(titleId, chapterIndex = 0) {
    const key = `${titleId}-${chapterIndex}`;
    const savedPage = progress[key];

    if (!savedPage || savedPage <= 0) return null;

    return `Продолжить с ${savedPage + 1} страницы`;
  }

  function usernameFromSession() {
    if (profile.nickname?.trim()) return profile.nickname.trim();
    if (!session?.email) return "Гость";
    return session.email.split("@")[0];
  }

  function currentUserId() {
    return session?.id || "guest";
  }

  function findKnownUser(userId) {
    const id = String(userId || "");
    if (!id) return null;

    if (id === currentUserId()) {
      return {
        id,
        name: usernameFromSession(),
        avatar: profile.avatar || "",
      };
    }

    const localUser = users.find((user) =>
      String(user.id || user.email || user.name || "") === id
    );

    if (localUser) {
      return {
        id,
        name: localUser.nickname || localUser.name || localUser.email?.split("@")[0] || "Пользователь",
        avatar: localUser.avatar || "",
      };
    }

    const socialUser = [
      ...(friendsState.friends || []),
      ...(friendsState.incoming || []),
      ...(friendsState.outgoing || []),
    ].find((user) => String(user.id || user.name || "") === id);

    if (socialUser) {
      return {
        id,
        name: socialUser.name || "Пользователь",
        avatar: socialUser.avatar || "",
      };
    }

    return null;
  }

  function displayNameForUser(userId, fallbackName = "Пользователь") {
    return findKnownUser(userId)?.name || fallbackName || "Пользователь";
  }

  function avatarForUser(userId, fallbackAvatar = "") {
    return findKnownUser(userId)?.avatar || fallbackAvatar || "";
  }

  function isOwnComment(comment) {
    const ownId = currentUserId();

    if (comment.authorType === "team" || String(comment.authorId || "").startsWith("team:")) {
      const teamId = comment.authorTeamId || String(comment.authorId || "").replace("team:", "");
      return myTeams.some((team) => String(team.id) === String(teamId));
    }

    if (comment.authorId) return comment.authorId === ownId;
    return comment.author === usernameFromSession();
  }

  function isChapterOpened(titleId, chapterIndex) {
    return `${titleId}-${chapterIndex}` in progress;
  }

  function openCommentAuthorProfile() {
    if (!session) return;

    setView("profile");
    setReaderSettingsOpen(false);
    setReaderChaptersOpen(false);
    setReplyToCommentId(null);
  }

  function sortCommentsNewestFirst(items) {
    return [...items].sort((a, b) => {
      const timeA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA || timeB) return timeB - timeA;
      return String(b?.id || "").localeCompare(String(a?.id || ""));
    });
  }


  function commentScore(comment) {
    const votes = comment?.votes || {};
    const values = Object.values(votes).map((value) => Number(value) || 0);
    if (values.length > 0) return values.reduce((sum, value) => sum + value, 0);
    return Number(comment?.score || 0);
  }

  function userVoteForComment(comment) {
    const votes = comment?.votes || {};
    return Number(votes[currentUserId()] || 0);
  }

  function commentScoreClass(comment) {
    const score = commentScore(comment);
    if (score > 0) return "scorePositive";
    if (score < 0) return "scoreNegative";
    return "scoreNeutral";
  }

  function sortTitleCommentsForMode(items) {
    const base = [...items];
    base.sort((a, b) => {
      const pinnedDiff = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
      if (pinnedDiff) return pinnedDiff;

      if (titleCommentSort === "popular") {
        const scoreDiff = commentScore(b) - commentScore(a);
        if (scoreDiff) return scoreDiff;
      }

      const timeA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (titleCommentSort === "old") return timeA - timeB;
      return timeB - timeA;
    });
    return base;
  }

  function voteTitleComment(titleId, commentId, value) {
    const voterId = currentUserId();

    setTitleComments((prev) => {
      const comments = prev[titleId] || [];

      return {
        ...prev,
        [titleId]: comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const votes = { ...(comment.votes || {}) };
          const previousVote = Number(votes[voterId] || 0);

          if (previousVote === value) delete votes[voterId];
          else votes[voterId] = value;

          return {
            ...comment,
            votes,
            score: Object.values(votes).reduce((sum, vote) => sum + (Number(vote) || 0), 0),
          };
        }),
      };
    });
  }

  function renderPageCommentTree(comments, parentId, pageContext, depth = 0) {
    return sortCommentsNewestFirst(
      comments.filter((comment) => (comment.parentId || null) === parentId)
    )
      .map((comment) => {
        const childCount = comments.filter((item) => item.parentId === comment.id).length;
        const commentAuthorName = displayNameForUser(comment.authorId, comment.author || "Гость");
        const commentAuthorAvatar = avatarForUser(comment.authorId, comment.avatar || "");

        return (
          <div
            key={comment.id}
            className={`pageComment ${depth > 0 ? "pageCommentReply" : ""}`}
            style={{ marginLeft: `${Math.min(depth, 4) * 22}px` }}
          >
            <div className="pageCommentHeader">
              <button className="pageCommentAvatar" onClick={openCommentAuthorProfile}>
                {commentAuthorAvatar ? <img src={commentAuthorAvatar} alt={commentAuthorName} /> : null}
              </button>

              <div className="pageCommentMeta">
                <button className="pageCommentAuthor" onClick={openCommentAuthorProfile}>
                  {commentAuthorName}
                </button>
                <span>{commentTime(comment)}</span>
              </div>
            </div>

            <div className="commentText">{renderCommentText(comment.text)}</div>
            {comment.attachedTitleId && renderAttachedTitleCard(comment.attachedTitleId)}

            <div className="pageCommentActions">
              <button onClick={() => setReplyToCommentId(comment.id)}>Ответить</button>
              <button onClick={reportPageComment}>Жалоба</button>
              {isOwnComment(comment) && (
                <button
                  className="deleteCommentButton"
                  onClick={() =>
                    deletePageComment(
                      pageContext.titleId,
                      pageContext.chapterIndex,
                      pageContext.pageIndex,
                      comment.id
                    )
                  }
                >
                  Удалить
                </button>
              )}
              {childCount > 0 && <span>{childCount} отв.</span>}
            </div>

            {renderPageCommentTree(comments, comment.id, pageContext, depth + 1)}
          </div>
        );
      });
  }


  function renderTitleCommentTree(comments, parentId, titleId, depth = 0) {
    return sortTitleCommentsForMode(
      comments.filter((comment) => (comment.parentId || null) === parentId)
    )
      .map((comment) => {
        const childCount = comments.filter((item) => item.parentId === comment.id).length;
        const commentAuthorName = displayNameForUser(comment.authorId, comment.author || "Гость");
        const commentAuthorAvatar = avatarForUser(comment.authorId, comment.avatar || "");

        return (
          <div
            key={comment.id}
            className={`pageComment titleComment ${depth > 0 ? "pageCommentReply" : ""}`}
            style={{ marginLeft: `${Math.min(depth, 4) * 24}px` }}
          >
            <div className="titleCommentVote">
              <button
                type="button"
                className={`voteUpButton ${userVoteForComment(comment) === 1 ? "voteSelected" : ""}`}
                title="Вверх"
                onClick={() => voteTitleComment(titleId, comment.id, 1)}
              >↑</button>
              <b className={commentScoreClass(comment)}>{commentScore(comment)}</b>
              <button
                type="button"
                className={`voteDownButton ${userVoteForComment(comment) === -1 ? "voteSelected" : ""}`}
                title="Вниз"
                onClick={() => voteTitleComment(titleId, comment.id, -1)}
              >↓</button>
            </div>

            <div className="pageCommentBody">
              <div className="pageCommentHeader">
                <button className="pageCommentAvatar" onClick={openCommentAuthorProfile}>
                  {commentAuthorAvatar ? <img src={commentAuthorAvatar} alt={commentAuthorName} /> : null}
                </button>

                <div className="pageCommentMeta">
                  <button className="pageCommentAuthor" onClick={openCommentAuthorProfile}>
                    {commentAuthorName}
                  </button>
                  <span>{commentTime(comment)}</span>
                </div>
              </div>

              {comment.pinned && <div className="pinnedCommentBadge">Закреплено{comment.pinnedByName ? ` · ${comment.pinnedByName}` : ""}</div>}
              <div className="commentText">{renderCommentText(comment.text)}</div>
              {comment.attachedTitleId && renderAttachedTitleCard(comment.attachedTitleId)}

              <div className="pageCommentActions">
                <button onClick={() => setTitleReplyToCommentId(comment.id)}>ответить</button>
                <button onClick={reportTitleComment}>жалоба</button>
                <button>...</button>
                {canPinCommentsForTitle() && (
                  <button onClick={() => toggleTitleCommentPin(titleId, comment.id)}>
                    {comment.pinned ? "открепить" : "закрепить"}
                  </button>
                )}
                {isOwnComment(comment) && (
                  <button
                    className="deleteCommentButton"
                    onClick={() => deleteTitleComment(titleId, comment.id)}
                  >
                    удалить
                  </button>
                )}
                {childCount > 0 && <span>{childCount} отв.</span>}
              </div>

              {renderTitleCommentTree(comments, comment.id, titleId, depth + 1)}
            </div>
          </div>
        );
      });
  }

  function handleImageUpload(event, field) {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setProfileDraft((prev) => ({
        ...prev,
        [field]: String(fileReader.result),
      }));
    };

    fileReader.readAsDataURL(file);
  }

  function saveProfile(event) {
    event.preventDefault();

    const nextProfile = {
      nickname: profileDraft.nickname.trim() || usernameFromSession(),
      avatar: profileDraft.avatar,
      banner: profileDraft.banner,
      gender: profileDraft.gender,
      about: profileDraft.about,
    };

    setProfile(nextProfile);

    const ownId = currentUserId();
    const nextName = nextProfile.nickname;
    const nextAvatar = nextProfile.avatar || "";

    setUsers((prev) =>
      prev.map((user) =>
        String(user.id || user.email || user.name || "") === ownId
          ? { ...user, nickname: nextName, avatar: nextAvatar }
          : user
      )
    );

    setTeams((prev) =>
      prev.map((team) => ({
        ...team,
        ownerName: team.ownerId === ownId ? nextName : team.ownerName,
        members: (team.members || []).map((member) =>
          member.id === ownId ? { ...member, name: nextName, avatar: nextAvatar } : member
        ),
      }))
    );

    setTitleComments((prev) => {
      const next = {};
      Object.entries(prev).forEach(([titleId, comments]) => {
        next[titleId] = (comments || []).map((comment) =>
          comment.authorId === ownId ? { ...comment, author: nextName, avatar: nextAvatar } : comment
        );
      });
      return next;
    });

    setPageComments((prev) => {
      const next = {};
      Object.entries(prev).forEach(([key, comments]) => {
        next[key] = (comments || []).map((comment) =>
          comment.authorId === ownId ? { ...comment, author: nextName, avatar: nextAvatar } : comment
        );
      });
      return next;
    });

    setProfileMessage("Профиль сохранён.");

    setTimeout(() => {
      setProfileMessage("");
    }, 2000);
  }

  function removeProfileImage(field) {
    setProfileDraft((prev) => ({ ...prev, [field]: "" }));
  }

  function countByStatus(status) {
    return titles.filter((title) => myList[title.id] === status).length;
  }

  function markNotificationsRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  }

  function openNotificationSettings() {
    setSettingsTab("notifications");
    setView("settings");
    setNotificationsOpen(false);
    setConfirmClearNotificationsOpen(false);
    setBurgerOpen(false);
    setCatalogOpen(false);
    setSearchOpen(false);
    setCreateMenuOpen(false);
  }

  function openAllNotificationsPage() {
    setView("notifications");
    setNotificationsOpen(false);
    setConfirmClearNotificationsOpen(false);
    setBurgerOpen(false);
    setCatalogOpen(false);
    setSearchOpen(false);
    setCreateMenuOpen(false);
  }

  function notificationText(item) {
    const actor = item.actorName || item.userName || item.author || "Пользователь";

    if (item.type === "commentReply") return `${actor} ответил на ваш комментарий.`;
    if (item.type === "friendRequest") return `${actor} хочет добавить вас в друзья.`;

    return item.text;
  }

  function openNotificationItem(item) {
    setNotificationsOpen(false);

    if (item.type === "friendRequest") {
      setView("profile");
      return;
    }

    if (item.type === "commentReply") {
      setView("profileComments");
      return;
    }

    if (item.type === "chapter") {
      openTitle(item.titleId || titles[0].id);
      return;
    }

    setView("notifications");
  }

  function confirmClearBellNotifications() {
    markNotificationsRead();
    setBellNotificationsCleared(true);
    setConfirmClearNotificationsOpen(false);
    setNotificationsOpen(false);
  }

  function formatCompactNumber(value) {
    const number = Number(value || 0);

    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1).replace(".0", "")}M`;
    }

    if (number >= 1000) {
      return `${(number / 1000).toFixed(1).replace(".0", "")}K`;
    }

    return String(number);
  }

  function getTitleViews(titleId) {
    return Number(titleViews[titleId] || 0);
  }

  function getBaseTitleViews(title) {
    return Number(String(title?.views || "0").replace(/\D/g, "")) || 0;
  }

  function getTotalTitleViews(title) {
    return getBaseTitleViews(title) + getTitleViews(title.id);
  }

  function getPopularityFlames(title) {
    const total = typeof title === "number" ? title : getTotalTitleViews(title);
    return Math.max(0, Math.min(5, Math.floor(Number(total || 0) / 30000)));
  }

  function renderPopularityFlames(title) {
    const flames = getPopularityFlames(title);
    if (!flames) return null;

    return (
      <span className="popularityFlames" title={`Популярность: ${formatCompactNumber(typeof title === "number" ? title : getTotalTitleViews(title))} просмотров`}>
        {Array.from({ length: flames }, (_, index) => (
          <svg key={index} className="monoFlameIcon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.6 2.7c.2 2.1-.4 3.7-1.5 5.2-.9 1.3-2.2 2.4-3.2 3.6-.9 1.1-1.5 2.3-1.5 3.9 0 3.2 2.5 5.7 5.6 5.7s5.6-2.5 5.6-5.7c0-2.6-1.4-4.8-3.1-6.6-.4 1.3-1.1 2.2-2.1 2.9.4-2.8-.2-5.9-2.8-9zM12.8 19.2c-1.5 0-2.7-1.1-2.7-2.7 0-.8.3-1.5.8-2.2.4-.5.9-1 1.3-1.5.2 1 .2 2-.1 2.9.7-.3 1.2-.8 1.6-1.5.8.8 1.7 1.8 1.7 3.1 0 1.1-.9 1.9-2.6 1.9z" />
          </svg>
        ))}
      </span>
    );
  }

  function getRatingVotes(titleId) {
    const entry = titleRatings[titleId];
    return entry?.votes || {};
  }

  function getTitleRatingData(titleId) {
    const votes = getRatingVotes(titleId);
    const values = Object.values(votes).map(Number).filter((value) => value > 0);
    const count = values.length;
    const average = count ? values.reduce((sum, value) => sum + value, 0) / count : 0;

    return {
      average,
      count,
      myRating: Number(votes[currentUserId()] || 0),
    };
  }

  function getRatingDistribution(titleId) {
    const votes = getRatingVotes(titleId);
    const values = Object.values(votes).map(Number).filter((value) => value >= 1 && value <= 10);
    const total = values.length;

    return [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((score) => {
      const count = values.filter((value) => value === score).length;
      const percent = total ? Math.round((count / total) * 100) : 0;
      return { score, count, percent };
    });
  }

  function getTitleListStats(titleId) {
    const status = myList[titleId];
    const rows = [
      { label: "Читаю", count: status === "Читаю" ? 1 : 0 },
      { label: "В планах", count: status === "Хочу читать" ? 1 : 0 },
      { label: "Брошено", count: 0 },
      { label: "Прочитано", count: status === "Прочитано" ? 1 : 0 },
      { label: "Любимые", count: status === "Любимое" ? 1 : 0 },
      { label: "Другое", count: 0 },
    ];
    const total = rows.reduce((sum, item) => sum + item.count, 0);

    return {
      total,
      rows: rows.map((item) => ({
        ...item,
        percent: total ? Math.round((item.count / total) * 100) : 0,
      })),
    };
  }

  function getFriendsCurrentList() {
    const list = friendsState[friendsTab] || [];
    const search = friendsQuery.trim().toLowerCase();
    return search ? list.filter((item) => item.name.toLowerCase().includes(search)) : list;
  }

  function openFriendsPage(tab = "friends") {
    setFriendsTab(tab);
    setFriendsQuery("");
    setView("friends");
    setBurgerOpen(false);
    setCatalogOpen(false);
    setSearchOpen(false);
    setNotificationsOpen(false);
    setCreateMenuOpen(false);
  }

  function removeFriend(friendId) {
    setFriendsState((prev) => ({
      ...prev,
      friends: (prev.friends || []).filter((item) => item.id !== friendId),
    }));
  }

  function acceptFriendRequest(request) {
    setFriendsState((prev) => ({
      ...prev,
      incoming: (prev.incoming || []).filter((item) => item.id !== request.id),
      friends: [
        ...(prev.friends || []),
        { ...request, id: `friend-${request.id}`, date: new Date().toLocaleDateString("ru-RU") },
      ],
    }));
  }

  function declineFriendRequest(requestId) {
    setFriendsState((prev) => ({
      ...prev,
      incoming: (prev.incoming || []).filter((item) => item.id !== requestId),
    }));
  }

  function cancelOutgoingFriendRequest(requestId) {
    setFriendsState((prev) => ({
      ...prev,
      outgoing: (prev.outgoing || []).filter((item) => item.id !== requestId),
    }));
  }

  function openFriendProfile(friend) {
    alert(`Профиль пользователя ${friend.name} будет открыт после подключения настоящих профилей.`);
  }

  function messageFriend(friend) {
    alert(`Личные сообщения с ${friend.name} подключим позже.`);
  }

  function openRatingModal(titleId) {
    const ratingData = getTitleRatingData(titleId);
    setRatingDraft(ratingData.myRating || 0);
    setRatingModalTitleId(titleId);
    closeFloatingMenus();
  }

  function saveTitleRating() {
    if (!ratingModalTitleId || !ratingDraft) return;

    const userId = currentUserId();

    setTitleRatings((prev) => ({
      ...prev,
      [ratingModalTitleId]: {
        ...(prev[ratingModalTitleId] || {}),
        votes: {
          ...((prev[ratingModalTitleId] || {}).votes || {}),
          [userId]: ratingDraft,
        },
      },
    }));

    setRatingModalTitleId(null);
    setRatingDraft(0);
  }

  function updateCatalogFilter(key, value) {
    setCatalogFilters((prev) => ({ ...prev, [key]: value }));
  }

  function toggleCatalogArrayFilter(key, value) {
    setCatalogFilters((prev) => {
      const current = prev[key] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  }

  function validateCatalogYearFilters(filters) {
    const yearFrom = String(filters.yearFrom || "").trim();
    const yearTo = String(filters.yearTo || "").trim();

    if (yearFrom && Number(yearFrom) < 1930) return "Поле year min не может быть меньше 1930.";
    if (yearTo && Number(yearTo) < 1930) return "Поле year max не может быть меньше 1930.";
    if (yearFrom && Number(yearFrom) > 2030) return "Поле year min не может быть более 2030.";
    if (yearTo && Number(yearTo) > 2030) return "Поле year max не может быть более 2030.";
    if (yearFrom && yearTo && Number(yearFrom) > Number(yearTo)) return "Год от не может быть больше года до.";

    return "";
  }

  function applyCatalogFilters() {
    const yearError = validateCatalogYearFilters(catalogFilters);

    if (yearError) {
      setCatalogError(yearError);
      return;
    }

    setCatalogError("");
    setActiveCatalogFilters(catalogFilters);
    setCatalogMode("titles");
  }

  function openTag(tag) {
    const nextFilters = { ...createEmptyCatalogFilters(), genres: [tag] };
    setCatalogMode("titles");
    setGenre("Все");
    setCatalogFilters(nextFilters);
    setActiveCatalogFilters(nextFilters);
    setQuery("");
    setView("catalog");
    closeFloatingMenus();
  }

  function openInfoFilter(field, value) {
    const map = {
      type: "types",
      format: "formats",
      status: "statuses",
      translation: "translations",
    };

    const nextFilters = createEmptyCatalogFilters();

    if (field === "year") {
      const year = String(value || "").replace(/\D/g, "");
      nextFilters.yearFrom = year;
      nextFilters.yearTo = year;
    } else if (map[field]) {
      nextFilters[map[field]] = [value];
    }

    setCatalogMode("titles");
    setGenre("Все");
    setCatalogFilters(nextFilters);
    setActiveCatalogFilters(nextFilters);
    setQuery("");
    setView("catalog");
    closeFloatingMenus();
  }

  function clearCatalogFilters() {
    const empty = createEmptyCatalogFilters();
    setGenre("Все");
    setCatalogFilters(empty);
    setActiveCatalogFilters(empty);
    setQuery("");
  }

  function hasCatalogFilters(filters = activeCatalogFilters) {
    return (
      query.trim() ||
      genre !== "Все" ||
      filters.genres.length > 0 ||
      filters.tags.length > 0 ||
      filters.types.length > 0 ||
      filters.formats.length > 0 ||
      filters.statuses.length > 0 ||
      filters.translations.length > 0 ||
      filters.chaptersFrom ||
      filters.chaptersTo ||
      filters.yearFrom ||
      filters.yearTo ||
      filters.ratingFrom ||
      filters.ratingTo ||
      filters.ratingCountFrom ||
      filters.ratingCountTo
    );
  }

  function handleCreateMenuAction(action) {
    setCreateMenuOpen(false);

    if (action === "title") {
      setView("suggest");
      return;
    }

    if (action === "team") {
      setView("createTeam");
      return;
    }

    if (action === "my") {
      setView("mySubmissions");
      return;
    }

    alert("Этот раздел пока заглушка. Позже подключим модерацию и базу.");
  }

  function clearContinueReading() {
    setProgress({});
  }

  function toggleNotificationSetting(key) {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function saveNotificationSettings() {
    localStorage.setItem(STORAGE_NOTIFICATION_SETTINGS, JSON.stringify(notificationSettings));
    setNotificationSettingsMessage("Настройки уведомлений сохранены.");

    setTimeout(() => {
      setNotificationSettingsMessage("");
    }, 2000);
  }

  async function setupBrowserNotifications() {
    if (!("Notification" in window)) {
      setNotificationSettingsMessage("Браузер не поддерживает уведомления.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      const enabled = permission === "granted";

      setNotificationSettings((prev) => {
        const next = { ...prev, browserEnabled: enabled };
        localStorage.setItem(STORAGE_NOTIFICATION_SETTINGS, JSON.stringify(next));
        return next;
      });

      setNotificationSettingsMessage(
        enabled ? "Браузерные уведомления включены." : "Разрешение на уведомления не выдано."
      );

      if (enabled) {
        new Notification("Akari", { body: "Уведомления включены." });
      }
    } catch {
      setNotificationSettingsMessage("Не удалось включить браузерные уведомления.");
    }

    setTimeout(() => {
      setNotificationSettingsMessage("");
    }, 2500);
  }

  const isReader = view === "reader";

  return (
    <div className={`app ${theme} ${isReader ? "readerModeApp" : ""}`} onClick={() => { if (teamMenuOpen) setTeamMenuOpen(false); }}>
      <style>{css}</style>

      {catalogError && (
        <div className="akariToastError">
          <span>!</span>
          <p>{catalogError}</p>
        </div>
      )}

      {!isReader && (
        <header>
          <div className="headerInner">
            <div className="logo akariLogo" onClick={openCatalog} aria-label="Akari">
              <span className="akariLogoCorner akariLogoCornerLeft"></span>
              <span className="akariLogoText">Akari</span>
              <span className="akariLogoSpark">✦</span>
              <span className="akariLogoCorner akariLogoCornerRight"></span>
            </div>

            <div className="catalogNav">
              <button
                className="catalogButton"
                onClick={() => {
                  setCatalogOpen(!catalogOpen);
                  setBurgerOpen(false);
                  setSearchOpen(false);
                  setNotificationsOpen(false);
                }}
              >
                <span className="catalogIcon">▦</span>
                Каталог
                <span className="catalogArrow">▾</span>
              </button>

              {catalogOpen && (
                <div className="catalogMenu catalogMenuSimple">
                  <div className="catalogMenuLeft">
                    <button
                      onClick={() => {
                        clearCatalogFilters();
                        setCatalogMode("titles");
                        setView("catalog");
                        setCatalogOpen(false);
                        setBurgerOpen(false);
                        setSearchOpen(false);
                        setNotificationsOpen(false);
                        setCreateMenuOpen(false);
                      }}
                    >
                      <span>▦</span> Тайтлы
                    </button>

                    <button><span>◉</span> Сейчас читают</button>
                    <button><span>★</span> Коллекции</button>
                    <button><span>◌</span> Отзывы и Рецензии</button>
                    <button><span>♟</span> Команды</button>
                    <button><span>♙</span> Люди</button>
                    <button><span>☻</span> Персонажи</button>
                    <button><span>▣</span> Карты</button>
                    <button><span>▤</span> Франшизы</button>
                    <button><span>▥</span> Издательства</button>
                    <button><span>●</span> Пользователи</button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="headerSearch"
              onClick={() => {
                setSearchOpen(true);
                setBurgerOpen(false);
                setCatalogOpen(false);
                setNotificationsOpen(false);
              }}
            >
              <span>⌕</span>
              <b>Поиск тайтлов</b>
            </button>

            <button
              className="themeToggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title="Сменить тему"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="rightSide">
              {!session ? (
                <>
                  <button
                    onClick={() => {
                      resetAuth();
                      setView("login");
                      closeFloatingMenus();
                    }}
                  >
                    Вход
                  </button>

                  <button
                    onClick={() => {
                      resetAuth();
                      setView("register");
                      closeFloatingMenus();
                    }}
                  >
                    Регистрация
                  </button>
                </>
              ) : (
                <div className="accountControls">
                  <div className="teamQuickWrap" onClick={(event) => event.stopPropagation()}>
                    <button
                      className="teamQuickButton"
                      onClick={() => {
                        setTeamMenuOpen(!teamMenuOpen);
                        setCreateMenuOpen(false);
                        setNotificationsOpen(false);
                        setBurgerOpen(false);
                        setCatalogOpen(false);
                        setSearchOpen(false);
                      }}
                      title="Мои команды"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-3.2 2.2-5.5 5-5.5s5 2.3 5 5.5M13 19c.2-2.4 1.6-4 3.7-4 2.2 0 3.8 1.7 4 4" />
                      </svg>
                    </button>

                    {teamMenuOpen && (
                      <div className="teamQuickMenu">
                        {myTeams.length > 0 ? (
                          myTeams.map((team) => (
                            <button key={team.id} onClick={() => openTeam(team.id)}>
                              <span className="teamQuickAvatar">
                                {team.cover ? <img src={team.cover} alt={team.name} /> : team.name.slice(0, 1).toUpperCase()}
                              </span>
                              <span>
                                <b>{team.name}</b>
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="teamQuickEmpty">
                            <span>Команд пока нет</span>
                            <small>Создать команду можно через кнопку +</small>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="createWrap">
                    <button
                      className="createButton"
                      onClick={() => {
                        setCreateMenuOpen(!createMenuOpen);
                        setNotificationsOpen(false);
                        setBurgerOpen(false);
                        setCatalogOpen(false);
                        setSearchOpen(false);
                      }}
                      title="Добавить"
                    >
                      <svg className="createButtonSvg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>

                    {createMenuOpen && (
                      <div className="createMenu cleanCreateMenu">
                        <button onClick={() => handleCreateMenuAction("title")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span>
                          <b>Добавить тайтл</b>
                        </button>
                        <button onClick={() => handleCreateMenuAction("team")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-3.2 2.2-5.5 5-5.5s5 2.3 5 5.5M13 19c.2-2.4 1.6-4 3.7-4 2.2 0 3.8 1.7 4 4" /></svg></span>
                          <b>Добавить команду</b>
                        </button>
                        <button onClick={() => handleCreateMenuAction("person")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21c0-4 3-7 7-7s7 3 7 7" /></svg></span>
                          <b>Добавить персону</b>
                        </button>
                        <button onClick={() => handleCreateMenuAction("character")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M12 21c4.4 0 8-3.4 8-7.7C20 8 16.4 4 12 4s-8 4-8 9.3C4 17.6 7.6 21 12 21ZM9 12h.01M15 12h.01M9.5 16c1.4 1 3.6 1 5 0" /></svg></span>
                          <b>Добавить персонажа</b>
                        </button>
                        <button onClick={() => handleCreateMenuAction("publisher")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M5 20V7l7-3 7 3v13M8 20v-8h8v8M9 8h.01M12 8h.01M15 8h.01" /></svg></span>
                          <b>Добавить издателя</b>
                        </button>
                        <button onClick={() => handleCreateMenuAction("my")}>
                          <span className="createMenuIcon"><svg viewBox="0 0 24 24"><path d="M6 7h12M6 12h12M6 17h12" /></svg></span>
                          <b>Мои добавления</b>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="notificationWrap">
                    <button
                      className="bellButton"
                      onClick={() => {
                        setNotificationsOpen(!notificationsOpen);
                        setBurgerOpen(false);
                        setCatalogOpen(false);
                        setSearchOpen(false);
                        setCreateMenuOpen(false);
                      }}
                      title="Уведомления"
                    >
                      <svg className="bellIcon" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M12 22.2c1.35 0 2.45-.9 2.78-2.12H9.22c.33 1.22 1.43 2.12 2.78 2.12Z"
                          fill="currentColor"
                        />
                        <path
                          d="M18.7 16.35 17.62 15.1V10c0-2.78-1.52-5.08-4.12-5.7V3.65c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.65C7.9 4.92 6.38 7.22 6.38 10v5.1L5.3 16.35c-.73.84-.13 2.15.98 2.15h11.44c1.11 0 1.71-1.31.98-2.15Z"
                          fill="currentColor"
                        />
                      </svg>
                      {unreadCount > 0 && <span className="notificationBadge">{unreadCount}</span>}
                    </button>

                    {notificationsOpen && (
                      <div className="notificationsPanel">
                        <div className="notificationsTop libNotificationsTop">
                          <button
                            className="notificationPanelIconButton"
                            onClick={openNotificationSettings}
                            title="Настройки уведомлений"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M19.4 13.5c.1-.5.1-1 .1-1.5s0-1-.1-1.5l2-1.5-2-3.5-2.4 1a7 7 0 0 0-2.6-1.5L14 2h-4l-.4 2.5A7 7 0 0 0 7 6L4.6 5l-2 3.5 2 1.5c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 2.6 1.5L10 22h4l.4-2.5A7 7 0 0 0 17 18l2.4 1 2-3.5-2-1.5ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />
                            </svg>
                          </button>
                          <h3>Уведомления</h3>
                          <button
                            className="notificationPanelIconButton"
                            onClick={() => setConfirmClearNotificationsOpen(true)}
                            title="Отметить всё прочитанным"
                            disabled={visibleBellNotifications.length === 0}
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M9.2 16.6 4.9 12.3l1.4-1.4 2.9 2.9 8.5-8.5 1.4 1.4-9.9 9.9Zm5.8.2 4.7-4.7 1.4 1.4-6.1 6.1-3.2-3.2 1.4-1.4 1.8 1.8Z" />
                            </svg>
                          </button>
                        </div>

                        <div className="notificationPanelTabs">
                          <button className="activeTab">Все <span>{visibleBellNotifications.length}</span></button>
                          <button>Главы <span>{bellChapterCount}</span></button>
                          <button>Эпизоды <span>0</span></button>
                          <button>Ответы <span>0</span></button>
                          <button>Личка <span>0</span></button>
                          <button>Карты <span>0</span></button>
                        </div>

                        <div className="notificationsList libNotificationsList">
                          {visibleBellNotifications.length > 0 ? (
                            visibleBellNotifications.slice(0, 4).map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                className={`notificationItem notificationItemButton ${
                                  item.unread ? "unreadNotification" : ""
                                }`}
                                onClick={() => openNotificationItem(item)}
                              >
                                <NotificationAvatar item={item} />

                                <div>
                                  <h4>{item.title}</h4>
                                  <p>{notificationText(item)}</p>
                                  <span>{timeAgo(item.createdAt, item.time)}</span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="emptyBellNotifications">
                              Новых уведомлений пока нет. Все уведомления можно посмотреть на отдельной странице.
                            </div>
                          )}
                        </div>

                        <button className="showAllNotificationsButton" onClick={openAllNotificationsPage}>
                          Показать все уведомления
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className="avatar squareAvatar"
                    onClick={() => {
                      setView("profile");
                      setBurgerOpen(false);
                      setSearchOpen(false);
                      setCatalogOpen(false);
                      setNotificationsOpen(false);
                      setCreateMenuOpen(false);
                    }}
                    title="Мой профиль"
                  >
                    {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}
                  </button>

                  <button
                    className="burgerButton"
                    onClick={() => {
                      setBurgerOpen(!burgerOpen);
                      setSearchOpen(false);
                      setCatalogOpen(false);
                      setNotificationsOpen(false);
                      setCreateMenuOpen(false);
                    }}
                    title="Меню"
                  >
                    ☰
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {searchOpen && (
        <div className="searchOverlay" onClick={() => setSearchOpen(false)}>
          <div className="searchModal" onClick={(event) => event.stopPropagation()}>
            <div className="searchInputRow">
              <span className="searchIcon">⌕</span>

              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск тайтлов"
              />

              <button onClick={() => setSearchOpen(false)}>×</button>
            </div>

            <div className="searchTabs">
              {[
                ["titles", "Тайтлы"],
                ["teams", "Команда"],
                ["character", "Персонаж"],
                ["person", "Человек"],
                ["franchise", "Франшиза"],
                ["publisher", "Издатель"],
                ["user", "Пользователь"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={searchTab === id ? "activeTab" : ""}
                  onClick={() => setSearchTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="searchContent">
              {searchTab === "titles" && (
                query.trim() ? (
                  searchModalTitles.length > 0 ? (
                    <div className="searchResults">
                      {searchModalTitles.map((title) => (
                        <button
                          key={title.id}
                          className="searchResultRow"
                          onClick={() => openTitle(title.id)}
                        >
                          <img src={title.cover} alt={title.name} />

                          <span>
                            <b>{title.name}</b>
                            <small>{title.genres.join(" • ")}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>
                      Ничего не найдено. Расширенный поиск тайтлов находится в{" "}
                      <span>каталоге</span>.
                    </p>
                  )
                ) : (
                  <p>
                    Начни вводить название. Расширенный поиск тайтлов находится в{" "}
                    <span>каталоге</span>.
                  </p>
                )
              )}

              {searchTab === "teams" && (
                query.trim() ? (
                  searchModalTeams.length > 0 ? (
                    <div className="searchResults">
                      {searchModalTeams.map((team) => (
                        <button
                          key={team.id}
                          className="searchResultRow"
                          onClick={() => openTeam(team.id)}
                        >
                          <span className="searchTeamAvatar">
                            {team.cover ? <img src={team.cover} alt={team.name} /> : team.name.slice(0, 1).toUpperCase()}
                          </span>

                          <span>
                            <b>{team.name}</b>
                            <small>{plainTextFromHtml(team.description || team.altNames || "Команда переводчиков")}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>Команды не найдены. Создать команду можно через кнопку <span>+</span>.</p>
                  )
                ) : (
                  <p>Начни вводить название команды.</p>
                )
              )}

              {!["titles", "teams"].includes(searchTab) && (
                <p>Этот раздел поиска пока локальная заглушка. Позже подключим базу.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {ratingModalTitleId && (
        <div className="ratingOverlay" onClick={() => setRatingModalTitleId(null)}>
          <div className="ratingModal" onClick={(event) => event.stopPropagation()}>
            <div className="ratingModalTop">
              <h2>Оценка тайтла</h2>
              <button onClick={() => setRatingModalTitleId(null)}>×</button>
            </div>

            <div className="ratingModalHint">Поставьте оценку</div>

            <div className="ratingStars">
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                <button
                  key={value}
                  className={value <= ratingDraft ? "ratingStarActive" : ""}
                  onClick={() => setRatingDraft(value)}
                  title={`${value}/10`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="ratingModalActions">
              <button onClick={() => setRatingModalTitleId(null)}>Отмена</button>
              <button onClick={saveTitleRating} disabled={!ratingDraft}>Оценить</button>
            </div>
          </div>
        </div>
      )}

      {confirmClearNotificationsOpen && (
        <div className="confirmActionOverlay" onClick={() => setConfirmClearNotificationsOpen(false)}>
          <div className="confirmActionModal" onClick={(event) => event.stopPropagation()}>
            <button
              className="confirmActionClose"
              onClick={() => setConfirmClearNotificationsOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h3>Подтвердите действие</h3>
            <p>Отметить все уведомления прочитанными?</p>
            <div className="confirmActionButtons">
              <button onClick={() => setConfirmClearNotificationsOpen(false)}>Отменить</button>
              <button onClick={confirmClearBellNotifications}>Подтвердить</button>
            </div>
          </div>
        </div>
      )}

      {burgerOpen && session && (
        <div className="burgerLayer">
          <div className="burgerMenu">
            <button
              className="burgerProfileTop"
              onClick={() => {
                setView("profile");
                setBurgerOpen(false);
              }}
            >
              <span className="burgerMiniAvatar">
                {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}
              </span>

              <span>
                <small>Мой профиль →</small>
                <b>{usernameFromSession()}</b>
              </span>
            </button>

            <div className="burgerGroup">
              <button
                onClick={() => {
                  setView("notifications");
                  setNotificationsOpen(false);
                  setBurgerOpen(false);
                  setCatalogOpen(false);
                  setSearchOpen(false);
                  setCreateMenuOpen(false);
                  markNotificationsRead();
                }}
              >
                <MenuIcon>
                  <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5c0-3.1-1.65-5.65-4.5-6.32V4a2.5 2.5 0 0 0-5 0v.68C6.65 5.35 5 7.9 5 11v5l-1.7 2v1h17.4v-1L19 16Z" />
                </MenuIcon>
                Уведомления
              </button>

              <button
                onClick={() => {
                  setView("profileComments");
                  setBurgerOpen(false);
                  setCatalogOpen(false);
                  setSearchOpen(false);
                  setNotificationsOpen(false);
                  setCreateMenuOpen(false);
                }}
              >
                <MenuIcon>
                  <path d="M4 5h16v11H7.8L4 19.5V5Zm2 2v8.2l1-.9H18V7H6Z" />
                </MenuIcon>
                Комментарии
              </button>

              <button>
                <MenuIcon>
                  <path d="M3 5h18v14H3V5Zm2 3.2V17h14V8.2l-7 5-7-5Zm1.4-1.2L12 11l5.6-4H6.4Z" />
                </MenuIcon>
                Личные сообщения
              </button>

              <button
                onClick={() => {
                  setView("viewHistory");
                  setBurgerOpen(false);
                  setCatalogOpen(false);
                  setSearchOpen(false);
                  setNotificationsOpen(false);
                  setCreateMenuOpen(false);
                }}
              >
                <MenuIcon>
                  <path d="M12 5a7 7 0 1 1-6.3 10H8a5 5 0 1 0-.2-5.6L10 11H4V5l2.2 2.2A7 7 0 0 1 12 5Z" />
                </MenuIcon>
                История просмотров
              </button>

              <button onClick={() => openFriendsPage("friends")}>
                <MenuIcon>
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6.5-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20c0-3.35 3.1-6 7-6s7 2.65 7 6v1H2v-1Zm13.5-6c3.3.15 6.5 2.45 6.5 6v1h-4v-1c0-2.25-.95-4.15-2.5-5.55V14Z" />
                </MenuIcon>
                Список друзей
              </button>

              <button
                onClick={() => {
                  setView("mylist");
                  setBurgerOpen(false);
                }}
              >
                <MenuIcon>
                  <path d="M4 5h3v3H4V5Zm5 0h11v3H9V5ZM4 10.5h3v3H4v-3Zm5 0h11v3H9v-3ZM4 16h3v3H4v-3Zm5 0h11v3H9v-3Z" />
                </MenuIcon>
                Избранное
              </button>

              <button>
                <MenuIcon>
                  <path d="M11 4h2v8l3-3 1.4 1.4L12 15.8l-5.4-5.4L8 9l3 3V4ZM5 18h14v2H5v-2Z" />
                </MenuIcon>
                Загрузки
              </button>

              <button>
                <MenuIcon>
                  <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z" />
                </MenuIcon>
                Ещё...
              </button>
            </div>

            <div className="burgerGroup">
              <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <MenuIcon>
                  <path d="M12 2a10 10 0 1 0 0 20V2Zm0 2v16a8 8 0 0 1 0-16Z" />
                </MenuIcon>
                Тема сайта <span>{theme === "light" ? "Светлая" : "Тёмная"}</span>
              </button>

              <button
                onClick={() => {
                  setSettingsTab("profile");
                  setView("settings");
                  setBurgerOpen(false);
                }}
              >
                <MenuIcon>
                  <path d="M19.4 13.5c.1-.5.1-1 .1-1.5s0-1-.1-1.5l2-1.5-2-3.5-2.4 1a7 7 0 0 0-2.6-1.5L14 2h-4l-.4 2.5A7 7 0 0 0 7 6L4.6 5l-2 3.5 2 1.5c-.1.5-.1 1-.1 1.5s0 1 .1 1.5l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 2.6 1.5L10 22h4l.4-2.5A7 7 0 0 0 17 18l2.4 1 2-3.5-2-1.5ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />
                </MenuIcon>
                Настройки
              </button>

              <button className="dangerButton" onClick={logout}>
                <MenuIcon>
                  <path d="M10 3h9v18h-9v-2h7V5h-7V3ZM9 8l1.4 1.4L8.8 11H21v2H8.8l1.6 1.6L9 16l-4-4 4-4Z" />
                </MenuIcon>
                Выйти
              </button>
            </div>

            <div className="burgerVersion">версия: dev 0.1</div>
          </div>
        </div>
      )}

      <main className={isReader ? "readerMain" : ""}>
        {view === "catalog" && (
          <>
            {catalogMode === "home" && (
              <section className="homePopularHero">
              <div className="homePopularTop">
                <div>
                  <h1>Популярные тайтлы</h1>
                  <p>Тайтлы, которые набирают просмотры после выхода новых глав.</p>
                </div>

                <button
                  className="homePopularCatalogButton"
                  onClick={() => {
                    setCatalogMode("titles");
                    setCatalogOpen(false);
                    setView("catalog");
                  }}
                >
                  В каталог →
                </button>
              </div>

              <div className="homePopularGrid">
                {popularHomeTitles.map(({ title, totalViews, rating, isMainPopular }) => (
                  <button
                    key={title.id}
                    className="homePopularCard"
                    onClick={() => openTitle(title.id)}
                  >
                    <div className="homePopularPoster">
                      <img src={title.cover} alt={title.name} />
                      <span className="homePopularRating">★ {(rating || Number(title.rating || 0)).toFixed(1)}</span>
                      {isMainPopular && <span className="homePopularHot">200K+</span>}
                      <span className="homePopularChapter">Глава {title.chapters.length}</span>
                    </div>

                    <div className="homePopularInfo">
                      <b>{title.name} {renderPopularityFlames(totalViews)}</b>
                      <span>{title.type} · {formatCompactNumber(totalViews)} просмотров</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
            )}

            {catalogMode === "titles" ? (
              <section className="catalogSection catalogSectionWithFilters">
              <div className="sectionHeader">
                <h2>{catalogMode === "titles" ? "Тайтлы" : "Каталог"}</h2>
                <span>{filteredTitles.length} в каталоге</span>
              </div>

              {catalogMode === "titles" && hasCatalogFilters() && (
                <div className="activeCatalogFilters">
                  {query.trim() && <span>Поиск: {query}</span>}
                  {genre !== "Все" && <span>Жанр: {genre}</span>}
                  {activeCatalogFilters.genres.map((item) => <span key={`g-${item}`}>Жанр: {item}</span>)}
                  {activeCatalogFilters.tags.map((item) => <span key={`t-${item}`}>Тег: {item}</span>)}
                  {activeCatalogFilters.types.map((item) => <span key={`type-${item}`}>Тип: {item}</span>)}
                  {activeCatalogFilters.formats.map((item) => <span key={`format-${item}`}>Формат: {item}</span>)}
                  {activeCatalogFilters.statuses.map((item) => <span key={`status-${item}`}>Статус: {item}</span>)}
                  {activeCatalogFilters.translations.map((item) => <span key={`tr-${item}`}>Перевод: {item}</span>)}
                  {(activeCatalogFilters.chaptersFrom || activeCatalogFilters.chaptersTo) && <span>Глав: {activeCatalogFilters.chaptersFrom || "0"}—{activeCatalogFilters.chaptersTo || "∞"}</span>}
                  {(activeCatalogFilters.yearFrom || activeCatalogFilters.yearTo) && <span>Год: {activeCatalogFilters.yearFrom || "0"}—{activeCatalogFilters.yearTo || "∞"}</span>}
                  {(activeCatalogFilters.ratingFrom || activeCatalogFilters.ratingTo) && <span>Оценка: {activeCatalogFilters.ratingFrom || "0"}—{activeCatalogFilters.ratingTo || "10"}</span>}
                  <button onClick={clearCatalogFilters}>Сбросить</button>
                </div>
              )}


                <div className="catalogLayout">
                  <div className="catalogResultsCol">
                    <div className="catalogTopControls">
                      <div className="catalogSearchLine">
                        <span>⌕</span>
                        <input
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Поиск по названию"
                        />
                        {query.trim() && <button onClick={() => setQuery("")}>×</button>}
                      </div>

                      <details className="catalogSortDropdown">
                        <summary>
                          <span>⇅</span>
                          {catalogSort === "popular" && "По популярности"}
                          {catalogSort === "rating" && "По рейтингу"}
                          {catalogSort === "views" && "По просмотрам"}
                          {catalogSort === "chapters" && "Количеству глав"}
                          {catalogSort === "year" && "Дате релиза"}
                          {catalogSort === "updated" && "Дате обновления"}
                          {catalogSort === "added" && "Дате добавления"}
                          {catalogSort === "name-az" && "По названию (А-Z)"}
                          {catalogSort === "name-ya" && "По названию (Я-А)"}
                          {catalogSort === "asc" && "По возрастанию"}
                        </summary>

                        <div className="catalogSortMenu">
                          {[
                            ["popular", "По популярности"],
                            ["rating", "По рейтингу"],
                            ["views", "По просмотрам"],
                            ["chapters", "Количеству глав"],
                            ["year", "Дате релиза"],
                            ["updated", "Дате обновления"],
                            ["added", "Дате добавления"],
                            ["name-az", "По названию (А-Z)"],
                            ["name-ya", "По названию (Я-А)"],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              className={catalogSort === value ? "sortSelected" : ""}
                              onClick={() => setCatalogSort(value)}
                            >
                              <span></span>
                              {label}
                            </button>
                          ))}

                          <i></i>

                          <button
                            className={catalogSort !== "asc" ? "sortSelected" : ""}
                            onClick={() => setCatalogSort("popular")}
                          >
                            <span></span>
                            По убыванию
                          </button>
                          <button
                            className={catalogSort === "asc" ? "sortSelected" : ""}
                            onClick={() => setCatalogSort("asc")}
                          >
                            <span></span>
                            По возрастанию
                          </button>
                        </div>
                      </details>
                    </div>

                    {filteredTitles.length > 0 ? (
                      <div className="catalogGrid catalogGridMain">
                        {filteredTitles.map((title) => (
                          <div key={title.id} className="catalogCard" onClick={() => openTitle(title.id)}>
                            <div className="catalogPosterWrap">
                              <img className="catalogPoster" src={title.cover} alt={title.name} />
                              <span className="posterType">{title.type}</span>
                              <span className="posterChapter">Глав: {title.chapters.length}</span>
                              {myList[title.id] && <span className="posterStatus">{myList[title.id]}</span>}
                            </div>

                            <div className="catalogBody">
                              <h3>{title.name} {renderPopularityFlames(title)}</h3>
                              <p>{title.genres.join(" • ")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="emptyCatalogResults">
                        <h3>Ничего не удалось найти</h3>
                        <p>Попробуй изменить поиск или сбросить фильтры.</p>
                      </div>
                    )}
                  </div>

                  <aside className="catalogFilterPanel catalogFilterTable">
                    <details className="catalogDropdownFilter">
                      <summary>
                        <b>Жанры</b>
                        <span>{catalogFilters.genres.length ? catalogFilters.genres.join(", ") : "Любые"} ›</span>
                      </summary>
                      <div className="catalogDropdownBody">
                        <input className="catalogMiniSearch" placeholder="Фильтр по жанрам" />
                        <label className="catalogStrictRow">
                          <input type="checkbox" checked readOnly />
                          <span>Строгое совпадение</span>
                          <em>?</em>
                        </label>
                        {catalogFilterOptions.genres.map((item) => (
                          <label key={item} className="catalogCheckboxLine">
                            <input
                              type="checkbox"
                              checked={catalogFilters.genres.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("genres", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </details>

                    <details className="catalogDropdownFilter">
                      <summary>
                        <b>Теги</b>
                        <span>{catalogFilters.tags.length ? catalogFilters.tags.join(", ") : "Любые"} ›</span>
                      </summary>
                      <div className="catalogDropdownBody">
                        <input className="catalogMiniSearch" placeholder="Фильтр по тегам" />
                        <label className="catalogStrictRow tagStrictRow">
                          <input type="checkbox" checked readOnly />
                          <span>Строгое совпадение</span>
                          <em>?</em>
                        </label>
                        {catalogFilterOptions.tags.map((item) => (
                          <label key={item} className="catalogCheckboxLine">
                            <input
                              type="checkbox"
                              checked={catalogFilters.tags.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("tags", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </details>

                    <div className="catalogRangeGroup">
                      <b>Количество глав</b>
                      <div className="catalogRangeInputs">
                        <input
                          value={catalogFilters.chaptersFrom}
                          onChange={(event) => updateCatalogFilter("chaptersFrom", event.target.value)}
                          placeholder="От"
                          inputMode="numeric"
                        />
                        <span>—</span>
                        <input
                          value={catalogFilters.chaptersTo}
                          onChange={(event) => updateCatalogFilter("chaptersTo", event.target.value)}
                          placeholder="До"
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    <div className="catalogRangeGroup">
                      <b>Год релиза</b>
                      <div className="catalogRangeInputs">
                        <input
                          value={catalogFilters.yearFrom}
                          onChange={(event) => updateCatalogFilter("yearFrom", event.target.value)}
                          placeholder="От"
                          inputMode="numeric"
                        />
                        <span>—</span>
                        <input
                          value={catalogFilters.yearTo}
                          onChange={(event) => updateCatalogFilter("yearTo", event.target.value)}
                          placeholder="До"
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    <div className="catalogRangeGroup">
                      <b>Оценка</b>
                      <div className="catalogRangeInputs">
                        <input
                          value={catalogFilters.ratingFrom}
                          onChange={(event) => updateCatalogFilter("ratingFrom", event.target.value)}
                          placeholder="От"
                          inputMode="decimal"
                        />
                        <span>—</span>
                        <input
                          value={catalogFilters.ratingTo}
                          onChange={(event) => updateCatalogFilter("ratingTo", event.target.value)}
                          placeholder="До"
                          inputMode="decimal"
                        />
                      </div>
                    </div>

                    <div className="catalogRangeGroup">
                      <b>Количество оценок</b>
                      <div className="catalogRangeInputs">
                        <input
                          value={catalogFilters.ratingCountFrom}
                          onChange={(event) => updateCatalogFilter("ratingCountFrom", event.target.value)}
                          placeholder="От"
                          inputMode="numeric"
                        />
                        <span>—</span>
                        <input
                          value={catalogFilters.ratingCountTo}
                          onChange={(event) => updateCatalogFilter("ratingCountTo", event.target.value)}
                          placeholder="До"
                          inputMode="numeric"
                        />
                      </div>
                    </div>

                    <div className="catalogCheckGroup">
                      <b>Тип</b>
                      <div className="catalogCheckGrid">
                        {catalogFilterOptions.type.map((item) => (
                          <label key={item} className="catalogCheckboxLine compactCatalogCheck">
                            <input
                              type="checkbox"
                              checked={catalogFilters.types.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("types", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="catalogCheckGroup">
                      <b>Формат выпуска</b>
                      <div className="catalogCheckGrid">
                        {catalogFilterOptions.format.map((item) => (
                          <label key={item} className="catalogCheckboxLine compactCatalogCheck">
                            <input
                              type="checkbox"
                              checked={catalogFilters.formats.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("formats", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="catalogCheckGroup">
                      <b>Статус тайтла</b>
                      <div className="catalogCheckGrid">
                        {catalogFilterOptions.status.map((item) => (
                          <label key={item} className="catalogCheckboxLine compactCatalogCheck">
                            <input
                              type="checkbox"
                              checked={catalogFilters.statuses.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("statuses", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="catalogCheckGroup">
                      <b>Статус перевода</b>
                      <div className="catalogCheckGrid">
                        {catalogFilterOptions.translation.map((item) => (
                          <label key={item} className="catalogCheckboxLine compactCatalogCheck">
                            <input
                              type="checkbox"
                              checked={catalogFilters.translations.includes(item)}
                              onChange={() => toggleCatalogArrayFilter("translations", item)}
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="catalogFilterActions">
                      <button onClick={clearCatalogFilters}>Сбросить</button>
                      <button onClick={applyCatalogFilters}>Применить</button>
                    </div>
                  </aside>
                </div>
              </section>
            ) : catalogMode === "homeUpdateList" ? (
              <section className="homeSectionPage">
                <div className="homeSectionPageTop">
                  <button className="homeBackButton" onClick={closeHomeUpdateSection}>← На главную</button>

                  <div>
                    <h2>{activeHomeUpdateSection.title}</h2>
                    <p>{activeHomeUpdateSection.subtitle}</p>
                  </div>

                  <div className="homePeriodTabs">
                    {[
                      ["day", "День"],
                      ["week", "Неделя"],
                      ["month", "Месяц"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        className={homeActivityPeriod === id ? "activeHomePeriod" : ""}
                        onClick={() => setHomeActivityPeriod(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="homeSectionListGrid">
                  {activeHomeUpdateSection.items.map(({ title, totalViews, periodViews, rating, chaptersCount, year }) => {
                    const lastChapter = title.chapters?.[title.chapters.length - 1];

                    return (
                      <button
                        key={`${activeHomeUpdateSection.id}-${title.id}`}
                        className="homeSectionListCard"
                        onClick={() => openTitle(title.id)}
                      >
                        <img src={title.cover} alt={title.name} />

                        <span>
                          <b>{title.name} {renderPopularityFlames(totalViews)}</b>
                          <small>{title.type} · ★ {(rating || Number(title.rating || 0)).toFixed(1)} · {formatCompactNumber(periodViews)} визитов {homePeriodLabel(homeActivityPeriod)}</small>
                          <em>{lastChapter?.name || `Глав: ${chaptersCount}`} · {year ? `${year} г.` : "год неизвестен"} · всего {formatCompactNumber(totalViews)}</em>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : (
              <section className="homeUpdatesSection">
                <div className="sectionHeader homeUpdatesHeader">
                  <div>
                    <h2>Обновления</h2>
                    <span>активность по тайтлам {homePeriodLabel(homeActivityPeriod)}</span>
                  </div>

                  <div className="homePeriodTabs">
                    {[
                      ["day", "День"],
                      ["week", "Неделя"],
                      ["month", "Месяц"],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        className={homeActivityPeriod === id ? "activeHomePeriod" : ""}
                        onClick={() => setHomeActivityPeriod(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="homeUpdatesGrid">
                  {homeUpdateColumns.map((column) => (
                    <div key={column.id} className="homeUpdateColumn">
                      <button className="homeUpdateColumnTitle" onClick={() => openHomeUpdateSection(column.id)}>
                        <span>{column.title}</span>
                        <b>Смотреть все →</b>
                      </button>

                      <div className="homeUpdateList">
                        {column.items.map(({ title, totalViews, periodViews }) => (
                          <button
                            key={`${column.id}-${title.id}`}
                            className="homeUpdateItem"
                            onClick={() => openTitle(title.id)}
                          >
                            <img src={title.cover} alt={title.name} />
                            <span>
                              <b>{title.name} {renderPopularityFlames(totalViews)}</b>
                              <small>{title.type} · {formatCompactNumber(periodViews)} визитов {homePeriodLabel(homeActivityPeriod)} · всего {formatCompactNumber(totalViews)}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="continueSection">
              <div className="sectionHeader">
                <h2>Продолжить читать</h2>

                {continueReadingItems.length > 0 ? (
                  <button className="clearInlineButton" onClick={clearContinueReading}>
                    очистить
                  </button>
                ) : (
                  <span>пока пусто</span>
                )}
              </div>

              {continueReadingItems.length > 0 ? (
                <div className="continueGrid">
                  {continueReadingItems.map((item) => (
                    <button
                      key={item.key}
                      className="continueCard"
                      onClick={() => startReading(item.titleId, item.chapterIndex)}
                    >
                      <img src={item.title.cover} alt={item.title.name} />

                      <div className="continueInfo">
                        <h3>{item.title.name}</h3>
                        <p>
                          {item.chapter.name} — {item.pageIndex + 1} из {item.totalPages}
                        </p>

                        <div className="continueBar">
                          <span
                            style={{
                              width: `${Math.max(
                                8,
                                Math.min(100, ((item.pageIndex + 1) / item.totalPages) * 100)
                              )}%`,
                            }}
                          ></span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="emptyContinueBox">
                  <h3>Здесь появится продолжение чтения</h3>
                  <p>Открой любую главу, полистай страницы, и блок заполнится автоматически.</p>
                </div>
              )}
            </section>

            {catalogMode === "home" && (
              <>
                <section className="homeExtraSection">
                  <div className="sectionHeader">
                    <h2>Новинки</h2>
                    <button className="clearInlineButton" onClick={() => openHomeUpdateSection("new")}>смотреть все</button>
                  </div>

                  <div className="homeExtraGrid">
                    {homeNewTitles.map((title) => (
                      <button key={`new-${title.id}`} className="homeExtraCard" onClick={() => openTitle(title.id)}>
                        <img src={title.cover} alt={title.name} />
                        <span>
                          <b>{title.name}</b>
                          <small>{title.type} · {title.year} · глав: {title.chapters.length}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="homeExtraSection">
                  <div className="sectionHeader">
                    <h2>Последние обновления</h2>
                    <button className="clearInlineButton" onClick={() => openHomeUpdateSection("latest")}>смотреть все</button>
                  </div>

                  <div className="homeExtraGrid">
                    {homeLatestUpdatedTitles.map((title) => {
                      const lastChapter = title.chapters[title.chapters.length - 1];

                      return (
                        <button key={`latest-${title.id}`} className="homeExtraCard" onClick={() => openTitle(title.id)}>
                          <img src={title.cover} alt={title.name} />
                          <span>
                            <b>{title.name}</b>
                            <small>{lastChapter?.name || "Глава"} · {lastChapter?.date || "недавно"}</small>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {view === "login" && (
          <div className="authPage">
            <div className="authCard">
              <h2>Вход</h2>
              <p className="muted">Войди в аккаунт Akari.</p>

              <form onSubmit={login} className="authBigForm">
                <input
                  value={authEmail}
                  onChange={(event) => setAuthEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                />

                <input
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  placeholder="Пароль"
                  type="password"
                  autoComplete="current-password"
                />

                <button>Войти</button>
              </form>

              {authMessage && <p className="authMessage">{authMessage}</p>}

              <button
                className="linkButton"
                onClick={() => {
                  resetAuth();
                  setView("register");
                }}
              >
                Нет аккаунта? Регистрация
              </button>
            </div>
          </div>
        )}

        {view === "register" && (
          <div className="authPage">
            <div className="authCard">
              <h2>Регистрация</h2>
              <p className="muted">Создай аккаунт Akari.</p>

              <form onSubmit={register} className="authBigForm">
                <input
                  value={authEmail}
                  onChange={(event) => setAuthEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                />

                <input
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  placeholder="Пароль"
                  type="password"
                  autoComplete="new-password"
                />

                <input
                  value={authPassword2}
                  onChange={(event) => setAuthPassword2(event.target.value)}
                  placeholder="Повтори пароль"
                  type="password"
                  autoComplete="new-password"
                />

                <button>Зарегистрироваться</button>
              </form>

              {authMessage && <p className="authMessage">{authMessage}</p>}

              <button
                className="linkButton"
                onClick={() => {
                  resetAuth();
                  setView("login");
                }}
              >
                Уже есть аккаунт? Вход
              </button>
            </div>
          </div>
        )}

        {view === "title" && selectedTitle && (
          <div className="titleHub">
            <aside className="titleHubSide">
              <div className="titleCoverBox">
                <img src={selectedTitle.cover} alt={selectedTitle.name} />

                <div className="coverQuickButtons">
                  <button>⚠</button>
                  <button onClick={() => setTitleTab("chapters")}>☷</button>
                  <button>✚</button>
                  <button>✎</button>
                </div>
              </div>

              <button className="startReadBig" onClick={() => startReading(selectedTitle.id, 0)}>
                📖 Начать читать <span>0 / {selectedTitle.chapters.length}</span>
              </button>

              <div className="statusDropdown sideStatusDropdown">
                <button onClick={() => setStatusMenuOpen(!statusMenuOpen)}>
                  + {myList[selectedTitle.id] || "Добавить в планы"} ▾
                </button>

                {statusMenuOpen && (
                  <div className="statusMenu">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => addOrUpdateList(selectedTitle.id, status)}
                      >
                        {status}
                      </button>
                    ))}

                    {myList[selectedTitle.id] && (
                      <button onClick={() => removeFromList(selectedTitle.id)}>
                        Убрать из списка
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="titlePopularityLine">
                <span>Популярность</span>
                <b>{renderPopularityFlames(selectedTitle) || "—"}</b>
              </div>

              <div className="titleInfoCard">
                <InfoLine label="Тип" value={selectedTitle.type} onClick={() => openInfoFilter("type", selectedTitle.type, "Тип")} />
                <InfoLine label="Формат" value={selectedTitle.format} onClick={() => openInfoFilter("format", selectedTitle.format, "Формат")} />
                <InfoLine label="Выпуск" value={selectedTitle.year} onClick={() => openInfoFilter("year", selectedTitle.year, "Год выпуска")} />
                <InfoLine label="Глав" value={selectedTitle.chapters.length} />
                <InfoLine label="Статус" value={selectedTitle.status} onClick={() => openInfoFilter("status", selectedTitle.status, "Статус тайтла")} />
                <InfoLine label="Перевод" value={selectedTitle.translation} onClick={() => openInfoFilter("translation", selectedTitle.translation, "Статус перевода")} />
                <InfoLine label="Просмотры" value={formatCompactNumber(getTitleViews(selectedTitle.id))} />
              </div>
            </aside>

            <section className="titleHubMain">
              <div className="titleHubTop">
                <div>
                  <h2>{selectedTitle.name}</h2>
                  <p>{selectedTitle.author}</p>
                </div>

                <div className="ratingBox">
                  <b>★ {getTitleRatingData(selectedTitle.id).count ? getTitleRatingData(selectedTitle.id).average.toFixed(1) : "—"}</b>
                  <span>{getTitleRatingData(selectedTitle.id).count} оценок</span>
                  <button onClick={() => openRatingModal(selectedTitle.id)}>★ Оценить</button>
                </div>
              </div>

              <div className="tabs titleHubTabs">
                <button
                  className={titleTab === "about" ? "activeTab" : ""}
                  onClick={() => setTitleTab("about")}
                >
                  О тайтле
                </button>

                <button
                  className={titleTab === "chapters" ? "activeTab" : ""}
                  onClick={() => setTitleTab("chapters")}
                >
                  Главы
                </button>

                <button
                  className={titleTab === "comments" ? "activeTab" : ""}
                  onClick={() => setTitleTab("comments")}
                >
                  Комментарии
                </button>

                <button
                  className={titleTab === "discussions" ? "activeTab" : ""}
                  onClick={() => setTitleTab("discussions")}
                >
                  Обсуждения
                </button>

                <button
                  className={titleTab === "reviews" ? "activeTab" : ""}
                  onClick={() => setTitleTab("reviews")}
                >
                  Отзывы
                </button>
              </div>

              <div className={`titleHubPanel ${titleTab === "chapters" ? "chaptersPanel" : ""}`}>
                {titleTab === "about" && (
                  <>
                    <div className="tagList">
                      {selectedTitle.genres.map((item) => (
                        <button key={item} onClick={() => openTag(item)}># {item}</button>
                      ))}
                    </div>

                    <h3>Описание</h3>
                    <p className="titleDescription">{selectedTitle.description}</p>

                    <h3>Переводчики</h3>
                    <div className="translatorCard">
                      <div className="teamAvatar"></div>
                      <b>{selectedTitle.team}</b>
                    </div>

                    <h3>Похожее →</h3>
                    <div className="similarGrid">
                      {titles
                        .filter((item) => item.id !== selectedTitle.id)
                        .slice(0, 2)
                        .map((item) => (
                          <button key={item.id} onClick={() => openTitle(item.id)}>
                            <img src={item.cover} alt={item.name} />
                            <span>
                              <small>Схожее по жанрам</small>
                              <b>{item.name}</b>
                              <em>{item.type} · {item.status}</em>
                            </span>
                            <i>+</i>
                          </button>
                        ))}
                    </div>

                    <div className="titleStatsBlocks">
                      <div>
                        <h3>Оценки пользователей</h3>
                        {getRatingDistribution(selectedTitle.id).map((row) => (
                          <div className="ratingLine" key={row.score}>
                            <span>{row.score} ★</span>
                            <div>
                              <i style={{ width: `${row.percent}%` }}></i>
                            </div>
                            <b>{row.percent}%</b>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="listStatsTitle">В списках у {getTitleListStats(selectedTitle.id).total} человек</h3>
                        {getTitleListStats(selectedTitle.id).rows.map((row) => (
                          <div className="listLine" key={row.label}>
                            <span>{row.label}</span>
                            <div>
                              <i style={{ width: `${row.percent}%` }}></i>
                            </div>
                            <b>{row.percent}%</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {titleTab === "chapters" && (
                  <>
                    <div className="chapterTools">
                      <button onClick={() => setChaptersDesc(!chaptersDesc)}>
                        ↕ Сортировать: {chaptersDesc ? "сначала новые" : "сначала старые"}
                      </button>
                      <button>⬇ Скачать</button>
                    </div>

                    <div className="chapterList">
                      {sortedChapters(selectedTitle).map(({ chapter, realIndex }) => (
                        <button
                          key={chapter.id}
                          className="chapterRow"
                          onClick={() => startReading(selectedTitle.id, realIndex)}
                        >
                          <span className="chapterNameCell">
                            <span
                              className={`chapterEye ${
                                isChapterOpened(selectedTitle.id, realIndex) ? "chapterEyeOpen" : "chapterEyeClosed"
                              }`}
                              aria-hidden="true"
                            >
                              {isChapterOpened(selectedTitle.id, realIndex) ? "◉" : "◌"}
                            </span>
                            <span>
                              {chapter.name}
                              {chapter.subtitle ? ` - ${chapter.subtitle}` : ""}
                            </span>
                          </span>
                          <span>{chapter.date}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {titleTab === "comments" && (
                  <div className="titleCommentsPanel">
                    <div className="readerCommentTools titleCommentTools">
                      <select
                        className="commentSortSelect"
                        value={titleCommentSort}
                        onChange={(event) => setTitleCommentSort(event.target.value)}
                      >
                        <option value="new">↕ Новые</option>
                        <option value="old">Старые</option>
                        <option value="popular">Популярные</option>
                      </select>
                      <button>☷ Настройки</button>
                      <button>ПРАВИЛА</button>
                    </div>

                    {titleReplyToCommentId && (
                      <div className="replyNotice">
                        <span>Ответ на комментарий</span>
                        <button onClick={() => setTitleReplyToCommentId(null)}>×</button>
                      </div>
                    )}

                    {renderCommentEditor(
                      "title",
                      titleCommentText,
                      "Написать комментарий...",
                      "Отправить",
                      () => addTitleComment(selectedTitle.id)
                    )}

                    {(titleComments[selectedTitle.id] || []).length > 0 ? (
                      <div className="pageComments titleCommentsList">
                        {renderTitleCommentTree(titleComments[selectedTitle.id] || [], null, selectedTitle.id)}
                      </div>
                    ) : (
                      <div className="emptyPageComments">
                        Пока нет комментариев к тайтлу. Напиши первый комментарий.
                      </div>
                    )}
                  </div>
                )}
                {titleTab === "discussions" && <EmptyPanel text="Обсуждения появятся позже." />}
                {titleTab === "reviews" && <EmptyPanel text="Отзывы и оценки появятся позже." />}
              </div>
            </section>
          </div>
        )}

        {view === "mylist" && (
          <div className="panel">
            <h2>Мой список</h2>

            {myListTitles.length === 0 ? (
              <p className="muted">Пока ничего нет.</p>
            ) : (
              <div className="grid">
                {myListTitles.map((title) => (
                  <div key={title.id} className="card">
                    <img src={title.cover} alt={title.name} onClick={() => openTitle(title.id)} />

                    <div className="cardBody">
                      <h3 onClick={() => openTitle(title.id)}>{title.name}</h3>
                      <p>{myList[title.id]}</p>
                      <button onClick={() => removeFromList(title.id)}>Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "suggest" && (
          <div className="createTitlePage">
            {!session ? (
              <div className="panel">
                <h2>Создание тайтла</h2>
                <p className="muted">Сначала войди или зарегистрируйся.</p>

                <div className="row">
                  <button onClick={() => setView("login")}>Вход</button>
                  <button onClick={() => setView("register")}>Регистрация</button>
                </div>
              </div>
            ) : (
              <form className="createTitleForm" onSubmit={submitSuggestion}>
                <h2>Создание тайтла</h2>

                <div className="createUploadStack">
                  <label className="createUploadLabel">Обложка</label>
                  <label className="createUploadBox createCoverUpload">
                    <input type="file" accept="image/*" onChange={(event) => handleSuggestImageUpload(event, "cover")} />
                    {suggestForm.cover ? <img src={suggestForm.cover} alt="cover" /> : <span>☁<br />Нажмите или перетащите изображение</span>}
                  </label>

                  <label className="createUploadLabel">Фон</label>
                  <label className="createUploadBox createBgUpload">
                    <input type="file" accept="image/*" onChange={(event) => handleSuggestImageUpload(event, "background")} />
                    {suggestForm.background ? <img src={suggestForm.background} alt="background" /> : <span>☁<br />Нажмите или перетащите изображение</span>}
                  </label>
                </div>

                <label className="createField">
                  Оригинальное название (без иероглифов)
                  <input value={suggestForm.originalName} onChange={(event) => updateSuggestField("originalName", event.target.value)} />
                </label>

                <label className="createField">
                  Название на русском
                  <input value={suggestForm.russianName} onChange={(event) => updateSuggestField("russianName", event.target.value)} />
                </label>

                <label className="createField">
                  Название на английском
                  <input value={suggestForm.englishName} onChange={(event) => updateSuggestField("englishName", event.target.value)} />
                </label>

                <label className="createField">
                  Альтернативные названия
                  <textarea value={suggestForm.altNames} onChange={(event) => updateSuggestField("altNames", event.target.value)} />
                </label>

                <div className="createGrid4">
                  <label className="createField">Тип
                    <select value={suggestForm.type} onChange={(event) => updateSuggestField("type", event.target.value)}>
                      <option>Манга</option><option>Манхва</option><option>Маньхуа</option><option>Руманга</option><option>Комикс</option>
                    </select>
                  </label>
                  <label className="createField">Статус тайтла
                    <select value={suggestForm.status} onChange={(event) => updateSuggestField("status", event.target.value)}>
                      <option>Онгоинг</option><option>Завершён</option><option>Анонс</option><option>Приостановлен</option><option>Выпуск прекращён</option>
                    </select>
                  </label>
                  <label className="createField">Год релиза
                    <input value={suggestForm.year} onChange={(event) => updateSuggestField("year", event.target.value)} />
                  </label>
                  <label className="createField">Страна
                    <input value={suggestForm.country} onChange={(event) => updateSuggestField("country", event.target.value)} placeholder="Скоро добавим" disabled />
                  </label>
                </div>

                <div className="createGrid3">
                  <label className="createField">Возрастное ограничение
                    <select value={suggestForm.age} onChange={(event) => updateSuggestField("age", event.target.value)}>
                      <option>Нет</option><option>12+</option><option>16+</option><option>18+ (RX)</option>
                    </select>
                  </label>
                  <label className="createField">Статус перевода
                    <select value={suggestForm.translation} onChange={(event) => updateSuggestField("translation", event.target.value)}>
                      <option>Продолжается</option><option>Завершён</option><option>Заморожен</option><option>Заброшен</option>
                    </select>
                  </label>
                  <label className="createField">Загрузка глав
                    <select value={suggestForm.uploadMode} onChange={(event) => updateSuggestField("uploadMode", event.target.value)}>
                      <option>Создатель и переводчики</option><option>Только создатель</option><option>Любой пользователь после модерации</option>
                    </select>
                  </label>
                </div>

                <div className="createSection">
                  <h3>Маркировка</h3>
                  <label><input type="checkbox" checked={suggestForm.noMarking} onChange={() => updateSuggestField("noMarking", !suggestForm.noMarking)} /> Не требует маркировки</label>
                  <label><input type="checkbox" checked={suggestForm.obscene} onChange={() => updateSuggestField("obscene", !suggestForm.obscene)} /> Содержит нецензурную брань</label>
                  <label><input type="checkbox" checked={suggestForm.drugs} onChange={() => updateSuggestField("drugs", !suggestForm.drugs)} /> Содержит упоминание наркотиков</label>
                </div>

                {[
                  ["format", "Формат выпуска", "Добавить формат"],
                  ["publisher", "Издатель", "Добавить издателя"],
                  ["author", "Автор", "Добавить автора"],
                  ["artist", "Художник", "Добавить художника"],
                  ["genres", "Жанры", "Добавить жанр"],
                  ["tags", "Теги", "Добавить тег"],
                  ["team", "Команды", "Добавить команду"],
                  ["voiceTeam", "Команды озвучки", "Добавить команду озвучки"],
                  ["franchise", "Франшизы / фэндом / фандом", "Добавить франшизу"],
                  ["sourceLinks", "Ссылки на оригинал, анлейт, прочие базы данных (помогает модерации)", "Добавить ссылку"],
                ].map(([field, label, prompt]) => renderCreateAddLine(field, label, prompt))}

                <div className="createDescriptionBox">
                  <div className="createDescriptionToolbar">
                    <button type="button">B</button><button type="button"><i>I</i></button><button type="button"><u>U</u></button>
                    <span></span><button type="button">1≡</button><button type="button">≡</button><span></span><button type="button">”</button>
                  </div>
                  <textarea value={suggestForm.description} onChange={(event) => updateSuggestField("description", event.target.value)} placeholder="Описание, примечания для модерации" />
                </div>

                <div className="createSubmitRow">
                  <button className="createSubmitButton">Создать</button>
                  <span>Ваш тайтл отправится на модерацию</span>
                  {suggestMessage && <b>{suggestMessage}</b>}
                </div>
              </form>
            )}
          </div>
        )}



        {view === "team" && selectedTeam && (
          <div className="teamPageView">
            <section
              className="teamHero"
              style={
                selectedTeam.background
                  ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.78)), url("${selectedTeam.background}")` }
                  : undefined
              }
            >
              <div className="teamHeroContent">
                <div className="teamPageAvatar">
                  {selectedTeam.cover ? <img src={selectedTeam.cover} alt={selectedTeam.name} /> : selectedTeam.name.slice(0, 1).toUpperCase()}
                </div>

                <div className="teamPageInfo">
                  <h2>{selectedTeam.name}</h2>
                  {selectedTeam.isRepresentative && <span className="teamBadge">Интеграция</span>}
                  <div className="teamStatsLine">
                    <b>{selectedTeam.titlesCount || 0}</b><span>Тайтлов</span>
                    <b>{formatCompactNumber(selectedTeam.likesCount || 0)}</b><span>Лайков</span>
                    <b>{selectedTeam.chaptersCount || 0}</b><span>Глав</span>
                    <b>{selectedTeam.chaptersPerMonth || 0}</b><span>Глав / мес</span>
                    <b>{selectedTeam.followersCount || 1}</b><span>Подписчиков</span>
                  </div>
                </div>

                <div className="teamHeroActions">
                  <button className="teamRoundAction" title="Редактировать" onClick={() => openTeamEdit(selectedTeam.id)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 20h4.4L19.7 8.7a2.1 2.1 0 0 0 0-3l-1.4-1.4a2.1 2.1 0 0 0-3 0L4 15.6V20Zm2-2v-1.6l10.7-10.7 1.6 1.6L7.6 18H6Z" />
                    </svg>
                  </button>
                  <button className="teamNotifyButton">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 22a2.4 2.4 0 0 0 2.35-2h-4.7A2.4 2.4 0 0 0 12 22Zm7-5.2L17.5 15V10c0-3.1-1.65-5.65-4.5-6.32V3a1 1 0 1 0-2 0v.68C8.15 4.35 6.5 6.9 6.5 10v5L5 16.8V18h14v-1.2Z" />
                    </svg>
                    Увед. включены
                  </button>
                  <button>Добавить в игнор</button>
                </div>
              </div>

              {selectedTeam.description && <p className="teamPageDescription" dangerouslySetInnerHTML={{ __html: sanitizeCommentHtml(selectedTeam.description) }} />}
            </section>

            <div className="teamPageTabs">
              <button className="activeTab">Тайтлы</button>
              <button>Обновления</button>
            </div>

            <section className="teamPageBody">
              <div className="teamTitlesPanel">
                <input className="teamSearchInput" placeholder="Поиск по названию" />
                <div className="teamEmptyTitles">
                  <h3>У команды пока нет тайтлов</h3>
                  <p>Когда команда начнёт добавлять переводы, они появятся здесь.</p>
                </div>
              </div>

              <aside className="teamMembersPanel">
                <h3>Участники</h3>
                {getTeamMembers(selectedTeam).map((member) => (
                  <button className="teamMemberRow" key={member.id}>
                    <span className="teamMemberAvatar">{member.avatar ? <img src={member.avatar} alt={member.name} /> : member.name.slice(0, 1).toUpperCase()}</span>
                    <span>
                      <b>{member.name}</b>
                      <small>{member.role}</small>
                    </span>
                  </button>
                ))}
              </aside>
            </section>
          </div>
        )}

        {view === "teamEdit" && selectedTeam && (
          <div className="teamEditPage">
            <aside className="teamEditSidebar">
              {[
                ["info", "Информация"],
                ["members", "Участники"],
                ["warnings", "Предупреждения"],
                ["ignored", "Игнор-лист"],
                ["stats", "Статистика"],
                ["money", "Монетизация"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={teamEditTab === id ? "activeSettings" : ""}
                  onClick={() => {
                    setTeamEditTab(id);
                    setTeamMemberSearchOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </aside>

            {teamEditTab === "info" && (
              <form className="teamEditPanel" onSubmit={saveTeamEdit}>
                <div className="teamEditCrumbs">
                  <button type="button" onClick={() => openTeam(selectedTeam.id)}>{selectedTeam.name}</button>
                  <span>/</span>
                  <b>Редактирование</b>
                </div>

                <div className="teamEditImagesRow">
                  <div>
                    <label className="createUploadLabel">Обложка</label>
                    <div className="teamEditImagePair">
                      <label className="createUploadBox createCoverUpload">
                        <input type="file" accept="image/*" onChange={(event) => handleTeamImageUpload(event, "cover")} />
                        <span>☁<br />Нажмите или перетащите изображение</span>
                      </label>
                      {teamForm.cover && (
                        <div className="teamEditPreview teamEditCoverPreview">
                          <button type="button" onClick={() => updateTeamField("cover", "")}>🗑</button>
                          <img src={teamForm.cover} alt="team cover preview" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="createUploadLabel">Фон</label>
                    <div className="teamEditImagePair teamEditBgPair">
                      <label className="createUploadBox createBgUpload">
                        <input type="file" accept="image/*" onChange={(event) => handleTeamImageUpload(event, "background")} />
                        <span>☁<br />Нажмите или перетащите изображение</span>
                      </label>
                      {teamForm.background && (
                        <div className="teamEditPreview teamEditBgPreview">
                          <button type="button" onClick={() => updateTeamField("background", "")}>🗑</button>
                          <img src={teamForm.background} alt="team background preview" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <label className="createField">
                  Название
                  <input value={teamForm.name} onChange={(event) => updateTeamField("name", event.target.value)} />
                </label>

                <label className="createField">
                  Другие названия (служат для поиска)
                  <textarea
                    value={teamForm.altNames}
                    onChange={(event) => updateTeamField("altNames", event.target.value)}
                    placeholder="Разделяйте их слэшем /"
                  />
                </label>

                <div className="createGrid3">
                  <label className="createField">
                    Группа VK
                    <input value={teamForm.vk} onChange={(event) => updateTeamField("vk", event.target.value)} />
                  </label>
                  <label className="createField">
                    Discord
                    <input value={teamForm.discord} onChange={(event) => updateTeamField("discord", event.target.value)} />
                  </label>
                  <label className="createField">
                    Сайт
                    <input value={teamForm.site} onChange={(event) => updateTeamField("site", event.target.value)} />
                  </label>
                </div>

                <label className="createField">
                  Описание
                  {renderTeamDescriptionEditor(teamForm.description, "Описание команды...")}
                </label>

                <label className="representativeCheckbox">
                  <input
                    type="checkbox"
                    checked={teamForm.isRepresentative}
                    onChange={(event) => updateTeamField("isRepresentative", event.target.checked)}
                  />
                  Я являюсь представителем команды
                </label>

                <div className="teamEditFooter">
                  <button className="createSubmitButton">Сохранить</button>
                  <button type="button" className="createCancelButton" onClick={() => openTeam(selectedTeam.id)}>Назад</button>
                  {teamMessage && <b>{teamMessage}</b>}
                </div>
              </form>
            )}

            {teamEditTab === "members" && (
              <section className="teamEditPanel teamMembersManagePanel">
                <div className="teamEditCrumbs">
                  <button type="button" onClick={() => openTeam(selectedTeam.id)}>{selectedTeam.name}</button>
                  <span>/</span>
                  <b>Редактирование</b>
                </div>

                <button
                  type="button"
                  className="teamAddMemberButton"
                  onClick={() => {
                    setTeamMemberSearchOpen(true);
                    setTeamMemberQuery("");
                  }}
                >
                  <span>＋</span> Добавить пользователя
                </button>

                <div className="teamMemberManageList">
                  {getTeamMembers(selectedTeam).map((member) => {
                    const memberRoles = Array.isArray(member.roles) && member.roles.length > 0 ? member.roles : [member.role || "Участник"];
                    return (
                      <article className="teamMemberManageRow" key={member.id}>
                        <span className="teamMemberAvatar bigTeamMemberAvatar">
                          {member.avatar ? <img src={member.avatar} alt={member.name} /> : member.name.slice(0, 1).toUpperCase()}
                        </span>

                        <div className="teamMemberManageInfo">
                          <b>{member.name}</b>
                          <div className="teamMemberRolesLine">
                            {memberRoles.map((role) => <span key={role}>{role}</span>)}
                          </div>
                          <p>{(member.permissions || []).join(" | ")}</p>
                        </div>

                        <div className="teamMemberManageActions">
                          <button type="button" title="Редактировать роли" onClick={() => setEditingTeamMemberId(member.id)}>✎</button>
                          <button
                            type="button"
                            title="Удалить участника"
                            onClick={() => setDeleteTeamMemberId(member.id)}
                          >
                            🗑
                          </button>
                          <button type="button" title="Ещё">☰</button>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="teamEditFooter teamMembersFooter">
                  <button type="button" className="dangerGhostButton">Покинуть команду</button>
                </div>

                {teamMemberSearchOpen && (
                  <div className="teamUserSearchOverlay" onClick={() => setTeamMemberSearchOpen(false)}>
                    <div className="teamUserSearchModal" onClick={(event) => event.stopPropagation()}>
                      <div className="teamUserSearchTop">
                        <span>⌕</span>
                        <input
                          autoFocus
                          value={teamMemberQuery}
                          onChange={(event) => setTeamMemberQuery(event.target.value)}
                          placeholder="Поиск пользователя"
                        />
                        <button type="button" onClick={() => setTeamMemberSearchOpen(false)}>×</button>
                      </div>

                      <div className="teamUserSearchResults">
                        {teamMemberQuery.trim().length < 2 ? (
                          <p>Введите минимум 2 символа, чтобы найти пользователя.</p>
                        ) : (() => {
                          const foundUsers = teamCandidateUsers().filter((user) =>
                            user.name.toLowerCase().includes(teamMemberQuery.trim().toLowerCase())
                          );

                          if (foundUsers.length === 0) return <p>Пользователи не найдены.</p>;

                          return foundUsers.map((user) => {
                            const alreadyInTeam = getTeamMembers(selectedTeam).some((member) => member.id === user.id);

                            return (
                              <button
                                key={user.id}
                                type="button"
                                className={alreadyInTeam ? "teamUserAlreadyAdded" : ""}
                                disabled={alreadyInTeam}
                                onClick={() => addMemberToSelectedTeam(user)}
                              >
                                <span className="teamMemberAvatar">
                                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.slice(0, 1).toUpperCase()}
                                </span>
                                <b>{user.name}</b>
                                <small>{alreadyInTeam ? "Уже в команде" : "Добавить в команду"}</small>
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {editingTeamMemberId && (() => {
                  const member = getTeamMembers(selectedTeam).find((item) => item.id === editingTeamMemberId);
                  if (!member) return null;
                  const memberRoles = Array.isArray(member.roles) && member.roles.length > 0 ? member.roles : [member.role || "Участник"];
                  const memberPermissions = Array.isArray(member.permissions) ? member.permissions : [];

                  return (
                    <div className="teamMemberModalOverlay" onClick={() => setEditingTeamMemberId(null)}>
                      <div className="teamMemberRolesModal" onClick={(event) => event.stopPropagation()}>
                        <button className="teamMemberModalClose" type="button" onClick={() => setEditingTeamMemberId(null)}>×</button>
                        <div className="teamMemberModalUser">
                          <span className="teamMemberAvatar">
                            {member.avatar ? <img src={member.avatar} alt={member.name} /> : member.name.slice(0, 1).toUpperCase()}
                          </span>
                          <b>{member.name}</b>
                        </div>

                        <h4>Роли</h4>
                        <div className="teamMemberModalGrid">
                          {TEAM_ROLE_OPTIONS.map((role) => (
                            <label key={role}>
                              <input type="checkbox" checked={memberRoles.includes(role)} onChange={() => toggleTeamMemberRole(member.id, role)} />
                              <span>{role}</span>
                            </label>
                          ))}
                        </div>

                        <h4>Права</h4>
                        <div className="teamMemberModalGrid permissionsGrid">
                          {TEAM_PERMISSION_OPTIONS.map((permission) => (
                            <label key={permission}>
                              <input type="checkbox" checked={memberPermissions.includes(permission)} onChange={() => toggleTeamMemberPermission(member.id, permission)} />
                              <span>{permission}</span>
                            </label>
                          ))}
                        </div>

                        <button type="button" className="teamMemberSaveButton" onClick={() => setEditingTeamMemberId(null)}>Сохранить</button>
                      </div>
                    </div>
                  );
                })()}

                {deleteTeamMemberId && (() => {
                  const member = getTeamMembers(selectedTeam).find((item) => item.id === deleteTeamMemberId);
                  if (!member) return null;

                  return (
                    <div className="teamMemberModalOverlay" onClick={() => setDeleteTeamMemberId(null)}>
                      <div className="teamMemberDeleteModal" onClick={(event) => event.stopPropagation()}>
                        <button className="teamMemberModalClose" type="button" onClick={() => setDeleteTeamMemberId(null)}>×</button>
                        <h3>Подтвердите действие</h3>
                        <p>Вы действительно хотите удалить пользователя «{member.name}» из команды?</p>
                        <div className="teamMemberDeleteActions">
                          <button type="button" onClick={() => setDeleteTeamMemberId(null)}>Отменить</button>
                          <button type="button" onClick={() => { removeMemberFromSelectedTeam(member.id); setDeleteTeamMemberId(null); }}>Удалить</button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </section>
            )}

            {!['info', 'members'].includes(teamEditTab) && (
              <section className="teamEditPanel teamStubPanel">
                <div className="teamEditCrumbs">
                  <button type="button" onClick={() => openTeam(selectedTeam.id)}>{selectedTeam.name}</button>
                  <span>/</span>
                  <b>{teamEditTab === "warnings" ? "Предупреждения" : teamEditTab === "ignored" ? "Игнор-лист" : teamEditTab === "stats" ? "Статистика" : "Монетизация"}</b>
                </div>
                <div className="teamEmptyTitles">
                  <h3>Раздел пока пустой</h3>
                  <p>Эту часть подключим следующим шагом.</p>
                </div>
              </section>
            )}
          </div>
        )}


        {view === "createTeam" && (
          <div className="createTitlePage createTeamPage">
            {!session ? (
              <div className="panel">
                <h2>Создание команды</h2>
                <p className="muted">Сначала войди или зарегистрируйся.</p>

                <div className="row">
                  <button onClick={() => setView("login")}>Вход</button>
                  <button onClick={() => setView("register")}>Регистрация</button>
                </div>
              </div>
            ) : (
              <form className="createTitleForm createTeamForm" onSubmit={submitTeam}>
                <h2>Создание команды</h2>

                <div className="createUploadStack">
                  <label className="createUploadLabel">Обложка</label>
                  <label className="createUploadBox createCoverUpload">
                    <input type="file" accept="image/*" onChange={(event) => handleTeamImageUpload(event, "cover")} />
                    {teamForm.cover ? <img src={teamForm.cover} alt="team cover" /> : <span>☁<br />Нажмите или перетащите изображение</span>}
                  </label>

                  <label className="createUploadLabel">Фон</label>
                  <label className="createUploadBox createBgUpload">
                    <input type="file" accept="image/*" onChange={(event) => handleTeamImageUpload(event, "background")} />
                    {teamForm.background ? <img src={teamForm.background} alt="team background" /> : <span>☁<br />Нажмите или перетащите изображение</span>}
                  </label>
                </div>

                <label className="createField">
                  Название
                  <input value={teamForm.name} onChange={(event) => updateTeamField("name", event.target.value)} />
                </label>

                <label className="createField">
                  Другие названия (служат для поиска)
                  <textarea
                    value={teamForm.altNames}
                    onChange={(event) => updateTeamField("altNames", event.target.value)}
                    placeholder="Разделяйте их слэшем /"
                  />
                </label>

                <div className="createGrid3">
                  <label className="createField">
                    Группа VK
                    <input value={teamForm.vk} onChange={(event) => updateTeamField("vk", event.target.value)} />
                  </label>

                  <label className="createField">
                    Discord
                    <input value={teamForm.discord} onChange={(event) => updateTeamField("discord", event.target.value)} />
                  </label>

                  <label className="createField">
                    Сайт
                    <input value={teamForm.site} onChange={(event) => updateTeamField("site", event.target.value)} />
                  </label>
                </div>

                <label className="createField">
                  Описание
                  {renderTeamDescriptionEditor(teamForm.description, "Описание команды...")}
                </label>

                <label className="representativeCheckbox">
                  <input
                    type="checkbox"
                    checked={teamForm.isRepresentative}
                    onChange={(event) => updateTeamField("isRepresentative", event.target.checked)}
                  />
                  Я являюсь представителем команды
                </label>

                <div className="createSubmitRow">
                  <button className="createSubmitButton">Создать</button>
                  <button type="button" className="createCancelButton" onClick={() => setView("catalog")}>Отмена</button>
                  {teamMessage && <b>{teamMessage}</b>}
                </div>
              </form>
            )}
          </div>
        )}

        {view === "mySubmissions" && session && (
          <div className="panel mySubmissionsPage">
            <h2>Мои добавления</h2>
            <p className="muted">Здесь будут заявки на тайтлы, команды, авторов и другие сущности после подключения модерации.</p>
            <div className="emptyContinueBox">
              <h3>Пока заявок нет</h3>
              <p>Нажми “+” → “Добавить тайтл”, заполни форму, и заявка появится здесь.</p>
            </div>
          </div>
        )}


        {view === "notifications" && session && (
          <div className="notificationsPage">
            <aside className="notificationsSidebar">
              <div className="notificationsFilterTitle">Фильтр</div>
              <button className="activeListFilter">
                <span className="radioDotActive"></span> Все
              </button>
              <button>
                <span className="radioDot"></span> Непрочитанные
              </button>
              <button>
                <span className="radioDot"></span> Прочитанные
              </button>

              <div className="notificationsFilterTitle withLine">Сортировка</div>
              <button className="activeListFilter">
                <span className="radioDotActive"></span> Сначала новые
              </button>
              <button>
                <span className="radioDot"></span> Сначала старые
              </button>
            </aside>

            <section className="notificationsMainPage">
              <div className="notificationsTabs">
                <button className="activeTab">Все <span>{notifications.length}</span></button>
                <button>Главы <span>{notifications.filter((item) => item.title.includes("глава") || item.title.includes("Глава")).length}</span></button>
                <button>Эпизоды <span>0</span></button>
                <button>Ответы <span>0</span></button>
                <button>Личка <span>0</span></button>
                <button>Карты <span>0</span></button>
                <button>Другое <span>{notifications.length}</span></button>
              </div>

              <div className="notificationsSearchLine">
                <span>⌕</span>
                <input placeholder="Фильтр по тайтлу" />
              </div>

              <div className="notificationsFeed">
                {notifications.map((item) => (
                  <button key={item.id} type="button" className="notificationFeedItem notificationFeedButton" onClick={() => openNotificationItem(item)}>
                    <NotificationAvatar item={item} />
                    <div>
                      <div className="notificationFeedTop">
                        <b>{item.title}</b>
                        <span>{timeAgo(item.createdAt, item.time)}</span>
                      </div>
                      <p>{notificationText(item)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === "profileComments" && session && (
          <div className="profileFeedPage">
            <aside className="profileFeedSidebar">
              <div className="notificationsFilterTitle">Фильтр</div>
              <button className="activeListFilter"><span className="radioDotActive"></span> Все</button>
              <button><span className="radioDot"></span> К тайтлу</button>
              <button><span className="radioDot"></span> К главе</button>
              <button><span className="radioDot"></span> К отзыву</button>
              <div className="notificationsFilterTitle withLine">Сортировка</div>
              <button className="activeListFilter"><span className="radioDotActive"></span> По времени</button>
              <button><span className="radioDot"></span> По рейтингу</button>
              <button><span className="radioDotActive"></span> По убыванию</button>
              <button><span className="radioDot"></span> По возрастанию</button>
            </aside>

            <section className="profileFeedMain">
              <div className="profileFeedTopTabs">
                <button onClick={() => setView("profile")}>Тайтлы</button>
                <button className="activeTab">Комментарии</button>
                <button>Коллекции</button>
                <button>Отзывы</button>
                <button>Избранное</button>
                <button onClick={() => openFriendsPage("friends")}>Друзья</button>
                <button onClick={() => setView("profileStats")}>Статистика</button>
                <button onClick={() => setView("viewHistory")}>История просмотров</button>
              </div>

              <div className="profileFeedSearch">
                <span>⌕</span>
                <input
                  value={profileCommentQuery}
                  onChange={(event) => setProfileCommentQuery(event.target.value)}
                  placeholder="Текст комментария"
                />
              </div>

              <div className="profileCommentFeed">
                {profileCommentItems.length === 0 ? (
                  <div className="emptyProfileList">
                    <h3>{profileCommentQuery.trim() ? "Ничего не удалось найти" : "Комментариев пока нет"}</h3>
                    <p>{profileCommentQuery.trim() ? "Попробуй другой текст." : "Здесь будут все комментарии, которые ты писал."}</p>
                  </div>
                ) : (
                  pagedProfileCommentItems.map((item) => (
                    <div key={item.id} className="profileCommentItem">
                      <div className="profileCommentItemContext">
                        {item.type}: <button onClick={() => openTitle(item.titleId)}>{item.titleName}</button>
                        {item.chapterName && <span> · {item.chapterName}</span>}
                      </div>
                      <div className="profileCommentAuthorRow">
                        <span className="profileCommentMiniAvatar">{profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}</span>
                        <b>{usernameFromSession()}</b>
                        <span>{timeAgo(item.createdAt, item.time)}</span>
                      </div>
                      <p>{plainTextFromHtml(item.text)}</p>
                      <button type="button" className="profileCommentDelete" onClick={() => deleteProfileComment(item)}>удалить</button>
                    </div>
                  ))
                )}
              </div>

              {profileCommentItems.length > PROFILE_COMMENTS_PER_PAGE && (
                <div className="profileCommentPagination">
                  <button
                    type="button"
                    onClick={() => setProfileCommentPage((page) => Math.max(1, page - 1))}
                    disabled={safeProfileCommentPage <= 1}
                  >
                    ←
                  </button>
                  {Array.from({ length: profileCommentTotalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={page === safeProfileCommentPage ? "activePage" : ""}
                      onClick={() => setProfileCommentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProfileCommentPage((page) => Math.min(profileCommentTotalPages, page + 1))}
                    disabled={safeProfileCommentPage >= profileCommentTotalPages}
                  >
                    →
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {view === "viewHistory" && session && (
          <div className="profileFeedPage historyOnlyPage">
            <section className="profileFeedMain historyFeedMain">
              <div className="profileFeedTopTabs">
                <button onClick={() => setView("profile")}>Тайтлы</button>
                <button onClick={() => setView("profileComments")}>Комментарии</button>
                <button>Коллекции</button>
                <button>Отзывы</button>
                <button>Избранное</button>
                <button onClick={() => openFriendsPage("friends")}>Друзья</button>
                <button onClick={() => setView("profileStats")}>Статистика</button>
                <button className="activeTab">История просмотров</button>
              </div>

              {profileHistoryItems.length === 0 ? (
                <div className="emptyProfileList">
                  <h3>История просмотров пуста</h3>
                  <p>Открой любую главу — она появится здесь.</p>
                </div>
              ) : (
                <div className="historyGrid">
                  {profileHistoryItems.map((item) => (
                    <button key={item.key} className="historyItem" onClick={() => startReading(item.titleId, item.chapterIndex)}>
                      <img src={item.title.cover} alt={item.title.name} />
                      <span>
                        <b>{item.title.name}</b>
                        <small>{item.chapter.name}</small>
                        <em>{item.pageIndex + 1} из {item.totalPages} страниц</em>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {view === "settings" && session && (
          <div className="settingsPage">
            <aside className="settingsSidebar">
              <button
                className={settingsTab === "profile" ? "activeSettings" : ""}
                onClick={() => setSettingsTab("profile")}
              >
                Профиль
              </button>
              <button
                className={settingsTab === "notifications" ? "activeSettings" : ""}
                onClick={() => setSettingsTab("notifications")}
              >
                Уведомления
              </button>
              <button>Приватность</button>
              <button>Игнор-лист</button>
              <button>Фильтр контента</button>
              <button>Безопасность и вход</button>
              <button>Персонализация</button>
              <button>Платежи</button>
            </aside>

            <section className="settingsMain">
              {settingsTab === "profile" && (
                <form onSubmit={saveProfile} className="profileEditForm">
                  <div className="settingsGrid2">
                    <div className="settingsCard">
                      <h3>Аватар</h3>

                      <div className="imageEditRow">
                        <label className="uploadBox">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageUpload(event, "avatar")}
                          />
                          <span>Нажми или перетащи изображение</span>
                        </label>

                        <div className="avatarPreview">
                          {profileDraft.avatar ? (
                            <>
                              <img src={profileDraft.avatar} alt="avatar preview" />
                              <button
                                type="button"
                                className="deleteImage"
                                onClick={() => removeProfileImage("avatar")}
                              >
                                ×
                              </button>
                            </>
                          ) : (
                            <span>Нет аватара</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="settingsCard">
                      <h3>Рамка аватара</h3>

                      <div className="imageEditRow">
                        <div className="uploadBox disabledUpload">
                          <span>Рамки добавим позже</span>
                        </div>

                        <div className="avatarPreview">
                          {profileDraft.avatar ? (
                            <img src={profileDraft.avatar} alt="avatar frame preview" />
                          ) : (
                            <span>Нет аватара</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settingsCard">
                    <h3>Фон профиля</h3>

                    <div className="bannerEditRow">
                      <label className="uploadBox bannerUpload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, "banner")}
                        />
                        <span>Нажми или перетащи изображение</span>
                      </label>

                      <div className="bannerPreview">
                        {profileDraft.banner ? (
                          <>
                            <img src={profileDraft.banner} alt="banner preview" />
                            <button
                              type="button"
                              className="deleteImage"
                              onClick={() => removeProfileImage("banner")}
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <span>Баннер не выбран</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="settingsCard">
                    <h3>Информация</h3>

                    <label className="fieldLabel">
                      Никнейм
                      <input
                        value={profileDraft.nickname}
                        onChange={(event) =>
                          setProfileDraft({ ...profileDraft, nickname: event.target.value })
                        }
                        placeholder="Твой ник"
                      />
                    </label>

                    <label className="fieldLabel">
                      Пол
                      <select
                        value={profileDraft.gender}
                        onChange={(event) =>
                          setProfileDraft({ ...profileDraft, gender: event.target.value })
                        }
                      >
                        <option>Не указан</option>
                        <option>Мужской</option>
                        <option>Женский</option>
                        <option>Другое</option>
                      </select>
                    </label>

                    <label className="fieldLabel">
                      О себе
                      <textarea
                        value={profileDraft.about}
                        onChange={(event) =>
                          setProfileDraft({ ...profileDraft, about: event.target.value })
                        }
                        placeholder="Расскажи что-нибудь о себе"
                      />
                    </label>

                    <div className="saveRow">
                      <button className="saveButton">Сохранить</button>
                      {profileMessage && <span>{profileMessage}</span>}
                    </div>
                  </div>
                </form>
              )}

              {settingsTab === "notifications" && (
                <div className="notificationSettingsPage">
                  <div className="settingsCard notificationBrowserCard">
                    <div>
                      <h3>Браузерные уведомления</h3>
                      <p>Разреши браузеру показывать уведомления Akari даже когда вкладка не активна.</p>
                    </div>
                    <button type="button" className="saveButton" onClick={setupBrowserNotifications}>
                      {notificationSettings.browserEnabled ? "Включено" : "Настроить"}
                    </button>
                  </div>

                  <div className="settingsCard notificationSettingsCard">
                    <h3>Прочее</h3>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.completedFromList)}
                        onChange={() => toggleNotificationSetting("completedFromList")}
                      />
                      <span>Оповещать о «Завершение» тайтла из моих списков</span>
                    </label>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.newTitles)}
                        onChange={() => toggleNotificationSetting("newTitles")}
                      />
                      <span>Оповещать о добавлении новых тайтлов на сайте</span>
                    </label>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.friendRequests)}
                        onChange={() => toggleNotificationSetting("friendRequests")}
                      />
                      <span>Оповещать о заявках в друзья</span>
                    </label>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.oldCommentRepliesOff)}
                        onChange={() => toggleNotificationSetting("oldCommentRepliesOff")}
                      />
                      <span>Отключить уведомления на старые комментарии</span>
                      <em>Старше недели</em>
                    </label>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.earlyAccessChaptersOff)}
                        onChange={() => toggleNotificationSetting("earlyAccessChaptersOff")}
                      />
                      <span>Отключить уведомления о главах с ранним доступом</span>
                    </label>

                    <label className="notificationCheckRow">
                      <input
                        type="checkbox"
                        checked={Boolean(notificationSettings.cardsOff)}
                        onChange={() => toggleNotificationSetting("cardsOff")}
                      />
                      <span>Отключить уведомления о получении карточек</span>
                    </label>

                    <div className="notificationSaveRow">
                      <button type="button" onClick={saveNotificationSettings}>Сохранить</button>
                      {notificationSettingsMessage && <span>{notificationSettingsMessage}</span>}
                    </div>
                  </div>

                  <div className="settingsCard notificationSettingsCard">
                    <h3>Уведомления из списков</h3>

                    <div className="notificationListGrid">
                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listReading)}
                          onChange={() => toggleNotificationSetting("listReading")}
                        />
                        <span>Читаю</span>
                      </label>

                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listPlanning)}
                          onChange={() => toggleNotificationSetting("listPlanning")}
                        />
                        <span>В планах</span>
                      </label>

                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listDropped)}
                          onChange={() => toggleNotificationSetting("listDropped")}
                        />
                        <span>Брошено</span>
                      </label>

                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listCompleted)}
                          onChange={() => toggleNotificationSetting("listCompleted")}
                        />
                        <span>Прочитано</span>
                      </label>

                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listFavorite)}
                          onChange={() => toggleNotificationSetting("listFavorite")}
                        />
                        <span>Любимые</span>
                      </label>

                      <label className="notificationCheckRow">
                        <input
                          type="checkbox"
                          checked={Boolean(notificationSettings.listEveryFewDays)}
                          onChange={() => toggleNotificationSetting("listEveryFewDays")}
                        />
                        <span>Каждые 3-4 дня</span>
                      </label>
                    </div>

                    <div className="notificationSaveRow">
                      <button type="button" onClick={saveNotificationSettings}>Сохранить</button>
                      {notificationSettingsMessage && <span>{notificationSettingsMessage}</span>}
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {view === "settings" && !session && (
          <div className="panel">
            <h2>Настройки</h2>
            <p className="muted">Сначала войди в аккаунт.</p>
          </div>
        )}

        {view === "profileStats" && session && (
          <div className="profilePage profileStatsPage">
            <div
              className="profileBanner"
              style={
                profile.banner
                  ? {
                      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.12)), url("${profile.banner}")`,
                    }
                  : undefined
              }
            ></div>

            <div className="profileHeader">
              <div className="profileAvatarBig">
                {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}
              </div>

              <div className="profileMainInfo">
                <h2>{usernameFromSession()}</h2>
                <span>Уровень 1 · Топ #Не определён</span>
                {profile.about && <p className="profileAbout">{profile.about}</p>}
              </div>

              <div className="profileHeaderActions">
                <button
                  onClick={() => {
                    setSettingsTab("profile");
                    setView("settings");
                  }}
                >
                  ⚙ Настройки
                </button>
              </div>
            </div>

            <div className="profileTabs">
              <button onClick={() => setView("profile")}>Тайтлы</button>
              <button onClick={() => setView("profileComments")}>Комментарии</button>
              <button>Коллекции</button>
              <button>Карты</button>
              <button>Отзывы</button>
              <button>Избранное</button>
              <button onClick={() => openFriendsPage("friends")}>Друзья</button>
              <button className="activeTab">Статистика</button>
              <button onClick={() => setView("viewHistory")}>История просмотров</button>
              <button>•••</button>
            </div>

            <section className="profileStatsToolbar">
              <span>СТАТИСТИКА</span>

              <div className="profileStatsControls">
                <select value={statsPeriod} onChange={(event) => setStatsPeriod(event.target.value)}>
                  <option value="7">7 дней</option>
                  <option value="30">30 дней</option>
                  <option value="365">1 год</option>
                </select>

                <select value={statsChartType} onChange={(event) => setStatsChartType(event.target.value)}>
                  <option value="line">Линейный график</option>
                  <option value="bars">Столбцы</option>
                </select>
              </div>
            </section>

            <section className="profileStatsCards">
              <div>
                <span>Прочитано глав манги</span>
                <b>{profileStats.mangaChapters}</b>
                <small>{profileStats.totalMinutes} минут</small>
              </div>

              <div>
                <span>Прочитано глав ранобэ</span>
                <b>{profileStats.ranobeChapters}</b>
                <small>0 минут</small>
              </div>

              <div>
                <span>Просмотрено серий аниме</span>
                <b>{profileStats.animeEpisodes}</b>
                <small>0 минут</small>
              </div>
            </section>

            <section className="profileStatsTotal">
              <span>Всего времени</span>
              <b>{profileStats.totalMinutes} минут</b>
            </section>

            <section className="profileStatsGraphCard">
              <h3>АКТИВНОСТЬ ЗА {statsPeriod} ДНЕЙ</h3>

              <div className={`profileStatsGraph ${statsChartType === "bars" ? "profileStatsBars" : ""}`}>
                <div className="graphGridLines">
                  {[3, 2, 1, 0].map((num) => (
                    <span key={num}>{Math.ceil((profileStats.maxGraphValue / 3) * num)}</span>
                  ))}
                </div>

                <div className="graphPlot">
                  {(() => {
                    const points = profileStats.graph.map((item, index) => {
                      const left = profileStats.graph.length === 1 ? 50 : (index / (profileStats.graph.length - 1)) * 100;
                      const top = 96 - (item.value / profileStats.maxGraphValue) * 88;
                      return { ...item, left, top };
                    });

                    return (
                      <>
                        {statsChartType === "line" && (
                          <svg className="graphLineSvg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polyline
                              points={points.map((item) => `${item.left},${item.top}`).join(" ")}
                            />
                          </svg>
                        )}

                        {points.map((item) => (
                          <span key={item.day} className="graphPointWrap">
                            <b
                              className="graphPoint"
                              title={`${item.label}: ${item.value}`}
                              style={{ left: `${item.left}%`, top: `${item.top}%` }}
                            ></b>
                            {statsChartType === "bars" && (
                              <em
                                className="graphBar"
                                style={{
                                  left: `${item.left}%`,
                                  height: `${Math.max(2, (item.value / profileStats.maxGraphValue) * 88)}%`,
                                }}
                              ></em>
                            )}
                          </span>
                        ))}
                      </>
                    );
                  })()}
                </div>

                <div className="graphLabels">
                  {profileStats.graph.map((item) => (
                    <span key={item.day}>{item.label}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {view === "profile" && session && (
          <div className="profilePage">
            <div
              className="profileBanner"
              style={
                profile.banner
                  ? {
                      backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.12)), url("${profile.banner}")`,
                    }
                  : undefined
              }
            ></div>

            <div className="profileHeader">
              <div className="profileAvatarBig">
                {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}
              </div>

              <div className="profileMainInfo">
                <h2>{usernameFromSession()}</h2>
                <span>Уровень 1</span>

                {profile.about && <p className="profileAbout">{profile.about}</p>}
              </div>

              <div className="profileHeaderActions">
                <button onClick={() => setUserInfoOpen(true)}>
                  Информация о пользователе
                </button>

                <button
                  onClick={() => {
                    setSettingsTab("profile");
                    setView("settings");
                  }}
                >
                  Настройки
                </button>
              </div>
            </div>

            <div className="profileTabs">
              <button className="activeTab">Тайтлы</button>
              <button onClick={() => setView("profileComments")}>Комментарии</button>
              <button>Коллекции</button>
              <button>Отзывы</button>
              <button>Избранное</button>
              <button onClick={() => openFriendsPage("friends")}>Друзья</button>
              <button onClick={() => setView("profileStats")}>Статистика</button>
              <button onClick={() => setView("viewHistory")}>История просмотров</button>
            </div>

            <div className="profileContent">
              <aside className="profileSidebar">
                <h3>Списки</h3>

                <button
                  className={profileListFilter === "Все" ? "activeListFilter" : ""}
                  onClick={() => setProfileListFilter("Все")}
                >
                  Все <span>{myListTitles.length}</span>
                </button>

                <button
                  className={profileListFilter === "Читаю" ? "activeListFilter" : ""}
                  onClick={() => setProfileListFilter("Читаю")}
                >
                  Читаю <span>{countByStatus("Читаю")}</span>
                </button>

                <button
                  className={profileListFilter === "Хочу читать" ? "activeListFilter" : ""}
                  onClick={() => setProfileListFilter("Хочу читать")}
                >
                  В планах <span>{countByStatus("Хочу читать")}</span>
                </button>

                <button
                  className={profileListFilter === "Прочитано" ? "activeListFilter" : ""}
                  onClick={() => setProfileListFilter("Прочитано")}
                >
                  Прочитано <span>{countByStatus("Прочитано")}</span>
                </button>

                <button
                  className={profileListFilter === "Любимое" ? "activeListFilter" : ""}
                  onClick={() => setProfileListFilter("Любимое")}
                >
                  Любимое <span>{countByStatus("Любимое")}</span>
                </button>
              </aside>

              <section className="profileList">
                <input
                  className="profileSearch"
                  value={profileTitleQuery}
                  onChange={(event) => setProfileTitleQuery(event.target.value)}
                  placeholder="Фильтр по названию"
                />

                {filteredProfileTitles.length === 0 ? (
                  <div className="emptyProfileList">
                    <h3>{profileTitleQuery.trim() ? "Ничего не удалось найти" : "Список пуст"}</h3>
                    <p>{profileTitleQuery.trim() ? "В этом списке пока нет тайтлов." : "В этой категории пока нет тайтлов."}</p>
                  </div>
                ) : (
                  filteredProfileTitles.map((title) => (
                    <div
                      key={title.id}
                      className="profileTitleRow"
                      onClick={() => openTitle(title.id)}
                    >
                      <img src={title.cover} alt={title.name} />

                      <div>
                        <h3>{title.name}</h3>
                        <p>{title.genres.join(" • ")}</p>
                        <span>{myList[title.id]}</span>
                      </div>

                      <button>•••</button>
                    </div>
                  ))
                )}
              </section>
            </div>
          </div>
        )}

        {view === "friends" && session && (
          <div className="friendsPage profileFeedPage">
            <section className="friendsMain profileFeedMain">
              <div className="profileFeedTopTabs friendsTopTabs">
                <button onClick={() => setView("profile")}>Тайтлы</button>
                <button onClick={() => setView("profileComments")}>Комментарии</button>
                <button>Коллекции</button>
                <button>Отзывы</button>
                <button>Избранное</button>
                <button className="activeTab">Друзья</button>
                <button onClick={() => setView("profileStats")}>Статистика</button>
                <button onClick={() => setView("viewHistory")}>История просмотров</button>
              </div>

              <div className="friendsTabs">
                <button className={friendsTab === "friends" ? "activeFriendTab" : ""} onClick={() => setFriendsTab("friends")}>
                  Список друзей <span>{(friendsState.friends || []).length}</span>
                </button>
                <button className={friendsTab === "incoming" ? "activeFriendTab" : ""} onClick={() => setFriendsTab("incoming")}>
                  Заявки в друзья <span>{(friendsState.incoming || []).length}</span>
                </button>
                <button className={friendsTab === "outgoing" ? "activeFriendTab" : ""} onClick={() => setFriendsTab("outgoing")}>
                  Отправленные запросы <span>{(friendsState.outgoing || []).length}</span>
                </button>
              </div>

              <div className="friendsSearch">
                <span>⌕</span>
                <input
                  value={friendsQuery}
                  onChange={(event) => setFriendsQuery(event.target.value)}
                  placeholder="Поиск по имени"
                />
              </div>

              {getFriendsCurrentList().length === 0 ? (
                <div className="emptyProfileList friendsEmpty">
                  <h3>{friendsQuery.trim() ? "Ничего не удалось найти" : "Список пуст"}</h3>
                  <p>Заявки и друзья хранятся локально. Позже подключим настоящих пользователей.</p>
                </div>
              ) : (
                <div className="friendsGrid">
                  {getFriendsCurrentList().map((friend) => (
                    <div key={friend.id} className="friendCard">
                      <button className="friendAvatar" onClick={() => openFriendProfile(friend)}>
                        <img src={friend.avatar} alt={friend.name} />
                      </button>

                      <button className="friendInfo" onClick={() => openFriendProfile(friend)}>
                        <b>{friend.name}</b>
                        <span>{friend.date}</span>
                      </button>

                      <div className="friendActions">
                        {friendsTab === "friends" && (
                          <>
                            <button title="Сообщение" onClick={() => messageFriend(friend)}>✉</button>
                            <button title="Удалить" onClick={() => removeFriend(friend.id)}>🗑</button>
                          </>
                        )}

                        {friendsTab === "incoming" && (
                          <>
                            <button title="Принять" onClick={() => acceptFriendRequest(friend)}>✓</button>
                            <button title="Отклонить" onClick={() => declineFriendRequest(friend.id)}>×</button>
                          </>
                        )}

                        {friendsTab === "outgoing" && (
                          <button title="Отменить" onClick={() => cancelOutgoingFriendRequest(friend.id)}>×</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {userInfoOpen && (
          <div className="userInfoOverlay" onClick={() => setUserInfoOpen(false)}>
            <aside className="userInfoPanel" onClick={(event) => event.stopPropagation()}>
              <div className="userInfoTop">
                <h2>Информация о пользователе</h2>
                <button onClick={() => setUserInfoOpen(false)}>×</button>
              </div>

              <div className="userInfoBlock">
                <h3>Опыт</h3>
                <p>Уровень 1</p>
                <div className="expBar">
                  <span style={{ width: "8%" }}></span>
                </div>
                <small>8 / 100 опыта</small>
              </div>

              <div className="userInfoBlock">
                <h3>Статистика</h3>

                <div className="statGrid">
                  <div>
                    <b>{myListTitles.length}</b>
                    <span>Тайтлов в списке</span>
                  </div>

                  <div>
                    <b>{Object.keys(progress).length}</b>
                    <span>Глав открыто</span>
                  </div>

                  <div>
                    <b>0</b>
                    <span>Комментариев</span>
                  </div>
                </div>
              </div>

              <div className="userInfoBlock">
                <h3>Статистика по жанрам</h3>

                <div className="genreStats">
                  {["Экшен", "Фэнтези", "Драма", "Сёнэн"].map((item, index) => (
                    <div key={item}>
                      <span>{item}</span>
                      <b>{titles.filter((title) => title.genres.includes(item)).length}</b>

                      <div>
                        <i style={{ width: `${25 + index * 12}%` }}></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {myTeams.length > 0 && (
                <div className="userInfoBlock">
                  <h3>В составе команд</h3>
                  <div className="userInfoTeams">
                    {myTeams.map((team) => (
                      <button key={team.id} onClick={() => openTeam(team.id)}>
                        <span className="userInfoTeamAvatar">
                          {team.cover ? <img src={team.cover} alt={team.name} /> : team.name.slice(0, 1).toUpperCase()}
                        </span>
                        <b>{team.name}</b>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="userInfoBlock userInfoTwoCols">
                <div>
                  <h3>Дата регистрации</h3>
                  <p>
                    {session?.createdAt
                      ? new Date(session.createdAt).toLocaleDateString("ru-RU")
                      : "Неизвестно"}
                  </p>
                </div>

                <div>
                  <h3>Пол</h3>
                  <p>{profile.gender || "Не указан"}</p>
                </div>
              </div>

              <div className="userInfoBlock">
                <h3>О себе</h3>
                <p>{profile.about || "Пока ничего нет."}</p>
              </div>
            </aside>
          </div>
        )}

        {view === "reader" &&
          reader &&
          (() => {
            const title = titles.find((item) => item.id === reader.titleId);
            if (!title) return null;

            const chapter = title.chapters[reader.chapterIndex];
            if (!chapter) return null;

            const page = chapter.pages[reader.pageIndex];
            const likeKey = `${reader.titleId}-${reader.chapterIndex}`;
            const pageCommentKey = `${reader.titleId}-${reader.chapterIndex}-${reader.pageIndex}`;
            const liked = Boolean(chapterLikes[likeKey]);
            const comments = pageComments[pageCommentKey] || [];

            return (
              <div
                className={`readerV2 readerTheme_${readerSettings.readerTheme}`}
                style={{
                  "--readerBrightness": `${readerSettings.brightness}%`,
                  "--readerWidth": `${readerSettings.width}%`,
                }}
              >
                <div
                  className={`readerTopHotZone ${
                    readerSettingsOpen || readerChaptersOpen ? "readerTopPinned" : ""
                  }`}
                >
                  <div className="readerTopBar">
                    <button className="readerIconButton" onClick={() => openTitle(title.id)}>
                      ←
                    </button>

                    <button className="readerTitleBlock" onClick={() => openTitle(title.id)}>
                      <small>{title.shortName || title.name}</small>
                      <b>{title.name}</b>
                    </button>

                    <button
                      className="readerChapterArrow"
                      onClick={() => startReading(title.id, Math.max(0, reader.chapterIndex - 1))}
                      disabled={reader.chapterIndex === 0}
                    >
                      ‹
                    </button>

                    <button
                      className="readerChapterBlock"
                      onClick={() => setReaderChaptersOpen(true)}
                    >
                      <small>Оглавление</small>
                      <b>{chapter.name}</b>
                    </button>

                    <button
                      className="readerChapterArrow"
                      onClick={() =>
                        startReading(
                          title.id,
                          Math.min(title.chapters.length - 1, reader.chapterIndex + 1)
                        )
                      }
                      disabled={reader.chapterIndex === title.chapters.length - 1}
                    >
                      ›
                    </button>

                    <div className="readerTopSpacer"></div>

                    <button
                      className={`readerIconButton ${liked ? "readerIconActive" : ""}`}
                      title="Спасибо"
                      onClick={() => toggleChapterLike(title.id, reader.chapterIndex)}
                    >
                      ♡
                    </button>
                    <button className="readerIconButton" title="Комментарии">
                      ◱
                    </button>
                    <button className="readerIconButton" title="Пожаловаться">
                      ⚠
                    </button>
                    <button
                      className="readerIconButton"
                      title="Настройки"
                      onClick={() => setReaderSettingsOpen(true)}
                    >
                      ⚙
                    </button>
                  </div>
                </div>

                {readerChaptersOpen && (
                  <div className="readerDrawerOverlay" onClick={() => setReaderChaptersOpen(false)}>
                    <aside
                      className="readerChapterDrawer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="drawerTop">
                        <button onClick={() => setReaderChaptersOpen(false)}>←</button>
                        <h2>Список глав</h2>
                      </div>

                      <div className="drawerTools">
                        <button onClick={() => setChaptersDesc(!chaptersDesc)}>
                          ↕ Сортировать
                        </button>
                        <button>⬇ Скачать</button>
                      </div>

                      <div className="drawerChapterList">
                        {sortedChapters(title).map(({ chapter: item, realIndex }) => (
                          <button
                            key={item.id}
                            className={realIndex === reader.chapterIndex ? "drawerChapterActive" : ""}
                            onClick={() => {
                              startReading(title.id, realIndex);
                              setReaderChaptersOpen(false);
                            }}
                          >
                            <span className="chapterNameCell">
                              <span
                                className={`chapterEye ${
                                  isChapterOpened(title.id, realIndex) ? "chapterEyeOpen" : "chapterEyeClosed"
                                }`}
                                aria-hidden="true"
                              >
                                {isChapterOpened(title.id, realIndex) ? "◉" : "◌"}
                              </span>
                              <span>
                                {item.name} {item.subtitle ? `- ${item.subtitle}` : ""}
                              </span>
                            </span>
                            <b>{item.date}</b>
                          </button>
                        ))}
                      </div>
                    </aside>
                  </div>
                )}

                <div className="readerPageArea">
                  <div className="readerImageShell">
                    <img
                      className="readerPageImage"
                      src={page}
                      alt="page"
                      onClick={handleReaderClick}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        changePage(-1);
                      }}
                    />
                  </div>

                  {!readerSettings.hideNumbers && (
                    <div className="readerPageNumber">
                      {reader.pageIndex + 1} / {chapter.pages.length}
                    </div>
                  )}

                  <div className="readerBelowPage">
                    <div className="readerAdMock">
                      <span>Реклама</span>
                      <div>Место под баннер</div>
                    </div>

                    <div className="readerTeamRow">
                      <div className="teamAvatar"></div>

                      <div>
                        <small>Над главой работали</small>
                        <b>{title.team}</b>
                      </div>
                    </div>

                    <div className="readerThanksRow">
                      <button
                        className={`thanksButton ${liked ? "thanksActive" : ""}`}
                        onClick={() => toggleChapterLike(title.id, reader.chapterIndex)}
                      >
                        ♥ {liked ? "Спасибо сказано" : "Сказать спасибо"}
                      </button>

                      <button className="rateButton">★ Оценить перевод</button>
                    </div>

                    <div className="readerCommentBox">
                      <div className="readerCommentTools">
                        <button>Новые</button>
                        <button>Настройки</button>
                        <button>Правила</button>
                      </div>

                      {replyToCommentId && (
                        <div className="replyNotice">
                          <span>Ответ на комментарий</span>
                          <button onClick={() => setReplyToCommentId(null)}>×</button>
                        </div>
                      )}

                      {renderCommentEditor(
                        "reader",
                        commentText,
                        `Комментарий к странице ${reader.pageIndex + 1}...`,
                        "Отправить",
                        () => addPageComment(title.id, reader.chapterIndex, reader.pageIndex)
                      )}

                      {comments.length > 0 ? (
                        <div className="pageComments">
                          {renderPageCommentTree(comments, null, {
                            titleId: title.id,
                            chapterIndex: reader.chapterIndex,
                            pageIndex: reader.pageIndex,
                          })}
                        </div>
                      ) : (
                        <div className="emptyPageComments">
                          Пока нет комментариев к этой странице. Будь первым.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {readerSettingsOpen && (
                  <div className="readerSettingsOverlay" onClick={() => setReaderSettingsOpen(false)}>
                    <aside
                      className="readerSettingsPanel"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="readerSettingsTop">
                        <h2>Настройки</h2>
                        <button onClick={() => setReaderSettingsOpen(false)}>×</button>
                      </div>

                      <div className="readerSettingsNotice">
                        Новые настройки помечены круглой иконкой
                      </div>

                      <ReaderSettingGroup title="Режим чтения">
                        <Segmented>
                          <button
                            className={readerSettings.mode === "horizontal" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, mode: "horizontal" }))
                            }
                          >
                            Горизонтальный
                          </button>
                          <button
                            className={readerSettings.mode === "vertical" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, mode: "vertical" }))
                            }
                          >
                            Вертикальный
                          </button>
                          <button disabled>Полоса</button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <ReaderSettingGroup title="Тема чтения">
                        <Segmented>
                          <button
                            className={readerSettings.readerTheme === "dark" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, readerTheme: "dark" }))
                            }
                          >
                            Тёмная
                          </button>
                          <button
                            className={readerSettings.readerTheme === "light" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, readerTheme: "light" }))
                            }
                          >
                            Светлая
                          </button>
                          <button disabled>Системная</button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <ReaderSettingGroup title="Сервер">
                        <Segmented>
                          <button disabled>Первый</button>
                          <button disabled>Второй</button>
                          <button className="selected">Сжатия</button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <div className="readerSettingRow">
                        <b>● Зоны нажатия</b>
                        <span>По умолчанию ›</span>
                      </div>

                      <ReaderSettingGroup title="Область переключения страниц">
                        <Segmented>
                          <button
                            className={readerSettings.clickArea === "image" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, clickArea: "image" }))
                            }
                          >
                            Изображение
                          </button>
                          <button
                            className={readerSettings.clickArea === "screen" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, clickArea: "screen" }))
                            }
                          >
                            Весь экран
                          </button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <ReaderSettingGroup title="Вместить изображения">
                        <Segmented>
                          <button
                            className={readerSettings.fit === "width" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, fit: "width" }))
                            }
                          >
                            По ширине
                          </button>
                          <button
                            className={readerSettings.fit === "height" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, fit: "height" }))
                            }
                          >
                            По высоте экрана
                          </button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <ReaderSettingGroup title="Увеличение изображений">
                        <Segmented>
                          <button
                            className={readerSettings.scale === "none" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, scale: "none" }))
                            }
                          >
                            Не увеличивать
                          </button>
                          <button
                            className={readerSettings.scale === "zoom" ? "selected" : ""}
                            onClick={() =>
                              setReaderSettings((prev) => ({ ...prev, scale: "zoom" }))
                            }
                          >
                            Увеличивать
                          </button>
                        </Segmented>
                      </ReaderSettingGroup>

                      <div className="rangeBox">
                        <h3>● Яркость {readerSettings.brightness}%</h3>
                        <input
                          type="range"
                          min="40"
                          max="120"
                          value={readerSettings.brightness}
                          onChange={(event) =>
                            setReaderSettings((prev) => ({
                              ...prev,
                              brightness: Number(event.target.value),
                            }))
                          }
                        />
                      </div>

                      <div className="rangeBox">
                        <h3>Ширина контейнера {readerSettings.width}%</h3>
                        <input
                          type="range"
                          min="55"
                          max="100"
                          value={readerSettings.width}
                          onChange={(event) =>
                            setReaderSettings((prev) => ({
                              ...prev,
                              width: Number(event.target.value),
                            }))
                          }
                        />
                      </div>

                      <div className="readerSettingRow">
                        <b>● Скрыть номер страниц</b>

                        <button
                          className={`readerSwitch ${readerSettings.hideNumbers ? "switchOn" : ""}`}
                          onClick={() =>
                            setReaderSettings((prev) => ({
                              ...prev,
                              hideNumbers: !prev.hideNumbers,
                            }))
                          }
                        >
                          <span></span>
                        </button>
                      </div>

                      <div className="readerSettingRow">
                        <b>● Настройка горячих клавиш</b>
                        <span>›</span>
                      </div>
                    </aside>
                  </div>
                )}
              </div>
            );
          })()}
      </main>
    </div>
  );
}

function InfoLine({ label, value, onClick }) {
  if (onClick) {
    return (
      <button className="infoLine clickableInfoLine" onClick={onClick} type="button">
        <span>{label}</span>
        <b>{value}</b>
      </button>
    );
  }

  return (
    <div className="infoLine">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function EmptyPanel({ text }) {
  return (
    <div className="emptyProfileList">
      <h3>Пока пусто</h3>
      <p>{text}</p>
    </div>
  );
}

function ReaderSettingGroup({ title, children }) {
  return (
    <div className="readerSettingGroup">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Segmented({ children }) {
  return <div className="segmented">{children}</div>;
}

const css = `
* {
  box-sizing: border-box;
}

button,
input,
select,
textarea {
  font: inherit;
}

.app {
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);

  --bg: #f4f6fb;
  --panel: #ffffff;
  --panel2: #f8fafc;
  --text: #111827;
  --muted: #6b7280;
  --border: #d8dee9;
  --accent: #2563eb;
  --accent2: #1d4ed8;
  --soft: #eaf1ff;
  --shadow: rgba(15, 23, 42, 0.12);
  --deepShadow: rgba(15, 23, 42, 0.16);
}

.app.dark {
  --bg: #05070a;
  --panel: #17191f;
  --panel2: #20232b;
  --text: #f3f4f6;
  --muted: #a3a3a3;
  --border: #2d313a;
  --accent: #ff4d4d;
  --accent2: #e53939;
  --soft: #2a1515;
  --shadow: rgba(0, 0, 0, 0.55);
  --deepShadow: rgba(0, 0, 0, 0.72);
}

.readerModeApp {
  --bg: #050607;
  --panel: #161719;
  --panel2: #232326;
  --text: #f3f4f6;
  --muted: #a9a9ad;
  --border: #303137;
  --accent: #ff4d4d;
  --accent2: #e53939;
}

button {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px 13px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

input,
select,
textarea {
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
}

textarea {
  min-height: 140px;
  resize: vertical;
}

header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--panel) 92%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.headerInner {
  width: 100%;
  margin: 0;
  padding: 10px 28px;
  display: grid;
  grid-template-columns: auto auto minmax(260px, 520px) auto 1fr auto;
  align-items: center;
  gap: 10px;
}

.logo {
  position: relative;
  font-size: 30px;
  font-weight: 1000;
  letter-spacing: 0.5px;
  color: var(--accent);
  cursor: pointer;
  text-shadow: 0 0 22px color-mix(in srgb, var(--accent) 45%, transparent);
}

.logo::after {
  content: "";
  position: absolute;
  left: 4px;
  bottom: -5px;
  width: 22px;
  height: 4px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
}

.catalogNav {
  position: relative;
}

.catalogButton {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--panel2);
  font-weight: 700;
  padding: 8px 11px;
  font-size: 13px;
}

.catalogIcon,
.catalogArrow {
  color: var(--muted);
}

.catalogMenu {
  position: absolute;
  top: 46px;
  left: 0;
  width: 410px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 205px 1fr;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 24px 75px rgba(0, 0, 0, 0.55);
}

.catalogMenuLeft {
  background: var(--panel2);
  border-right: 1px solid var(--border);
  padding: 7px;
  display: grid;
  gap: 1px;
}

.catalogMenuRight {
  padding: 10px;
  display: grid;
  gap: 5px;
  align-content: start;
}

.catalogMenu button {
  border: none;
  border-radius: 8px;
  text-align: left;
  color: var(--muted);
  padding: 8px 9px;
  font-size: 14px;
}

.catalogMenu button:hover {
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--text);
}

.catalogMenuLeft button {
  display: flex;
  align-items: center;
  gap: 8px;
}

.catalogMenuLeft span {
  width: 16px;
  color: var(--muted);
}

.randomTitleButton {
  margin-top: 14px;
  background: var(--accent) !important;
  color: white !important;
  font-weight: 800;
  text-align: center !important;
}

.randomTitleButton:hover {
  background: var(--accent2) !important;
  color: white !important;
}

.headerSearch {
  width: 100%;
  height: 42px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  background: var(--panel2);
}

.headerSearch b {
  font-weight: 500;
}

.headerSearch span {
  font-size: 20px;
  color: var(--muted);
}

.themeToggle {
  width: 42px;
  padding: 9px 0;
}

.rightSide {
  justify-self: end;
  display: flex;
  gap: 8px;
  align-items: center;
}

.accountControls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar,
.squareAvatar {
  border-radius: 10px;
  width: 42px;
  height: 42px;
  padding: 0;
  line-height: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.squareAvatar::before {
  content: "";
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--accent);
}

.squareAvatar:has(img)::before {
  display: none;
}

.squareAvatar img,
.burgerMiniAvatar img,
.profileAvatarBig img,
.avatarPreview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notificationWrap {
  position: relative;
}

.bellButton {
  position: relative;
  width: 38px;
  height: 42px;
  padding: 0;
  display: grid;
  place-items: center;
  color: #b8b8b8;
  border: none;
  border-radius: 10px;
  background: transparent;
}

.bellButton:hover {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.bellIcon {
  width: 23px;
  height: 23px;
  display: block;
  transition: 0.18s ease;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35));
}

.bellButton:hover .bellIcon {
  transform: rotate(-8deg);
}

.notificationBadge {
  position: absolute;
  top: 2px;
  right: 1px;
  min-width: 17px;
  height: 17px;
  padding: 0 5px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #f06b78;
  color: white;
  border: 2px solid var(--panel);
  font-size: 10px;
  line-height: 1;
  font-weight: 900;
  box-shadow: 0 2px 8px rgba(240, 107, 120, 0.45);
}

.notificationsPanel {
  position: absolute;
  top: 50px;
  right: 0;
  width: 440px;
  height: 620px;
  max-height: calc(100vh - 82px);
  overflow: hidden;
  background: #2f3033;
  border: 1px solid #45464a;
  border-radius: 8px;
  box-shadow: 0 24px 75px rgba(0, 0, 0, 0.55);
  padding: 0;
  z-index: 1000;
  color: #dedee3;
}

.libNotificationsTop {
  display: grid;
  grid-template-columns: 38px 1fr 38px;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  border-bottom: 1px solid #424348;
  padding: 0 10px;
  margin: 0;
}

.libNotificationsTop h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 900;
  text-align: center;
  color: #d9d9df;
}

.notificationPanelIconButton {
  width: 30px;
  height: 30px;
  padding: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #aaaeb8;
}

.notificationPanelIconButton:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.notificationPanelIconButton:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.notificationPanelIconButton svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.notificationPanelTabs {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 38px;
  padding: 0 12px;
  border-bottom: 1px solid #424348;
  overflow: hidden;
}

.notificationPanelTabs button {
  position: relative;
  padding: 10px 0 9px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #a9abb1;
  white-space: nowrap;
  font-size: 14px;
}

.notificationPanelTabs button span {
  margin-left: 4px;
  font-size: 11px;
  color: #8a8d95;
}

.notificationPanelTabs .activeTab {
  color: #ffffff;
}

.notificationPanelTabs .activeTab::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: #ff4d5d;
}

.notificationPanelTabs::-webkit-scrollbar {
  display: none;
}

.notificationsPanel * {
  scrollbar-width: thin;
}

.libNotificationsList {
  display: grid;
  align-content: start;
  gap: 0;
  height: calc(100% - 132px);
  overflow-y: auto;
}

.notificationItem {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  padding: 14px 14px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #424348;
}

.notificationItem:hover {
  background: rgba(255, 255, 255, 0.035);
}

.unreadNotification {
  border-color: #424348;
}

.notificationDot {
  display: none;
}

.notificationIconAvatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #3b3c40;
  color: #cfd1d6;
  flex: 0 0 48px;
}

.notificationIconAvatar svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.notificationIconReply {
  background: #3a3b40;
  color: #cfd1d6;
}

.notificationIconFriend {
  background: #3a3b40;
  color: #cfd1d6;
}

.notificationIconModeration {
  background: #24352c;
  color: #60d394;
}

.notificationIconReject {
  background: #3a2528;
  color: #ff727d;
}

.notificationIconChapter {
  border-radius: 8px;
  background: linear-gradient(135deg, #381818, #1e1f25);
  color: #ff727d;
}

.notificationIconDefault {
  background: #3a3b40;
  color: #cfd1d6;
}

.notificationItem h4 {
  margin: 0 0 4px;
  font-size: 14px;
  color: #d9d9df;
  font-weight: 900;
}

.notificationItem p {
  margin: 0 0 5px;
  color: #d0d1d6;
  font-size: 14px;
  line-height: 1.35;
}

.notificationItem span {
  color: #9a9da5;
  font-size: 12px;
}

.emptyBellNotifications {
  padding: 26px 18px;
  color: #a9abb1;
  text-align: center;
  line-height: 1.45;
}

.showAllNotificationsButton {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 0;
  border-top: 1px solid #424348;
  background: transparent;
  color: #a9abb1;
  font-weight: 800;
}

.showAllNotificationsButton:hover {
  background: rgba(255, 255, 255, 0.045);
  color: #ffffff;
}

.confirmActionOverlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.62);
  padding: 18px;
}

.confirmActionModal {
  position: relative;
  width: min(360px, 100%);
  border-radius: 10px;
  background: #25262a;
  border: 1px solid #3d3f45;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  color: #dfe1e6;
  padding: 18px 20px 16px;
}

.confirmActionModal h3 {
  margin: 0 28px 18px 0;
  font-size: 18px;
}

.confirmActionModal p {
  margin: 0 0 22px;
  color: #c8cad0;
  line-height: 1.45;
}

.confirmActionClose {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #c8cad0;
  font-size: 22px;
  line-height: 1;
  padding: 0;
}

.confirmActionButtons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 18px;
}

.confirmActionButtons button {
  border: none;
  background: transparent;
  padding: 8px 0;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 900;
  color: #c8cad0;
}

.confirmActionButtons button:last-child {
  color: #53d467;
}

.app.light .notificationsPanel {
  background: #ffffff;
  border-color: #d9dde6;
  color: #16181d;
}

.app.light .libNotificationsTop,
.app.light .notificationPanelTabs,
.app.light .notificationItem,
.app.light .showAllNotificationsButton {
  border-color: #e1e4eb;
}

.app.light .libNotificationsTop h3,
.app.light .notificationPanelTabs .activeTab,
.app.light .notificationItem h4,
.app.light .showAllNotificationsButton:hover {
  color: #16181d;
}

.app.light .notificationPanelIconButton,
.app.light .notificationPanelTabs button,
.app.light .showAllNotificationsButton,
.app.light .notificationItem span,
.app.light .emptyBellNotifications {
  color: #687083;
}

.app.light .notificationPanelIconButton:hover:not(:disabled),
.app.light .notificationItem:hover,
.app.light .showAllNotificationsButton:hover {
  background: #f4f6f9;
}

.app.light .notificationItem p {
  color: #3f4654;
}

.app.light .confirmActionModal {
  background: #ffffff;
  border-color: #d9dde6;
  color: #16181d;
}

.app.light .confirmActionModal p,
.app.light .confirmActionClose,
.app.light .confirmActionButtons button:first-child {
  color: #687083;
}

.burgerButton {
  width: 42px;
  height: 42px;
  padding: 0;
  font-size: 20px;
}

.burgerLayer {
  position: fixed;
  top: 58px;
  right: 28px;
  z-index: 60;
}

.burgerMenu {
  width: 260px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 18px 55px var(--shadow);
  padding: 8px;
}

.burgerProfileTop {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  background: var(--panel2);
  border: none;
}

.burgerMiniAvatar {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: var(--soft);
  overflow: hidden;
}

.burgerMiniAvatar::before {
  content: "";
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
}

.burgerMiniAvatar:has(img)::before {
  display: none;
}

.burgerProfileTop small {
  display: block;
  color: var(--muted);
  font-size: 11px;
}

.burgerProfileTop b {
  display: block;
  font-size: 14px;
  word-break: break-all;
}

.burgerGroup {
  display: grid;
  gap: 2px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.burgerGroup button {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  border-radius: 8px;
  padding: 9px 10px;
  color: var(--muted);
  display: flex;
  align-items: center;
}

.burgerGroup button:hover {
  background: var(--panel2);
  color: var(--text);
}

.burgerGroup button > span:not(.monoIcon) {
  margin-left: auto;
  color: var(--muted);
  font-size: 12px;
}

.monoIcon {
  flex: 0 0 22px;
  width: 22px;
  height: 18px;
  margin-right: 2px;
  color: currentColor;
  display: inline-grid;
  place-items: center;
  line-height: 1;
}

.monoIcon svg {
  width: 15px;
  height: 15px;
  display: block;
  fill: currentColor;
}

.dangerButton {
  color: #ef4444 !important;
}

.burgerVersion {
  text-align: center;
  color: var(--muted);
  font-size: 11px;
  padding-top: 6px;
}

.searchOverlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.68);
  padding-top: 28px;
}

.searchModal {
  max-width: 760px;
  width: calc(100% - 32px);
  margin: 0 auto;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
}

.searchInputRow {
  display: grid;
  grid-template-columns: 38px 1fr 40px;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.searchIcon {
  text-align: center;
  color: var(--muted);
  font-size: 22px;
}

.searchInputRow input {
  border: none;
  background: transparent;
  border-radius: 0;
  height: 48px;
}

.searchInputRow button {
  border: none;
  border-radius: 0;
  font-size: 22px;
  color: var(--muted);
}

.searchTabs {
  display: flex;
  gap: 2px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  padding: 0 12px;
}

.searchTabs button {
  border: none;
  border-radius: 0;
  color: var(--muted);
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.searchTabs .activeTab {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.searchContent {
  min-height: 100px;
  padding: 24px;
  color: var(--muted);
  text-align: center;
}

.searchContent span {
  color: var(--accent);
}

.searchResults {
  display: grid;
  gap: 8px;
  text-align: left;
}

.searchResultRow {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  align-items: center;
  border: none;
  background: var(--panel2);
  text-align: left;
}

.searchResultRow img {
  width: 48px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}

.searchResultRow b {
  display: block;
}

.searchResultRow small {
  color: var(--muted);
}

main {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 24px 26px 60px;
}

.readerMain {
  padding: 0;
}

.hero,
.panel,
.authCard,
.catalogSection,
.continueSection {
  border: 1px solid var(--border);
  border-radius: 22px;
  background: var(--panel);
  box-shadow: 0 16px 45px var(--shadow);
}

.hero {
  padding: 42px 28px;
  text-align: center;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: 58px;
  line-height: 1;
  margin: 0 0 12px;
  color: var(--accent);
}

.hero p {
  margin: 0;
  color: var(--muted);
  font-size: 18px;
}

.catalogSection,
.continueSection,
.panel {
  padding: 18px;
  margin-bottom: 18px;
}

.sectionHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.sectionHeader h2 {
  margin: 0;
  font-size: 18px;
}

.sectionHeader span {
  color: var(--muted);
  font-size: 13px;
}

.clearInlineButton {
  border: none;
  background: transparent;
  color: var(--muted);
  padding: 4px 0;
  font-size: 13px;
}

.clearInlineButton:hover {
  color: var(--accent);
  border-color: transparent;
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.authPage {
  min-height: 65vh;
  display: grid;
  place-items: center;
}

.authCard {
  width: 100%;
  max-width: 460px;
  padding: 34px;
}

.authCard h2 {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 34px;
}

.authBigForm {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.linkButton {
  margin-top: 12px;
  background: transparent;
}

.authMessage {
  color: var(--accent);
  font-size: 14px;
}

.catalogGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(165px, 180px));
  gap: 18px;
  align-items: start;
}

.catalogCard {
  cursor: pointer;
  transition: 0.2s;
}

.catalogCard:hover {
  transform: translateY(-4px);
}

.catalogPosterWrap {
  position: relative;
}

.catalogPoster {
  width: 100%;
  aspect-ratio: 0.72;
  object-fit: cover;
  display: block;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--soft);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
}

.posterType,
.posterChapter,
.posterStatus {
  position: absolute;
  display: inline-block;
  background: rgba(10, 10, 10, 0.82);
  color: #fff;
  border: 1px solid color-mix(in srgb, var(--accent) 65%, white 0%);
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  line-height: 1;
}

.posterType {
  top: 10px;
  left: 10px;
}

.posterChapter {
  top: 10px;
  right: 10px;
}

.posterStatus {
  left: 10px;
  bottom: 10px;
}

.catalogBody {
  padding: 10px 2px 0;
}

.catalogBody h3 {
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 1.3;
  font-weight: 700;
}

.catalogBody p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.35;
}

.continueGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.continueCard {
  width: 100%;
  padding: 12px;
  border-radius: 16px;
  background: var(--panel2);
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 12px;
  text-align: left;
  align-items: center;
}

.continueCard:hover {
  border-color: var(--accent);
  color: inherit;
  transform: translateY(-2px);
}

.continueCard img {
  width: 56px;
  height: 76px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.continueInfo h3 {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.25;
}

.continueInfo p {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 13px;
}

.continueBar {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--border) 70%, transparent);
}

.continueBar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 70%, white 30%));
  border-radius: 999px;
}

.emptyContinueBox {
  border: 1px dashed var(--border);
  border-radius: 16px;
  padding: 26px;
  text-align: center;
  color: var(--muted);
  background: color-mix(in srgb, var(--panel2) 70%, transparent);
}

.emptyContinueBox h3 {
  margin: 0 0 8px;
  color: var(--text);
  font-size: 16px;
}

.emptyContinueBox p {
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 260px));
  gap: 22px;
}

.card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 14px 35px var(--shadow);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
}

.card img {
  width: 100%;
  aspect-ratio: 5 / 7;
  object-fit: cover;
  display: block;
  background: var(--soft);
}

.cardBody {
  padding: 16px;
}

.card h3 {
  margin: 0 0 8px;
}

.card p,
.muted {
  color: var(--muted);
}

.badge {
  display: inline-block;
  background: var(--soft);
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 13px;
}

.titleHub {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 270px 1fr;
  gap: 30px;
  align-items: start;
}

.titleHubSide {
  display: grid;
  gap: 14px;
}

.titleCoverBox {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  box-shadow: 0 18px 45px var(--shadow);
}

.titleCoverBox img {
  width: 100%;
  aspect-ratio: 0.72;
  object-fit: cover;
  display: block;
}

.coverQuickButtons {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: rgba(0, 0, 0, 0.5);
}

.coverQuickButtons button {
  border: none;
  border-radius: 0;
  color: #fff;
  padding: 9px 0;
}

.startReadBig {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #c91f25;
  color: white;
  border-color: #c91f25;
  font-weight: 800;
}

.startReadBig:hover {
  color: white;
  background: #e32b32;
}

.sideStatusDropdown > button {
  width: 100%;
  text-align: left;
  background: var(--panel2);
}

.titleInfoCard {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px;
  display: grid;
  gap: 15px;
}

.infoLine span {
  display: block;
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 5px;
}

.infoLine b {
  font-weight: 500;
}

.titleHubMain {
  min-width: 0;
}

.titleHubTop {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: start;
  margin-bottom: 12px;
}

.titleHubTop h2 {
  margin: 10px 0 5px;
  font-size: 28px;
}

.titleHubTop p {
  margin: 0;
  color: var(--muted);
}

.ratingBox {
  display: grid;
  justify-items: end;
  gap: 4px;
}

.ratingBox b {
  color: #ffbd4a;
  font-size: 22px;
}

.ratingBox span {
  color: var(--muted);
}

.ratingBox button {
  padding: 6px 12px;
  background: var(--panel2);
}

.titleHubTabs {
  margin-top: 0;
  background: var(--panel);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 14px 14px 0 0;
  padding: 0 12px;
}

.titleHubPanel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 0 0 14px 14px;
  padding: 26px 20px;
  min-height: 500px;
}

.chaptersPanel {
  min-height: 0;
  height: auto;
  padding-bottom: 12px;
}

.tagList {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.tagList span {
  border: 1px solid var(--border);
  background: var(--panel2);
  border-radius: 7px;
  padding: 7px 10px;
  font-size: 13px;
}

.titleDescription {
  color: var(--muted);
  line-height: 1.55;
}

.translatorCard {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--panel2);
  border-radius: 9px;
  padding: 8px 12px;
  margin-bottom: 20px;
}

.similarGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 25px;
}

.similarGrid button {
  display: grid;
  grid-template-columns: 86px 1fr auto;
  gap: 12px;
  text-align: left;
  border: none;
  background: var(--panel2);
  align-items: center;
}

.similarGrid img {
  width: 86px;
  height: 116px;
  object-fit: cover;
  border-radius: 8px;
}

.similarGrid small {
  color: #78a7ff;
}

.similarGrid b {
  display: block;
  margin: 5px 0;
}

.similarGrid em {
  display: block;
  color: var(--muted);
  font-style: normal;
  font-size: 13px;
}

.similarGrid i {
  font-style: normal;
  color: var(--muted);
  font-size: 22px;
}

.titleStatsBlocks {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 1fr);
  gap: 35px;
}

.titleStatsBlocks > div {
  min-width: 0;
}

.listStatsTitle {
  overflow-wrap: anywhere;
  line-height: 1.25;
}

.ratingLine,
.listLine {
  display: grid;
  grid-template-columns: minmax(72px, auto) minmax(0, 1fr) 44px;
  gap: 10px;
  align-items: center;
  margin: 8px 0;
  font-size: 13px;
}

.ratingLine div,
.listLine div {
  height: 7px;
  background: #303038;
  border-radius: 999px;
  overflow: hidden;
}

.ratingLine i,
.listLine i {
  display: block;
  height: 100%;
  background: #75d644;
}

.listLine i {
  background: #ff5d67;
}

.ratingLine b,
.listLine b {
  color: #cbd5e1;
  font-weight: 600;
}

.statusDropdown {
  position: relative;
}

.statusMenu {
  position: absolute;
  left: 0;
  top: 52px;
  width: 210px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 10px;
  display: grid;
  gap: 8px;
  z-index: 5;
  box-shadow: 0 18px 50px var(--shadow);
}

.statusMenu button {
  width: 100%;
  text-align: left;
}

.tabs {
  margin-top: 28px;
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.tabs button {
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--muted);
  white-space: nowrap;
  border-bottom: 3px solid transparent;
}

.tabs button:hover {
  transform: none;
}

.tabs .activeTab {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.chapterTools {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.chapterList {
  display: grid;
}

.chapterRow {
  border: none;
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--border);
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--text);
}

.chapterRow:hover {
  transform: none;
  background: var(--panel2);
}

.chapterRow span:last-child {
  color: var(--muted);
  white-space: nowrap;
}

.chapterNameCell {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.chapterNameCell > span:last-child {
  color: var(--text);
  white-space: normal;
}

.chapterEye {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  font-size: 15px;
  line-height: 1;
}

.chapterEyeClosed {
  color: #8b8f98;
  background: rgba(148, 163, 184, 0.12);
}

.chapterEyeOpen {
  color: #ff555f;
  background: rgba(255, 85, 95, 0.14);
}

.profilePage {
  border-radius: 24px;
  overflow: hidden;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: 0 16px 45px var(--shadow);
}

.profileBanner {
  height: 260px;
  background:
    linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.12)),
    url("https://placehold.co/1400x420/1f2937/e5e7eb?text=Akari+Profile+Banner");
  background-size: cover;
  background-position: center;
}

.profileHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border-bottom: 1px solid var(--border);
}

.profileAvatarBig {
  width: 74px;
  height: 74px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: var(--soft);
  border: 1px solid var(--border);
  margin-top: -44px;
  box-shadow: 0 14px 35px var(--shadow);
  overflow: hidden;
}

.profileAvatarBig::before {
  content: "";
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
}

.profileAvatarBig:has(img)::before {
  display: none;
}

.profileMainInfo {
  flex: 1;
}

.profileMainInfo h2 {
  margin: 0 0 4px;
  color: var(--text);
}

.profileMainInfo span {
  color: var(--muted);
  font-size: 14px;
}

.profileAbout {
  margin-top: 10px !important;
  color: var(--text) !important;
}

.profileHeaderActions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.profileTabs {
  display: flex;
  gap: 4px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.profileTabs button {
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--muted);
  white-space: nowrap;
  border-bottom: 3px solid transparent;
}

.profileTabs .activeTab {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.profileContent {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 16px;
  padding: 16px;
}

.profileSidebar {
  background: var(--panel2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px;
}

.profileSidebar h3 {
  margin: 0 0 10px;
}

.profileSidebar button {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  justify-content: space-between;
  color: var(--text);
}

.profileSidebar button:hover,
.activeListFilter {
  background: var(--panel) !important;
  color: var(--accent) !important;
}

.profileList {
  display: grid;
  gap: 12px;
}

.profileSearch {
  width: 100%;
}

.emptyProfileList {
  background: var(--panel2);
  border: 1px dashed var(--border);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  color: var(--muted);
}

.emptyProfileList h3 {
  color: var(--text);
}

.profileTitleRow {
  display: grid;
  grid-template-columns: 68px 1fr auto;
  gap: 14px;
  align-items: center;
  background: var(--panel2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 10px;
  cursor: pointer;
}

.profileTitleRow:hover {
  border-color: var(--accent);
}

.profileTitleRow img {
  width: 68px;
  height: 92px;
  object-fit: cover;
  border-radius: 10px;
}

.profileTitleRow h3 {
  margin: 0 0 6px;
}

.profileTitleRow p {
  color: var(--muted);
  margin: 0 0 8px;
}

.profileTitleRow span {
  color: var(--accent);
  font-size: 13px;
}

.settingsPage {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 245px 1fr;
  gap: 18px;
  align-items: start;
}

.settingsSidebar {
  background: color-mix(in srgb, var(--panel) 94%, black 6%);
  border: 1px solid color-mix(in srgb, var(--border) 85%, white 8%);
  border-radius: 18px;
  padding: 10px;
  align-self: start;
  box-shadow: 0 16px 44px var(--deepShadow);
}

.settingsSidebar button {
  width: 100%;
  text-align: left;
  border: none;
  color: color-mix(in srgb, var(--muted) 85%, var(--text) 15%);
  padding: 10px 12px;
  border-radius: 10px;
}

.settingsSidebar button:hover,
.activeSettings {
  background: color-mix(in srgb, var(--accent) 13%, var(--panel2)) !important;
  color: var(--accent) !important;
}

.settingsMain {
  min-width: 0;
}

.profileEditForm {
  display: grid;
  gap: 16px;
}

.settingsGrid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.settingsCard {
  background: color-mix(in srgb, var(--panel) 96%, black 4%);
  border: 1px solid color-mix(in srgb, var(--border) 88%, white 8%);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 16px 44px var(--deepShadow);
}

.settingsCard h3 {
  margin: 0 0 14px;
  font-size: 18px;
}

.imageEditRow {
  display: grid;
  grid-template-columns: 170px 124px;
  gap: 14px;
  align-items: center;
}

.uploadBox {
  min-height: 124px;
  border: 2px dashed color-mix(in srgb, var(--border) 82%, var(--muted) 18%);
  border-radius: 16px;
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--muted);
  cursor: pointer;
  padding: 14px;
  background: color-mix(in srgb, var(--panel2) 88%, black 12%);
}

.uploadBox input {
  display: none;
}

.uploadBox:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--panel2));
}

.disabledUpload {
  cursor: not-allowed;
  opacity: 0.72;
}

.avatarPreview {
  position: relative;
  width: 124px;
  height: 124px;
  border-radius: 16px;
  background: var(--panel2);
  border: 1px solid var(--border);
  overflow: hidden;
  display: grid;
  place-items: center;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
  box-shadow: 0 12px 30px var(--shadow);
}

.deleteImage {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  padding: 0;
  background: rgba(0,0,0,0.74);
  color: white;
  border: none;
  border-radius: 8px;
}

.bannerEditRow {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 14px;
  align-items: stretch;
}

.bannerUpload {
  min-height: 146px;
}

.bannerPreview {
  position: relative;
  min-height: 146px;
  border-radius: 18px;
  background: var(--panel2);
  border: 1px solid var(--border);
  overflow: hidden;
  display: grid;
  place-items: center;
  color: var(--muted);
  box-shadow: 0 12px 34px var(--shadow);
}

.bannerPreview img {
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.fieldLabel {
  display: grid;
  gap: 8px;
  color: var(--muted);
  margin-bottom: 14px;
}

.fieldLabel input,
.fieldLabel select,
.fieldLabel textarea {
  width: 100%;
  background: color-mix(in srgb, var(--panel) 88%, black 12%);
}

.saveRow {
  display: flex;
  align-items: center;
  gap: 12px;
}

.saveButton {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.saveButton:hover {
  background: var(--accent2);
  color: white;
}

.userInfoOverlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.68);
  display: flex;
  justify-content: flex-end;
}

.userInfoPanel {
  width: 440px;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;
  background: var(--panel);
  border-left: 1px solid var(--border);
  padding: 18px;
  box-shadow: -20px 0 70px rgba(0,0,0,0.5);
}

.userInfoTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.userInfoTop h2 {
  margin: 0;
  font-size: 22px;
}

.userInfoTop button {
  width: 36px;
  height: 36px;
  padding: 0;
}

.userInfoBlock {
  background: var(--panel2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;
}

.userInfoBlock h3 {
  margin: 0 0 8px;
  font-size: 15px;
}

.userInfoBlock p {
  margin: 0;
  color: var(--muted);
}

.expBar {
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--panel);
  margin: 10px 0 6px;
}

.expBar span {
  display: block;
  height: 100%;
  background: var(--accent);
}

.statGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.statGrid div {
  background: var(--panel);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
}

.statGrid b {
  display: block;
  font-size: 22px;
  color: var(--accent);
}

.statGrid span {
  color: var(--muted);
  font-size: 12px;
}

.genreStats {
  display: grid;
  gap: 10px;
}

.genreStats > div {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
}

.genreStats span {
  color: var(--muted);
}

.genreStats > div > div {
  grid-column: 1 / -1;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--panel);
}

.genreStats i {
  display: block;
  height: 100%;
  background: var(--accent);
}

.userInfoTwoCols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.readerV2 {
  min-height: 100vh;
  background: #070809;
  color: #f4f4f5;
  padding-bottom: 60px;
}

.readerTheme_light {
  background: #f5f5f5;
  color: #111;
}

.readerTopHotZone {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 82px;
  z-index: 1000;
}

.readerTopBar {
  height: 52px;
  background: rgba(34, 34, 37, 0.98);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transform: translateY(-110%);
  opacity: 0;
  transition: 0.18s ease;
  display: grid;
  grid-template-columns: 42px minmax(180px, 320px) 38px minmax(180px, 300px) 38px 1fr 38px 38px 38px 38px;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  box-shadow: 0 14px 40px rgba(0,0,0,0.45);
}

.readerTopHotZone:hover .readerTopBar,
.readerTopPinned .readerTopBar {
  transform: translateY(0);
  opacity: 1;
}

.readerIconButton,
.readerChapterArrow {
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 8px;
  color: #d2d2d6;
  background: transparent;
  display: grid;
  place-items: center;
}

.readerIconButton:hover,
.readerChapterArrow:hover {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

.readerIconActive {
  color: #ff6b7a !important;
}

.readerTitleBlock,
.readerChapterBlock {
  min-width: 0;
  line-height: 1.1;
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  border-radius: 8px;
  display: block;
}

.readerTitleBlock:hover,
.readerChapterBlock:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}

.readerTitleBlock small,
.readerChapterBlock small {
  display: block;
  color: #a8a8ad;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.readerTitleBlock b,
.readerChapterBlock b {
  display: block;
  color: #f1f1f3;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.readerTopSpacer {
  min-width: 20px;
}

.readerPageArea {
  width: var(--readerWidth);
  max-width: 1180px;
  margin: 0 auto;
  padding: 74px 0 0;
  filter: brightness(var(--readerBrightness));
}

.readerImageShell {
  display: grid;
  place-items: center;
}

.readerPageImage {
  display: block;
  width: 100%;
  max-width: 980px;
  min-height: 760px;
  object-fit: cover;
  background: #111;
  cursor: pointer;
  user-select: none;
}

.readerTheme_light .readerPageImage {
  background: #fff;
}

.readerPageNumber {
  text-align: center;
  font-weight: 900;
  color: #f5f5f5;
  margin: 18px 0 26px;
  font-size: 18px;
}

.readerBelowPage {
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
  padding-bottom: 60px;
}

.readerAdMock {
  display: grid;
  place-items: center;
  gap: 8px;
}

.readerAdMock span {
  color: #85858a;
  font-size: 12px;
}

.readerAdMock div {
  width: min(760px, 100%);
  height: 120px;
  border: 1px solid #3a3030;
  background:
    linear-gradient(135deg, rgba(255,77,77,0.28), rgba(255,255,255,0.04)),
    #171212;
  color: #f3f3f3;
  display: grid;
  place-items: center;
  font-weight: 900;
}

.readerTeamRow {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d7d7dc;
}

.teamAvatar {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background:
    radial-gradient(circle at 40% 35%, #555, transparent 40%),
    #111;
  border: 1px solid #333;
}

.readerTeamRow small {
  display: block;
  color: #9d9da3;
  font-size: 12px;
}

.readerTeamRow b {
  display: block;
}

.readerThanksRow {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.thanksButton,
.rateButton {
  min-width: 210px;
  border: none;
  border-radius: 999px;
  background: #2d2d33;
  color: #f1f1f3;
  font-weight: 900;
}

.thanksButton:hover,
.rateButton:hover {
  background: #3a3a42;
  color: #fff;
}

.thanksActive {
  background: #b43a4a !important;
  color: #fff !important;
}

.readerCommentBox {
  border-top: 1px solid #2a2a2f;
  padding-top: 14px;
}

.readerCommentTools {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.readerCommentTools button {
  border-radius: 8px;
  padding: 6px 12px;
  color: #bfc0c6;
  background: #202126;
}

.readerCommentTools button:last-child {
  margin-left: auto;
}

.readerCommentInputRow {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

.readerCommentBox input {
  width: 100%;
  background: #17181b;
  border-color: #313138;
  color: #f1f1f3;
}

.replyNotice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: #221f24;
  border: 1px solid #3a3036;
  border-radius: 10px;
  color: #f1c4ca;
  padding: 8px 10px;
  margin-bottom: 10px;
}

.replyNotice button {
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  color: #f1c4ca;
}

.pageComments {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.pageComment {
  background: #17181b;
  border: 1px solid #303137;
  border-radius: 12px;
  padding: 10px;
}

.pageCommentReply {
  border-left: 3px solid #ff555f;
}

.pageCommentHeader {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pageCommentAvatar {
  width: 34px;
  height: 34px;
  padding: 0;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #2a2b31;
  border: 1px solid #3a3b42;
  flex: 0 0 34px;
}

.pageCommentAvatar::before {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff555f;
}

.pageCommentAvatar:has(img)::before {
  display: none;
}

.pageCommentAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pageCommentMeta {
  min-width: 0;
}

.pageCommentAuthor {
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  color: #f2f2f4;
  font-weight: 800;
  text-align: left;
}

.pageCommentAuthor:hover {
  transform: none;
  color: #ff6b73;
}

.pageCommentMeta span {
  color: #86868c;
  font-size: 12px;
}

.pageComment p {
  margin: 8px 0 0;
  color: #dcdce2;
  line-height: 1.45;
  white-space: pre-wrap;
}

.pageCommentActions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.pageCommentActions button {
  padding: 4px 8px;
  border: none;
  border-radius: 7px;
  background: #222329;
  color: #aeb0b8;
  font-size: 12px;
}

.pageCommentActions button:hover {
  transform: none;
  color: #fff;
}

.pageCommentActions .deleteCommentButton {
  color: #ff8b92;
}

.pageCommentActions span {
  color: #777983;
  font-size: 12px;
}

.emptyPageComments {
  margin-top: 12px;
  color: #8f9098;
  border: 1px dashed #33343a;
  border-radius: 12px;
  padding: 12px;
}

.readerDrawerOverlay {
  position: fixed;
  inset: 0;
  z-index: 1150;
  background: rgba(0,0,0,0.2);
}

.readerChapterDrawer {
  width: 440px;
  max-width: 100%;
  height: 100vh;
  background: #1b1b1d;
  color: #ececf0;
  border-right: 1px solid #33343a;
  box-shadow: 20px 0 70px rgba(0,0,0,0.55);
  padding: 0;
}

.drawerTop {
  height: 45px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #33343a;
  padding: 0 14px;
}

.drawerTop h2 {
  font-size: 17px;
  margin: 0;
}

.drawerTop button {
  border: none;
  padding: 5px 8px;
}

.drawerTools {
  display: flex;
  gap: 10px;
  padding: 12px 18px;
  border-bottom: 1px solid #33343a;
}

.drawerTools button {
  background: #222329;
  padding: 7px 12px;
}

.drawerChapterList {
  display: grid;
}

.drawerChapterList button {
  border: none;
  border-radius: 0;
  padding: 13px 18px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  text-align: left;
  color: #bfc0c6;
}

.drawerChapterList button:hover,
.drawerChapterActive {
  background: #262629 !important;
  color: #ff4d4d !important;
}

.drawerChapterList b {
  color: #92939a;
  font-weight: 400;
}

.readerSettingsOverlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  justify-content: flex-end;
  background: rgba(0,0,0,0.1);
}

.readerSettingsPanel {
  width: 434px;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: #1a1a1d;
  color: #e8e8ec;
  border-left: 1px solid #33343a;
  padding: 18px 20px 24px;
  box-shadow: -20px 0 70px rgba(0,0,0,0.55);
}

.readerSettingsTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.readerSettingsTop h2 {
  margin: 0;
  font-size: 18px;
}

.readerSettingsTop button {
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  color: #bdbdc2;
}

.readerSettingsNotice {
  background: #242428;
  color: #d2d2d8;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 16px;
}

.readerSettingGroup {
  margin-bottom: 22px;
}

.readerSettingGroup h3,
.rangeBox h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #e2e2e8;
}

.segmented {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  background: #242426;
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
}

.segmented button {
  border: none;
  border-radius: 8px;
  color: #aaaab0;
  padding: 10px 8px;
}

.segmented button:hover {
  background: #38383e;
  color: #fff;
}

.segmented .selected {
  background: #45464d;
  color: #fff;
}

.readerSettingRow,
.rangeBox {
  background: #242426;
  border-radius: 10px;
  padding: 13px 12px;
  margin-bottom: 18px;
}

.readerSettingRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.readerSettingRow b {
  color: #e4e4ea;
}

.readerSettingRow span {
  color: #aaaab0;
}

.rangeBox input {
  width: 100%;
  padding: 0;
  accent-color: #ff4d5d;
}

.readerSwitch {
  width: 36px;
  height: 20px;
  border: none;
  border-radius: 999px;
  background: #3a3a40;
  padding: 2px;
  display: flex;
  align-items: center;
}

.readerSwitch span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  display: block;
  transition: 0.15s;
}

.switchOn {
  background: #ff4d5d;
  justify-content: flex-end;
}

@media (max-width: 900px) {
  .headerInner {
    grid-template-columns: auto auto 1fr auto;
    padding: 10px 12px;
  }

  .headerSearch,
  .themeToggle {
    display: none;
  }

  .catalogMenu {
    width: calc(100vw - 24px);
    grid-template-columns: 1fr;
  }

  .catalogMenuLeft {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .rightSide {
    justify-self: end;
  }

  .burgerLayer {
    right: 12px;
    left: 12px;
  }

  .burgerMenu {
    width: auto;
  }

  .notificationsPanel {
    right: -56px;
    width: calc(100vw - 28px);
  }

  .searchOverlay {
    padding: 18px 12px;
  }

  .searchModal {
    width: 100%;
  }

  .titleHub,
  .settingsPage,
  .settingsGrid2,
  .profileContent,
  .bannerEditRow,
  .statGrid,
  .userInfoTwoCols,
  .titleStatsBlocks,
  .similarGrid {
    grid-template-columns: 1fr;
  }

  .settingsPage {
    max-width: none;
  }

  .imageEditRow {
    grid-template-columns: 1fr 124px;
  }

  .catalogGrid {
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    gap: 14px;
  }

  .continueGrid {
    grid-template-columns: 1fr;
  }

  .userInfoPanel {
    width: 100%;
  }

  .profileHeader {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero h1 {
    font-size: 44px;
  }

  main {
    padding: 16px 12px 40px;
  }

  .readerMain {
    padding: 0;
  }

  .readerTopBar {
    grid-template-columns: 38px 1fr 34px 1fr 34px 34px;
    gap: 4px;
  }

  .readerTopSpacer,
  .readerTopBar .readerIconButton:nth-last-child(4),
  .readerTopBar .readerIconButton:nth-last-child(3),
  .readerTopBar .readerIconButton:nth-last-child(2) {
    display: none;
  }

  .readerPageArea {
    width: 100%;
    padding: 58px 0 0;
  }

  .readerPageImage {
    min-height: 560px;
    border-radius: 0;
  }

  .readerSettingsPanel,
  .readerChapterDrawer {
    width: 100%;
  }

  .readerCommentInputRow {
    grid-template-columns: 1fr;
  }

  .titleStatsBlocks {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .ratingLine,
  .listLine {
    grid-template-columns: minmax(70px, auto) minmax(0, 1fr) 42px;
  }

  .pageComment {
    margin-left: 0 !important;
  }
}

/* AKARI READER COMMENTS THEME FIX START
   Ридер сам выбирает стиль комментариев по настройке readerTheme.
   Светлая тема сайта больше не ломает тёмную тему читалки. */
.readerV2.readerTheme_light .readerCommentBox {
  border-top: 1px solid #d9d9df !important;
  color: #111827 !important;
}

.readerV2.readerTheme_light .readerCommentTools button {
  background: #ffffff !important;
  border: 1px solid #d9d9df !important;
  color: #22242a !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .readerCommentTools button:last-child {
  background: #f1f1f4 !important;
  border-color: #f1f1f4 !important;
  color: #22242a !important;
}

.readerV2.readerTheme_light .readerCommentInputRow input,
.readerV2.readerTheme_light .readerCommentBox input {
  background: #ffffff !important;
  border: 1px solid #d9d9df !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .readerCommentInputRow input::placeholder,
.readerV2.readerTheme_light .readerCommentBox input::placeholder {
  color: #9ca3af !important;
}

.readerV2.readerTheme_light .readerCommentInputRow button {
  background: #ffffff !important;
  border: 1px solid #d9d9df !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .readerCommentInputRow button:disabled {
  color: #c4c7cf !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_light .pageComments {
  gap: 24px !important;
  margin-top: 22px !important;
}

.readerV2.readerTheme_light .pageComment {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .pageCommentReply {
  border-left: 2px solid #ef4444 !important;
  padding-left: 14px !important;
}

.readerV2.readerTheme_light .pageCommentHeader {
  align-items: flex-start !important;
}

.readerV2.readerTheme_light .pageCommentAvatar {
  width: 28px !important;
  height: 28px !important;
  flex: 0 0 28px !important;
  border-radius: 4px !important;
  border: none !important;
  background: #eef0f3 !important;
}

.readerV2.readerTheme_light .pageCommentAuthor {
  color: #111827 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .pageCommentAuthor:hover {
  color: #ef4444 !important;
}

.readerV2.readerTheme_light .pageCommentMeta span {
  color: #8b95a1 !important;
}

.readerV2.readerTheme_light .pageComment p {
  color: #111827 !important;
  margin-top: 10px !important;
}

.readerV2.readerTheme_light .pageCommentActions button {
  background: transparent !important;
  border: none !important;
  color: #ef4444 !important;
  padding: 2px 0 !important;
  border-radius: 0 !important;
  text-transform: lowercase !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_light .pageCommentActions .deleteCommentButton {
  color: #ef4444 !important;
}

.readerV2.readerTheme_light .pageCommentActions button:hover,
.readerV2.readerTheme_light .pageCommentActions .deleteCommentButton:hover {
  color: #c92835 !important;
}

.readerV2.readerTheme_light .pageCommentActions span {
  color: #8b95a1 !important;
}

.readerV2.readerTheme_light .replyNotice {
  background: #fff5f5 !important;
  border: 1px solid #ffd4d4 !important;
  color: #c92835 !important;
}

.readerV2.readerTheme_light .replyNotice button {
  color: #c92835 !important;
}

.readerV2.readerTheme_dark .readerCommentBox {
  border-top: 1px solid #3b3c42 !important;
  color: #dfe3ea !important;
}

.readerV2.readerTheme_dark .readerCommentTools button {
  background: #202126 !important;
  border: 1px solid #3a3b42 !important;
  color: #e8e8ee !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .readerCommentTools button:last-child {
  background: #202126 !important;
  border-color: #3a3b42 !important;
  color: #e8e8ee !important;
}

.readerV2.readerTheme_dark .readerCommentInputRow input,
.readerV2.readerTheme_dark .readerCommentBox input {
  background: #17181d !important;
  border: 1px solid #3a3b42 !important;
  color: #e8e8ee !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .readerCommentInputRow input::placeholder,
.readerV2.readerTheme_dark .readerCommentBox input::placeholder {
  color: #8f96a3 !important;
}

.readerV2.readerTheme_dark .readerCommentInputRow button {
  background: #202126 !important;
  border: 1px solid #3a3b42 !important;
  color: #e8e8ee !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .readerCommentInputRow button:disabled {
  color: #686d77 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_dark .pageComments {
  gap: 24px !important;
  margin-top: 22px !important;
}

.readerV2.readerTheme_dark .pageComment {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  color: #dfe3ea !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .pageCommentReply {
  border-left: 1px solid #4a4a50 !important;
  padding-left: 14px !important;
}

.readerV2.readerTheme_dark .pageCommentHeader {
  align-items: flex-start !important;
}

.readerV2.readerTheme_dark .pageCommentAvatar {
  width: 28px !important;
  height: 28px !important;
  flex: 0 0 28px !important;
  border-radius: 4px !important;
  border: none !important;
  background: #2a2c33 !important;
}

.readerV2.readerTheme_dark .pageCommentAuthor {
  color: #e8e8ee !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .pageCommentAuthor:hover {
  color: #ff6b73 !important;
}

.readerV2.readerTheme_dark .pageCommentMeta span {
  color: #8f96a3 !important;
}

.readerV2.readerTheme_dark .pageComment p {
  color: #dfe3ea !important;
  margin-top: 10px !important;
}

.readerV2.readerTheme_dark .pageCommentActions button {
  background: transparent !important;
  border: none !important;
  color: #ff4b55 !important;
  padding: 2px 0 !important;
  border-radius: 0 !important;
  text-transform: lowercase !important;
  box-shadow: none !important;
}

.readerV2.readerTheme_dark .pageCommentActions .deleteCommentButton {
  color: #ff6b73 !important;
}

.readerV2.readerTheme_dark .pageCommentActions button:hover,
.readerV2.readerTheme_dark .pageCommentActions .deleteCommentButton:hover {
  color: #ff8b92 !important;
}

.readerV2.readerTheme_dark .pageCommentActions span {
  color: #8f96a3 !important;
}

.readerV2.readerTheme_dark .replyNotice {
  background: #241519 !important;
  border: 1px solid #4a2228 !important;
  color: #ff6b73 !important;
}

.readerV2.readerTheme_dark .replyNotice button {
  color: #ff6b73 !important;
}
/* AKARI READER COMMENTS THEME FIX END */


/* real local views, ratings, create menu, tag search */
.createWrap {
  position: relative;
}

.createButton {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
}

.createMenu {
  position: absolute;
  top: 44px;
  right: -12px;
  width: 250px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
  z-index: 80;
}

.createMenu button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  text-align: left;
}

.createMenu button:hover {
  background: var(--soft);
}

.createMenu button span {
  width: 20px;
  color: var(--muted);
  text-align: center;
}

.createMenu button:last-child {
  margin-top: 6px;
  border-top: 1px solid var(--border);
  border-radius: 0 0 8px 8px;
}

.ratingOverlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.58);
  z-index: 150;
}

.ratingModal {
  width: min(520px, calc(100vw - 28px));
  overflow: hidden;
  border-radius: 12px;
  background: #ffffff;
  color: #20232a;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
}

.ratingModalTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.ratingModalTop h2 {
  margin: 0;
  font-size: 18px;
}

.ratingModalTop button {
  background: transparent;
  color: #20232a;
  font-size: 22px;
}

.ratingModalHint {
  padding: 18px;
  background: #e8e8eb;
  color: #8b8d95;
  text-align: center;
  font-weight: 700;
}

.ratingStars {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 8px;
  padding: 24px 20px;
}

.ratingStars button {
  padding: 0;
  background: transparent;
  color: #888a91;
  font-size: 31px;
  transition: transform 0.12s ease, color 0.12s ease;
}

.ratingStars button:hover,
.ratingStars .ratingStarActive {
  color: #ff4242;
  transform: translateY(-1px);
}

.ratingModalActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 20px 20px;
}

.ratingModalActions button {
  height: 44px;
  border-radius: 8px;
  font-weight: 900;
}

.ratingModalActions button:first-child {
  background: #eeeeef;
  color: #2d2f36;
}

.ratingModalActions button:last-child {
  background: #ff3f3a;
  color: #ffffff;
}

.ratingModalActions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tagList button {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 11px;
  background: var(--soft);
  color: var(--text);
  font-weight: 700;
}

.tagList button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.ratingBox b {
  white-space: nowrap;
}


/* AKARI FIX 2026-05-29: clean create menu, rating modal themes, remove fake extra tag */
.createButton {
  width: 36px !important;
  height: 36px !important;
  border-radius: 12px !important;
  padding: 0 !important;
  display: grid !important;
  place-items: center !important;
  background: color-mix(in srgb, var(--panel2) 88%, transparent) !important;
  border: 1px solid var(--border) !important;
  color: var(--text) !important;
  box-shadow: none !important;
}

.createButton:hover {
  border-color: var(--accent) !important;
  color: var(--accent) !important;
  background: color-mix(in srgb, var(--accent) 12%, var(--panel2)) !important;
}

.createButtonSvg {
  width: 18px;
  height: 18px;
  display: block;
}

.createButtonSvg path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
}

.createMenu {
  width: 268px !important;
  padding: 8px !important;
  border-radius: 12px !important;
  background: color-mix(in srgb, var(--panel) 96%, black 4%) !important;
}

.createMenu button {
  display: grid !important;
  grid-template-columns: 30px 1fr !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 11px 12px !important;
  border: 1px solid transparent !important;
  border-radius: 9px !important;
  color: var(--text) !important;
}

.createMenu button:hover {
  background: color-mix(in srgb, var(--accent) 10%, var(--panel2)) !important;
  border-color: color-mix(in srgb, var(--accent) 34%, var(--border)) !important;
}

.createMenu button b {
  font-size: 14px;
  font-weight: 800;
}

.createMenuIcon {
  width: 30px !important;
  height: 30px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 8px !important;
  background: var(--panel2) !important;
  color: var(--muted) !important;
  font-size: 14px !important;
}

.createMenu button:hover .createMenuIcon {
  color: var(--accent) !important;
  background: color-mix(in srgb, var(--accent) 12%, var(--panel2)) !important;
}

.createMenu button:last-child {
  margin-top: 8px !important;
  padding-top: 11px !important;
  border-top: 1px solid var(--border) !important;
  border-radius: 9px !important;
}

.ratingOverlay {
  background: rgba(0, 0, 0, 0.68) !important;
}

.ratingModal {
  background: var(--panel) !important;
  color: var(--text) !important;
  border: 1px solid var(--border) !important;
}

.ratingModalTop {
  border-bottom: 1px solid var(--border) !important;
}

.ratingModalTop button {
  color: var(--text) !important;
}

.ratingModalHint {
  background: var(--panel2) !important;
  color: var(--muted) !important;
}

.ratingStars button {
  color: color-mix(in srgb, var(--muted) 72%, var(--text) 28%) !important;
}

.ratingStars button:hover,
.ratingStars .ratingStarActive {
  color: #ff4545 !important;
}

.ratingModalActions button:first-child {
  background: var(--panel2) !important;
  color: var(--text) !important;
  border: 1px solid var(--border) !important;
}

.ratingModalActions button:last-child {
  background: var(--accent) !important;
  color: #ffffff !important;
}


/* AKARI clean create menu + working title comments/editor */
.cleanCreateMenu {
  width: 236px !important;
  padding: 0 !important;
  border-radius: 6px !important;
  background: #2b2b2e !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  overflow: hidden !important;
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.42) !important;
}

.cleanCreateMenu button {
  height: 45px !important;
  padding: 0 16px !important;
  border-radius: 0 !important;
  gap: 12px !important;
  color: #d2d2d6 !important;
  background: transparent !important;
  font-weight: 500 !important;
}

.cleanCreateMenu button:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #ffffff !important;
  transform: none !important;
}

.cleanCreateMenu button:last-child {
  margin-top: 0 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.cleanCreateMenu .createMenuIcon {
  width: 18px !important;
  height: 18px !important;
  display: grid !important;
  place-items: center !important;
  color: #a7a7ad !important;
  background: transparent !important;
}

.cleanCreateMenu .createMenuIcon svg {
  width: 17px !important;
  height: 17px !important;
  display: block !important;
}

.cleanCreateMenu .createMenuIcon path {
  fill: none !important;
  stroke: currentColor !important;
  stroke-width: 1.9 !important;
  stroke-linecap: round !important;
  stroke-linejoin: round !important;
}

.cleanCreateMenu b {
  font-size: 14px !important;
  font-weight: 500 !important;
}

.commentEditor {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--panel);
}

.commentEditor textarea {
  width: 100%;
  min-height: 84px;
  resize: vertical;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--text);
  padding: 14px;
  font-family: inherit;
  font-size: 15px;
  outline: none;
}

.commentEditor textarea::placeholder {
  color: var(--muted);
}

.commentEditorBottom {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 9px 12px;
}

.commentFormatToolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.commentFormatToolbar button {
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-size: 14px;
  display: grid;
  place-items: center;
}

.commentFormatToolbar button:hover {
  background: var(--soft);
  color: var(--text);
  transform: none;
}

.commentEditorActions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
}

.commentEditorActions button {
  height: 34px;
  padding: 0 15px;
  border-radius: 8px;
  font-weight: 800;
}

.commentCancelButton {
  background: transparent !important;
  color: var(--muted) !important;
  border: none !important;
}

.commentSubmitButton {
  background: var(--accent) !important;
  color: #fff !important;
}

.commentSubmitButton:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.titleCommentsPanel {
  display: grid;
  gap: 14px;
}

.titleCommentTools button:last-child {
  margin-left: auto;
  text-transform: uppercase;
  font-size: 11px;
}

.titleCommentsList {
  gap: 22px !important;
}

.titleComment {
  display: grid !important;
  grid-template-columns: 1fr auto;
  gap: 14px;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
}

.titleCommentVote {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 4px;
  color: var(--muted);
  min-width: 40px;
}

.titleCommentVote button {
  width: 24px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--muted);
}

.titleCommentVote b {
  color: #22c55e;
  font-size: 13px;
}

.pageCommentBody {
  min-width: 0;
  grid-column: 1;
}

.commentText {
  margin: 10px 0 0;
  color: var(--text);
  line-height: 1.55;
  white-space: pre-wrap;
}

.commentText strong {
  font-weight: 900;
}

.commentText .commentSpoiler {
  background: var(--soft);
  color: transparent;
  border-radius: 4px;
  padding: 0 4px;
  transition: color 0.15s ease;
}

.commentText .commentSpoiler:hover {
  color: var(--text);
}

.readerCommentBox .commentEditor {
  background: transparent;
}

.readerV2.readerTheme_dark .commentEditor {
  background: #17181d !important;
  border-color: #3a3b42 !important;
}

.readerV2.readerTheme_dark .commentEditor textarea {
  color: #e8e8ee !important;
}

.readerV2.readerTheme_dark .commentFormatToolbar button,
.readerV2.readerTheme_dark .commentCancelButton {
  color: #8f96a3 !important;
}

.readerV2.readerTheme_dark .commentFormatToolbar button:hover {
  background: #24252b !important;
  color: #e8e8ee !important;
}

.readerV2.readerTheme_light .commentEditor {
  background: #ffffff !important;
  border-color: #d9d9df !important;
}

.readerV2.readerTheme_light .commentEditor textarea {
  color: #111827 !important;
}

@media (max-width: 720px) {
  .commentEditorBottom {
    align-items: stretch;
    flex-direction: column;
  }

  .commentEditorActions {
    justify-content: flex-end;
  }
}



/* v4 clean create menu, compact comments and catalog filters */
.createMenu.cleanCreateMenu {
  width: 250px !important;
  padding: 6px 0 !important;
  border-radius: 5px !important;
  background: #2d2d2f !important;
  border: 1px solid #38383c !important;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38) !important;
}

.createMenu.cleanCreateMenu button {
  height: 38px !important;
  min-height: 38px !important;
  padding: 0 16px !important;
  display: grid !important;
  grid-template-columns: 18px 1fr !important;
  align-items: center !important;
  gap: 12px !important;
  border-radius: 0 !important;
  border: none !important;
  background: transparent !important;
  color: #c9c9cf !important;
}

.createMenu.cleanCreateMenu button:hover {
  background: #38383c !important;
  color: #ffffff !important;
}

.createMenu.cleanCreateMenu button:last-child {
  margin-top: 6px !important;
  padding-top: 0 !important;
  border-top: 1px solid #3c3c41 !important;
}

.cleanCreateMenu .createMenuIcon {
  width: 18px !important;
  height: 18px !important;
  background: transparent !important;
  color: #aaaab0 !important;
  border: none !important;
  border-radius: 0 !important;
}

.cleanCreateMenu .createMenuIcon svg {
  width: 16px !important;
  height: 16px !important;
}

.cleanCreateMenu b {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: inherit !important;
}

.compactCommentEditor {
  border-radius: 6px !important;
  background: transparent !important;
}

.commentEditable {
  width: 100%;
  min-height: 82px;
  max-height: 180px;
  overflow: auto;
  padding: 14px;
  color: var(--text);
  outline: none;
  white-space: pre-wrap;
  line-height: 1.5;
}

.commentEditable:empty::before {
  content: attr(data-placeholder);
  color: var(--muted);
  pointer-events: none;
}

.commentEditable blockquote {
  margin: 6px 0;
  padding-left: 10px;
  border-left: 3px solid var(--accent);
  color: var(--muted);
}

.commentEditor textarea {
  display: none !important;
}

.commentEditorBottom {
  min-height: 42px !important;
  padding: 7px 12px !important;
}

.commentFormatToolbar {
  gap: 6px !important;
}

.commentFormatToolbar button {
  width: 24px !important;
  height: 24px !important;
  border-radius: 5px !important;
  color: #aeb0b8 !important;
}

.commentEditorActions button {
  height: 32px !important;
  padding: 0 14px !important;
}

.titleCommentsPanel {
  gap: 12px !important;
}

.titleCommentsList {
  gap: 14px !important;
  margin-top: 8px !important;
}

.titleComment {
  grid-template-columns: 1fr 42px !important;
  gap: 10px !important;
  padding: 0 !important;
}

.titleComment .pageCommentHeader {
  gap: 8px !important;
}

.titleComment .pageCommentAvatar {
  width: 28px !important;
  height: 28px !important;
  flex-basis: 28px !important;
  border-radius: 6px !important;
}

.titleComment .pageCommentAuthor {
  font-size: 14px !important;
}

.titleComment .pageCommentMeta span {
  font-size: 12px !important;
}

.titleComment .commentText {
  margin-top: 8px !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
}

.titleComment .pageCommentActions {
  margin-top: 8px !important;
  gap: 10px !important;
}

.titleComment .pageCommentActions button {
  padding: 0 !important;
  background: transparent !important;
  color: var(--accent) !important;
}

.titleCommentVote {
  min-width: 34px !important;
  gap: 2px !important;
}

.titleCommentVote button {
  height: 17px !important;
}

.titleCommentVote b {
  font-size: 12px !important;
}

.clickableInfoLine {
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
}

.clickableInfoLine:hover b {
  color: var(--accent);
}

.catalogLayout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 22px;
  align-items: start;
}

.catalogGridMain {
  min-width: 0;
}

.activeCatalogFilters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.activeCatalogFilters span {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--soft);
  color: var(--text);
  font-size: 13px;
}

.activeCatalogFilters button {
  min-height: 28px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 13px;
}

.catalogFilterPanel {
  position: sticky;
  top: 86px;
  display: grid;
  gap: 18px;
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--panel);
}

.catalogFilterGroup {
  display: grid;
  gap: 10px;
}

.catalogFilterTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--muted);
  font-size: 13px;
}

.catalogFilterTitle b {
  color: var(--text);
  font-size: 14px;
}

.catalogFilterChips,
.catalogFilterChecks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.catalogFilterChips button,
.catalogFilterChecks button {
  min-height: 30px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--soft);
  color: var(--muted);
  font-size: 13px;
}

.catalogFilterChips button:hover,
.catalogFilterChecks button:hover,
.selectedFilterChip,
.selectedCatalogCheck {
  border-color: var(--accent) !important;
  color: var(--text) !important;
  background: color-mix(in srgb, var(--accent) 18%, var(--soft)) !important;
}

.catalogFilterActions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.catalogFilterActions button:last-child {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

@media (max-width: 980px) {
  .catalogLayout {
    grid-template-columns: 1fr;
  }

  .catalogFilterPanel {
    position: static;
  }
}



/* v5 clean fixes: catalog menu, title info rows, catalog filters table */
.catalogMenuSimple {
  width: 260px !important;
  grid-template-columns: 1fr !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.catalogMenuSimple .catalogMenuLeft {
  width: 100% !important;
  background: var(--panel) !important;
  padding: 8px !important;
}

.catalogMenuSimple .catalogMenuLeft button {
  min-height: 38px !important;
  padding: 9px 12px !important;
  color: var(--muted) !important;
}

.catalogMenuSimple .catalogMenuLeft button:hover {
  color: var(--text) !important;
  background: var(--soft) !important;
}

.titleInfoCard {
  padding: 14px !important;
  gap: 0 !important;
}

.titleInfoCard .infoLine {
  min-height: 40px !important;
  display: grid !important;
  grid-template-columns: minmax(92px, auto) 1fr !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 8px 0 !important;
  border-bottom: 1px solid color-mix(in srgb, var(--border) 75%, transparent) !important;
  text-align: left !important;
}

.titleInfoCard .infoLine:last-child {
  border-bottom: none !important;
}

.titleInfoCard .infoLine span {
  margin: 0 !important;
  font-size: 13px !important;
  color: var(--muted) !important;
}

.titleInfoCard .infoLine b {
  justify-self: end !important;
  text-align: right !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: var(--text) !important;
}

.titleInfoCard .clickableInfoLine {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
  border-radius: 0 !important;
}

.titleInfoCard .clickableInfoLine:hover {
  background: color-mix(in srgb, var(--accent) 8%, transparent) !important;
}

.catalogLayout {
  grid-template-columns: minmax(0, 1fr) 360px !important;
  gap: 24px !important;
}

.catalogGridMain {
  align-content: start !important;
  grid-template-columns: repeat(auto-fill, minmax(150px, 170px)) !important;
  justify-content: start !important;
}

.catalogFilterTable {
  position: sticky !important;
  top: 86px !important;
  display: grid !important;
  gap: 16px !important;
  padding: 16px !important;
  border-radius: 12px !important;
  background: color-mix(in srgb, var(--panel) 96%, black 4%) !important;
}

.catalogFilterOpenRow {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  min-height: 26px !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  color: var(--muted) !important;
  text-align: left !important;
}

.catalogFilterOpenRow b,
.catalogRangeGroup > b,
.catalogCheckGroup > b {
  font-size: 14px !important;
  font-weight: 800 !important;
  color: var(--muted) !important;
}

.catalogFilterOpenRow span {
  font-size: 13px !important;
  color: var(--muted) !important;
}

.catalogRangeGroup,
.catalogCheckGroup {
  display: grid !important;
  gap: 10px !important;
}

.catalogRangeInputs {
  display: grid !important;
  grid-template-columns: 1fr 18px 1fr !important;
  align-items: center !important;
  gap: 8px !important;
}

.catalogRangeInputs input {
  width: 100% !important;
  height: 30px !important;
  padding: 5px 9px !important;
  border-radius: 6px !important;
  border: 1px solid var(--border) !important;
  background: var(--panel2) !important;
  color: var(--text) !important;
}

.catalogRangeInputs span {
  color: var(--muted) !important;
  text-align: center !important;
}

.catalogCheckGrid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  column-gap: 18px !important;
  row-gap: 9px !important;
}

.catalogCheck {
  min-height: 24px !important;
  padding: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 9px !important;
  border: none !important;
  background: transparent !important;
  color: var(--muted) !important;
  text-align: left !important;
  font-size: 14px !important;
  box-shadow: none !important;
}

.catalogCheck span {
  width: 14px !important;
  height: 14px !important;
  flex: 0 0 14px !important;
  border-radius: 3px !important;
  border: 2px solid color-mix(in srgb, var(--muted) 72%, transparent) !important;
  background: transparent !important;
}

.catalogCheck:hover {
  color: var(--text) !important;
}

.catalogCheck.selectedCatalogCheck {
  color: var(--text) !important;
  background: transparent !important;
  border-color: transparent !important;
}

.catalogCheck.selectedCatalogCheck span {
  border-color: var(--accent) !important;
  background: var(--accent) !important;
  box-shadow: inset 0 0 0 3px var(--panel) !important;
}

.catalogFilterTable .catalogFilterActions {
  position: sticky !important;
  bottom: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 10px !important;
  padding-top: 8px !important;
  background: color-mix(in srgb, var(--panel) 96%, black 4%) !important;
}

@media (max-width: 980px) {
  .catalogLayout {
    grid-template-columns: 1fr !important;
  }

  .catalogFilterTable {
    position: static !important;
  }
}



/* v19 home popular hero replaces old Akari text banner */
.homePopularHero {
  border: 1px solid var(--border);
  border-radius: 22px;
  background:
    radial-gradient(circle at top left, rgba(255, 77, 90, 0.16), transparent 34%),
    linear-gradient(180deg, color-mix(in srgb, var(--panel) 96%, white 4%), var(--panel));
  box-shadow: 0 16px 45px var(--shadow);
  padding: 18px;
  margin-bottom: 18px;
  overflow: hidden;
}

.homePopularTop {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 16px;
}

.homePopularTop h1 {
  margin: 0 0 6px;
  font-size: 26px;
  line-height: 1.1;
  color: var(--text);
}

.homePopularTop p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.homePopularCatalogButton {
  min-width: max-content;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--button);
  color: var(--text);
  padding: 10px 14px;
  font-weight: 800;
}

.homePopularCatalogButton:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.homePopularGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 14px;
}

.homePopularCard {
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--text);
  padding: 0;
  text-align: left;
}

.homePopularPoster {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  overflow: hidden;
  background: #1b1d24;
  border: 1px solid var(--border);
}

.homePopularPoster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.18s ease;
}

.homePopularCard:hover .homePopularPoster img {
  transform: scale(1.04);
}

.homePopularRating,
.homePopularHot,
.homePopularChapter {
  position: absolute;
  z-index: 2;
  border-radius: 8px;
  padding: 4px 7px;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  backdrop-filter: blur(8px);
}

.homePopularRating {
  top: 8px;
  left: 8px;
  background: rgba(44, 196, 83, 0.92);
  color: white;
}

.homePopularHot {
  top: 8px;
  right: 8px;
  background: rgba(255, 77, 90, 0.94);
  color: white;
}

.homePopularChapter {
  left: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, 0.62);
  color: white;
}

.homePopularInfo {
  display: grid;
  gap: 4px;
  padding-top: 9px;
}

.homePopularInfo b {
  font-size: 14px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.homePopularInfo span {
  font-size: 12px;
  color: var(--muted);
}

.app.light .homePopularHero {
  background:
    radial-gradient(circle at top left, rgba(255, 77, 90, 0.10), transparent 34%),
    #ffffff;
}

@media (max-width: 760px) {
  .homePopularTop {
    display: grid;
  }

  .homePopularGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}


/* v6 fixes: catalog home vs titles filter page and normal typing direction */
.catalogSectionHome .catalogGridHomeOnly {
  grid-template-columns: repeat(auto-fill, minmax(150px, 170px)) !important;
  justify-content: start !important;
}

.commentEditable {
  direction: ltr !important;
  unicode-bidi: plaintext !important;
  text-align: left !important;
}


/* v7 fixes: real multi-select catalog filters and working list search */
.catalogResultsCol {
  min-width: 0;
  display: grid;
  gap: 14px;
  align-content: start;
}

.catalogSearchLine {
  height: 38px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--panel2);
  color: var(--muted);
}

.catalogSearchLine input {
  width: 100%;
  height: 34px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text);
  outline: none;
}

.catalogSearchLine button {
  border: none;
  background: transparent;
  color: var(--muted);
  padding: 4px 7px;
  font-size: 18px;
}

.emptyCatalogResults {
  min-height: 190px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  border: 1px dashed var(--border);
  border-radius: 12px;
  color: var(--muted);
  background: color-mix(in srgb, var(--panel2) 65%, transparent);
}

.emptyCatalogResults h3,
.emptyCatalogResults p {
  margin: 0;
}

.catalogDropdownFilter {
  border-bottom: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  padding-bottom: 8px;
}

.catalogDropdownFilter summary {
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  list-style: none;
  cursor: pointer;
  color: var(--text);
}

.catalogDropdownFilter summary::-webkit-details-marker {
  display: none;
}

.catalogDropdownFilter summary b {
  font-size: 14px;
}

.catalogDropdownFilter summary span {
  max-width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--muted);
  font-size: 13px;
}

.catalogDropdownBody {
  max-height: 310px;
  overflow: auto;
  margin-top: 8px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel2);
}

.catalogMiniSearch {
  width: 100%;
  height: 38px;
  border: none !important;
  border-bottom: 1px solid var(--border) !important;
  border-radius: 0 !important;
  background: transparent !important;
  color: var(--text) !important;
}

.catalogStrictRow,
.catalogCheckboxLine {
  min-height: 30px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 10px;
  color: var(--muted);
  font-size: 14px;
  cursor: pointer;
}

.catalogStrictRow {
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.catalogStrictRow em {
  margin-left: auto;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--soft);
  color: var(--muted);
  font-style: normal;
}

.catalogCheckboxLine:hover {
  background: color-mix(in srgb, var(--accent) 9%, transparent);
  color: var(--text);
}

.catalogCheckboxLine input,
.catalogStrictRow input {
  width: 15px;
  height: 15px;
  accent-color: var(--accent);
}

.compactCatalogCheck {
  padding: 0;
}

.catalogCheckGrid .compactCatalogCheck {
  min-height: 24px;
}

.catalogFilterTable {
  max-height: calc(100vh - 155px);
  overflow: auto;
}

.catalogFilterActions button:last-child {
  background: var(--accent) !important;
  color: #fff !important;
}

.activeCatalogFilters span {
  max-width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}



/* v8 fixes: search modal, catalog sort dropdown and burger notification */
.catalogTopControls {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: start;
  margin-bottom: 16px;
}

.catalogSortDropdown {
  position: relative;
  z-index: 12;
}

.catalogSortDropdown summary {
  list-style: none;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: #d7d9df;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.catalogSortDropdown summary::-webkit-details-marker {
  display: none;
}

.catalogSortMenu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 230px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.12);
  background: #2b2b2f;
  box-shadow: 0 18px 45px rgba(0,0,0,0.35);
  display: grid;
  gap: 2px;
}

.catalogSortMenu button {
  width: 100%;
  border: 0;
  background: transparent;
  color: #cfd1d7;
  border-radius: 8px;
  padding: 9px 10px;
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: center;
  gap: 8px;
  text-align: left;
  cursor: pointer;
}

.catalogSortMenu button:hover {
  background: rgba(255,255,255,0.06);
}

.catalogSortMenu button span {
  width: 14px;
  height: 14px;
  border: 1px solid #8d919b;
  border-radius: 50%;
  display: block;
}

.catalogSortMenu button.sortSelected span {
  border: 4px solid #ff454f;
}

.catalogSortMenu i {
  height: 1px;
  margin: 6px 10px;
  background: rgba(255,255,255,0.12);
}

.light .catalogSortDropdown summary {
  background: #ffffff;
  border-color: #d8deea;
  color: #1f2937;
}

.light .catalogSortMenu {
  background: #ffffff;
  border-color: #d8deea;
}

.light .catalogSortMenu button {
  color: #1f2937;
}

.light .catalogSortMenu button:hover {
  background: #f2f5fa;
}

@media (max-width: 760px) {
  .catalogTopControls {
    grid-template-columns: 1fr;
  }

  .catalogSortDropdown summary,
  .catalogSortDropdown {
    width: 100%;
  }

  .catalogSortMenu {
    left: 0;
    right: auto;
    width: 100%;
  }
}


.akariToastError {
  position: fixed;
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: min(620px, calc(100vw - 32px));
  padding: 16px 18px;
  border-radius: 10px;
  background: #25272d;
  color: #e8e8ee;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
}

.akariToastError span {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #ff6670;
  color: #ffffff;
  font-weight: 900;
}

.akariToastError p {
  margin: 0;
  font-weight: 700;
}

.notificationsPage {
  max-width: 1180px;
  margin: 0 auto;
  padding: 28px 20px 60px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 18px;
}

.notificationsSidebar {
  height: fit-content;
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  overflow: hidden;
}

.notificationsFilterTitle {
  padding: 12px 16px 8px;
  color: var(--muted);
  font-weight: 800;
}

.notificationsFilterTitle.withLine {
  margin-top: 8px;
  border-top: 1px solid var(--border);
}

.notificationsSidebar button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 0;
  justify-content: flex-start;
  background: transparent;
  color: var(--text);
  border: none;
}

.notificationsSidebar button:hover,
.notificationsSidebar .activeListFilter {
  background: rgba(255, 255, 255, 0.04);
}

.radioDot,
.radioDotActive {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--muted);
  display: inline-block;
}

.radioDotActive {
  border-color: #ff4b55;
  box-shadow: inset 0 0 0 4px var(--panel), inset 0 0 0 9px #ff4b55;
}

.notificationsMainPage {
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid var(--border);
  overflow: hidden;
}

.notificationsTabs {
  display: flex;
  align-items: center;
  gap: 0;
  border-bottom: 1px solid var(--border);
}

.notificationsTabs button {
  padding: 14px 12px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--muted);
  position: relative;
}

.notificationsTabs button.activeTab {
  color: var(--text);
}

.notificationsTabs button.activeTab::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  background: #ff4b55;
}

.notificationsTabs span {
  font-size: 11px;
  color: var(--muted);
  margin-left: 3px;
}

.notificationsSearchLine {
  margin: 12px 14px;
  height: 42px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.12);
  color: var(--muted);
}

.notificationsSearchLine input {
  background: transparent;
  border: none;
  color: var(--text);
  outline: none;
}

.notificationFeedItem {
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 12px;
  padding: 14px;
  border-top: 1px solid var(--border);
}

.notificationFeedAvatar {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: linear-gradient(135deg, #34151a, #101116);
  position: relative;
}

.notificationFeedAvatar span {
  position: absolute;
  right: -3px;
  top: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff4b55;
}

.notificationFeedTop {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.notificationFeedTop b {
  color: var(--text);
}

.notificationFeedTop span {
  color: var(--muted);
  font-size: 12px;
}

.notificationFeedItem p {
  margin: 5px 0 0;
  color: var(--text);
  line-height: 1.35;
}

.app.light .notificationsSearchLine {
  background: #ffffff;
}

@media (max-width: 760px) {
  .notificationsPage {
    grid-template-columns: 1fr;
  }
}


.profileFeedPage {
  display: grid;
  grid-template-columns: 245px 1fr;
  gap: 18px;
  max-width: 1180px;
  margin: 24px auto;
  padding: 0 16px;
}

.profileFeedSidebar {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px;
  height: fit-content;
  position: sticky;
  top: 80px;
}

.profileFeedSidebar button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 0;
  color: var(--text);
  padding: 9px 4px;
  text-align: left;
}

.profileFeedMain {
  min-width: 0;
}

.profileFeedTopTabs {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px 10px 0 0;
  padding: 0 16px;
  min-height: 52px;
  overflow: hidden;
}

.profileFeedTopTabs button {
  background: transparent;
  border: 0;
  color: var(--muted);
  padding: 16px 0 14px;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.profileFeedTopTabs .activeTab {
  color: var(--text);
  border-bottom-color: var(--accent);
}

.profileFeedSearch {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-top: 0;
  padding: 14px 16px;
}

.profileFeedSearch input {
  width: 100%;
  height: 42px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--input);
  color: var(--text);
  padding: 0 12px;
}

.profileCommentFeed {
  background: var(--panel);
  border: 1px solid var(--border);
  border-top: 0;
  border-radius: 0 0 10px 10px;
}

.profileCommentItem {
  padding: 16px;
  border-bottom: 1px solid var(--border);
}

.profileCommentItemContext {
  color: var(--muted);
  margin-bottom: 12px;
}

.profileCommentItemContext button {
  background: transparent;
  border: 0;
  color: var(--text);
  padding: 0;
  font-weight: 700;
}

.profileCommentAuthorRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.profileCommentAuthorRow span:last-child {
  color: var(--muted);
  font-size: 13px;
}

.profileCommentMiniAvatar {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--chip);
  display: inline-flex;
}

.profileCommentMiniAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileCommentItem p {
  margin: 0;
  color: var(--text);
  line-height: 1.45;
}

.historyOnlyPage {
  grid-template-columns: 1fr;
}

.historyFeedMain {
  max-width: 1180px;
  margin: 0 auto;
  width: 100%;
}

.historyGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-top: 0;
  border-radius: 0 0 10px 10px;
  padding: 16px;
}

.historyItem {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 12px;
  align-items: center;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  text-align: left;
  color: var(--text);
}

.historyItem img {
  width: 64px;
  height: 86px;
  border-radius: 6px;
  object-fit: cover;
}

.historyItem span {
  display: grid;
  gap: 5px;
}

.historyItem small,
.historyItem em {
  color: var(--muted);
  font-style: normal;
}

@media (max-width: 900px) {
  .profileFeedPage {
    grid-template-columns: 1fr;
  }

  .profileFeedSidebar {
    position: static;
  }

  .historyGrid {
    grid-template-columns: 1fr;
  }
}


/* v11: light theme create menu + notification settings page */
.app.light .createMenu.cleanCreateMenu {
  background: #ffffff !important;
  border: 1px solid #d8deea !important;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.14) !important;
}

.app.light .createMenu.cleanCreateMenu button {
  color: #394150 !important;
  background: transparent !important;
}

.app.light .createMenu.cleanCreateMenu button:hover {
  background: #f2f5f9 !important;
  color: #111827 !important;
}

.app.light .createMenu.cleanCreateMenu button:last-child {
  border-top: 1px solid #e5e9f0 !important;
}

.app.light .cleanCreateMenu .createMenuIcon {
  color: #6b7280 !important;
}

.notificationSettingsPage {
  display: grid;
  gap: 16px;
}

.notificationBrowserCard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.notificationBrowserCard p {
  margin: -6px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.notificationSettingsCard {
  display: grid;
  gap: 12px;
}

.notificationCheckRow {
  display: flex;
  align-items: center;
  gap: 10px;
  color: color-mix(in srgb, var(--text) 92%, var(--muted));
  font-size: 15px;
  line-height: 1.35;
}

.notificationCheckRow input {
  width: 17px;
  height: 17px;
  accent-color: var(--accent);
  flex: 0 0 17px;
}

.notificationCheckRow em {
  margin-left: 4px;
  padding: 3px 8px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--panel2) 82%, var(--accent) 8%);
  color: var(--muted);
  font-style: normal;
  font-size: 12px;
}

.notificationListGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(160px, 1fr));
  gap: 14px 28px;
}

.notificationSaveRow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.notificationSaveRow button {
  width: fit-content;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 16px;
  color: var(--text);
  background: color-mix(in srgb, var(--panel2) 92%, black 8%);
}

.notificationSaveRow span {
  color: var(--accent);
  font-size: 14px;
}

@media (max-width: 820px) {
  .notificationBrowserCard {
    display: grid;
  }

  .notificationListGrid {
    grid-template-columns: 1fr;
  }
}

.notificationFeedItem .notificationIconAvatar {
  width: 52px;
  height: 52px;
}

.notificationFeedItem .notificationIconAvatar svg {
  width: 25px;
  height: 25px;
}

.app.light .notificationsPanel {
  background: #ffffff;
  border-color: #d8dee8;
  color: #1f2937;
}

.app.light .libNotificationsTop,
.app.light .notificationPanelTabs,
.app.light .notificationItem,
.app.light .showAllNotificationsButton {
  border-color: #d8dee8;
}

.app.light .libNotificationsTop h3,
.app.light .notificationPanelTabs .activeTab,
.app.light .notificationItem h4 {
  color: #111827;
}

.app.light .notificationPanelTabs button,
.app.light .notificationItem span,
.app.light .showAllNotificationsButton,
.app.light .emptyBellNotifications {
  color: #6b7280;
}

.app.light .notificationItem p {
  color: #374151;
}

.app.light .notificationItem:hover,
.app.light .showAllNotificationsButton:hover {
  background: #f5f7fb;
}



/* v15: HentaiLib-like create title page and clickable notification rows */
.notificationItemButton,
.notificationFeedButton {
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.notificationItemButton:hover,
.notificationFeedButton:hover {
  background: rgba(255, 255, 255, 0.035) !important;
}

.createTitlePage {
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 18px 70px;
}

.createTitleForm {
  background: #1c1c1f;
  border: 1px solid #2d2f36;
  border-radius: 8px;
  padding: 20px 22px 0;
  color: #d8dde8;
}

.createTitleForm h2 {
  margin: 0 0 28px;
  font-size: 22px;
}

.createUploadStack {
  display: grid;
  gap: 8px;
  width: 150px;
  margin-bottom: 18px;
}

.createUploadLabel,
.createField,
.createAddTop span,
.createSection h3 {
  color: #9fa7b5;
  font-size: 13px;
}

.createUploadBox {
  position: relative;
  display: grid;
  place-items: center;
  width: 150px;
  border: 2px dashed #484b54;
  border-radius: 6px;
  color: #a9b0bd;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.createCoverUpload { height: 210px; }
.createBgUpload { height: 150px; }

.createUploadBox input {
  display: none;
}

.createUploadBox img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.createField {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.createField input,
.createField textarea,
.createField select,
.createAddBox,
.createDescriptionBox textarea {
  width: 100%;
  background: #1b1c1f;
  border: 1px solid #3a3d45;
  border-radius: 5px;
  color: #eef1f7;
  padding: 10px 12px;
  outline: none;
}

.createField textarea {
  min-height: 70px;
  resize: vertical;
}

.createGrid4,
.createGrid3 {
  display: grid;
  gap: 12px;
  align-items: end;
}

.createGrid4 { grid-template-columns: repeat(4, 1fr); }
.createGrid3 { grid-template-columns: repeat(3, 1fr); }

.createSection {
  display: grid;
  gap: 10px;
  margin: 10px 0 26px;
}

.createSection h3 {
  margin: 0;
}

.createSection label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b9c0cb;
}

.createSection input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #ff424b;
}

.createAddLine {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.createAddTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.createSmallLink {
  border: none;
  background: transparent;
  color: #ff4b55;
  padding: 0;
}

.createAddBox {
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}

.createAddBoxWrap {
  position: relative;
}

.createAddBox button.createAddButton {
  background: rgba(255, 66, 75, 0.10);
  border: 1px solid rgba(255, 66, 75, 0.15);
  color: #ff737b;
  border-radius: 5px;
  padding: 7px 12px;
  font-weight: 600;
}

.createSelectedChips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.createSelectedChips button {
  border: 1px solid #464a54;
  background: #24262b;
  color: #d7dde8;
  border-radius: 6px;
  padding: 5px 8px;
  font-size: 12px;
  font-weight: 600;
}

.createPickerDropdown {
  position: absolute;
  z-index: 30;
  left: 0;
  top: calc(100% + 5px);
  width: min(340px, 100%);
  max-height: 330px;
  overflow: hidden;
  background: #343438;
  border: 1px solid #42434a;
  border-radius: 6px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.42);
}

.createPickerSearch {
  height: 44px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-bottom: 1px solid #45464d;
  color: #9aa2af;
}

.createPickerSearch input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: #eef1f7;
  outline: none;
}

.createPickerOptions {
  max-height: 280px;
  overflow-y: auto;
  padding: 6px 0;
}

.createPickerOptions button {
  width: 100%;
  min-height: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: transparent;
  color: #d3d8e2;
  padding: 7px 12px;
  text-align: left;
}

.createPickerOptions button:hover {
  background: rgba(255, 255, 255, 0.06);
}

.emptyBox,
.checkedBox {
  width: 15px;
  height: 15px;
  border-radius: 3px;
  border: 2px solid #8b909b;
  flex: 0 0 15px;
}

.checkedBox {
  border-color: #ff4b55;
  background: #ff4b55;
  box-shadow: inset 0 0 0 3px #343438;
}

.createPickerEmpty {
  padding: 22px 18px;
  color: #aab1bd;
  text-align: center;
  font-weight: 700;
  line-height: 1.35;
}

.createDescriptionBox {
  border: 1px solid #3a3d45;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 28px;
}

.createDescriptionToolbar {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border-bottom: 1px solid #3a3d45;
}

.createDescriptionToolbar button {
  background: transparent;
  border: none;
  color: #bdc4d0;
  padding: 0 4px;
}

.createDescriptionToolbar span {
  width: 1px;
  height: 18px;
  background: #3a3d45;
}

.createDescriptionBox textarea {
  border: none;
  border-radius: 0;
  min-height: 120px;
  resize: vertical;
}

.createSubmitRow {
  margin: 18px -22px 0;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #30333a;
  background: #18191c;
}

.createSubmitButton {
  background: #e02a32;
  border: none;
  color: #fff;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 900;
}

.createSubmitRow span {
  background: #202833;
  color: #91b4db;
  border-radius: 6px;
  padding: 9px 12px;
  font-size: 13px;
}

.createSubmitRow b {
  color: #7ee787;
  font-size: 13px;
}

.mySubmissionsPage {
  max-width: 980px;
}

.app.light .createTitleForm,
.app.light .createSubmitRow {
  background: #ffffff;
  border-color: #d7dce5;
  color: #172033;
}

.app.light .createField input,
.app.light .createField textarea,
.app.light .createField select,
.app.light .createAddBox,
.app.light .createDescriptionBox textarea {
  background: #f8fafc;
  border-color: #d7dce5;
  color: #172033;
}

@media (max-width: 860px) {
  .createGrid4,
  .createGrid3 {
    grid-template-columns: 1fr;
  }
}


.app.light .createPickerDropdown {
  background: #ffffff;
  border-color: #d8deea;
}
.app.light .createPickerSearch {
  border-color: #d8deea;
  color: #6b7280;
}
.app.light .createPickerSearch input {
  color: #111827;
}
.app.light .createPickerOptions button {
  color: #273142;
}
.app.light .createPickerOptions button:hover {
  background: #f3f6fb;
}
.app.light .checkedBox {
  box-shadow: inset 0 0 0 3px #ffffff;
}
.app.light .createPickerEmpty {
  color: #6b7280;
}
.app.light .createSelectedChips button {
  background: #f3f6fb;
  border-color: #d8deea;
  color: #273142;
}

/* AKARI v17: real rating/list stats, readable light nicknames, friends page */
.app.light .pageCommentAuthor,
.app.light .profileCommentAuthorRow b,
.app.light .profileMainInfo h2,
.app.light .friendInfo b {
  color: #111827 !important;
}

.titleStatsBlocks .ratingLine i {
  min-width: 0;
}

.friendsPage {
  max-width: 1120px;
  margin: 0 auto;
}

.friendsMain {
  width: 100%;
}

.friendsTopTabs {
  margin-bottom: 14px;
}

.friendsTabs {
  display: flex;
  gap: 16px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.friendsTabs button {
  border: none;
  background: transparent;
  color: #c6cad3;
  padding: 8px 10px;
  border-radius: 8px;
}

.friendsTabs button span {
  color: #8d95a3;
  margin-left: 6px;
}

.friendsTabs .activeFriendTab {
  background: rgba(255,255,255,0.06);
  color: #ffffff;
}

.friendsSearch {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px;
  margin: 14px;
  height: 42px;
  padding: 0 14px;
  border: 1px solid #343842;
  border-radius: 8px;
  background: #17191f;
  color: #8d95a3;
}

.friendsSearch input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #e8eaf0;
  font-size: 15px;
}

.friendsGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 0 14px 18px;
}

.friendCard {
  min-width: 0;
  display: grid;
  grid-template-columns: 58px 1fr auto;
  align-items: center;
  gap: 10px;
  background: #1c1d22;
  border: 1px solid #2d3038;
  border-radius: 8px;
  padding: 9px;
}

.friendAvatar {
  width: 58px;
  height: 58px;
  padding: 0;
  border: none;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
}

.friendAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friendInfo {
  min-width: 0;
  display: grid;
  gap: 4px;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
}

.friendInfo b {
  color: #e9edf5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friendInfo span {
  color: #9aa2af;
  font-size: 12px;
}

.friendActions {
  display: flex;
  gap: 8px;
}

.friendActions button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #c9ced8;
}

.friendActions button:hover {
  background: rgba(255,255,255,0.07);
  color: #ff5b66;
}

.friendsEmpty {
  margin: 14px;
}

.app.light .friendsTabs,
.app.light .friendsSearch,
.app.light .friendCard {
  border-color: #d7dce5;
}

.app.light .friendsTabs .activeFriendTab {
  background: #eef2ff;
  color: #1d4ed8;
}

.app.light .friendsSearch,
.app.light .friendCard {
  background: #ffffff;
}

.app.light .friendsSearch input {
  color: #111827;
}

@media (max-width: 920px) {
  .friendsGrid {
    grid-template-columns: 1fr;
  }
}


/* AKARI v18: fixed friends page layout, cleaner create-title buttons, decorative Akari logo */
.akariLogo {
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 4px;
  color: var(--accent);
  font-size: 32px;
  line-height: 1;
  letter-spacing: 0.2px;
  text-shadow:
    0 0 18px color-mix(in srgb, var(--accent) 42%, transparent),
    0 2px 0 rgba(0, 0, 0, 0.3);
}

.akariLogo::after {
  left: 7px;
  bottom: -4px;
  width: 28px;
  height: 4px;
  border-radius: 999px;
  box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 60%, transparent);
}

.akariLogoText {
  position: relative;
  z-index: 2;
  font-weight: 1000;
  font-family: Arial, sans-serif;
}

.akariLogoSpark {
  position: relative;
  z-index: 2;
  margin-left: -2px;
  color: #ffd1d6;
  font-size: 13px;
  transform: translateY(-10px);
  opacity: 0.92;
  text-shadow: 0 0 14px rgba(255, 80, 94, 0.8);
}

.akariLogoCorner {
  position: absolute;
  width: 13px;
  height: 13px;
  border-color: var(--accent);
  opacity: 0.95;
  pointer-events: none;
}

.akariLogoCornerLeft {
  left: -5px;
  top: 2px;
  border-left: 3px solid var(--accent);
  border-top: 3px solid var(--accent);
  border-radius: 4px 0 0 0;
}

.akariLogoCornerRight {
  right: -5px;
  bottom: 2px;
  border-right: 3px solid var(--accent);
  border-bottom: 3px solid var(--accent);
  border-radius: 0 0 4px 0;
}

.app.light .akariLogo {
  color: #e11d48;
  text-shadow: 0 0 16px rgba(225, 29, 72, 0.18);
}

/* Friends page was inheriting the two-column feed layout without a sidebar. Keep it full-width. */
.friendsPage.profileFeedPage {
  display: block !important;
  max-width: 1120px !important;
  width: min(1120px, calc(100% - 32px)) !important;
  margin: 24px auto !important;
  padding: 0 !important;
}

.friendsPage .friendsMain,
.friendsPage .profileFeedMain {
  width: 100% !important;
  min-width: 0 !important;
}

.friendsPage .profileFeedTopTabs {
  width: 100% !important;
  overflow-x: auto !important;
  scrollbar-width: none;
}

.friendsPage .profileFeedTopTabs::-webkit-scrollbar {
  display: none;
}

.friendsPage .friendsTabs {
  width: 100% !important;
  display: flex !important;
  gap: 14px !important;
  align-items: center !important;
  padding: 14px !important;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--panel);
}

.friendsPage .friendsTabs button {
  min-width: 110px;
  min-height: 64px;
  white-space: normal;
  text-align: center;
  line-height: 1.1;
}

.friendsPage .friendsSearch {
  margin: 14px 14px 16px !important;
}

.friendsPage .friendsGrid {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(3, minmax(250px, 1fr)) !important;
  gap: 12px !important;
  padding: 0 14px 18px !important;
}

.friendsPage .friendCard {
  width: 100% !important;
  min-width: 0 !important;
  grid-template-columns: 58px minmax(0, 1fr) auto !important;
}

.friendsPage .friendInfo b,
.friendsPage .friendInfo span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.createAddButton {
  font-weight: 700 !important;
  font-size: 14px !important;
  letter-spacing: 0 !important;
  color: #ff717b !important;
}

.createAddBox {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.createSelectedChips button {
  font-weight: 700 !important;
}

.app.light .createAddButton {
  color: #e11d48 !important;
}

@media (max-width: 920px) {
  .friendsPage.profileFeedPage {
    width: calc(100% - 20px) !important;
  }

  .friendsPage .friendsGrid {
    grid-template-columns: 1fr !important;
  }

  .friendsPage .friendsTabs {
    overflow-x: auto;
  }
}

.homeUpdatesSection {
  margin: 22px auto;
  width: min(1420px, calc(100% - 36px));
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--card);
}

.homeUpdatesHeader {
  margin-bottom: 12px;
}

.homeUpdatesGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.homeUpdateColumn h3 {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 16px;
}

.homeUpdateList {
  display: grid;
  gap: 12px;
}

.homeUpdateItem {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  color: var(--text);
  text-align: left;
}

.homeUpdateItem img {
  width: 64px;
  height: 76px;
  border-radius: 8px;
  object-fit: cover;
  background: #111;
}

.homeUpdateItem span {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.homeUpdateItem b {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 15px;
}

.homeUpdateItem small {
  color: var(--muted);
  font-size: 13px;
}

.homeUpdateItem:hover b {
  color: var(--accent);
}

@media (max-width: 900px) {
  .homeUpdatesGrid {
    grid-template-columns: 1fr;
  }
}

.homePeriodTabs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.homePeriodTabs button {
  border: 1px solid var(--border);
  background: var(--soft);
  color: var(--muted);
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 800;
}

.homePeriodTabs button.activeHomePeriod {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.homeUpdateColumnTitle {
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0 0 14px;
  text-align: left;
}

.homeUpdateColumnTitle span {
  font-size: 17px;
  font-weight: 950;
}

.homeUpdateColumnTitle b {
  color: var(--muted);
  font-size: 12px;
}

.homeUpdateColumnTitle:hover b,
.homeUpdateColumnTitle:hover span {
  color: var(--accent);
}

.homeExtraSection {
  margin-top: 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
}

.homeExtraGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.homeExtraCard {
  border: 1px solid var(--border);
  background: var(--soft);
  border-radius: 14px;
  padding: 10px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 12px;
  text-align: left;
  color: var(--text);
}

.homeExtraCard img {
  width: 56px;
  height: 76px;
  object-fit: cover;
  border-radius: 8px;
}

.homeExtraCard span {
  min-width: 0;
  display: grid;
  align-content: center;
  gap: 5px;
}

.homeExtraCard b {
  font-size: 14px;
  line-height: 1.2;
}

.homeExtraCard small {
  color: var(--muted);
  font-size: 12px;
}

.homeExtraCard:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .homeExtraGrid {
    grid-template-columns: 1fr;
  }

  .homePeriodTabs {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}


.homeSectionPage {
  margin: 22px auto;
  width: min(1420px, calc(100% - 36px));
  border: 1px solid rgba(120, 130, 150, 0.28);
  border-radius: 16px;
  background: var(--panel);
  padding: 20px;
}

.homeSectionPageTop {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  border-bottom: 1px solid rgba(120, 130, 150, 0.22);
  padding-bottom: 16px;
  margin-bottom: 18px;
}

.homeSectionPageTop h2 {
  margin: 0 0 4px;
  font-size: 24px;
}

.homeSectionPageTop p {
  margin: 0;
  color: var(--muted);
}

.homeBackButton {
  border: 1px solid rgba(120, 130, 150, 0.34);
  background: rgba(120, 130, 150, 0.1);
  color: var(--text);
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 800;
}

.homeSectionListGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.homeSectionListCard {
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 12px;
  text-align: left;
  border: 1px solid rgba(120, 130, 150, 0.22);
  background: rgba(120, 130, 150, 0.08);
  border-radius: 12px;
  padding: 10px;
  color: var(--text);
}

.homeSectionListCard:hover {
  border-color: rgba(255, 77, 87, 0.55);
  transform: translateY(-1px);
}

.homeSectionListCard img {
  width: 72px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
  background: #111;
}

.homeSectionListCard span {
  min-width: 0;
  display: grid;
  gap: 5px;
}

.homeSectionListCard b {
  font-size: 15px;
  line-height: 1.25;
}

.homeSectionListCard small,
.homeSectionListCard em {
  color: var(--muted);
  font-style: normal;
  line-height: 1.35;
}

@media (max-width: 960px) {
  .homeSectionPageTop {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .homeSectionListGrid {
    grid-template-columns: 1fr;
  }
}


/* v24: popularity flames and safer home section display */
.popularityFlames {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  margin-left: 5px;
  vertical-align: middle;
  font-size: 13px;
  line-height: 1;
}

.catalogBody h3 .popularityFlames,
.homePopularInfo b .popularityFlames,
.homeUpdateItem b .popularityFlames,
.homeSectionListCard b .popularityFlames {
  white-space: nowrap;
}


/* v23: profile statistics page */
.profileStatsPage {
  max-width: 1180px;
  margin: 0 auto;
}

.profileStatsToolbar {
  margin-top: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
}

.profileStatsControls {
  display: flex;
  gap: 10px;
}

.profileStatsControls select {
  min-width: 160px;
  height: 34px;
  background: var(--soft);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 6px;
  padding: 0 10px;
}

.profileStatsCards {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.profileStatsCards div,
.profileStatsTotal,
.profileStatsGraphCard {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.profileStatsCards div {
  padding: 16px;
  display: grid;
  gap: 8px;
}

.profileStatsCards span,
.profileStatsTotal span {
  color: var(--muted);
}

.profileStatsCards b {
  font-size: 28px;
  color: var(--text);
}

.profileStatsCards small {
  color: var(--muted);
}

.profileStatsTotal {
  margin-top: 16px;
  padding: 18px;
  display: grid;
  gap: 8px;
}

.profileStatsTotal b {
  font-size: 28px;
}

.profileStatsGraphCard {
  margin-top: 16px;
  padding: 18px;
}

.profileStatsGraphCard h3 {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
}

.profileStatsGraph {
  position: relative;
  min-height: 330px;
  padding: 20px 12px 42px 42px;
}

.graphGridLines {
  position: absolute;
  inset: 20px 12px 42px 0;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  pointer-events: none;
}

.graphGridLines span {
  color: var(--muted);
  font-size: 12px;
  border-bottom: 1px solid rgba(125, 130, 145, 0.12);
  padding-left: 2px;
}

.graphPlot {
  position: absolute;
  left: 42px;
  right: 16px;
  top: 24px;
  bottom: 48px;
}

.graphLineSvg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 1;
}

.graphLineSvg polyline {
  fill: none;
  stroke: #ff3b3b;
  stroke-width: 0.7;
  vector-effect: non-scaling-stroke;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.graphPoint {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #ff3b3b;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.graphBar {
  position: absolute;
  bottom: 0;
  width: 12px;
  border-radius: 8px 8px 0 0;
  background: #ff3b3b;
  transform: translateX(-50%);
  z-index: 1;
}

.profileStatsBars .graphPoint,
.profileStatsBars .graphLineSvg {
  display: none;
}

.graphLabels {
  position: absolute;
  left: 42px;
  right: 16px;
  bottom: 14px;
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 12px;
}

.app.light .profileStatsToolbar,
.app.light .profileStatsCards div,
.app.light .profileStatsTotal,
.app.light .profileStatsGraphCard {
  background: #ffffff;
  border-color: #d7deea;
}

.app.light .profileStatsControls select {
  background: #f8fafc;
  border-color: #d7deea;
  color: #111827;
}

@media (max-width: 760px) {
  .profileStatsToolbar,
  .profileStatsControls {
    display: grid;
    gap: 10px;
  }

  .profileStatsCards {
    grid-template-columns: 1fr;
  }
}


/* v25: title popularity + create team form */
.titlePopularityLine {
  margin: 14px 0 12px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
}

.titlePopularityLine span {
  color: var(--muted);
  font-size: 13px;
}

.titlePopularityLine b {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
}

.popularityFlames {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--text);
  vertical-align: -2px;
}

.monoFlameIcon {
  width: 14px;
  height: 14px;
  fill: currentColor;
  opacity: 0.92;
}

.app.light .popularityFlames {
  color: #111827;
}

.app.dark .popularityFlames {
  color: #f3f4f6;
}

.createAddButton {
  font-weight: 700 !important;
  letter-spacing: 0 !important;
}

.createTeamPage .createTitleForm {
  max-width: 960px;
}

.createTeamForm .createUploadStack {
  margin-bottom: 18px;
}

.teamDescriptionEditable {
  min-height: 120px;
  padding: 14px 16px;
  text-align: left;
  direction: ltr;
  unicode-bidi: plaintext;
}

.teamDescriptionEditable:empty::before {
  content: attr(data-placeholder);
  color: var(--muted);
}

.teamDescriptionBox {
  margin-top: 8px;
}

.teamDescriptionBox textarea {
  min-height: 120px;
  border: 0;
  border-top: 1px solid var(--border);
  border-radius: 0 0 10px 10px;
}

.representativeCheckbox {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 14px 0 20px;
  color: var(--text);
  font-size: 14px;
}

.representativeCheckbox input {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}

.createCancelButton {
  border: 0;
  background: transparent;
  color: var(--muted);
  font-weight: 800;
}

.createCancelButton:hover {
  color: var(--text);
}


/* v26: local teams system */
.teamQuickWrap {
  position: relative;
}

.teamQuickButton {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  border: 1px solid var(--border);
  background: var(--card2);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.teamQuickButton svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.teamQuickMenu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 230px;
  background: var(--card2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px;
  z-index: 90;
  box-shadow: 0 18px 44px rgba(0,0,0,.34);
}

.teamQuickMenu button {
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

.teamQuickMenu button:hover {
  background: var(--soft);
}

.teamQuickAvatar,
.searchTeamAvatar,
.userInfoTeamAvatar,
.teamMemberAvatar {
  width: 36px;
  height: 36px;
  border-radius: 7px;
  overflow: hidden;
  background: var(--soft);
  display: inline-grid;
  place-items: center;
  color: var(--text);
  flex: 0 0 auto;
  font-weight: 900;
}

.teamQuickAvatar img,
.searchTeamAvatar img,
.userInfoTeamAvatar img,
.teamMemberAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teamPageView {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 14px 36px;
}

.teamHero {
  min-height: 430px;
  border-radius: 8px 8px 0 0;
  border: 1px solid var(--border);
  background:
    linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.34)),
    radial-gradient(circle at 30% 0%, rgba(255,75,85,.15), transparent 32%),
    var(--card);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.teamHeroContent {
  display: grid;
  grid-template-columns: 156px 1fr auto;
  gap: 16px;
  align-items: end;
  padding: 0 16px 18px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,.72));
}

.teamPageAvatar {
  width: 156px;
  height: 216px;
  border-radius: 8px;
  border: 3px solid rgba(255,255,255,.12);
  background: var(--soft);
  display: grid;
  place-items: center;
  overflow: hidden;
  font-size: 50px;
  font-weight: 900;
}

.teamPageAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.teamPageInfo h2 {
  margin: 0 0 6px;
  font-size: 28px;
}

.teamBadge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 6px;
  background: var(--accent);
  color: #fff;
  font-weight: 800;
  margin-bottom: 12px;
}

.teamStatsLine {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--muted);
}

.teamStatsLine b {
  color: var(--text);
  font-size: 18px;
}

.teamHeroActions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.teamHeroActions button {
  border: 1px solid var(--border);
  background: rgba(32,33,38,.9);
  color: var(--text);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.teamPageDescription {
  margin: 0;
  padding: 0 20px 24px;
  color: var(--text);
  text-align: left;
  line-height: 1.55;
  max-width: 920px;
}

.teamPageDescription blockquote {
  margin: 8px 0;
  padding-left: 12px;
  border-left: 3px solid var(--accent);
}

.teamPageTabs {
  display: flex;
  gap: 20px;
  background: var(--card);
  border: 1px solid var(--border);
  border-top: 0;
  padding: 12px 16px 0;
}

.teamPageTabs button {
  border: 0;
  background: transparent;
  color: var(--muted);
  padding: 0 0 12px;
  font-size: 15px;
  cursor: pointer;
}

.teamPageTabs .activeTab {
  color: var(--text);
  border-bottom: 3px solid var(--accent);
}

.teamPageBody {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 16px;
  margin-top: 16px;
}

.teamTitlesPanel,
.teamMembersPanel {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
}

.teamSearchInput {
  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--inputBg);
  color: var(--text);
  padding: 0 12px;
}

.teamEmptyTitles {
  margin-top: 16px;
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 28px;
  color: var(--muted);
}

.teamMembersPanel h3 {
  margin-top: 0;
  text-transform: uppercase;
  color: var(--muted);
  font-size: 13px;
}

.teamMemberRow {
  width: 100%;
  border: 0;
  background: transparent;
  color: var(--text);
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
}

.teamMemberRow small {
  display: block;
  color: #6aa3ff;
}

.userInfoTeams {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.userInfoTeams button {
  border: 1px solid var(--border);
  background: var(--soft);
  color: var(--text);
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

@media (max-width: 860px) {
  .teamHeroContent,
  .teamPageBody {
    grid-template-columns: 1fr;
  }

  .teamPageDescription {
    padding-left: 16px;
  }
}




/* V30 repair: team page/edit layout after adding SVG actions */
.teamRoundAction {
  width: 38px !important;
  height: 38px !important;
  min-width: 38px !important;
  padding: 0 !important;
  display: inline-grid !important;
  place-items: center !important;
  border-radius: 10px !important;
}

.teamRoundAction svg,
.teamNotifyButton svg {
  width: 18px !important;
  height: 18px !important;
  flex: 0 0 18px !important;
  fill: currentColor !important;
  display: block !important;
}

.teamNotifyButton {
  height: 38px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 0 12px !important;
  white-space: nowrap !important;
}

.teamHeroActions > button {
  line-height: 1 !important;
}

.teamEditPage {
  width: min(1180px, calc(100vw - 28px));
  margin: 24px auto 46px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 16px;
  color: #dbe3ef;
}

.teamEditSidebar {
  background: #1b1c20;
  border: 1px solid #30323a;
  border-radius: 10px;
  padding: 8px;
  height: fit-content;
  position: sticky;
  top: 76px;
}

.teamEditSidebar button {
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #dbe3ef;
  text-align: left;
  padding: 0 14px;
  cursor: pointer;
}

.teamEditSidebar button:hover,
.teamEditSidebar .activeSettings {
  background: #25262b;
}

.teamEditPanel {
  background: #1b1c20;
  border: 1px solid #30323a;
  border-radius: 10px;
  overflow: hidden;
  padding: 0 18px 18px;
}

.teamEditCrumbs {
  height: 54px;
  margin: 0 -18px 18px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #30323a;
  color: #8f9aac;
}

.teamEditCrumbs button {
  border: 0;
  background: transparent;
  color: #9fb4d8;
  cursor: pointer;
  padding: 0;
}

.teamEditCrumbs b {
  color: #dbe3ef;
}

.teamEditImagesRow {
  display: grid;
  gap: 22px;
  margin-bottom: 18px;
}

.teamEditImagePair {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.teamEditPreview {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #3a3d46;
  background: #111217;
}

.teamEditCoverPreview {
  width: 144px;
  height: 196px;
}

.teamEditBgPreview {
  width: min(760px, 100%);
  height: 190px;
}

.teamEditPreview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.teamEditPreview button {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 7px;
  background: rgba(0,0,0,.82);
  color: #fff;
  cursor: pointer;
}

.teamEditPage .createField,
.teamEditPage .createUploadLabel {
  color: #9fb0c8;
}

.teamEditPage input,
.teamEditPage textarea,
.teamEditPage select {
  background: #1a1b1f !important;
  color: #dbe3ef !important;
  border-color: #3a3d46 !important;
}

.teamEditPage .createDescriptionBox {
  background: #1a1b1f !important;
  border-color: #3a3d46 !important;
}

.teamEditPage .createDescriptionToolbar {
  border-color: #3a3d46 !important;
}

.teamEditPage .createUploadBox {
  background: #1a1b1f !important;
  border-color: #4b4d56 !important;
  color: #aab3c2 !important;
}

.teamEditFooter {
  margin: 18px -18px -18px;
  padding: 14px 18px;
  border-top: 1px solid #30323a;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1b1c20;
}

.teamEditFooter b {
  color: #9fb4d8;
}

.teamDescriptionBox textarea {
  min-height: 132px !important;
}

.app.light .teamPageView,
.app.light .teamEditPage {
  color: #dbe3ef;
}

.app.light .teamHero,
.app.light .teamPageTabs,
.app.light .teamTitlesPanel,
.app.light .teamMembersPanel,
.app.light .teamEditSidebar,
.app.light .teamEditPanel {
  background-color: #1b1c20 !important;
  border-color: #30323a !important;
  color: #dbe3ef !important;
}

.app.light .teamHeroContent {
  background: linear-gradient(180deg, transparent, rgba(0,0,0,.74)) !important;
}

.app.light .teamPageInfo h2,
.app.light .teamStatsLine b,
.app.light .teamPageTabs .activeTab,
.app.light .teamMemberRow,
.app.light .teamTitlesPanel,
.app.light .teamMembersPanel {
  color: #f1f5fb !important;
}

.app.light .teamStatsLine,
.app.light .teamPageTabs button,
.app.light .teamEmptyTitles,
.app.light .teamMembersPanel h3,
.app.light .teamSearchInput {
  color: #aab3c2 !important;
}

.app.light .teamSearchInput {
  background: #111217 !important;
  border-color: #30323a !important;
}

@media (max-width: 900px) {
  .teamEditPage {
    grid-template-columns: 1fr;
  }

  .teamEditSidebar {
    position: static;
  }

  .teamEditImagePair,
  .teamEditBgPair {
    flex-direction: column;
  }
}


/* V31 repair: force team pages to keep HentaiLib dark layout even when site theme is light */
.app.light .teamPageView,
.app.light .teamEditPage {
  background: #07080a !important;
  color: #dbe3ef !important;
}

.app.light .teamPageView {
  padding-top: 18px !important;
  padding-bottom: 42px !important;
}

.app.light .teamHero {
  background-color: #111217 !important;
  border-color: #30323a !important;
  color: #dbe3ef !important;
}

.app.light .teamHeroContent {
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.82)) !important;
}

.app.light .teamPageAvatar {
  background: #2a1113 !important;
  border-color: rgba(255, 255, 255, 0.14) !important;
  color: #ffffff !important;
}

.app.light .teamPageAvatar:not(:has(img)) {
  background: #361819 !important;
}

.app.light .teamPageInfo h2,
.app.light .teamStatsLine b,
.app.light .teamPageDescription,
.app.light .teamHeroActions button,
.app.light .teamNotifyButton,
.app.light .teamRoundAction,
.app.light .teamPageTabs .activeTab,
.app.light .teamMemberRow,
.app.light .teamMemberRow b,
.app.light .teamEmptyTitles h3,
.app.light .teamEditCrumbs b,
.app.light .teamEditFooter button,
.app.light .teamEditFooter b,
.app.light .teamEditSidebar button,
.app.light .teamEditPage label,
.app.light .teamEditPage .createField,
.app.light .teamEditPage .createUploadLabel {
  color: #f2f5fb !important;
}

.app.light .teamStatsLine,
.app.light .teamStatsLine span,
.app.light .teamPageTabs button,
.app.light .teamMembersPanel h3,
.app.light .teamEmptyTitles,
.app.light .teamEmptyTitles p,
.app.light .teamEditCrumbs,
.app.light .teamEditPage small,
.app.light .teamEditPage .muted,
.app.light .teamEditPage .createHint,
.app.light .teamEditPage .createUploadBox span,
.app.light .teamEditPage .createUploadBox {
  color: #aab3c2 !important;
}

.app.light .teamHeroActions button,
.app.light .teamNotifyButton,
.app.light .teamRoundAction {
  background: rgba(32, 33, 38, 0.94) !important;
  border-color: #4a4d57 !important;
  box-shadow: none !important;
}

.app.light .teamHeroActions button:hover,
.app.light .teamNotifyButton:hover,
.app.light .teamRoundAction:hover {
  background: rgba(48, 50, 58, 0.98) !important;
  border-color: #6a6f7c !important;
}

.app.light .teamNotifyButton svg,
.app.light .teamRoundAction svg {
  color: #f2f5fb !important;
  fill: currentColor !important;
}

.app.light .teamPageTabs,
.app.light .teamTitlesPanel,
.app.light .teamMembersPanel,
.app.light .teamEditSidebar,
.app.light .teamEditPanel,
.app.light .teamEditFooter {
  background: #1b1c20 !important;
  border-color: #30323a !important;
  color: #dbe3ef !important;
}

.app.light .teamEditSidebar .activeSettings,
.app.light .teamEditSidebar button:hover {
  background: #2a2c33 !important;
  color: #ffffff !important;
}

.app.light .teamSearchInput,
.app.light .teamEditPage input,
.app.light .teamEditPage textarea,
.app.light .teamEditPage select,
.app.light .teamEditPage .createDescriptionBox,
.app.light .teamEditPage .createDescriptionToolbar {
  background: #111217 !important;
  border-color: #3a3d46 !important;
  color: #dbe3ef !important;
}

.app.light .teamSearchInput::placeholder,
.app.light .teamEditPage input::placeholder,
.app.light .teamEditPage textarea::placeholder {
  color: #7f8795 !important;
}

.app.light .teamEditPage .createUploadBox {
  background: #1a1b1f !important;
  border-color: #4b4d56 !important;
}

.app.light .teamEditFooter {
  border-top-color: #30323a !important;
}

.app.light .teamEditFooter .createSubmitButton,
.app.light .teamEditFooter button:first-child {
  background: #ef4444 !important;
  color: #ffffff !important;
  border-color: #ef4444 !important;
}

.app.light .teamEditFooter button:not(:first-child) {
  color: #aab3c2 !important;
  background: transparent !important;
}

.app.light .teamMembersPanel {
  align-self: start !important;
}

/* keep the big dark edit/page area centered and remove white gaps inside team content */
.app.light main:has(.teamPageView),
.app.light main:has(.teamEditPage) {
  background: #07080a !important;
}


/* V32: team pages must follow light theme instead of forcing black */
.app.light main:has(.teamPageView),
.app.light main:has(.teamEditPage) {
  background: #f3f6fb !important;
}

.app.light .teamPageView,
.app.light .teamEditPage {
  background: transparent !important;
  color: #111827 !important;
}

.app.light .teamHero {
  background:
    linear-gradient(180deg, rgba(255,255,255,.12), rgba(15,23,42,.28)),
    linear-gradient(180deg, #eef2f8, #dfe6f1) !important;
  border-color: #cfd8e6 !important;
  color: #111827 !important;
}

.app.light .teamHeroContent {
  background: linear-gradient(180deg, transparent, rgba(255,255,255,.88)) !important;
}

.app.light .teamPageAvatar {
  background: #e8eef8 !important;
  border-color: #cfd8e6 !important;
  color: #111827 !important;
}

.app.light .teamPageAvatar:not(:has(img)) {
  background: #e8eef8 !important;
}

.app.light .teamPageInfo h2,
.app.light .teamStatsLine b,
.app.light .teamPageDescription,
.app.light .teamPageTabs .activeTab,
.app.light .teamMemberRow,
.app.light .teamMemberRow b,
.app.light .teamEmptyTitles h3,
.app.light .teamEditCrumbs b,
.app.light .teamEditFooter button,
.app.light .teamEditFooter b,
.app.light .teamEditSidebar button,
.app.light .teamEditPage label,
.app.light .teamEditPage .createField,
.app.light .teamEditPage .createUploadLabel {
  color: #111827 !important;
}

.app.light .teamStatsLine,
.app.light .teamStatsLine span,
.app.light .teamPageTabs button,
.app.light .teamMembersPanel h3,
.app.light .teamEmptyTitles,
.app.light .teamEmptyTitles p,
.app.light .teamEditCrumbs,
.app.light .teamEditPage small,
.app.light .teamEditPage .muted,
.app.light .teamEditPage .createHint,
.app.light .teamEditPage .createUploadBox span,
.app.light .teamEditPage .createUploadBox {
  color: #5f6b7a !important;
}

.app.light .teamHeroActions button,
.app.light .teamNotifyButton,
.app.light .teamRoundAction {
  background: #ffffff !important;
  border-color: #cfd8e6 !important;
  color: #111827 !important;
  box-shadow: 0 8px 18px rgba(15,23,42,.08) !important;
}

.app.light .teamHeroActions button:hover,
.app.light .teamNotifyButton:hover,
.app.light .teamRoundAction:hover {
  background: #f8fafc !important;
  border-color: #b8c4d6 !important;
}

.app.light .teamNotifyButton svg,
.app.light .teamRoundAction svg {
  color: #111827 !important;
  fill: currentColor !important;
}

.app.light .teamPageTabs,
.app.light .teamTitlesPanel,
.app.light .teamMembersPanel,
.app.light .teamEditSidebar,
.app.light .teamEditPanel,
.app.light .teamEditFooter {
  background: #ffffff !important;
  border-color: #cfd8e6 !important;
  color: #111827 !important;
}

.app.light .teamPageTabs {
  background: #f8fafc !important;
}

.app.light .teamEditSidebar .activeSettings,
.app.light .teamEditSidebar button:hover {
  background: #eaf1ff !important;
  color: #2563eb !important;
}

.app.light .teamSearchInput,
.app.light .teamEditPage input,
.app.light .teamEditPage textarea,
.app.light .teamEditPage select,
.app.light .teamEditPage .createDescriptionBox,
.app.light .teamEditPage .createDescriptionToolbar {
  background: #ffffff !important;
  border-color: #cfd8e6 !important;
  color: #111827 !important;
}

.app.light .teamSearchInput::placeholder,
.app.light .teamEditPage input::placeholder,
.app.light .teamEditPage textarea::placeholder {
  color: #8b95a5 !important;
}

.app.light .teamEditPage .createUploadBox {
  background: #f8fafc !important;
  border-color: #cfd8e6 !important;
  color: #64748b !important;
}

.app.light .teamEditPreview {
  background: #f8fafc !important;
  border-color: #cfd8e6 !important;
}

.app.light .teamEditFooter {
  border-top-color: #cfd8e6 !important;
  background: #f8fafc !important;
}

.app.light .teamEditFooter .createSubmitButton,
.app.light .teamEditFooter button:first-child {
  background: #ef4444 !important;
  color: #ffffff !important;
  border-color: #ef4444 !important;
}

.app.light .teamEditFooter button:not(:first-child) {
  color: #5f6b7a !important;
  background: transparent !important;
}

.app.light .teamEmptyTitles {
  border-color: #cfd8e6 !important;
  background: #f8fafc !important;
}


/* V34: team members editor layout like lib */
.teamMembersManagePanel {
  padding: 0 !important;
  overflow: visible !important;
}

.teamMembersManagePanel .teamEditCrumbs {
  margin: 0 !important;
  padding: 0 18px !important;
}

.teamMembersManagePanel .teamAddMemberButton {
  width: calc(100% - 36px) !important;
  height: 42px !important;
  margin: 14px 18px 0 !important;
  border: 1px solid #3b3d45 !important;
  border-radius: 7px !important;
  background: #2b2c31 !important;
  color: #cdd3df !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  cursor: pointer !important;
}

.teamMembersManagePanel .teamAddMemberButton:hover {
  background: #33343a !important;
  color: #fff !important;
}

.teamMemberManageList {
  margin-top: 14px !important;
}

.teamMemberManageRow {
  min-height: 112px !important;
  border-top: 1px solid #30323a !important;
  padding: 14px 18px !important;
  display: grid !important;
  grid-template-columns: 42px minmax(0, 1fr) auto !important;
  gap: 12px !important;
  align-items: start !important;
  background: transparent !important;
}

.teamMemberManageRow:first-child {
  border-top: 1px solid #30323a !important;
}

.bigTeamMemberAvatar,
.teamMemberAvatar.bigTeamMemberAvatar {
  width: 34px !important;
  height: 34px !important;
  border-radius: 4px !important;
  overflow: hidden !important;
  display: inline-grid !important;
  place-items: center !important;
  background: #30323a !important;
  color: #fff !important;
  font-weight: 900 !important;
}

.teamMemberAvatar img,
.bigTeamMemberAvatar img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.teamMemberManageInfo {
  min-width: 0 !important;
  display: grid !important;
  gap: 8px !important;
}

.teamMemberManageInfo > b {
  color: #ff4b55 !important;
  font-size: 15px !important;
  line-height: 1.2 !important;
}

.teamMemberRolesLine {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px 10px !important;
  color: #67a8ff !important;
  font-size: 14px !important;
}

.teamMemberRolesLine span:not(:last-child)::after {
  content: "|";
  margin-left: 10px;
  color: #3b4a5f;
}

.teamMemberManageInfo p {
  margin: 0 !important;
  color: #cbd3df !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
}

.teamMemberManageActions {
  display: flex !important;
  gap: 8px !important;
  align-items: center !important;
}

.teamMemberManageActions button {
  width: 32px !important;
  height: 32px !important;
  border: 0 !important;
  border-radius: 7px !important;
  background: #26272c !important;
  color: #b9c0cc !important;
  display: inline-grid !important;
  place-items: center !important;
  cursor: pointer !important;
  padding: 0 !important;
  font-size: 14px !important;
}

.teamMemberManageActions button:hover {
  background: #33343a !important;
  color: #fff !important;
}

.teamMemberManageActions button[disabled] {
  opacity: .35 !important;
  cursor: not-allowed !important;
}

.teamMembersFooter {
  margin: 0 !important;
  padding: 14px 18px !important;
  justify-content: flex-start !important;
}

.dangerGhostButton {
  min-width: 0 !important;
  height: 38px !important;
  padding: 0 16px !important;
  border: 0 !important;
  border-radius: 7px !important;
  background: rgba(255, 75, 85, .12) !important;
  color: #ff656e !important;
  font-weight: 500 !important;
  cursor: pointer !important;
}

.teamUserSearchOverlay,
.teamMemberModalOverlay {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9000 !important;
  background: rgba(0, 0, 0, .72) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px !important;
}

.teamUserSearchModal {
  width: min(520px, calc(100vw - 36px)) !important;
  min-height: 150px !important;
  border-radius: 8px !important;
  background: #242426 !important;
  border: 1px solid #34363d !important;
  box-shadow: 0 24px 90px rgba(0,0,0,.45) !important;
  overflow: hidden !important;
}

.teamUserSearchTop {
  height: 48px !important;
  display: grid !important;
  grid-template-columns: 34px 1fr 34px !important;
  align-items: center !important;
  border-bottom: 1px solid #383a41 !important;
  padding: 0 10px !important;
  color: #aeb5c0 !important;
}

.teamUserSearchTop input {
  height: 46px !important;
  border: 0 !important;
  background: transparent !important;
  color: #e6e8ee !important;
  outline: none !important;
}

.teamUserSearchTop button {
  border: 0 !important;
  background: transparent !important;
  color: #c5c9d2 !important;
  cursor: pointer !important;
  font-size: 18px !important;
}

.teamUserSearchResults {
  padding: 16px !important;
  color: #aeb5c0 !important;
}

.teamUserSearchResults p {
  margin: 0 !important;
  text-align: center !important;
  color: #aeb5c0 !important;
}

.teamUserSearchResults button {
  width: 100% !important;
  min-height: 46px !important;
  border: 0 !important;
  border-radius: 7px !important;
  background: transparent !important;
  color: #e6e8ee !important;
  display: grid !important;
  grid-template-columns: 32px 1fr auto !important;
  align-items: center !important;
  gap: 10px !important;
  text-align: left !important;
  cursor: pointer !important;
  padding: 7px !important;
}

.teamUserSearchResults button:hover {
  background: #303238 !important;
}

.teamMemberRolesModal {
  width: min(560px, calc(100vw - 32px)) !important;
  background: #242424 !important;
  border: 1px solid #34363d !important;
  border-radius: 8px !important;
  padding: 22px !important;
  color: #d7dbe4 !important;
  position: relative !important;
  box-shadow: 0 24px 90px rgba(0,0,0,.55) !important;
}

.teamMemberModalClose {
  position: absolute !important;
  top: 14px !important;
  right: 16px !important;
  border: 0 !important;
  background: transparent !important;
  color: #c5c9d2 !important;
  font-size: 20px !important;
  cursor: pointer !important;
}

.teamMemberModalUser {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  margin-bottom: 20px !important;
}

.teamMemberModalUser b {
  color: #ff4b55 !important;
}

.teamMemberRolesModal h4 {
  color: #999 !important;
  margin: 18px 0 12px !important;
  font-size: 14px !important;
}

.teamMemberModalGrid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 12px 42px !important;
}

.teamMemberModalGrid label {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  color: #c7c7c7 !important;
  cursor: pointer !important;
}

.teamMemberModalGrid input,
.teamMembersManagePanel input[type="checkbox"] {
  width: 16px !important;
  height: 16px !important;
  accent-color: #ff4b55 !important;
}

.teamMemberSaveButton {
  margin-top: 22px !important;
  width: 100% !important;
  height: 42px !important;
  border: 0 !important;
  border-radius: 7px !important;
  background: #4caf50 !important;
  color: #fff !important;
  font-weight: 800 !important;
  cursor: pointer !important;
}

.teamMemberDeleteModal {
  width: min(360px, calc(100vw - 32px)) !important;
  background: #242424 !important;
  border: 1px solid #34363d !important;
  border-radius: 8px !important;
  padding: 22px !important;
  color: #d7dbe4 !important;
  position: relative !important;
  box-shadow: 0 24px 90px rgba(0,0,0,.55) !important;
}

.teamMemberDeleteModal h3 {
  margin: 0 0 18px !important;
  color: #d7dbe4 !important;
}

.teamMemberDeleteModal p {
  margin: 0 0 24px !important;
  line-height: 1.55 !important;
  color: #c8c8c8 !important;
}

.teamMemberDeleteActions {
  display: flex !important;
  justify-content: flex-end !important;
  gap: 18px !important;
}

.teamMemberDeleteActions button {
  border: 0 !important;
  background: transparent !important;
  color: #c9c9c9 !important;
  text-transform: uppercase !important;
  font-weight: 900 !important;
  cursor: pointer !important;
}

.teamMemberDeleteActions button:last-child {
  color: #ff6b73 !important;
}

.app.light .teamMemberModalOverlay,
.app.light .teamUserSearchOverlay {
  background: rgba(0, 0, 0, .65) !important;
}

@media (max-width: 720px) {
  .teamMemberManageRow {
    grid-template-columns: 36px 1fr !important;
  }

  .teamMemberManageActions {
    grid-column: 2 !important;
  }

  .teamMemberModalGrid {
    grid-template-columns: 1fr !important;
  }
}


.teamUserAlreadyAdded {
  opacity: 0.55;
  cursor: not-allowed !important;
}

.teamUserAlreadyAdded small {
  color: #9ca3af !important;
}


/* v40 profile comments cleanup, delete button, pagination */
.profileCommentDelete {
  width: fit-content;
  margin-top: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: #ff4b55;
  font-size: 14px;
  cursor: pointer;
}

.profileCommentDelete:hover {
  color: #ff747b;
}

.profileCommentPagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 0 4px;
  border-top: 1px solid var(--border);
}

.profileCommentPagination button {
  min-width: 32px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.profileCommentPagination button:hover:not(:disabled),
.profileCommentPagination button.activePage {
  color: var(--text);
  background: rgba(255, 75, 85, 0.12);
}

.profileCommentPagination button.activePage {
  border-bottom: 2px solid #ff4b55;
  border-radius: 8px 8px 2px 2px;
}

.profileCommentPagination button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}


/* v44 comment tools, title attachments and pinned comments */
.commentEditor {
  position: relative;
}
.commentEditorMetaLine {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding: 6px 12px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 12px;
}
.commentEditorMetaLine button {
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.commentSpoiler,
.commentSpoilerBlock {
  display: inline-block;
  border-radius: 6px;
  background: #2b2f37;
  color: transparent;
  padding: 0 6px;
  cursor: pointer;
}
.commentSpoiler:hover,
.commentSpoilerBlock:hover {
  color: #fff;
}
.commentSpoilerBlock {
  display: block;
  margin: 8px 0;
  padding: 8px 10px;
}
.commentImageStub {
  display: inline-flex;
  margin: 4px 0;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px dashed var(--border);
  color: var(--muted);
  font-size: 13px;
}
.attachTitlePopover {
  position: absolute;
  left: 92px;
  bottom: 48px;
  z-index: 30;
  width: min(520px, calc(100vw - 40px));
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--panel);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.38);
  overflow: hidden;
}
.attachTitleSearch {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}
.attachTitleSearch input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font-size: 15px;
}
.attachTitleSearch button {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 20px;
}
.attachTitleResults {
  max-height: 380px;
  overflow: auto;
  padding: 10px;
}
.attachTitleResults > p {
  margin: 20px;
  text-align: center;
  color: var(--muted);
}
.attachTitleResults button,
.attachedTitleCard {
  width: 100%;
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 12px;
  align-items: center;
  text-align: left;
  border: 0;
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.08);
  color: var(--text);
  padding: 10px;
  cursor: pointer;
}
.attachTitleResults button + button {
  margin-top: 8px;
}
.attachedTitleCover {
  width: 58px;
  height: 74px;
  border-radius: 7px;
  background: var(--surface);
  display: grid;
  place-items: center;
  overflow: hidden;
  font-weight: 800;
}
.attachedTitleCover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.attachTitleResults small,
.attachedTitleCard small {
  display: block;
  color: var(--accent);
  font-size: 12px;
  margin-bottom: 3px;
}
.attachTitleResults b,
.attachedTitleCard b {
  display: block;
  color: var(--text);
  font-size: 15px;
}
.attachTitleResults em,
.attachedTitleCard em {
  display: block;
  color: var(--muted);
  font-style: normal;
  font-size: 13px;
  margin-top: 4px;
}
.commentAttachedPreview {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: start;
  padding: 10px;
  border-bottom: 1px solid var(--border);
}
.commentAttachedPreview > button {
  border: 0;
  border-radius: 8px;
  background: var(--surface);
  color: var(--muted);
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.attachedTitleCard {
  width: min(440px, 100%);
  margin: 10px 0;
  border: 1px solid var(--border);
  background: var(--surface);
}
.pinnedCommentBadge {
  display: inline-flex;
  align-items: center;
  margin: 4px 0 8px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 77, 86, 0.14);
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
}
.app.light .commentSpoiler,
.app.light .commentSpoilerBlock {
  background: #dbe3ef;
}
.app.light .commentSpoiler:hover,
.app.light .commentSpoilerBlock:hover {
  color: #111827;
}



/* v45 comment attach/search/pin author repair */
.commentEditor {
  overflow: visible !important;
}
.commentEditor .commentAttachedPreview {
  position: relative !important;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 34px !important;
  align-items: start !important;
  gap: 10px !important;
  padding: 12px !important;
  border-bottom: 1px solid var(--border) !important;
  background: rgba(127, 127, 127, 0.05) !important;
}
.commentEditor .commentAttachedPreview .attachedTitleCard {
  width: 100% !important;
  max-width: 520px !important;
  margin: 0 !important;
}
.commentEditor .commentAttachedPreview > button {
  position: static !important;
  display: grid !important;
  place-items: center !important;
}
.commentEditor .commentAttachedPreview + .commentEditable {
  min-height: 82px !important;
}
.attachTitlePopover {
  left: 16px !important;
  right: auto !important;
  bottom: 58px !important;
  width: min(640px, calc(100vw - 72px)) !important;
  max-width: 640px !important;
}
.attachTitleResults button {
  min-height: 88px !important;
}
.commentEditorMetaLine {
  align-items: center !important;
  overflow: visible !important;
}
.commentAuthorPickerWrap {
  position: relative;
  display: inline-flex;
}
.commentAuthorPickerButton {
  border: 0 !important;
  background: transparent !important;
  color: var(--muted) !important;
  cursor: pointer !important;
  font-size: 12px !important;
  padding: 0 !important;
}
.commentAuthorPickerButton b {
  color: var(--text);
}
.commentAuthorPickerPopover {
  position: absolute;
  right: 0;
  bottom: 24px;
  z-index: 80;
  width: 300px;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);
}
.commentAuthorPickerHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--text);
}
.commentAuthorPickerHead button,
.commentAuthorPickerPopover > button {
  border: 0 !important;
  background: transparent !important;
}
.commentAuthorPickerPopover > button {
  width: 100%;
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px !important;
  color: var(--text) !important;
  text-align: left;
  cursor: pointer;
}
.commentAuthorPickerPopover > button:hover,
.commentAuthorPickerPopover > button.active {
  background: var(--surface) !important;
}
.commentAuthorPickerAvatar {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: var(--surface);
  font-weight: 800;
}
.commentAuthorPickerAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.commentText .attachedTitleCard,
.pageCommentBody > .attachedTitleCard {
  max-width: 560px;
}

/* v46: title comments light controls + attached title editor layout fix */
.app.light .titleCommentsPanel .readerCommentTools button,
.app.light .titleCommentsPanel .titleCommentTools button {
  background: #ffffff !important;
  border: 1px solid #d6dce8 !important;
  color: #111827 !important;
  box-shadow: none !important;
}

.app.light .titleCommentsPanel .readerCommentTools button:hover,
.app.light .titleCommentsPanel .titleCommentTools button:hover {
  background: #f3f6fb !important;
  border-color: #c7d2e5 !important;
}

.app.light .titleCommentsPanel .readerCommentTools button:last-child,
.app.light .titleCommentsPanel .titleCommentTools button:last-child {
  background: #111827 !important;
  border-color: #111827 !important;
  color: #ffffff !important;
}

.app.light .titleCommentsPanel .readerCommentTools button:last-child:hover,
.app.light .titleCommentsPanel .titleCommentTools button:last-child:hover {
  background: #273244 !important;
  border-color: #273244 !important;
}

.commentEditor .commentAttachedPreview {
  position: relative !important;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 28px !important;
  gap: 10px !important;
  align-items: start !important;
  width: 100% !important;
  min-height: 0 !important;
  padding: 12px 14px !important;
  border-bottom: 1px solid var(--border) !important;
  background: rgba(127, 127, 127, 0.04) !important;
  overflow: visible !important;
}

.commentEditor .commentAttachedPreview .attachedTitleCard {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 84px !important;
  display: grid !important;
  grid-template-columns: 68px minmax(0, 1fr) !important;
  gap: 14px !important;
  align-items: center !important;
  margin: 0 !important;
  padding: 10px 12px !important;
  text-align: left !important;
}

.commentEditor .commentAttachedPreview .attachedTitleCover {
  width: 58px !important;
  height: 74px !important;
  border-radius: 6px !important;
}

.commentEditor .commentAttachedPreview .attachedTitleCard small,
.commentEditor .commentAttachedPreview .attachedTitleCard b,
.commentEditor .commentAttachedPreview .attachedTitleCard em {
  display: block !important;
  white-space: normal !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.commentEditor .commentAttachedPreview > button {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  padding: 0 !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  position: static !important;
  background: transparent !important;
  border: none !important;
  color: var(--muted) !important;
}

.commentEditor .commentAttachedPreview + .commentEditable {
  min-height: 92px !important;
  padding-top: 16px !important;
}

.app.light .commentEditor .commentAttachedPreview {
  background: #f8fafc !important;
}

.app.light .commentEditor .commentAttachedPreview .attachedTitleCard {
  background: #ffffff !important;
  border: 1px solid #d6dce8 !important;
}

.app.light .commentEditorMetaLine button,
.app.light .commentAuthorPickerButton {
  color: #1f2937 !important;
}

.app.light .commentAuthorPickerButton b {
  color: #111827 !important;
}



/* v47 comment sorting, votes and theme readable fixes */
.commentSortSelect {
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--button);
  color: var(--text);
  padding: 0 12px;
  font: inherit;
  font-weight: 700;
  outline: none;
}

.app.light .readerCommentTools button,
.app.light .readerCommentTools select,
.app.light .titleCommentTools button,
.app.light .titleCommentTools select {
  background: #ffffff !important;
  color: #111827 !important;
  border-color: #d4dbe8 !important;
}

.app.light .readerCommentTools button:hover,
.app.light .titleCommentTools button:hover {
  background: #f3f6fb !important;
  color: #111827 !important;
}

.app.light .readerTeamRow b,
.app.light .readerTeamRow small,
.app.light .pageCommentAuthor,
.app.light .titleComment .pageCommentAuthor,
.app.light .commentText {
  color: #111827 !important;
}

.readerV2.readerTheme_dark .pageCommentAuthor,
.readerV2.readerTheme_dark .titleComment .pageCommentAuthor,
.app.dark .pageCommentAuthor,
.app.dark .titleComment .pageCommentAuthor {
  color: #f4f4f5 !important;
}

.titleCommentVote .voteUpButton,
.titleCommentVote .voteDownButton {
  font-size: 18px !important;
  line-height: 1 !important;
  opacity: 0.9;
}

.titleCommentVote .voteUpButton {
  color: #22c55e !important;
}

.titleCommentVote .voteDownButton {
  color: #9ca3af !important;
}

.titleCommentVote .voteDownButton:hover {
  color: #ef4444 !important;
}

.titleCommentVote .scorePositive {
  color: #22c55e !important;
}

.titleCommentVote .scoreNegative {
  color: #ef4444 !important;
}

.commentEditable {
  unicode-bidi: plaintext;
}

.commentAuthorPickerPopover {
  z-index: 80 !important;
}


/* v48 comment theme, vote and pin fixes */
.readerV2.readerTheme_dark .pageComment,
.readerV2.readerTheme_dark .pageCommentBody,
.readerV2.readerTheme_dark .commentText,
.readerV2.readerTheme_dark .commentText *,
.readerV2.readerTheme_dark .pageComment p {
  color: #e8e8ee !important;
}
.readerV2.readerTheme_dark .pageCommentAuthor,
.readerV2.readerTheme_dark .pageCommentAuthor:visited {
  color: #f4f4f6 !important;
}
.readerV2.readerTheme_dark .pageCommentMeta span {
  color: #9ca3af !important;
}
.readerV2.readerTheme_light .pageCommentAuthor,
.readerV2.readerTheme_light .pageCommentAuthor:visited,
.app.light .pageCommentAuthor,
.app.light .pageCommentAuthor:visited {
  color: #111827 !important;
}
.readerV2.readerTheme_light .pageCommentMeta span,
.app.light .pageCommentMeta span {
  color: #6b7280 !important;
}
.readerV2.readerTheme_light .commentText,
.readerV2.readerTheme_light .commentText *,
.app.light .commentText,
.app.light .commentText * {
  color: #111827 !important;
}
.titleCommentVote {
  min-width: 28px !important;
  width: 28px !important;
  gap: 2px !important;
  align-content: start !important;
  justify-items: center !important;
}
.titleCommentVote button,
.titleCommentVote .voteUpButton,
.titleCommentVote .voteDownButton {
  width: 22px !important;
  height: 22px !important;
  display: grid !important;
  place-items: center !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-size: 18px !important;
  line-height: 1 !important;
  font-weight: 800 !important;
  opacity: 1 !important;
  cursor: pointer !important;
}
.titleCommentVote .voteUpButton {
  color: #8b929c !important;
}
.titleCommentVote .voteDownButton {
  color: #8b929c !important;
}
.titleCommentVote .voteUpButton:hover,
.titleCommentVote .voteUpButton.voteSelected {
  color: #22c55e !important;
}
.titleCommentVote .voteDownButton:hover,
.titleCommentVote .voteDownButton.voteSelected {
  color: #ef4444 !important;
}
.titleCommentVote b {
  min-height: 18px !important;
  font-size: 13px !important;
  line-height: 18px !important;
  font-weight: 800 !important;
}
.titleCommentVote .scorePositive {
  color: #22c55e !important;
}
.titleCommentVote .scoreNegative {
  color: #ef4444 !important;
}
.titleCommentVote .scoreNeutral {
  color: #9ca3af !important;
}
.commentEditable {
  user-select: text !important;
  -webkit-user-select: text !important;
  outline: none !important;
  direction: ltr !important;
  unicode-bidi: plaintext !important;
}

/* v49: reader dark text, horizontal comment rating, team authored delete fix */
.readerV2.readerTheme_dark .pageCommentAuthor,
.readerV2.readerTheme_dark .titleComment .pageCommentAuthor,
.readerV2.readerTheme_dark .pageCommentMeta .pageCommentAuthor,
.readerV2.readerTheme_dark .pageCommentHeader .pageCommentAuthor {
  color: #f3f4f6 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_dark .pageCommentMeta span,
.readerV2.readerTheme_dark .titleComment .pageCommentMeta span {
  color: #aeb4c0 !important;
}

.readerV2.readerTheme_dark .commentText,
.readerV2.readerTheme_dark .titleComment .commentText,
.readerV2.readerTheme_dark .pageComment .commentText,
.readerV2.readerTheme_dark .pageCommentBody,
.readerV2.readerTheme_dark .pageCommentBody p {
  color: #e5e7eb !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_dark .pageCommentActions button {
  color: #ff4d4f !important;
}

.titleComment {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  align-items: start !important;
  column-gap: 18px !important;
}

.titleComment .pageCommentBody {
  grid-column: 1 !important;
  grid-row: 1 !important;
  min-width: 0 !important;
}

.titleCommentVote {
  grid-column: 2 !important;
  grid-row: 1 !important;
  position: static !important;
  width: auto !important;
  min-width: 82px !important;
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 10px !important;
  margin: 0 !important;
  padding-top: 0 !important;
  transform: none !important;
}

.titleCommentVote button,
.titleCommentVote .voteUpButton,
.titleCommentVote .voteDownButton {
  width: 18px !important;
  height: 18px !important;
  min-width: 18px !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #8f96a3 !important;
  font-size: 18px !important;
  line-height: 18px !important;
  font-weight: 700 !important;
}

.titleCommentVote b {
  min-width: 18px !important;
  text-align: center !important;
  font-size: 14px !important;
  line-height: 18px !important;
  font-weight: 700 !important;
}

.titleCommentVote .voteUpButton:hover,
.titleCommentVote .voteUpButton.voteSelected {
  color: #39c86a !important;
}

.titleCommentVote .voteDownButton:hover,
.titleCommentVote .voteDownButton.voteSelected {
  color: #ff5a5f !important;
}

.titleCommentVote .scorePositive {
  color: #39c86a !important;
}

.titleCommentVote .scoreNegative {
  color: #ff5a5f !important;
}

.titleCommentVote .scoreNeutral {
  color: #8f96a3 !important;
}

.commentEditor .commentEditable {
  unicode-bidi: plaintext !important;
  direction: ltr !important;
  text-align: left !important;
}


/* v51: exact reader comment text colors by reader theme */
.readerV2.readerTheme_dark .pageComments,
.readerV2.readerTheme_dark .pageComment,
.readerV2.readerTheme_dark .pageCommentReply {
  background: transparent !important;
  color: #f3f4f6 !important;
}

.readerV2.readerTheme_dark .pageComment .commentText,
.readerV2.readerTheme_dark .pageComment .commentText span,
.readerV2.readerTheme_dark .pageComment .commentText strong,
.readerV2.readerTheme_dark .pageComment .commentText b,
.readerV2.readerTheme_dark .pageComment .commentText em,
.readerV2.readerTheme_dark .pageComment .commentText i,
.readerV2.readerTheme_dark .pageComment .commentText u,
.readerV2.readerTheme_dark .pageComment .commentText s,
.readerV2.readerTheme_dark .pageComment .commentText div,
.readerV2.readerTheme_dark .pageComment .commentText p,
.readerV2.readerTheme_dark .pageComment .commentText blockquote,
.readerV2.readerTheme_dark .pageComment .commentText * {
  color: #f3f4f6 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_dark .pageCommentAuthor,
.readerV2.readerTheme_dark .pageCommentAuthor span,
.readerV2.readerTheme_dark .pageCommentAuthor b,
.readerV2.readerTheme_dark .pageCommentAuthor * {
  color: #ffffff !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_dark .pageCommentMeta span:not(.pageCommentAuthor),
.readerV2.readerTheme_dark .pageCommentHeader span {
  color: #aeb4c0 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_light .pageComments,
.readerV2.readerTheme_light .pageComment,
.readerV2.readerTheme_light .pageCommentReply {
  background: transparent !important;
  color: #111827 !important;
}

.readerV2.readerTheme_light .pageComment .commentText,
.readerV2.readerTheme_light .pageComment .commentText span,
.readerV2.readerTheme_light .pageComment .commentText strong,
.readerV2.readerTheme_light .pageComment .commentText b,
.readerV2.readerTheme_light .pageComment .commentText em,
.readerV2.readerTheme_light .pageComment .commentText i,
.readerV2.readerTheme_light .pageComment .commentText u,
.readerV2.readerTheme_light .pageComment .commentText s,
.readerV2.readerTheme_light .pageComment .commentText div,
.readerV2.readerTheme_light .pageComment .commentText p,
.readerV2.readerTheme_light .pageComment .commentText blockquote,
.readerV2.readerTheme_light .pageComment .commentText * {
  color: #111827 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_light .pageCommentAuthor,
.readerV2.readerTheme_light .pageCommentAuthor span,
.readerV2.readerTheme_light .pageCommentAuthor b,
.readerV2.readerTheme_light .pageCommentAuthor * {
  color: #111827 !important;
  opacity: 1 !important;
}

.readerV2.readerTheme_light .pageCommentMeta span:not(.pageCommentAuthor),
.readerV2.readerTheme_light .pageCommentHeader span {
  color: #6b7280 !important;
  opacity: 1 !important;
}

.readerV2 .pageCommentActions button,
.readerV2 .pageCommentActions .deleteCommentButton {
  color: #ff4d4f !important;
}

`;