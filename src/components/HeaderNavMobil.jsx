import HeaderNav from './HeaderNav'

function HeaderNavMobil({ open, onClose }) {
  if (!open) return null

  return <HeaderNav isMobile={true} onLinkClick={onClose} />
}

export default HeaderNavMobil
