"use client"

import '@/styles/newstyles.css'
import { useEffect, useState } from 'react'
import Footer from "@/components/ui/footer"
import Header from "@/components/ui/header"
import { HeaderController } from "@/components/display/HeaderController"
import RenderBlocks from "@/components/ui/layouts/RenderBlocks"
import { PageType } from "@/types/collection"
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const [page, setPage] = useState<PageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const slug = params?.slug || "terms"
        const NEXT_PUBLIC_SERVER_URL = "https://api.wealthup.me"
        
        const pageReq = await fetch(
          `${NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=${slug}`
        )
        
        if (!pageReq.ok) {
          throw new Error('Failed to fetch page data')
        }
        
        const pageData = await pageReq.json()
        
        if (pageData.docs.length === 0) {
          setError('Page not found')
        } else {
          setPage(pageData.docs[0])
        }
      } catch (err) {
        setError('Error loading page')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPage()
  }, [params])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  
  if (error || !page) {
    return <div className="flex items-center justify-center h-screen">{error || 'Page not found'}</div>
  }

  return (
    <>
      <HeaderController
        title={page?.meta?.title || page.title}
        description={page?.meta?.description}
        additionalKeywords={page?.meta?.keywords}
      />
      <Header />
      <main className="flex items-center justify-center blue-gradient">
        <div className="pt-24 sm:px-8 md:px-10 lg:px-0 h-[100svh] overflow-y-auto">
          <div>
            <RenderBlocks layout={page.layout} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}