const POSTS = [
  {
    tag: "تجربه کاربری",
    title: "چرا سایت آژانس‌مانند برای جذب مشتری طراحی وب کافی نیست",
    href: "#contact",
  },
  {
    tag: "موشن",
    title: "اسکرول باید داستان بگوید، نه فقط صفحه را پایین ببرد",
    href: "#contact",
  },
  {
    tag: "فروش",
    title: "جزئیات ریز UI که اعتماد مشتری را بالا می‌برد",
    href: "#contact",
  },
] as const;

export function Insights() {
  return (
    <section id="insights" className="bg-bg px-5 py-24 md:px-16 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <p className="text-sm text-muted">( Insights )</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
          یادداشت‌های کوتاه درباره طراحی
        </h2>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {POSTS.map((post) => (
            <li key={post.title}>
              <a
                href={post.href}
                className="group flex flex-col gap-2 py-7 transition md:flex-row md:items-center md:justify-between"
              >
                <span className="text-xs font-medium text-lime">{post.tag}</span>
                <span className="flex-1 text-right text-xl font-bold text-fg transition group-hover:text-lime md:px-8 md:text-2xl">
                  {post.title}
                </span>
                <span className="text-sm text-muted transition group-hover:text-fg">
                  ببین →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
