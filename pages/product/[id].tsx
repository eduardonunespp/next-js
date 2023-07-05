import React from 'react'
import { useRouter } from 'next/router'
import { stringify } from 'querystring'

const Product: React.FC = () => {

    const { query } = useRouter()

    return(
        <><h1>Product {JSON.stringify(query)}</h1></>
    )
}

export default Product