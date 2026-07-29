(() => {
  const WELCOME =
    "您好！我是新华小学 AI 招生顾问。可询问报名材料、年龄要求、学区政策、师资课程或校园生活。请问有什么可以帮您？";

  const KNOWLEDGE = [
    {
      keys: ["材料", "资料", "证件", "户口", "身份证", "报名"],
      answer:
        "一年级新生报名通常需准备：①儿童户口本原件及复印件；②出生医学证明；③房产证或合法居住证明（用于核对学区）；④监护人身份证。具体以当年教育局通知为准，您也可电话 028-8000-1958 向招生办确认。",
    },
    {
      keys: ["年龄", "几岁", "适龄", "出生", "截止"],
      answer:
        "2026 年秋季一年级适龄儿童一般为：截至 2026 年 8 月 31 日满 6 周岁。若您不确定孩子是否符合年龄要求，可在下方报名表填写出生日期，招生办会协助核对。",
    },
    {
      keys: ["学区", "划片", "地址", "住哪", "范围"],
      answer:
        "新华小学按教育局当年划片招生。请在报名表填写实际居住地址，招生办将核对是否在本校学区范围内。跨学区情况请咨询招生办 028-8000-1958。",
    },
    {
      keys: ["时间", "什么时候", "日期", "截止", "开放日", "参观"],
      answer:
        "线上意向报名现已开放；现场核验与正式报名时间以区教育局通知为准。校园开放日通常安排在招生季周末，可在报名表“补充说明”中预约参观意向。",
    },
    {
      keys: ["课程", "校本", "特色课", "社团", "兴趣"],
      answer:
        "学校开齐国家课程，并设“新华童韵”校本课程群：书法、合唱、足球、编程入门、戏剧表演、自然笔记等，按兴趣走班。课后服务另有延时托管与社团活动。",
    },
    {
      keys: ["师资", "老师", "教师", "班主任"],
      answer:
        "现有专任教师 68 人以上，约 42% 为区级及以上骨干教师，人均教龄约 12 年，100% 持证上岗。语文、数学、英语、科学等学科均有骨干教师领衔。",
    },
    {
      keys: ["特色", "亮点", "优势", "为什么"],
      answer:
        "新华小学的特色是：小班化陪伴、五育融合、家校共育与安全守护。校园“一书院两花园”，四季有景；文化上以“明德·求真·乐学·向善”校训浸润日常。",
    },
    {
      keys: ["风景", "校园", "环境", "操场", "图书馆"],
      answer:
        "校园拥有绿荫操场、书香阅览室、童趣花园与科学园地。欢迎预约开放日实地参观，感受“四季有景、处处可学”的校园氛围。",
    },
    {
      keys: ["文化", "校训", "历史", "建校", "历时"],
      answer:
        "学校创办于 1958 年，校训为“明德·求真·乐学·向善”。历经扩建与素质教育深化，2020 年起建成智慧校园。读书节、科技节、艺术周等活动构成完整成长年历。",
    },
    {
      keys: ["学费", "收费", "钱", "费用", "托管"],
      answer:
        "义务教育阶段公办小学免收学费。课后服务、延时托管及部分社团材料费按当地政策执行，详情请咨询招生办。学校不组织任何与入学挂钩的收费培训。",
    },
    {
      keys: ["联系", "电话", "地址", "招生办", "怎么找"],
      answer:
        "招生办电话：028-8000-1958；地址：本市新华路 88 号；接待时间：工作日 9:00–17:00。也可在本页提交报名意向，我们会主动回访。",
    },
    {
      keys: ["班额", "多少人", "班级", "小班"],
      answer:
        "我校推行小班化教学，每班约 35 人，便于班主任与科任教师关注每一位学生的学习与心理成长。",
    },
  ];

  const FALLBACK =
    "这个问题我暂时没有更精确的官方条目。建议您：①查看本页历史、师资、课程等介绍；②拨打招生办 028-8000-1958；③或在下方提交报名意向，老师将一对一答复。您也可以换个问法，例如“报名材料”“年龄要求”。";

  const messagesEl = document.getElementById("chatMessages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const suggestions = document.getElementById("chatSuggestions");
  const enrollForm = document.getElementById("enrollForm");
  const formHint = document.getElementById("formHint");
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");

  function addBubble(text, role) {
    const el = document.createElement("div");
    el.className = `bubble ${role}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function scoreAnswer(question) {
    const q = question.toLowerCase();
    let best = null;
    let bestScore = 0;
    for (const item of KNOWLEDGE) {
      let score = 0;
      for (const key of item.keys) {
        if (q.includes(key)) score += key.length > 1 ? 2 : 1;
      }
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }
    return bestScore > 0 ? best.answer : FALLBACK;
  }

  function reply(question) {
    addBubble(question, "user");
    const typing = addBubble("AI 正在思考…", "bot typing");
    const delay = 450 + Math.min(question.length * 18, 900);
    setTimeout(() => {
      typing.remove();
      addBubble(scoreAnswer(question), "bot");
    }, delay);
  }

  addBubble(WELCOME, "bot");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    reply(q);
  });

  suggestions.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]");
    if (!btn) return;
    reply(btn.dataset.q);
  });

  enrollForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(enrollForm).entries());
    const list = JSON.parse(localStorage.getItem("xinhua_enrollments") || "[]");
    list.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem("xinhua_enrollments", JSON.stringify(list));
    enrollForm.reset();
    formHint.textContent = `提交成功！我们将尽快联系 ${data.parentName}（${data.phone}）。`;
    formHint.classList.add("success");
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  });

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".timeline li, .feature-list li").forEach((el) => {
    observer.observe(el);
  });

  document.querySelectorAll(".section h2, .stats-row, .culture-grid, .course-tracks, .teacher-list, .gallery, .chat").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();
