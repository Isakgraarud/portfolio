const PHOTOS = [
  { src: '/images/ntnu.jpeg',         alt: 'NTNU',              className: 'row-span-2' },
  { src: '/images/skiInShorts.jpeg',  alt: 'Ski in shorts' },
  { src: '/images/airplane.jpeg',     alt: 'Airplane' },
  { src: '/images/helicopterhat.jpeg',alt: 'Helicopter hat',    className: 'col-span-2 row-span-2' },
  { src: '/images/OnBoatIsak.jpeg',   alt: 'On a boat' },
]

export default function PhotoGallery() {
  return (
    <div
      className="grid gap-4 mt-8 mb-12"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gridAutoRows: '250px' }}
    >
      {PHOTOS.map(({ src, alt, className = '' }) => (
        <div
          key={src}
          className={`relative rounded-xl overflow-hidden bg-gh-bg-secondary shadow-lg cursor-pointer
                      transition-all duration-[400ms] hover:-translate-y-2 hover:scale-[1.02]
                      hover:shadow-[0_12px_24px_rgba(46,164,79,0.2)] ${className}`}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-[400ms] hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}
