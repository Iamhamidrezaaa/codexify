import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-bg px-5 pt-8 pb-24 md:px-16 md:pt-12 lg:px-20"
    >
      <div className="mx-auto max-w-[1360px]">
        <p className="text-sm text-muted">( Services )</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
          طراحی وب، از ایده تا تجربه
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          فقط طراحی سایت — بدون شلوغی آژانس. تمرکز روی محصولی که دیده شود و
          بفروشد.
        </p>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {SERVICES.map((item) => (
            <li
              key={item.num}
              className="flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between md:gap-8"
            >
              <span className="text-xl font-bold text-lime md:w-16">
                {item.num}
              </span>
              <div className="flex-1 text-right md:text-right">
                <h3 className="text-2xl font-bold text-fg md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted md:text-base">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
