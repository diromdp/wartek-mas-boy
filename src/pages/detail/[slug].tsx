import React, { Component } from 'react';
import { Badge, Stack, Tabs, Tab, TabList, TabPanel, TabPanels, Progress } from '@chakra-ui/react'
import Link from 'next/link';

import client from '../../lib/grapql';
import { padStart } from '../../lib/lib';

import { PokemonQueryGrapQL } from '../../apollo/queries';
import styles from '../../styles/Home.module.css';
import Header from '../../component/header';

interface Props {
   pokoDetail: any
}

interface State {

}

class Detail extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {}
   }

   render() {
      const { pokoDetail } = this.props;
      const data = pokoDetail ? pokoDetail[0] : null;
      const pokemon = data.pokemon ? data.pokemon[0] : null;
      const desc = data.description ? data.description[0] : null;
      const evolution = data.evolutions ? data.evolutions : null;
      let abilities: string[] = []
      let egg_group: string[] = []
      pokemon.abilities && pokemon.abilities.map((item: any, index: number) => {
         abilities.push(item.ability.name)
      })
      data.egg_groups && data.egg_groups.map((item: any) => {
         egg_group.push(item.group.name)
      })

      return (
         <main className={styles.container}>
            <Header
               urlPage="/"
            />
            <div className="container -mt-6">
               <div className={`bg-${pokemon?.types[0]?.type?.name} relative`}>
                  <div className="pl-6 pr-6 pt-8">
                     <h3 className="font-bold text-xl text-white">{`#${padStart(data.id, 3)}`}</h3>
                     <h3 className="font-bold text-xl text-white">{pokemon.name}</h3>
                     <div className="pt-2">
                        <Stack direction='row'>
                           {
                              pokemon &&
                              pokemon.types.map((item: any, index: number) => {
                                 return (
                                    <>
                                       <Badge key={index} className={`bg-type-${item.type.name} rounded-full text-white text-xs p-2 font-normal`} >{item.type.name}</Badge>
                                    </>
                                 )
                              })
                           }
                        </Stack>
                     </div>
                  </div>
                  <div className="pl-6 pr-6">
                     <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} />
                  </div>
               </div>
               <div className="bg-white -mt-8 rounded-tl-2xl relative rounded-tr-2xl w-full p-6">
                  <Tabs>
                     <TabList>
                        <Tab>About</Tab>
                        <Tab>Base Stats</Tab>
                        <Tab>Evolution</Tab>
                     </TabList>
                     <TabPanels>
                        <TabPanel>
                           <p className="text-black font-normal text-base">{desc.text}</p>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal text-base">Height</span>
                              <span className="font-normal col-span-3 text-base"> {`${(pokemon.height / 3).toFixed(1)}'' (${pokemon.height / 10} m)`}</span>
                           </div>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal text-base">Weight</span>
                              <span className="col-span-3 text-base"> {`${(pokemon.weight * 0.022046).toFixed(1)}'' (${pokemon.weight / 10} kg)`}</span>
                           </div>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal text-base">Abilities</span>
                              <span className="col-span-3 text-base">
                                 {
                                    abilities.join(', ')
                                 }
                              </span>
                           </div>
                           <h3 className="text-md font-bold block mt-3">Breeding</h3>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal">Gender</span>
                              <span className="col-span-3"> {`male 80%, female 20%`}</span>
                           </div>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal">Egg Groups</span>
                              <span className="col-span-3"> {egg_group.join(', ')}</span>
                           </div>
                           <div className="grid grid-cols-4 gap-2 pt-2">
                              <span className="block text-gray-500 font-normal">Egg Cycles</span>
                              <span className="col-span-3"> {`20 (5,100-5,140 steps)`}</span>
                           </div>
                        </TabPanel>
                        <TabPanel>
                           {
                              pokemon.stats &&
                              pokemon.stats.map((item: any, index: number) => {
                                 return (
                                    // eslint-disable-next-line react/jsx-key
                                    <React.Fragment>
                                       <div key={index} className={`flex-col ${index > 0 ? 'mt-3' : ''}`}>
                                          <div className="flex-row justify-between flex mb-2">
                                             <span className="font-normal text-base block">{item.stat.name}</span>
                                             <span className="font-normal text-base block">{item.base_stat}</span>
                                          </div>
                                          <Progress className="rounded-md" value={item.base_stat} size='md' colorScheme='facebook' />
                                       </div>
                                    </React.Fragment>
                                 )
                              })
                           }
                        </TabPanel>
                        <TabPanel>
                           <div className="container">
                              {
                                 evolution.species &&
                                 evolution.species.map((item: any, index: number) => {
                                    if (item.evolves_from_species_id) {
                                       const evolutions: any = item.evolutions.length > 0 ? item.evolutions[0] : null
                                       return (
                                          <>
                                             <div key={index} className={`${index > 1 ? 'mt-8' : ''} block`}>
                                                <span className="block text-base font-normal">
                                                   {
                                                      evolutions ? `Level ${evolutions.min_level}++` : 'Level 0'
                                                   }
                                                </span>
                                                <div className="grid grid-cols-3 gap-2 pt-3">
                                                   <Link href={`/detail/${item.name}`}>
                                                      <a className="bg-cyan-200 rounded-2xl p-2 text-center">
                                                         {
                                                            item.evolves_from_species_id ?
                                                               <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.evolves_from_species_id}.png`} /> :
                                                               <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} />
                                                         }
                                                         <span className="text-white font-bold text-base">{item.name}</span>
                                                      </a>
                                                   </Link>
                                                   {
                                                      evolutions &&
                                                      <div className="flex-row flex justify-center items-center">
                                                         <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                                      </div>
                                                   }
                                                   <div className="bg-white rounded-2xl p-2">
                                                      {
                                                         item.evolves_from_species_id &&
                                                         <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} />
                                                      }
                                                   </div>
                                                </div>
                                             </div>
                                          </>
                                       )
                                    }
                                 })
                              }
                           </div>
                        </TabPanel>
                     </TabPanels>
                  </Tabs>
               </div>
            </div>
         </main>
      );
   }
}

export async function getServerSideProps(context: any) {
   const { data } = await client.query({
      query: PokemonQueryGrapQL,
      variables: {
         name: context.query.slug
      }
   })
   const pokoDetail = data.pokemons;

   return {
      props: {
         pokoDetail
      },
   };
}

export default Detail;