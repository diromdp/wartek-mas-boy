import React, { Component } from 'react';
import { Badge, Stack, Progress } from '@chakra-ui/react'
import { connect } from 'react-redux';

import styles from '../../styles/Home.module.css';
import Header from '../../component/header';


interface Props {
   compare: any
}

interface State {

}

class ComparePages extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {}
   }

   render() {
      const { compare } = this.props;

      return (
         <>
            <main className={styles.container}>
               <Header
                  urlPage="/"
               />
               <div className="grid grid-cols-2 place-content-center gap-2 mb-4">

                  {
                     compare.compare && compare.compare.map((item: any, index: number) => {
                        return (
                           <React.Fragment key={index}>
                              <div className="text-center">
                                 <div className="mb-3">
                                    <img className="w-40 m-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt="bulbasaur" loading="lazy" />
                                    <p className="text-md font-bold mb-2">{item.name}</p>
                                    <figure className="text-center">
                                       <Stack direction='row' className="justify-center">

                                          {
                                             item.types.map((type: any, index: number) => {
                                                return (
                                                   <>
                                                      <Badge key={index} className={`rounded-full bg-type-${type.type.name} text-white text-xs font-normal p-1`}>{type.type.name}</Badge>
                                                   </>
                                                )
                                             })
                                          }
                                       </Stack>
                                    </figure>
                                 </div>
                                 <section className="border-2 border-zinc-300 border-solid p-4 mb-4 rounded-xl">
                                    <h2 className="font-bold text-md mb-3">Basic</h2>
                                    <table className="container">
                                       <tbody>
                                          <tr className="text-base">
                                             <td className="text-base">Height</td>
                                             <td className="text-base">{`${(item.height / 3).toFixed(1)}'' (${item.height / 10} m)`}</td>
                                          </tr>
                                          <tr className="text-base">
                                             <td className="text-base">Weight</td>
                                             <td className="text-base">{`${(item.weight * 0.022046).toFixed(1)}'' (${item.weight / 10} kg)`}</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </section>
                                 <section className="border-2 border-zinc-300 border-solid p-4 mb-4 rounded-xl">
                                    <h2 className="font-bold text-md mb-3">Breeding</h2>
                                    <table className="container">
                                       <tbody>
                                          <tr className="text-base">
                                             <td>Gender</td>
                                             <td>
                                                <div className="gender">
                                                   <div className="gender-item">
                                                      <span className="gender__icon gender__icon--male">♂</span>
                                                      <span className="gender__value">87.5%</span>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <div className="gender">
                                                   <div className="gender-item">
                                                      <span className="gender__icon gender__icon--male">♂</span>
                                                      <span className="gender__value">87.5%</span>
                                                   </div>
                                                </div>
                                             </td>
                                          </tr>
                                          <tr className="text-base">
                                             <td>Groups</td>
                                             <td>monster, plant</td>
                                             <td>monster, plant</td>
                                          </tr>
                                          <tr className="text-base">
                                             <td>Cycles</td>
                                             <td>20</td>
                                             <td>20</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </section>
                                 <section className="border-2 border-zinc-300 border-solid p-4 mb-4 rounded-xl">
                                    <h2 className="font-bold text-md mb-3">Stats</h2>
                                    {
                                       item.stats && item.stats.map((stats: any, index: number) => {
                                          return (
                                             <div key={index} className="flex flex-col mb-2">
                                                <div className="flex-row flex justify-between">
                                                   <p className="stats-compare__name">{stats.stat.name}</p>
                                                   <div className="stats-compare__value">{stats.base_stat}</div>
                                                </div>
                                                <div className="place-content-center w-full">
                                                   <Progress isAnimated={true} className="rounded-md" value={stats.base_stat} size='md' colorScheme='facebook' />
                                                </div>
                                             </div>
                                          )
                                       })
                                    }
                                 </section>
                              </div>
                           </React.Fragment>
                        )
                     })
                  }
               </div>
            </main>
         </>
      );
   }
}

const mapStateToProps = (state: any) => {
   const { compare } = state;
   return {
      compare,
   };
};

export default connect(mapStateToProps)(ComparePages);
