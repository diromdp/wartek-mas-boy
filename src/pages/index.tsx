import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import {
   Badge,
   Stack,
   Skeleton,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalBody,
   Button
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiArrowRight } from 'react-icons/fi';

import client from '../lib/grapql';
import { getDataCompare } from '../store/compare/action';
import { PokemonsGrapQL, PokemonQueryGrapQLFilter } from '../apollo/queries'
import { padStart } from '../lib/lib';
import Header from '../component/header';
import Drawers from '../component/drawer';
import styles from '../styles/Home.module.css';

interface Props {

}

interface State {
   count: number,
   limit: number
   page: number,
   offset: number,
}

const DEFAULT_LIMIT = 12
const DEFAULT_PAGE = 1
const DEFAULT_OFFSET = 0
const DEFAULT_COUNT = 0

const Home: FunctionComponent<Props> = () => {
   const [poko, setPoko] = useState(null);
   const [isloading, setLoading] = useState(true);
   const [isSuccess, setSucces] = useState(false)
   const [count, setCount] = useState(0);
   const [isShowChecbox, setIsShowCheckbox] = useState(false);
   const [valueCompare, setValueCompare] = useState([]);
   const [isOpenDrawer, setOpenDrawer] = useState(false);
   const [filterType, setFilterType] = useState([]);
   const router = useRouter();
   const dispatch = useDispatch();

   let state: State = {
      limit: DEFAULT_LIMIT,
      page: DEFAULT_PAGE,
      offset: DEFAULT_OFFSET,
      count: DEFAULT_COUNT,
   }

   let variables = {
      limit: state.limit,
      offset: state.offset,
   };

   useEffect(() => {
      const _handlerGetData = async () => {
         try {
            const { data } = await client.query({
               query: PokemonsGrapQL,
               variables: { limit: variables.limit, offset: variables.offset }
            });
            setPoko(data ? data.pokemons : null)
            setLoading(false)
            setSucces(true)
            setCount(data ? data.aggregate.aggregate.count : 0)
         } catch (error) {
            console.log(error)
         }
      }

      if (!poko) {
         _handlerGetData();
      }
   }, [])

   const fetchMoreData = async (val: number) => {
      try {
         const dataCurrent: any = poko;
         const offsetVal = variables.limit + val;
         let queryVar: any = {};
         if(filterType && filterType.length != 0) {
            queryVar = {
               query: PokemonQueryGrapQLFilter,
               variables: { filterName: filterType, limit: variables.limit, offset: offsetVal }
            }
            
         } else {
            queryVar = {
               query: PokemonsGrapQL,
               variables: { limit: variables.limit, offset: offsetVal }
            }
         }

         const { data } = await client.query(queryVar)
         let joinData = dataCurrent ? dataCurrent.concat(data.pokemons) : null;
         setPoko(joinData)

      } catch (error) {
         console.log(error)
      }
   }

   const handleCheckboxChange = (val: any) => {
      const data: any = []
      data.push(val);

      if (valueCompare && valueCompare.length < 2) {
         const finalData = valueCompare.concat(data);
         setValueCompare(finalData)
         dispatch(getDataCompare(finalData))
      }
   }

   const closeDrawer = (val: boolean) => {
      setOpenDrawer(val)
   }
   
   const handlerSubmitFilter =  async(val1: any, val2: any) => {
      try {
         const { data } = await client.query({
            query: PokemonQueryGrapQLFilter,
            variables: { filterName: val1, limit: variables.limit, offset: variables.offset }
         });
         setPoko(data ? data.pokemons : null)
         setLoading(false)
         setSucces(true)
         setFilterType(val1)
         setOpenDrawer(false),
         setCount(data ? data.aggregate.aggregate.count : 0)
      } catch (error) {
         console.log(error)
      }
   }

   const _handlerSuccess = () => {
      const dataPoko: any = poko;
      const length: number = dataPoko && dataPoko.length
      return (
         <>
            <InfiniteScroll
               dataLength={dataPoko && dataPoko.length}
               next={() => fetchMoreData(length)}
               hasMore={true}
               className="grid grid-cols-2 gap-6"
               loader={<h4 className="text-base mt-3 text-center">Loading...</h4>}
            >
               {
                  dataPoko && dataPoko.map((item: any, index: number) => {
                     return (
                        <>
                           <div className="flex flex-col relative">
                              {
                                 isShowChecbox &&
                                 <div className="absolute top-2 z-10 right-2">
                                    <input
                                       onChange={() => handleCheckboxChange(item)}
                                       type="checkbox"
                                       id={`custom-checkbox-${index}`}
                                       name={item.name}
                                       value={item.name}
                                       className="h-6 w-6 rounded-xl"
                                    />
                                 </div>
                              }

                              <Link href={`/detail/${item.name}`}>
                                 <a key={index} className={`bg-${item.types[0].type.name} rounded-md text-white p-4 relative`}>

                                    <div>
                                       <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} />
                                    </div>

                                    <div className="">
                                       <span>{`#${padStart(item.id, 3)}`}</span>
                                       <h3>{item.name}</h3>
                                       <div className="mt-2">
                                          <Stack direction='row'>
                                             {
                                                item.types.map((type: any, index: number) => {
                                                   return (
                                                      <>
                                                         <Badge key={index} className={`rounded-full bg-type-${type.type.name} text-white text-xs font-normal p-2`}>{type.type.name}</Badge>
                                                      </>
                                                   )
                                                })
                                             }
                                          </Stack>
                                       </div>
                                    </div>
                                 </a>
                              </Link>
                           </div>

                        </>
                     )
                  })
               }
            </InfiniteScroll>
         </>
      )
   }

   const _handlerLoading = () => {
      const arry: number[] = [1, 2, 3, 4, 5, 6]
      return (
         <>
            <InfiniteScroll
               dataLength={30}
               next={() => fetchMoreData(3)}
               hasMore={true}
               className="grid grid-cols-2 gap-6"
               loader={<h4 className="text-base mt-3 text-center">Loading...</h4>}
            >
               {
                  arry.map(item => {
                     return (
                        <>
                           <Link key={item} href="/">
                              <a>
                                 <Skeleton className="rounded-md">
                                    <div className="bg-emerald-400 rounded-md text-white p-2">
                                       <div>
                                          <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'} />
                                       </div>
                                       <div className="">
                                          <span>#001</span>
                                          <h3>Bulbarus</h3>
                                          <div className="">
                                             <Stack direction='row'>
                                                <Badge className="rounded-full" colorScheme='green'>Success</Badge>
                                                <Badge className="rounded-full" colorScheme='red'>Removed</Badge>
                                                <Badge className="rounded-full" colorScheme='purple'>New</Badge>
                                             </Stack>
                                          </div>
                                       </div>
                                    </div>
                                 </Skeleton>
                              </a>
                           </Link>
                        </>
                     )
                  })
               }
            </InfiniteScroll>
         </>
      )
   }

   return (
      <div className={styles.container}>
         <main className="container">
            <Header
               setShowCheckbox={() => setIsShowCheckbox(!isShowChecbox)}
               setOpenFilter={(val: boolean) => setOpenDrawer(val)}
            />
            <div className="container p-4">
               <h1 className="font-bold text-2xl mb-3">Pokédex ({count})</h1>
               <div className="">
                  {
                     isloading && _handlerLoading()
                  }
                  {
                     isSuccess && _handlerSuccess()
                  }
               </div>
               <Modal
                  isOpen={valueCompare.length == 2 ? true : false}
                  onClose={() => {
                     setValueCompare([])
                     setIsShowCheckbox(false)
                  }
                  }>
                  <ModalOverlay />
                  <ModalContent>
                     <ModalBody>
                        <div className="flex flex-row justify-between">
                           <div className="flex flex-row">
                              {
                                 valueCompare && valueCompare.map((item: any, index: number) => {
                                    return (
                                       <>
                                          <img className="w-24 h-24 block" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} />
                                       </>

                                    )
                                 })
                              }
                           </div>
                           <div className="flex flex-row items-center">
                              {
                                valueCompare &&  valueCompare.length < 2 &&
                                 <Button
                                    className="bg-slate-300"
                                    mr={3}
                                    onClick={() => {
                                       setValueCompare([])
                                       setIsShowCheckbox(false)
                                    }}
                                 >
                                    Close
                                 </Button>
                              }
                              {
                                valueCompare && valueCompare.length == 2 &&
                                 <Button
                                    className="bg-blue-400 text-base text-white rounded-xl"
                                    mr={3}
                                    onClick={() => {
                                       router.push('/compare')
                                    }}
                                 >
                                    Submit <FiArrowRight className="ml-3 text-base" size={18} height={18} width={18} />
                                 </Button>
                              }
                           </div>
                        </div>
                     </ModalBody>
                  </ModalContent>
               </Modal>
               <Drawers
                  isOpen={isOpenDrawer}
                  onClose={(val: boolean) => closeDrawer(val)}
                  onSubmitItem={(val1: any, val2: any) => handlerSubmitFilter(val1, val2)}
               />
            </div>
         </main>
      </div>
   )
}

export default Home
