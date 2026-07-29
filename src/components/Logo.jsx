import { img } from '../data/images.js'

export const logoUrl = img('logo/navbar2.png')
export const faviconUrl = img('logo/favicon.png')

export default function Logo({ variant = 'navbar' }) {
  const isFavicon = variant === 'favicon'

  return (
    <img
      src={isFavicon ? faviconUrl : logoUrl}
      alt="Complejo El Abuelo"
      className={
        isFavicon
          ? 'block h-32 w-auto max-w-full object-contain'
          : 'block h-14 w-auto origin-left scale-125 object-contain'
      }
    />
  )
}
