import HeaderNav from './HeaderNav'

function HeaderNavMobil({ open, onClose, id }) {
  if (!open) return null

  return <HeaderNav id={id} isMobile={true} onLinkClick={onClose} />
}

export default HeaderNavMobil
