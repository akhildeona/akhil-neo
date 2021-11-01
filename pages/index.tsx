import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import IntroSection from '@components/partials/home/intro-section'
import ProductCollection from '@components/partials/home/product-collection'
import BannerSection from '@components/partials/home/banner-section'
import BannerSectionTwo from '@components/partials/home/banner-section-two'
import FeaturedCollection from '@components/partials/home/featured-collection'
import TopRatedCollection from '@components/partials/home/top-rated-collection'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 10 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

var loading = false
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="d-none">Riode React eCommerce Template - Home</h1>

      <div className="page-content">
        <div className="container">
          <IntroSection />

          <ProductCollection products={products} />

          <BannerSection />

          <FeaturedCollection products={products.slice(3, 8)} loading={loading} />

          <BannerSectionTwo />

          <TopRatedCollection products={products.slice(5, 10)} loading={loading} />

        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
