import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Board from './Board';

const BoardList = (props) => {
  const [allTickets, setAllTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllTickets(props.alltickets);
    return () => {
      if (allTickets) {
        setIsLoading(false);
      }
    };
  }, [props.alltickets]);

  return <>{!isLoading && <Board alltickets={allTickets} />}</>;
};

const mapStateToProps = (state) => {
  return {
    alltickets: state.firestore.ordered.tickets,
  };
};

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    {
      collection: 'tickets',
    },
  ])
)(BoardList);
