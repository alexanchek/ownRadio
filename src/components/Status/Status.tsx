import { usePlayerContext } from '../../Context';
import './status.css';

const Status = () => {
  const { isLoading, } = usePlayerContext();

  return (
    <div className='status'>
      {isLoading
        ? (<div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>)
        : ''}
    </div>
  );
};

export default Status;