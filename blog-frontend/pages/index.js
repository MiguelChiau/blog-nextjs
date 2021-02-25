import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ToolBar from "../components/toolBar"
import imageUrlBuilder from "@sanity/image-url"
import {useState, useEffect} from "react"
import {useRouter} from "next/router"


export default function Home({posts}) {
const [mappedPosts, setMappedPosts] = useState([])
const router = useRouter()

useEffect(() => {
  if(posts.length) {

    const imgUrlBuilder = imageUrlBuilder({
      projectId: "56rd5uw6",
      dataset: "production"
  
    })
    setMappedPosts(
      posts.map(p => {
        return {
          ...p,
          mainImage: imgUrlBuilder.image(p.mainImage)
          .width(500).height(250)
        }
      })
    )

  } else {
    setMappedPosts([])
  }

}, [posts])

  return (
    <div>
      <ToolBar/>

      <div className={styles.main}>
        <h1>Welcome To Migz Blog</h1>
        <h3>Recent Posts:</h3>

        <div className={styles.feed}>
          {mappedPosts.length ? mappedPosts.map((p, index) => (
            <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.post}>
              <img className={styles.mainImage} src={p.mainImage}/>
            </div>
          )) : <div>No Posts Yet</div>}

        </div>

      </div>
     
    </div>
  )
}

export const getServerSideProps = async pageContext => {

  const query = encodeURIComponent('*[ _type == "post" ]')

  const url = `https://56rd5uw6.api.sanity.io/v1/data/query/production?query=${query}`

  const result = await fetch(url).then(res => res.json())

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: []
      }
    }
  }
  else {
      return {
        props: {
          posts: result.result
        }
      }
    }
  
}