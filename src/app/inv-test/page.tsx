import '@/styles/newstyles.css'

import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import NavBar from '@/components/Navbar'
import React from 'react'

const Page = () => {
  return (
    <React.Fragment>
      {/* <NavBar headerSolid={true} backgroundColor='#035782' style={{display: "block"}} /> */}
      <Header/>
      <iframe src="https://app.oneassure.in/?form_id=61a7a7a864c16d20c36ca717&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb3JtX2lkIjoiNjFhN2E3YTg2NGMxNmQyMGMzNmNhNzE3IiwidXNlcl9pZCI6IjYxZTUxMzc5N2Q1MmRiN2ZhZTYwZTY2ZSIsImNkIjoiMjAyMi0xMi0yNiAxNDo0NToxNy45ODY5NzgifQ.73pBJFGF8N3LnaktZz_rR54qShARs5XXFTj0wYy4hyg&format=json&formType=shinyForm" style={{height: "100vh", width: "100%", display: "block", paddingTop: '2rem'}}></iframe>
      <Footer style={{display: "block"}} />
    </React.Fragment>
  )
}

export default Page
