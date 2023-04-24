import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY
// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//     },
//     headers: {
//       'content-type': 'application/octet-stream',
//       'X-RapidAPI-Key': 'c48c13d4eamshfb592e593135b70p147107jsn9d02430b16cd',
//       'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        //设置header
        prepareHeaders: (headers, {getState}) =>{
            //headers.set("content-type",'application/octet-stream')
            headers.set('X-RapidAPI-Key', 'c48c13d4eamshfb592e593135b70p147107jsn9d02430b16cd');
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
        }
    }),
    endpoints: (builder) => ({
        //具体的 URL for the request is 'baseUrl/posts'
        getSummary: builder.query({
            //使用encodeURIComponent避免url地址出现特殊字符等问题
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

export const {useLazyGetSummaryQuery} = articleApi;