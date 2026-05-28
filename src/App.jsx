import { useEffect, useState } from "react";

function App() {
  const mangas = [
    {
      id: 1,
      title: "Поднятие уровня в одиночку",
      genre: "Боевик • Фэнтези",
      tags: ["Боевик", "Фэнтези"],
      image: "https://cdn.myanimelist.net/images/manga/3/222295.jpg",
      description:
        "Слабейший охотник получает шанс стать сильнейшим после загадочной системы прокачки.",
      pages: [
        "https://placehold.co/800x1100/111111/ffffff?text=Solo+Leveling+1",
        "https://placehold.co/800x1100/1a1a1a/ffffff?text=Solo+Leveling+2",
        "https://placehold.co/800x1100/222222/ffffff?text=Solo+Leveling+3",
      ],
    },
    {
      id: 2,
      title: "Берсерк",
      genre: "Тёмное фэнтези • Драма",
      tags: ["Тёмное", "Фэнтези"],
      image: "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
      description:
        "Мрачная история Гатса, мечника с огромным мечом, который идёт через ад ради мести и свободы.",
      pages: [
        "https://placehold.co/800x1100/000000/ffffff?text=Berserk+1",
        "https://placehold.co/800x1100/111111/ffffff?text=Berserk+2",
        "https://placehold.co/800x1100/222222/ffffff?text=Berserk+3",
      ],
    },
    {
      id: 3,
      title: "Дзюдзюцу Кайсен",
      genre: "Сёнен • Экшен",
      tags: ["Сёнен", "Боевик"],
      image: "https://cdn.myanimelist.net/images/manga/3/210341.jpg",
      description:
        "Парень оказывается втянут в мир проклятий, магов и смертельных битв.",
      pages: [
        "https://placehold.co/800x1100/120000/ffffff?text=JJK+1",
        "https://placehold.co/800x1100/1b0000/ffffff?text=JJK+2",
        "https://placehold.co/800x1100/260000/ffffff?text=JJK+3",
      ],
    },
  ];

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Все");
  const [screen, setScreen] = useState("catalog");
  const [selectedManga, setSelectedManga] = useState(null);
  const [readerManga, setReaderManga] = useState(null);
  const [page, setPage] = useState(0);

  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("akariList");
    return saved ? JSON.parse(saved) : [];
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("akariProgress");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("akariList", JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem("akariProgress", JSON.stringify(progress));
  }, [progress]);

  const tags = ["Все", "Боевик", "Фэнтези", "Тёмное", "Сёнен"];

  const pageStyle = {
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial, sans-serif",
    background: `
      radial-gradient(circle at top, rgba(180,0,0,0.36), transparent 34%),
      radial-gradient(circle at bottom left, rgba(100,0,0,0.28), transparent 32%),
      #050507
    `,
  };

  const buttonBase = {
    padding: "12px 20px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    color: "white",
  };

  const addToList = (manga, status = "Хочу читать") => {
    if (!myList.some((item) => item.id === manga.id)) {
      setMyList([...myList, { ...manga, status }]);
    }
  };

  const removeFromList = (mangaId) => {
    setMyList(myList.filter((item) => item.id !== mangaId));
  };

  const changeStatus = (mangaId, status) => {
    setMyList(
      myList.map((item) =>
        item.id === mangaId ? { ...item, status } : item
      )
    );
  };

  const startReading = (manga) => {
    setReaderManga(manga);
    setPage(progress[manga.id] || 0);
  };

  const nextPage = () => {
    if (page < readerManga.pages.length - 1) {
      const next = page + 1;
      setPage(next);
      setProgress({ ...progress, [readerManga.id]: next });
    }
  };

  const prevPage = () => {
    if (page > 0) {
      const prev = page - 1;
      setPage(prev);
      setProgress({ ...progress, [readerManga.id]: prev });
    }
  };

  const filteredMangas = mangas.filter((manga) => {
    const bySearch = manga.title.toLowerCase().includes(search.toLowerCase());
    const byTag = activeTag === "Все" || manga.tags.includes(activeTag);
    return bySearch && byTag;
  });

  const visibleMangas = screen === "list" ? myList : filteredMangas;

  if (readerManga) {
    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "28px 18px" }}>
          <button
            onClick={() => {
              setReaderManga(null);
              setSelectedManga(readerManga);
            }}
            style={{ ...buttonBase, background: "rgba(255,255,255,0.09)" }}
          >
            ← Назад
          </button>

          <p style={{ textAlign: "center", color: "#aaa" }}>
            {readerManga.title} • Страница {page + 1} / {readerManga.pages.length}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >
            <button onClick={prevPage} style={{ ...buttonBase, background: "#1a1a22" }}>
              ← Назад
            </button>
            <button onClick={nextPage} style={{ ...buttonBase, background: "#1a1a22" }}>
              Вперёд →
            </button>
          </div>

          <img
            onClick={nextPage}
            onContextMenu={(e) => {
              e.preventDefault();
              prevPage();
            }}
            src={readerManga.pages[page]}
            alt="page"
            style={{
              width: "100%",
              borderRadius: "18px",
              cursor: "pointer",
              boxShadow: "0 0 35px rgba(255,0,0,0.22)",
            }}
          />

          <p style={{ textAlign: "center", color: "#888" }}>
            ЛКМ — следующая страница. ПКМ — назад.
          </p>
        </div>
      </div>
    );
  }

  if (selectedManga) {
    const inList = myList.some((item) => item.id === selectedManga.id);
    const savedPage = progress[selectedManga.id] || 0;

    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
          <button
            onClick={() => setSelectedManga(null)}
            style={{ ...buttonBase, background: "rgba(255,255,255,0.09)", marginBottom: "36px" }}
          >
            ← Назад
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "42px",
              alignItems: "start",
            }}
          >
            <img
              src={selectedManga.image}
              alt={selectedManga.title}
              style={{
                width: "280px",
                height: "420px",
                objectFit: "cover",
                borderRadius: "24px",
              }}
            />

            <div>
              <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>
                {selectedManga.title}
              </h1>

              <p style={{ color: "#ff6666", fontWeight: "bold", fontSize: "18px" }}>
                {selectedManga.genre}
              </p>

              <p style={{ color: "#d0d0d0", fontSize: "18px", lineHeight: "1.7" }}>
                {selectedManga.description}
              </p>

              <p style={{ color: "#999" }}>
                Прогресс: страница {savedPage + 1}
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
                <button
                  onClick={() => startReading(selectedManga)}
                  style={{
                    ...buttonBase,
                    background: "white",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Читать
                </button>

                <button
                  onClick={() => addToList(selectedManga)}
                  style={{
                    ...buttonBase,
                    background: inList
                      ? "rgba(255,255,255,0.12)"
                      : "linear-gradient(135deg,#ff2727,#850000)",
                  }}
                >
                  {inList ? "Уже в списке" : "Добавить в список"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "42px 24px" }}>
        <header style={{ textAlign: "center", marginBottom: "34px" }}>
          <h1 style={{ fontSize: "64px", margin: "0 0 14px" }}>Акари</h1>
          <p style={{ color: "#b9b9b9", fontSize: "19px", margin: 0 }}>
            Найдите свою настоящую мангу.
          </p>
        </header>

        <div style={{ display: "flex", gap: "12px", marginBottom: "22px", flexWrap: "wrap" }}>
          <button
            onClick={() => setScreen("catalog")}
            style={{
              ...buttonBase,
              background:
                screen === "catalog"
                  ? "linear-gradient(135deg,#ff2727,#850000)"
                  : "rgba(255,255,255,0.07)",
            }}
          >
            Каталог
          </button>

          <button
            onClick={() => setScreen("list")}
            style={{
              ...buttonBase,
              background:
                screen === "list"
                  ? "linear-gradient(135deg,#ff2727,#850000)"
                  : "rgba(255,255,255,0.07)",
            }}
          >
            Мой список ({myList.length})
          </button>
        </div>

        {screen === "catalog" && (
          <>
            <input
              placeholder="Поиск манги..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "18px 20px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                fontSize: "17px",
                marginBottom: "22px",
                outline: "none",
              }}
            />

            <div style={{ display: "flex", gap: "12px", marginBottom: "36px", flexWrap: "wrap" }}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    ...buttonBase,
                    background:
                      activeTag === tag
                        ? "linear-gradient(135deg,#ff2727,#850000)"
                        : "rgba(255,255,255,0.07)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </>
        )}

        {screen === "list" && myList.length === 0 && (
          <p style={{ color: "#aaa", fontSize: "20px" }}>
            Тут пока пусто. Добавь мангу из каталога.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 250px))",
            justifyContent: "start",
            gap: "28px",
          }}
        >
          {visibleMangas.map((manga) => (
            <div
              key={manga.id}
              style={{
                background: "rgba(255,255,255,0.055)",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                onClick={() => setSelectedManga(manga)}
                src={manga.image}
                alt={manga.title}
                style={{
                  width: "100%",
                  height: "330px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />

              <div style={{ padding: "18px", textAlign: "center" }}>
                <h2
                  onClick={() => setSelectedManga(manga)}
                  style={{
                    margin: "0 0 10px",
                    fontSize: "25px",
                    lineHeight: "1.2",
                    cursor: "pointer",
                  }}
                >
                  {manga.title}
                </h2>

                <p style={{ color: "#b0b0b0", fontSize: "15px", marginBottom: "14px" }}>
                  {manga.genre}
                </p>

                {screen === "list" && (
                  <>
                    <select
                      value={manga.status}
                      onChange={(e) => changeStatus(manga.id, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "12px",
                        border: "none",
                        marginBottom: "10px",
                      }}
                    >
                      <option>Хочу читать</option>
                      <option>Читаю</option>
                      <option>Прочитано</option>
                    </select>

                    <button
                      onClick={() => removeFromList(manga.id)}
                      style={{
                        width: "100%",
                        padding: "11px",
                        borderRadius: "12px",
                        border: "none",
                        background: "#5c0000",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Удалить
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;