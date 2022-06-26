import * as React from 'react';
import { useState } from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Checkbox,
    Button
} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css';


function Drawers({ isOpen, onClose, onSubmitItem }) {
    const [filterType, setFilterType] = useState([]);
    const [filterGeneration, setFilterGeneration] = useState([]);
    const dataByTipe = ['bug', 'dragron', 'fairy', 'fire', 'ghost', 'ground', 'normal', 'psychic', 'steel', 'dark', 'eletric',
        'fighting', 'flying', 'grass', 'ice', 'poison', 'rock', 'water']

    const handlerSubmit = () => {
        onSubmitItem(filterType, filterGeneration)
    }

    const onChangeValue = (event) => {
        let selectedCheckboxes = filterType;
        let findIdx = selectedCheckboxes.indexOf(event.target.value);

        try {
            if (findIdx > -1) {
                selectedCheckboxes.splice(findIdx, 1);
            } else {
                selectedCheckboxes.push(event.target.value);
            }
            setFilterType(selectedCheckboxes)

        } catch (error) {
            console.log(error)
        }
    }

    const onChangeValueGeneration = (event) => {
        let selectedCheckboxes = filterGeneration;
        let findIdx = selectedCheckboxes.indexOf(event.target.value);

        try {
            if (findIdx > -1) {
                selectedCheckboxes.splice(findIdx, 1);
            } else {
                selectedCheckboxes.push(event.target.value);
            }
            setFilterGeneration(selectedCheckboxes)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Drawer onClose={() => onClose(false)} isOpen={isOpen} size={'full'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody className={styles.container}>
                        <div className="mt-4">
                            <h1 className="font-bold text-black text-base">By Tipe</h1>
                            <Stack className="grid grid-cols-5 gap-6 mt-6 mb-6" spacing={[1, 5]} >
                                {
                                    dataByTipe.map((item, index) => {
                                        return (
                                            <>
                                                <Checkbox size='md' onChange={(val) => onChangeValue(val)} className="m-0" value={item} id={`filter-by-type-${index}`} name={`filter-by-type-${index}`} colorScheme='green'>
                                                    {item}
                                                </Checkbox>
                                            </>
                                        )
                                    })
                                }
                            </Stack>
                        </div>
                        <Button className={`${styles.container} w-full mt-24 text-white sticky bottom-2 bg-green-600`} onClick={() => handlerSubmit()}>
                            Save Filter
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Drawers;