// An email link that keeps the address out of the page and the code as one piece of text.
// The address is stored encoded and decoded only when the link is clicked, so scrapers that read the HTML
// or the bundle for "name@domain" or "mailto:" do not find it.
const ENCODED = 'dmFkaW0ua2F2YWxlbmthQGdtYWlsLmNvbQ=='

export default function EmailLink({ className, children }) {
  const open = (event) => {
    event.preventDefault()
    window.location.href = ['mail', 'to:'].join('') + atob(ENCODED)
  }

  return (
    <a href="#email" className={className} onClick={open}>
      {children}
    </a>
  )
}
