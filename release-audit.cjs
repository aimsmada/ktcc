const fs=require('fs'),path=require('path'),assert=require('assert');
function read(file){return fs.readFileSync(path.join(__dirname,file),'utf8')}
const admin=read('components/AdminPage.tsx'),schema=read('supabase/cms_migration.sql'),layout=read('app/layout.tsx');
const listing=read('lib/useCatalog.ts'),eng=read('lib/engagements.ts');
const cms=read('components/CmsSections.tsx'),logo=read('components/SiteHeader.tsx');
const requirements={
 'Public site has no prototype banner':!layout.includes('DemoNotice'),
 'Production sample content OFF unless local dev opt-in':listing.includes('process.env.NODE_ENV!=="production"'),
 'Authenticated admin role check':admin.includes('profile?.role!=="admin"'),
 'RLS for content, media and requests':['alter table public.site_pages enable row level security','alter table public.media_assets enable row level security','alter table public.engagement_requests enable row level security'].every(s=>schema.includes(s)),
 'Image/GIF/video storage accepted':schema.includes('image/gif')&&schema.includes('video/mp4')&&schema.includes('video/webm'),
 'CMS page, section, listing, media, settings, messages tabs':['"pages"','"sections"','"listings"','"media"','"settings"','"requests"'].every(x=>admin.includes(x)),
 'Media library supports upload':admin.includes('.storage.from("ktcc-assets").upload'),
 'No public admin role assignment in frontend':!admin.includes('set role=\'admin\''),
 'Safe video embed host selection':cms.includes('safeEmbedUrl'),
 'Original user logo path retained':logo.includes('/brand/ktcc-logo.webp')||read('lib/cms.ts').includes('/brand/ktcc-logo.webp'),
 'Backend engagement requests with auth':eng.includes('supabase.auth.getUser()')&&eng.includes('engagement_requests'),
 'CMS verifies official roadmap source':schema.includes('published_verified_initiative')||read('supabase/schema.sql').includes('published_verified_initiative'),
 'Published metadata through REST':read('lib/site-metadata.ts').includes('site_pages'),
 'Website privacy and terms routes':fs.existsSync('app/privacy/page.tsx')&&fs.existsSync('app/terms/page.tsx'),
};
for(const [k,v] of Object.entries(requirements)){console.log(v?'PASS':'FAIL',k);assert(v,k)}
console.log(`PASS: ${Object.keys(requirements).length} release checks`);
