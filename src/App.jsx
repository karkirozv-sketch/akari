import { useEffect, useMemo, useState } from "react";

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

const EXTRA_GENRES = [
  "Арт",
  "Безумие",
  "Боевик",
  "Боевые искусства",
  "Вампиры",
  "Военное",
  "Гарем",
  "Гендерная интрига",
  "Героическое фэнтези",
  "Демоны",
  "Детектив",
  "Дзёсэй",
  "Драма",
  "Игра",
  "Исэкай",
  "История",
  "Киберпанк",
  "Кодомо",
  "Комедия",
  "Космос",
  "Магия",
  "Махо-сёдзё",
  "Машины",
];

const EXTRA_TAGS = [
  "Азартные игры",
  "Алхимия",
  "Амнезия / Потеря памяти",
  "Ангелы",
  "Антигерой",
  "Антиутопия",
  "Апокалипсис",
  "Армия",
  "Артефакты",
  "Боги",
  "Бои на мечах",
  "Борьба за власть",
  "Брат и сестра",
  "Будущее",
  "Ведьма",
  "Вестерн",
  "Видеоигры",
  "Викторианская эпоха",
  "Виртуальная реальность",
  "Владыка демонов",
  "Военные",
  "Война",
  "Волшебники / маги",
];

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
    title: "Новая глава",
    text: "У тайтла «Поднятие уровня в одиночку» появилась новая глава.",
    time: "сейчас",
    unread: true,
  },
  {
    id: "n2",
    title: "Модерация",
    text: "Когда модератор одобрит твой тайтл, уведомление появится здесь.",
    time: "скоро",
    unread: true,
  },
  {
    id: "n3",
    title: "Akari",
    text: "Уведомления пока работают как локальная заглушка.",
    time: "dev",
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

export default function App() {
  const [users, setUsers] = useState(() => readStorage(STORAGE_USERS, []));
  const [session, setSession] = useState(() => readStorage(STORAGE_SESSION, null));
  const [view, setView] = useState("catalog");
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_THEME) || "dark");

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const [readerSettingsOpen, setReaderSettingsOpen] = useState(false);
  const [readerChaptersOpen, setReaderChaptersOpen] = useState(false);

  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [titleTab, setTitleTab] = useState("about");
  const [settingsTab, setSettingsTab] = useState("profile");
  const [profileListFilter, setProfileListFilter] = useState("Все");
  const [profileTitleQuery, setProfileTitleQuery] = useState("");
  const [profileCommentQuery, setProfileCommentQuery] = useState("");
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

  const [suggestForm, setSuggestForm] = useState({
    name: "",
    genres: "",
    cover: "",
    description: "",
  });
  const [suggestMessage, setSuggestMessage] = useState("");

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
  const [notificationSettingsMessage, setNotificationSettingsMessage] = useState("");
  const [ratingModalTitleId, setRatingModalTitleId] = useState(null);
  const [ratingDraft, setRatingDraft] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [titleCommentText, setTitleCommentText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [titleReplyToCommentId, setTitleReplyToCommentId] = useState(null);

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
  const unreadCount = notifications.filter((item) => item.unread).length;

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

  const searchModalTitles = titles.filter((title) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return titleSearchText(title).includes(search);
  });

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


  const profileCommentItems = useMemo(() => {
    const ownId = currentUserId();
    const ownName = usernameFromSession();
    const items = [];

    Object.entries(titleComments).forEach(([titleId, comments]) => {
      const title = titles.find((item) => item.id === titleId);
      (comments || []).forEach((comment) => {
        const isMine = comment.authorId ? comment.authorId === ownId : comment.author === ownName;
        if (!isMine) return;
        items.push({
          id: `title-${titleId}-${comment.id}`,
          type: "К тайтлу",
          titleId,
          titleName: title?.name || "Тайтл",
          chapterName: "",
          text: comment.text || "",
          time: comment.time || "сейчас",
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
        items.push({
          id: `page-${key}-${comment.id}`,
          type: "К главе",
          titleId,
          titleName: title?.name || "Тайтл",
          chapterName: chapter ? `${chapter.name}, стр. ${pageIndex + 1}` : `Страница ${pageIndex + 1}`,
          text: comment.text || "",
          time: comment.time || "сейчас",
          rawId: comment.id,
        });
      });
    });

    const search = profileCommentQuery.trim().toLowerCase();
    const filtered = search
      ? items.filter((item) => `${item.titleName} ${item.chapterName} ${item.text}`.toLowerCase().includes(search))
      : items;

    return filtered.reverse();
  }, [titleComments, pageComments, profileCommentQuery, session, profile]);

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

  function addPageComment(titleId, chapterIndex, pageIndex) {
    const text = sanitizeCommentHtml(commentText);
    if (!stripCommentText(text)) return;

    const key = `${titleId}-${chapterIndex}-${pageIndex}`;
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    setPageComments((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        {
          id,
          parentId: replyToCommentId,
          authorId: session?.id || "guest",
          author: usernameFromSession(),
          avatar: profile.avatar || "",
          text,
          time: new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));

    setCommentText("");
    setReplyToCommentId(null);
  }

  function addTitleComment(titleId) {
    const text = sanitizeCommentHtml(titleCommentText);
    if (!stripCommentText(text)) return;

    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    setTitleComments((prev) => ({
      ...prev,
      [titleId]: [
        ...(prev[titleId] || []),
        {
          id,
          parentId: titleReplyToCommentId,
          authorId: session?.id || "guest",
          author: usernameFromSession(),
          avatar: profile.avatar || "",
          text,
          time: "только что",
          score: 0,
          pinned: false,
        },
      ],
    }));

    setTitleCommentText("");
    setTitleReplyToCommentId(null);
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

  function stripCommentText(value) {
    return String(value || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();
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
      document.execCommand("insertHTML", false, '<span class="commentSpoiler">спойлер</span>');
      return;
    }

    const inserts = {
      image: "[картинка]",
      book: "[тайтл]",
      sticker: "🙂",
    };

    document.execCommand("insertText", false, inserts[tool] || "");
  }

  function renderCommentEditor(target, value, placeholder, submitLabel, onSubmit) {
    const setter = target === "title" ? setTitleCommentText : setCommentText;
    const editorKey = `${target}-${target === "title" ? titleReplyToCommentId || "root" : replyToCommentId || "root"}`;

    return (
      <div className="commentEditor compactCommentEditor">
        <div
          key={editorKey}
          className="commentEditable"
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          dir="ltr"
          onInput={(event) => setter(event.currentTarget.innerHTML)}
          onPaste={(event) => {
            event.preventDefault();
            const text = event.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}
        />

        <div className="commentEditorBottom">
          <div className="commentFormatToolbar">
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "bold"); }} title="Жирный">
              <b>B</b>
            </button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "italic"); }} title="Курсив">
              <i>I</i>
            </button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "underline"); }} title="Подчёркивание">
              <u>U</u>
            </button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "strike"); }} title="Зачёркивание">
              <s>S</s>
            </button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "quote"); }} title="Цитата">”</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "spoiler"); }} title="Спойлер">⊝</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "image"); }} title="Картинка">▧</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "book"); }} title="Тайтл">▤</button>
            <button type="button" onMouseDown={(event) => { event.preventDefault(); applyCommentTool(target, "sticker"); }} title="Стикер">☻</button>
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
                } else {
                  setCommentText("");
                  setReplyToCommentId(null);
                }
              }}
            >
              Отмена
            </button>
            <button
              type="button"
              className="commentSubmitButton"
              onClick={(event) => {
                onSubmit();
                const editor = event.currentTarget.closest(".commentEditor")?.querySelector(".commentEditable");
                if (editor) editor.innerHTML = "";
              }}
              disabled={!stripCommentText(value)}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    );
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

  function submitSuggestion(event) {
    event.preventDefault();

    if (!suggestForm.name.trim()) {
      setSuggestMessage("Введите название тайтла.");
      return;
    }

    setSuggestMessage("Заявка сохранена локально. Позже подключим настоящую базу.");
    setSuggestForm({ name: "", genres: "", cover: "", description: "" });
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

  function isOwnComment(comment) {
    if (comment.authorId) return comment.authorId === currentUserId();
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

  function renderPageCommentTree(comments, parentId, pageContext, depth = 0) {
    return comments
      .filter((comment) => (comment.parentId || null) === parentId)
      .map((comment) => {
        const childCount = comments.filter((item) => item.parentId === comment.id).length;

        return (
          <div
            key={comment.id}
            className={`pageComment ${depth > 0 ? "pageCommentReply" : ""}`}
            style={{ marginLeft: `${Math.min(depth, 4) * 22}px` }}
          >
            <div className="pageCommentHeader">
              <button className="pageCommentAvatar" onClick={openCommentAuthorProfile}>
                {comment.avatar ? <img src={comment.avatar} alt={comment.author} /> : null}
              </button>

              <div className="pageCommentMeta">
                <button className="pageCommentAuthor" onClick={openCommentAuthorProfile}>
                  {comment.author || "Гость"}
                </button>
                <span>{comment.time}</span>
              </div>
            </div>

            <div className="commentText">{renderCommentText(comment.text)}</div>

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
    return comments
      .filter((comment) => (comment.parentId || null) === parentId)
      .map((comment) => {
        const childCount = comments.filter((item) => item.parentId === comment.id).length;

        return (
          <div
            key={comment.id}
            className={`pageComment titleComment ${depth > 0 ? "pageCommentReply" : ""}`}
            style={{ marginLeft: `${Math.min(depth, 4) * 24}px` }}
          >
            <div className="titleCommentVote">
              <button title="Вверх">↑</button>
              <b>{Number(comment.score || 0)}</b>
              <button title="Вниз">↓</button>
            </div>

            <div className="pageCommentBody">
              <div className="pageCommentHeader">
                <button className="pageCommentAvatar" onClick={openCommentAuthorProfile}>
                  {comment.avatar ? <img src={comment.avatar} alt={comment.author} /> : null}
                </button>

                <div className="pageCommentMeta">
                  <button className="pageCommentAuthor" onClick={openCommentAuthorProfile}>
                    {comment.author || "Гость"}
                  </button>
                  <span>{comment.time}</span>
                </div>
              </div>

              <div className="commentText">{renderCommentText(comment.text)}</div>

              <div className="pageCommentActions">
                <button onClick={() => setTitleReplyToCommentId(comment.id)}>ответить</button>
                <button onClick={reportTitleComment}>жалоба</button>
                <button>...</button>
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

    setProfile({
      nickname: profileDraft.nickname.trim() || usernameFromSession(),
      avatar: profileDraft.avatar,
      banner: profileDraft.banner,
      gender: profileDraft.gender,
      about: profileDraft.about,
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
    <div className={`app ${theme} ${isReader ? "readerModeApp" : ""}`}>
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
            <div className="logo" onClick={openCatalog}>
              Акари
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
                        <div className="notificationsTop">
                          <h3>Уведомления</h3>
                          <button onClick={markNotificationsRead}>Прочитано</button>
                        </div>

                        <div className="notificationsList">
                          {notifications.map((item) => (
                            <div
                              key={item.id}
                              className={`notificationItem ${
                                item.unread ? "unreadNotification" : ""
                              }`}
                            >
                              <div className="notificationDot"></div>

                              <div>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                                <span>{item.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
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
              <button className="activeTab">Тайтлы</button>
              <button>Команда</button>
              <button>Персонаж</button>
              <button>Человек</button>
              <button>Франшиза</button>
              <button>Издатель</button>
              <button>Пользователь</button>
            </div>

            <div className="searchContent">
              {query.trim() ? (
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

              <button>
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
            <section className="hero">
              <h1>Акари</h1>
              <p>Манга и аниме в удобном онлайн-каталоге.</p>
            </section>

            <section className={`catalogSection ${catalogMode === "titles" ? "catalogSectionWithFilters" : "catalogSectionHome"}`}>
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

              {catalogMode === "home" ? (
                <div className="catalogGrid catalogGridHomeOnly">
                  {titles.map((title) => (
                    <div key={title.id} className="catalogCard" onClick={() => openTitle(title.id)}>
                      <div className="catalogPosterWrap">
                        <img className="catalogPoster" src={title.cover} alt={title.name} />
                        <span className="posterType">{title.type}</span>
                        <span className="posterChapter">Глав: {title.chapters.length}</span>
                        {myList[title.id] && <span className="posterStatus">{myList[title.id]}</span>}
                      </div>

                      <div className="catalogBody">
                        <h3>{title.name}</h3>
                        <p>{title.genres.join(" • ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
                              <h3>{title.name}</h3>
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
              )}
            </section>

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
                        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num, index) => (
                          <div className="ratingLine" key={num}>
                            <span>{num} ★</span>
                            <div>
                              <i style={{ width: `${Math.max(3, 64 - index * 8)}%` }}></i>
                            </div>
                            <b>{index < 4 ? `${64 - index * 13}.8%` : "0%"}</b>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h3 className="listStatsTitle">В списках у 5942 человек</h3>
                        {[
                          ["Читаю", 33],
                          ["В планах", 23],
                          ["Брошено", 2],
                          ["Прочитано", 22],
                          ["Любимые", 9],
                          ["Другое", 11],
                        ].map(([name, percent]) => (
                          <div className="listLine" key={name}>
                            <span>{name}</span>
                            <div>
                              <i style={{ width: `${percent}%` }}></i>
                            </div>
                            <b>{percent}%</b>
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
                      <button>↕ Новые</button>
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
          <div className="panel">
            <h2>Предложить тайтл</h2>

            {!session ? (
              <>
                <p className="muted">Сначала войди или зарегистрируйся.</p>

                <div className="row">
                  <button onClick={() => setView("login")}>Вход</button>
                  <button onClick={() => setView("register")}>Регистрация</button>
                </div>
              </>
            ) : (
              <>
                <p className="muted">
                  Пока это локальная форма. Позже подключим сохранение в настоящую базу.
                </p>

                <form className="suggestForm" onSubmit={submitSuggestion}>
                  <input
                    value={suggestForm.name}
                    onChange={(event) =>
                      setSuggestForm({ ...suggestForm, name: event.target.value })
                    }
                    placeholder="Название тайтла"
                  />

                  <input
                    value={suggestForm.genres}
                    onChange={(event) =>
                      setSuggestForm({ ...suggestForm, genres: event.target.value })
                    }
                    placeholder="Жанры через запятую"
                  />

                  <input
                    value={suggestForm.cover}
                    onChange={(event) =>
                      setSuggestForm({ ...suggestForm, cover: event.target.value })
                    }
                    placeholder="Ссылка на обложку"
                  />

                  <textarea
                    value={suggestForm.description}
                    onChange={(event) =>
                      setSuggestForm({ ...suggestForm, description: event.target.value })
                    }
                    placeholder="Описание"
                  />

                  <button>Отправить</button>
                </form>

                {suggestMessage && <p className="authMessage">{suggestMessage}</p>}
              </>
            )}
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
                  <div key={item.id} className="notificationFeedItem">
                    <div className="notificationFeedAvatar">
                      {item.unread ? <span></span> : null}
                    </div>
                    <div>
                      <div className="notificationFeedTop">
                        <b>{item.title}</b>
                        <span>{item.time}</span>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  </div>
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
                <button>Статистика</button>
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
                  profileCommentItems.map((item) => (
                    <div key={item.id} className="profileCommentItem">
                      <div className="profileCommentItemContext">
                        {item.type}: <button onClick={() => openTitle(item.titleId)}>{item.titleName}</button>
                        {item.chapterName && <span> · {item.chapterName}</span>}
                      </div>
                      <div className="profileCommentAuthorRow">
                        <span className="profileCommentMiniAvatar">{profile.avatar ? <img src={profile.avatar} alt="avatar" /> : null}</span>
                        <b>{usernameFromSession()}</b>
                        <span>{item.time}</span>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  ))
                )}
              </div>
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
                <button>Статистика</button>
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
              <button>Статистика</button>
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
  font-size: 14px;
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
  width: 340px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 24px 75px rgba(0, 0, 0, 0.55);
  padding: 12px;
  z-index: 1000;
}

.notificationsTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.notificationsTop h3 {
  margin: 0;
  font-size: 18px;
}

.notificationsTop button {
  border: none;
  color: var(--muted);
  padding: 6px 8px;
  font-size: 13px;
}

.notificationsList {
  display: grid;
  gap: 8px;
}

.notificationItem {
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background: var(--panel2);
  border: 1px solid transparent;
}

.unreadNotification {
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}

.notificationDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  margin-top: 6px;
}

.unreadNotification .notificationDot {
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent);
}

.notificationItem h4 {
  margin: 0 0 4px;
  font-size: 14px;
}

.notificationItem p {
  margin: 0 0 5px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.35;
}

.notificationItem span {
  color: var(--muted);
  font-size: 12px;
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
  overflow-x: auto;
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
  overflow-x: auto;
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
  overflow-x: auto;
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
  overflow-x: auto;
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

`;