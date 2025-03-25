import EmptyStar from './EmpyStart'
import FullStar from './FullStar'
import HalfStar from './HalfStart'

const Stars = ({ rating }) => {
  const starRating = rating / 2
  const fullStars = Math.floor(starRating)
  const hasHalfStar = starRating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className='flex'>
      {[...Array(fullStars)].map((_, i) => (
        <FullStar key={`full-${i}`} />
      ))}

      {hasHalfStar && <HalfStar key='half' />}

      {[...Array(emptyStars)].map((_, i) => (
        <EmptyStar key={`empty-${i}`} />
      ))}
    </div>
  )
}

export default Stars
