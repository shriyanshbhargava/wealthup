import { CmsApi } from '@/api/services/content/CmsApi';
import GlossaryTermModal from '@/components/landing-page/resources/school-of-finance/GlossaryTermModal';

const cmsApiClient = new CmsApi();


export async function generateMetadata({ params, searchParams }, parent) {

  const termData = await cmsApiClient.getFinancialGlossary(params.slug);

  return {
    title: termData?.meta?.title || params.slug + ' By School of Finance',
    description: termData?.meta?.description || 'description of the term'
  }
}
 
const  FinancialGlossaryTerm = async({params}) => {

    const slugs = await cmsApiClient.getFinancialGlossary();
    const data = slugs.filter((item)=> params.slug === item.slug )
    const others = slugs.map((item)=>{
        return {id:item.id, term:item.term, slug:item.slug, layout:[]}
    })
    
    return(
        <div className='gradientbg4'>
            <GlossaryTermModal term={data} others={others}/>
        </div>
    )
}

export default FinancialGlossaryTerm;
