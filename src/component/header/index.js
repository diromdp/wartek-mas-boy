import React, { Component } from 'react';
import { Button } from '@chakra-ui/react'
import Link from 'next/link';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {}
   }
   
   render() {
      const { urlPage, setShowCheckbox, setOpenFilter} = this.props;
      return (
         <div className={`sticky top-0 bg-white pt-3 pb-3 left-0 m-auto m-0 flex z-10 pl-2 pr-2 ${urlPage ? 'justify-start' : 'justify-end'}`}>
            {
               urlPage ?
                  <div className="flex flex-row justify-between">
                     <Link href={urlPage}>
                        <a>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </a>
                     </Link>
                  </div> :
                  <div className="flex flex-row justify-between">
                     <Button colorScheme='gray' onClick={() => setShowCheckbox()} className="mr-3 bg-transparent outline-0 focus:shadow-none">COMPARE</Button>
                     <Button onClick={() => setOpenFilter(true)} className="bg-transparent outline-0 focus:shadow-none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg></Button>
                  </div>
            }
         </div>
      );
   }
}

export default Header;