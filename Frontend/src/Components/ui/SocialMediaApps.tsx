import { SiLinkedin, SiYoutube, SiWhatsapp, SiFacebook, SiGmail } from "react-icons/si";

const SocialMediaApps = () => {
    return (
        <div className='mt-5 flex justify-around '>
            
            <a href="https://api.whatsapp.com/send/?text=Check+out+this+link+shortened+with+Bitly%0D%0Ahttps%3A%2F%2Fbit.ly%2F4kY08NA&type=custom_url&app_absent=0"
                target="_blank"
                rel="noopener noreferrer">
                <div className='border border-gray-400 p-3 rounded cursor-pointer'>
                    <SiWhatsapp size={25} />
                </div>
            </a>


            <a href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer">
                <div className='border border-gray-400 p-3 rounded cursor-pointer'>
                    <SiYoutube size={25} />
                </div>
            </a>


            <a href="https://www.facebook.com/sharer.php?u=https%3A%2F%2Fbit.ly%2F4kY08NA"
                target="_blank"
                rel="noopener noreferrer">
                <div className='border border-gray-400 p-3 rounded cursor-pointer'>
                    <SiFacebook size={25} />
                </div>
            </a>


            <a href="https://in.linkedin.com/?mcid=6844056167778418689&src=go-pa&trk=sem-ga_campid.14650114788_asid.151761418307_crid.657403558721_kw.linkedin%20login_d.c_tid.kwd-12704335873_n.g_mt.e_geo.9300937&cid=&gad_source=1&gad_campaignid=14650114788&gbraid=0AAAAABKX7wHjE4p9cbWC6-8NhBxMRRrZU&gclid=EAIaIQobChMI0Ojx9azdjQMV_SyDAx3kXAA2EAAYASAAEgLxmvD_BwE&gclsrc=aw.ds"
                target="_blank"
                rel="noopener noreferrer">
                <div className='border border-gray-400 p-3 rounded cursor-pointer'>
                    <SiLinkedin size={25} />
                </div>
            </a>


            <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=445112211283-sk04feuogpcjd3dq8eshrdnr4bpm1sfk.apps.googleusercontent.com&response_type=code&access_type=offline&scope=openid%20email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds%2F%20https%3A%2F%2Fmail.google.com%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuser.birthday.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&prompt=consent&include_granted_scopes=true&redirect_uri=https%3A%2F%2Foutlook.office.com%2Fmail%2FoauthRedirect.html%3Fapp%3Dnative&login_hint=deepaksinghrajput112002%40gmail.com&code_challenge=iujBPwHof0OSZIIcYRGu-KwIOkFZ65wDkHyzZuejAVw&code_challenge_method=S256&enable_granular_consent=true&state=Y29ycmVsYXRpb25faWQ9YjY3YWJjNDEtZjdmNC1mOGUzLWVmZWEtYTNhMjYzY2IwZDI2JmxvZ2luX2hpbnQ9ZGVlcGFrc2luZ2hyYWpwdXQxMTIwMDJAZ21haWwuY29tJnR5cGVfaGludD1Hb29nbGUmaW5zdGFuY2VfaWQ9MQ%3D%3D&service=lso&o2v=2&flowName=GeneralOAuthFlow"
                target="_blank"
                rel="noopener noreferrer">
                <div className='border border-gray-400 p-3 rounded cursor-pointer'>
                    <SiGmail size={25} />
                </div>
            </a>

        </div>
    )
}

export default SocialMediaApps
