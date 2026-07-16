export function HomeField() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #C9C2B6 0%,
              #C9C2B6 14%,
              #E4DFD4 24%,
              #E4DFD4 36%,
              #0E0D0C 44%,
              #0E0D0C 70%,
              #D6D0C4 80%,
              #EEEAE2 92%,
              #EEEAE2 100%
            )
          `,
        }}
      />
      {/* Unexpected axis — late in the field, not a comfortable third */}
      <div className="absolute inset-y-0 start-[72%] w-px bg-[#1A1816]/[0.14] max-md:start-[12%]" />
    </div>
  );
}
