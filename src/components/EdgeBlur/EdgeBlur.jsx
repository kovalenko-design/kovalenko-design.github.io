import { useEffect, useRef, useState } from 'react'
import styles from './EdgeBlur.module.css'

// Displacement map for the warp: red sets the sideways shift, green the downward pull, and 50% gray
// means no shift. Red is full on the left half and zero on the right (with a soft join in the middle), so the
// two halves lean apart in a V. A gray wash fades it out towards the bottom.
const WARP_MAP =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" preserveAspectRatio="none">' +
      '<linearGradient id="x" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0.42" stop-color="rgb(255,200,128)"/><stop offset="0.58" stop-color="rgb(0,200,128)"/>' +
      '</linearGradient>' +
      '<linearGradient id="y" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="rgb(128,128,128)" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="rgb(128,128,128)"/>' +
      '</linearGradient>' +
      '<rect width="100" height="80" fill="url(#x)"/><rect width="100" height="80" fill="url(#y)"/></svg>'
  )

// Progressive blur with a V-shaped warp and a slight color fringe, for a bar that content scrolls under.
// Strongest at the top edge (used by the header). The parent must be positioned; this sits behind its content
// and 24px past its bottom edge.
export default function EdgeBlur() {
  // The warp map has to match the size of this box (the V is centered on it), and the filter only takes pixels.
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 1440, height: 64 })

  useEffect(() => {
    const box = ref.current
    const observer = new ResizeObserver(() =>
      setSize({ width: box.offsetWidth, height: box.offsetHeight })
    )
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.blur} aria-hidden="true">
      {/* Stacked layers, each stronger and masked shorter, so the blur fades out downwards. */}
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      {/* Safari only (it cannot run the warp below): the two halves get opposite hue shifts instead. */}
      <span className={`${styles.safariTint} ${styles.tintLeft}`} />
      <span className={`${styles.safariTint} ${styles.tintRight}`} />
      <span className={styles.warp} />
      {/* Used by .warp: leans the two halves of the content apart in a V (more at the top, see WARP_MAP) and
          shifts the red, green and blue by different amounts for a slight color fringe. Only Chromium (and
          Firefox) apply a filter like this to the backdrop; Safari keeps the blur only. */}
      <svg className={styles.filterDefs}>
        <filter
          id="edge-warp"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={WARP_MAP}
            x="0"
            y="0"
            width={size.width}
            height={size.height}
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="24"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dr"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dg"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
            result="db"
          />
          <feColorMatrix in="dr" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feColorMatrix in="dg" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
          <feColorMatrix in="db" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
          <feComposite in="r" in2="g" operator="arithmetic" k2="1" k3="1" result="rg" />
          <feComposite in="rg" in2="b" operator="arithmetic" k2="1" k3="1" />
        </filter>
      </svg>
    </div>
  )
}
