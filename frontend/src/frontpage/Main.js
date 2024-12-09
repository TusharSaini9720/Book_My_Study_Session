import React from 'react'
import History from './History';
import Bookedcards from './Bookedcards';
import TopRatedTutors from './TopRatedTutors';
import HeaderSection from './Headersection';
const Main = (props) => {
  return (
    <div>
      <HeaderSection/>
         <History     
          signedIn={props.signedIn}
        history={props.history}
        token={props.token}
        sethistory={props.sethistory} 
        />
        <Bookedcards />
          <TopRatedTutors />
    </div>
  )
}

export default Main
