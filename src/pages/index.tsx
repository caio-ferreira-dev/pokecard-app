import Head from 'next/head'
import styles from '@/styles/index.module.css'
import PokeCard from '../../components/PokeCard'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [pokeData, setPokeData] = useState<PokeCardData>()
  const [searchText, setSearchText] = useState('')

  useEffect( () => {
    if(!pokeData) {
      getPokeInfo()
    }
  }, )
 
  async function getPokeInfo(pokeName?: string ) {
    if(pokeName) {
      const { data } = await axios.get<PokeCardData>(`/api/pokeInfo?name=${pokeName}`)
      setPokeData(data)
    } else {
      const { data } = await axios.get<PokeCardData>(`/api/pokeInfo`)
      setPokeData(data)
    }
    console.log(pokeData);
    
  }

  return (
    <>
      <style>{`body {background-color: ${pokeData?.bgColor}}`}</style>
      <Head>
        <title>Pokemon Card App</title>
        <meta name="description" content="PokeCard App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
          <h1>PokeCard App</h1>
          <PokeCard name={pokeData?.name} type={pokeData?.type} gifUrl={pokeData?.gifUrl} bgUrl={pokeData?.bgUrl} cardColor={pokeData?.cardColor} effective={pokeData?.effectiveness} weakness={pokeData?.weakness} />
          <div className={styles.searchContainer}>
            <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} onKeyDown={e => e.key === 'Enter' ? getPokeInfo(searchText) : null} placeholder='Nome do pokémon...'/>
            <button onClick={e => getPokeInfo(searchText)} style={{backgroundColor: `${pokeData?.cardColor}`}}>Procurar</button>
          </div>
      </main>
    </>
  )
}
