import EmptyStar from './EmpyStar'
import FullStar from './FullStar'

const HalfStar = () => (
  <div className='relative w-5 h-5'>
    <EmptyStar />
    <div
      className='absolute top-0 left-0 overflow-hidden'
      style={{ width: '50%' }}
    >
      <FullStar />
    </div>
  </div>
)

export default HalfStar
