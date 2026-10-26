import type { LegalDoc } from '@/components/legal/LegalDocument';

// English renderings of the legal documents. The Polish originals live in the page files
// (regulamin.tsx, umowa-tworca.tsx, privacy.tsx, rodo.tsx) and remain the binding versions.

const NOTICE =
  'This English version is provided for convenience only. The Polish version is the only legally binding one.';
const UPDATED = 'Last updated: April 4, 2026 | Studio HRL Adult | Poland';
const EMAIL = 'hrl-adult-studio@hardbanrecordslab.online';

export const termsEn: LegalDoc = {
  head: {
    title: 'Terms of Service | Studio HRL Adult',
    description:
      'Terms of use of the Studio HRL Adult website - conditions of use, age verification, payment rules.',
  },
  tag: 'Legal',
  titleA: 'Terms of',
  titleB: 'Service',
  updated: UPDATED,
  intro:
    'These Terms set out the rules for using the website available at studio-hrl-adult.vercel.app, operated by Studio HRL Adult, based in Poland. Using the website means acceptance of all provisions of these Terms.',
  notice: NOTICE,
  footer: `Studio HRL Adult © 2026 | All rights reserved | Contact: ${EMAIL}`,
  sections: [
    {
      tone: 'gold',
      title: 'Preamble',
      blocks: [
        {
          kind: 'text',
          text: 'Studio HRL Adult, operating from Poland, provides services consisting of the professional production and distribution of audiovisual content for adults under a partnership model. These Terms constitute a binding legal agreement between the User and the Studio. Access to the platform and use of its services is equivalent to acceptance of all the conditions of this document. The Terms are available in Polish, and the Polish version is the only authoritative one in the event of any interpretative disputes.',
        },
      ],
    },
    {
      tone: 'crimson',
      title: '§ 1. Mandatory Age Verification',
      blocks: [
        { kind: 'text', lead: '1.1.', text: 'Access to the website is strictly prohibited for persons under 18. By entering the site, every User declares and warrants that they are an adult under the law applicable in their jurisdiction.' },
        { kind: 'text', lead: '1.2.', text: 'Studio HRL Adult applies advanced age-verification protocols in line with the requirements of 18 U.S.C. § 2257 and GDPR standards. The verification process includes: presenting a valid photo ID, taking a KYC photograph (face + document), and a written statement of adulthood.' },
        { kind: 'text', lead: '1.3.', text: 'Misrepresenting age or attempting to circumvent the verification systems is a criminal offense subject to criminal and civil liability. The Studio reserves the right to immediately ban the account, delete all data and report the violation to the relevant law enforcement authorities if irregularities in the verification process are detected.' },
        { kind: 'text', lead: '1.4.', text: 'All verification data is stored in accordance with the highest security standards (AES-256 encryption) for the period required by law (7 years for tax purposes and 12 months of access logs for evidentiary purposes).' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 2. Nature of the Content and User Declaration',
      blocks: [
        { kind: 'text', lead: '2.1.', text: 'The Studio HRL Adult platform contains content intended exclusively for adults, including material of a sexual nature. By accessing the website, every User declares, at their own responsibility, that they are not offended by this type of material and that viewing erotic content is permitted and legal in their local, state or federal jurisdiction.' },
        { kind: 'text', lead: '2.2.', text: 'The User bears full responsibility for ensuring that their access to the content does not violate any local laws, administrative regulations or rules applicable at their place of residence or stay. Studio HRL Adult is not liable for the User\'s violation of laws applicable in their geographic location.' },
        { kind: 'text', lead: '2.3.', text: 'If a violation of the rules concerning access by minors, or distribution of content in jurisdictions where it is prohibited, is detected, the Studio will take immediate action to block access and cooperate with the relevant law enforcement authorities.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 3. User Accounts and Subscriptions',
      blocks: [
        { kind: 'text', lead: '3.1.', text: 'Registering on the website requires a valid email address and the creation of a secure password. The User is solely responsible for the security of their account, including the confidentiality of the password. The Studio recommends passwords of at least 12 characters containing upper- and lower-case letters, digits and special characters.' },
        { kind: 'text', lead: '3.2.', text: `The User undertakes not to share their login credentials with third parties. All actions taken using the User's account are treated as actions of that User. If unauthorized access is suspected, the User must notify the Studio immediately at ${EMAIL}.` },
        { kind: 'text', lead: '3.3.', text: 'The subscription services offered by the Studio are recurring. The User acknowledges that access to the content is granted immediately after payment. In accordance with Directive 2011/83/EU of the European Parliament and of the Council on consumer rights, the User consents to the loss of the right to withdraw from the contract or cancel the subscription once streaming or downloading of the content begins.' },
        { kind: 'text', lead: '3.4.', text: 'Subscriptions renew automatically for subsequent billing periods (monthly or annual) until cancelled by the User. A subscription can be cancelled through the user panel or by contacting customer service at least 48 hours before the next charge date.' },
      ],
    },
    {
      tone: 'crimson',
      title: '§ 4. Financial Compliance and Fraud Protection',
      blocks: [
        { kind: 'text', lead: '4.1.', text: 'Studio HRL Adult operates in a high-risk environment ("high-risk merchant account"), which is standard in the adult content industry. The User accepts the specifics of this business model and consents to all related verification procedures.' },
        { kind: 'text', lead: '4.2.', text: 'Any "chargeback" (transaction dispute) initiated by the User without first contacting the Studio\'s customer service is treated as an act of payment fraud. The User consents to the disclosure of their personal data to fraud-protection agencies and debt-collection companies in the event of an unjustified chargeback.' },
        { kind: 'text', lead: '4.3.', text: 'If suspicious transaction patterns are detected, the Studio reserves the right to temporarily block the account until the situation is clarified. The User undertakes to cooperate in the payment verification process, including providing additional documents at the Studio\'s request.' },
        { kind: 'text', lead: '4.4.', text: 'All prices on the website are gross prices, including VAT in accordance with Polish and EU law. Transactions are settled in EUR (euro) or PLN (Polish zloty), depending on the User\'s choice.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 5. Prohibited Conduct and Protection of Intellectual Property',
      blocks: [
        { kind: 'text', lead: '5.1.', text: 'The User is strictly prohibited from any attempt to copy, download, scrape, redistribute or share content outside the Studio HRL Adult platform without the express written consent of the copyright holders.' },
        { kind: 'text', lead: '5.2.', text: 'The Studio uses advanced digital watermarking techniques (steganography, invisible watermarks) that make it possible to identify the source of unauthorized content distribution. Any attempt to circumvent these protections is prohibited and will result in immediate legal action.' },
        { kind: 'text', lead: '5.3.', text: 'If content piracy, unauthorized leaking of material or other infringements of intellectual property rights are detected, the Studio will take all available legal measures, including reports to law enforcement authorities, civil lawsuits for damages and demands that intermediaries in illegal distribution cease access to the content.' },
        { kind: 'text', lead: '5.4.', text: 'The User undertakes not to interfere with the website\'s technical infrastructure, including not attempting to bypass security measures, not conducting DDoS attacks and not using automated tools (bots, crawlers) without the Studio\'s express consent.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 6. Limitation of Liability and DSA Compliance',
      blocks: [
        { kind: 'text', lead: '6.1.', text: `Studio HRL Adult, acting as a hosting service provider, complies with the provisions of the Digital Services Act (DSA). The platform provides a mechanism for reporting illegal content through a dedicated form or by email: ${EMAIL}.` },
        { kind: 'text', lead: '6.2.', text: 'The Studio is not liable for content uploaded by independent creators beyond the obligations arising from law, in particular the obligation to remove content upon receiving a valid notice. The Studio is not a publisher of content within the meaning of the provisions on publisher liability.' },
        { kind: 'text', lead: '6.3.', text: 'The Studio will make every effort to keep the website available 99.5% of the time on a monthly basis, but does not guarantee uninterrupted access. Technical breaks, system maintenance and force majeure may result in temporary unavailability of the services.' },
        { kind: 'text', lead: '6.4.', text: 'The Studio is not liable for damage resulting from the User\'s improper use of the website, including the consequences of violating the ban on access by minors or using the website in a manner contrary to the law applicable in the User\'s jurisdiction.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 7. Copyright and Intellectual Property',
      blocks: [
        { kind: 'text', lead: '7.1.', text: 'All content available on the Studio HRL Adult website, including video material, photographs, graphics, logos, trademarks, page layout and source code, is protected by copyright and is the intellectual property of the Studio or its licensors.' },
        { kind: 'text', lead: '7.2.', text: 'The User receives a limited, non-exclusive, non-transferable license to access the content solely for personal, non-commercial purposes. This license does not include the right to copy, modify, distribute, publicly display, prepare derivative works or otherwise use the content.' },
        { kind: 'text', lead: '7.3.', text: 'Infringement of intellectual property rights will result in immediate termination of access to the website and the pursuit of all available legal measures, including claims for damages.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 8. Privacy and Log Retention',
      blocks: [
        { kind: 'text', lead: '8.1.', text: 'Studio HRL Adult respects the privacy of Users and processes personal data in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (GDPR) and the Privacy Policy available at /privacy.' },
        { kind: 'text', lead: '8.2.', text: 'Access logs, including IP addresses, device identifiers and session history, are stored for 12 months for evidentiary purposes, IT system security and the fulfillment of legal obligations. After this period the data is anonymized or irreversibly deleted.' },
        { kind: 'text', lead: '8.3.', text: 'The Studio uses cookies and similar technologies to ensure the proper functioning of the website, traffic analysis and content personalization. Detailed information is provided in the Cookie Policy.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 9. Force Majeure',
      blocks: [
        { kind: 'text', lead: '9.1.', text: 'Neither party is liable for failure or delay in performing its obligations under these Terms if the failure or delay is caused by circumstances beyond its control, including in particular: natural disasters, acts of war, riots, epidemics, strikes, power or internet outages, administrative or court decisions.' },
        { kind: 'text', lead: '9.2.', text: 'The party affected by force majeure must promptly notify the other party of such circumstances and make every effort to minimize their effects.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 10. Changes to the Terms',
      blocks: [
        { kind: 'text', lead: '10.1.', text: 'The Studio reserves the right to unilaterally amend these Terms at any time. Changes take effect 14 days after the updated Terms are published on the website.' },
        { kind: 'text', lead: '10.2.', text: 'In the case of material changes affecting Users\' rights, the Studio will notify Users by email or by a prominent notice on the website.' },
        { kind: 'text', lead: '10.3.', text: 'Continued use of the website after the changes to the Terms take effect constitutes acceptance of the new conditions. A User who does not accept the changes should stop using the website and cancel their subscription.' },
      ],
    },
    {
      tone: 'crimson',
      title: '§ 11. Dispute Resolution',
      blocks: [
        { kind: 'text', lead: '11.1.', text: 'Any disputes arising from these Terms or related to the use of the website will be resolved first through negotiation between the parties. If an amicable settlement is not possible, the parties undertake to submit the dispute to the court competent for the Studio\'s registered office.' },
        { kind: 'text', lead: '11.2.', text: 'The law applicable to these Terms is Polish law. Any court proceedings will be conducted before the common courts of the Republic of Poland.' },
        { kind: 'text', lead: '11.3.', text: 'The User waives the right to participate in class actions against Studio HRL Adult. All claims must be pursued on an individual basis.' },
      ],
    },
    {
      tone: 'gold',
      title: '§ 12. Final Provisions',
      blocks: [
        { kind: 'text', lead: '12.1.', text: 'If any provision of these Terms is found invalid or unenforceable by a competent court, the remaining provisions remain in full force and effect. The invalid provision will be replaced by a valid one that, to the fullest extent possible, achieves the intentions of the parties.' },
        { kind: 'text', lead: '12.2.', text: 'The Studio\'s failure to enforce any of its rights under the Terms does not constitute a waiver of that right. The Studio retains the right to enforce all of its rights at a later date.' },
        { kind: 'text', lead: '12.3.', text: 'The User may not transfer their rights or obligations under these Terms without the Studio\'s prior written consent. The Studio may transfer its rights and obligations to third parties without the User\'s consent, provided the continuity of services is ensured.' },
        { kind: 'text', lead: '12.4.', text: `Any questions about these Terms should be sent to: ${EMAIL} or via the contact form available on the website.` },
      ],
    },
  ],
};

export const creatorAgreementEn: LegalDoc = {
  head: {
    title: 'Creator Agreement | Studio HRL Adult',
    description: 'Studio HRL Adult Creator Agreement - copyright, business model, rules of cooperation.',
  },
  tag: 'Cooperation',
  titleA: 'Creator',
  titleB: 'Agreement',
  updated: UPDATED,
  intro:
    'This Creator Agreement governs the terms of cooperation between Studio HRL Adult and independent creators of audiovisual content. The document sets out the rights and obligations of the parties, the rules for licensing content and a business model based on a partnership revenue split.',
  notice: NOTICE,
  footer: `Studio HRL Adult © 2026 | Professional cooperation with creators | Contact: ${EMAIL}`,
  sections: [
    {
      tone: 'gold',
      title: '1. Nature of the Cooperation',
      blocks: [
        { kind: 'text', lead: '1.1. Independent contractor.', text: 'The Creator acts solely as an independent contractor providing services to Studio HRL Adult. The cooperation does not constitute employment within the meaning of the Labor Code and does not create an employer-employee relationship. The Creator acts in their own name and on their own account, retaining full independence in organizing their work and its timing.' },
        { kind: 'text', lead: '1.2. No exclusivity.', text: 'This agreement does not provide for territorial or temporal exclusivity unless the parties agree otherwise in a separate annex. The Creator may provide similar services to other entities, subject to the confidentiality and loyalty clauses set out in this agreement.' },
        { kind: 'text', lead: '1.3. Tax obligations.', text: 'The Creator bears full responsibility for taxation of the income obtained and for paying all social security and health insurance contributions due. The Studio makes no deductions in favor of tax authorities or the Social Insurance Institution (ZUS), unless required by applicable law.' },
      ],
    },
    {
      tone: 'crimson',
      title: '2. License and Transfer of Copyright',
      blocks: [
        { kind: 'text', lead: '2.1. Grant of license.', text: 'The Creator grants Studio HRL Adult a non-exclusive, sublicensable, perpetual license to use the submitted audiovisual content (works) in the following fields of exploitation:' },
        {
          kind: 'list',
          items: [
            'recording and reproduction by any technique (including digital)',
            'commercial distribution, lending, rental',
            'public performance, exhibition, display, playback',
            'broadcasting and rebroadcasting, including in digital networks',
            'making available to the public in such a way that anyone can access it at a place and time of their choosing',
            'translation, adaptation, alteration',
            'placing on the market, packages, bundling with other products',
          ],
        },
        { kind: 'text', lead: '2.2. Sublicenses.', text: 'The Studio is entitled to grant further sublicenses in the above fields of exploitation, in particular to entities distributing content under the VOD, SVOD and TVOD models and to streaming platforms.' },
        { kind: 'text', lead: '2.3. Changes to works.', text: 'The Studio is entitled to make changes to the works to the extent necessary for their exploitation, including: editing, cropping, adding watermarks, format conversion, encoding, preparing language versions (dubbing, subtitles).' },
        { kind: 'text', lead: '2.4. Metadata and branding.', text: 'The Studio is entitled to add to the works metadata, descriptions, keywords and Studio HRL Adult branding marks, including a logo, intro and outro.' },
      ],
    },
    {
      tone: 'gold',
      title: '3. Age Verification and 2257 Records',
      blocks: [
        { kind: 'text', lead: '3.1. Declaration of adulthood.', text: 'The Creator declares and warrants that at the time of production of each submitted material all persons appearing in it were adults (aged 18 or over) and that the Creator holds all necessary documentation confirming this fact.' },
        { kind: 'text', lead: '3.2. Model Release and 2257.', text: 'The Creator undertakes to submit to the Studio the following documents for each person appearing in the content:' },
        {
          kind: 'list',
          items: [
            "A copy of a valid photo ID (passport, ID card, driver's license)",
            'A KYC photo (face + document) taken during the production session',
            'A signed Model Release form permitting distribution and exploitation of the content',
            'A Written Statement declaring adulthood, signed and dated',
          ],
        },
        { kind: 'text', lead: '3.3. Custodian of Records.', text: 'Studio HRL Adult appoints a Custodian of Records in accordance with the requirements of 18 U.S.C. § 2257. All verification documents are stored in a secure location for the period required by law (at least 7 years from the date the material was last used).' },
        { kind: 'text', lead: '3.4. Consequences of missing documentation.', text: 'Lack of complete 2257 documentation is a breach of this agreement and results in immediate suspension of cooperation and withholding of all payouts until the missing documents are provided. The Studio reserves the right to reject the material without any compensation to the Creator.' },
      ],
    },
    {
      tone: 'gold',
      title: "4. Creator's Liability and Indemnification",
      blocks: [
        { kind: 'text', lead: '4.1. Full responsibility for content.', text: 'The Creator bears sole and full responsibility for the submitted content and for its compliance with applicable law. The Creator declares that they hold all necessary rights to the content and that the content does not infringe the rights of third parties, including copyright, personal rights, the right to privacy or any other legal provisions.' },
        { kind: 'text', lead: '4.2. Indemnification.', text: 'The Creator undertakes to indemnify Studio HRL Adult and to protect the Studio against all claims, losses, damages and costs (including legal costs) arising from:' },
        {
          kind: 'list',
          items: [
            'infringement of copyright by the Creator',
            'infringement of the intellectual property rights of third parties',
            'distribution of content without the required consents or 2257 documentation',
            'false statements by the Creator concerning the content',
            'unlawful actions taken by the Creator',
          ],
        },
        { kind: 'text', lead: '4.3. Cooperation in claims.', text: 'If the Studio receives any legal demand concerning the Creator\'s content (e.g. a DMCA notice, a GDPR content removal request), the Creator undertakes to promptly provide all documentation supporting the legality of the content and to actively support the Studio in defending against claims.' },
      ],
    },
    {
      tone: 'crimson',
      title: '5. Business Model and Revenue Split',
      blocks: [
        { kind: 'text', lead: '5.1. The 60/30/10 model.', text: 'Under the cooperation a transparent revenue-split model applies:' },
        {
          kind: 'cards',
          cols: 3,
          items: [
            { big: '60%', title: 'Creator', text: 'Primary share of net revenue' },
            { big: '30%', title: 'Studio', text: 'Including: marketing, production, operations' },
            { big: '10%', title: 'Reinvestment', text: 'New equipment, training, development' },
          ],
        },
        { kind: 'text', lead: '5.2. Net revenue.', text: '"Net revenue" means gross revenue reduced by:' },
        {
          kind: 'list',
          items: [
            'payment processor fees (typically 5-15%)',
            'chargebacks and refunds',
            'distribution platform fees',
            'sales taxes (VAT) charged by the platforms',
            'legal costs related to copyright protection',
          ],
        },
        { kind: 'text', lead: '5.3. Payout dates.', text: 'Payouts to Creators are made monthly, by the 15th day of the month following the settlement month. The minimum payout amount is EUR 100 or PLN 450. Amounts below the threshold roll over to the next month.' },
        { kind: 'text', lead: '5.4. Settlements.', text: 'The Studio provides the Creator with detailed settlement reports containing: revenue sources, deductions, percentage calculations and the net amounts payable. Reports are available in the user panel.' },
      ],
    },
    {
      tone: 'gold',
      title: '6. Non-Compete and Confidentiality Clauses',
      blocks: [
        { kind: 'text', lead: '6.1. Non-Compete.', text: 'During the term of the cooperation the Creator may not act to the Studio\'s detriment by directly competing with the services provided by the Studio for the same clients or in the same target market without the Studio\'s prior written consent.' },
        { kind: 'text', lead: '6.2. Non-Solicitation.', text: 'The Creator undertakes not to attempt to solicit the Studio\'s clients, business partners or employees for purposes competing with the Studio. The ban applies during the cooperation and for 12 months after it ends.' },
        { kind: 'text', lead: '6.3. Confidentiality of information.', text: 'The Creator undertakes to keep confidential all confidential information obtained during the cooperation, including:' },
        {
          kind: 'list',
          items: [
            'data on revenue, marketing strategies and user demographics',
            'algorithms and promotion methods used by the Studio',
            'technical data on infrastructure and security',
            'information about other creators working with the Studio',
            'details of the business model and agreements with distribution platforms',
          ],
        },
        { kind: 'text', text: 'The confidentiality obligation continues for 3 years after the cooperation ends.' },
      ],
    },
    {
      tone: 'gold',
      title: '7. Termination of Cooperation',
      blocks: [
        { kind: 'text', lead: '7.1. Notice period.', text: 'Either party may terminate the cooperation with 30 days\' notice by sending a written statement to the other party\'s email address or by registered mail to the registered office address.' },
        { kind: 'text', lead: '7.2. Run-off period.', text: 'If the Studio has incurred expenses on promoting the Creator (marketing campaigns, equipment purchases, training), the Studio retains the right to continue monetizing the content during a "run-off" period of 90 days from the date the cooperation ends. Revenue from this period is split according to the normal 60/30/10 model.' },
        { kind: 'text', lead: '7.3. Termination without notice.', text: 'The Studio may terminate the cooperation with immediate effect in the event of:' },
        {
          kind: 'list',
          items: [
            'the Creator breaching the rules of § 2257 or lacking age documentation',
            'submission of illegal content or content infringing third-party rights',
            'suspected fraud or dishonest practices',
            'breach of the confidentiality or non-compete clauses',
            "conduct damaging the Studio's reputation",
          ],
        },
        { kind: 'text', lead: '7.4. Consequences of termination.', text: 'After the cooperation ends: (a) the Creator loses access to the partner panel, (b) the Studio withholds payouts due until any claims are clarified, (c) the confidentiality and non-compete obligations remain in force.' },
      ],
    },
    {
      tone: 'gold',
      title: '8. Governing Law and Dispute Resolution',
      blocks: [
        { kind: 'text', lead: '8.1. Governing law.', text: 'This agreement is governed by Polish law. Any disputes arising from the agreement or related to its performance will be resolved by the common courts of the Republic of Poland competent for the registered office of Studio HRL Adult.' },
        { kind: 'text', lead: '8.2. Mediation.', text: 'In the event of a dispute the parties undertake to attempt an amicable settlement through direct negotiations. If negotiations do not produce a result within 30 days, the parties may submit the dispute to mediation before the competent arbitration court.' },
        { kind: 'text', lead: '8.3. Class action waiver.', text: 'The Creator waives the right to act on their own behalf or on behalf of other Creators in a class action against Studio HRL Adult. All claims must be pursued exclusively on an individual basis.' },
      ],
    },
    {
      tone: 'crimson',
      title: '9. Final Provisions',
      blocks: [
        { kind: 'text', lead: '9.1. Entire agreement.', text: 'This agreement constitutes the entire understanding between the parties and supersedes all prior arrangements and representations, whether oral or written, concerning the subject matter of the agreement.' },
        { kind: 'text', lead: '9.2. Amendments.', text: 'Any amendments or supplements to this agreement must be made in writing under pain of nullity. Amendments must be signed by both parties or confirmed by an exchange of emails containing clear acceptance of the changes.' },
        { kind: 'text', lead: '9.3. Force majeure.', text: 'Neither party is liable for delay or failure to perform obligations resulting from force majeure, including acts of war, natural disasters, epidemics, strikes and failures of critical infrastructure.' },
        { kind: 'text', lead: '9.4. Severability clause.', text: 'If any provision of this agreement is found invalid or unenforceable, the remaining provisions remain in full force. The invalid provision will be replaced by a valid one of similar economic content.' },
        { kind: 'text', lead: '9.5. Language of the agreement.', text: 'This agreement is drawn up in Polish. The Polish version is binding. Any translations into other languages are for information purposes only.' },
      ],
    },
    {
      tone: 'gold',
      title: '10. Contact and Acceptance of Terms',
      blocks: [
        { kind: 'text', text: `Any questions about this agreement should be sent to: ${EMAIL} or via the contact form available at /contact.` },
        { kind: 'text', text: 'Submitting content to Studio HRL Adult through the user panel or the casting form constitutes acceptance of this agreement and a commitment to comply with all of its provisions.' },
      ],
    },
  ],
};

export const privacyEn: LegalDoc = {
  head: {
    title: 'Privacy Policy | Studio HRL Adult',
    description: 'Studio HRL Adult Privacy Policy - GDPR, processing of personal data, cookies.',
  },
  tag: 'Legal',
  titleA: 'Privacy',
  titleB: 'Policy',
  updated: UPDATED,
  intro:
    'This Privacy Policy sets out the rules for the processing and protection of personal data of Users of the Studio HRL Adult website. We care about the security of your data and observe the highest standards in accordance with the GDPR (Regulation (EU) 2016/679 of the European Parliament and of the Council) and Polish law.',
  notice: NOTICE,
  footer: `Studio HRL Adult © 2026 | Personal data protection at the highest level | Contact: ${EMAIL}`,
  sections: [
    {
      tone: 'gold',
      title: '1. Personal Data Controller',
      blocks: [
        { kind: 'text', lead: 'The personal data controller', text: 'is Studio HRL Adult operating within the HardbanRecords Lab structure, based in Poland. The Controller processes data with the utmost care and in accordance with the requirements of Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR/RODO) and the Personal Data Protection Act.' },
        { kind: 'text', text: `In all matters concerning the processing of personal data and the exercise of rights under the GDPR you can contact us by email at: ${EMAIL} or by post at the Controller's registered office address.` },
        { kind: 'text', text: 'Studio HRL Adult has appointed a Data Protection Officer (DPO), who is available on business days between 9:00 and 17:00. The Officer monitors compliance of data processing with data protection regulations, provides information and receives reports and complaints concerning the processing of personal data.' },
      ],
    },
    {
      tone: 'gold',
      title: '2. Categories of Data Processed',
      blocks: [
        { kind: 'text', text: 'As part of its activities Studio HRL Adult processes the following categories of personal data:' },
        { kind: 'text', lead: 'a) Identification data:', text: 'first and last name, date of birth, ID document number, a photo of the ID document (solely for age-verification purposes in accordance with § 2257), home address, phone number, email address.' },
        { kind: 'text', lead: 'b) Financial data:', text: 'bank account number, abbreviated payment card information (payment tokens), transaction history, data for tax settlements and payment of remuneration.' },
        { kind: 'text', lead: 'c) Technical data:', text: 'IP address, device identifier, browser type, operating system, cookies, session data, server logs.' },
        { kind: 'text', lead: 'd) Activity data:', text: 'content viewing history (for personalization), login history, user preferences, saved account settings.' },
        { kind: 'text', lead: 'e) Image data:', text: 'photos and video material submitted as part of the casting process (solely for the verification and assessment of candidates), including photos of ID documents showing the face.' },
      ],
    },
    {
      tone: 'crimson',
      title: '3. Purposes and Legal Bases of Processing',
      blocks: [
        { kind: 'text', text: 'Personal data is processed for the following purposes and on the following legal bases:' },
        {
          kind: 'bordered',
          items: [
            { title: 'Identity and age verification', text: 'Basis: Art. 6(1)(c) GDPR (legal obligation) and 18 U.S.C. § 2257. Processing is necessary to meet the requirements of US federal law on protecting minors from exploitation in the adult content industry.' },
            { title: 'Performance of the contract and financial settlements', text: 'Basis: Art. 6(1)(b) GDPR (performance of a contract). Processing is necessary to conclude and perform the partnership agreement and to pay remuneration to the Studio\'s creators and partners.' },
            { title: 'Compliance and KYC/AML requirements', text: 'Basis: Art. 6(1)(c) GDPR (legal obligation). Processing required by anti-money-laundering (AML) regulations and Know Your Customer (KYC) rules.' },
            { title: 'Fraud detection and prevention', text: 'Basis: Art. 6(1)(f) GDPR (the controller\'s legitimate interest). The legitimate interest is ensuring system security, protection against chargebacks and preventing unauthorized access.' },
            { title: 'Marketing and personalization (with consent)', text: 'Basis: Art. 6(1)(a) GDPR (consent). Sending commercial information and personalizing content only after the User has given voluntary and specific consent, which can be withdrawn at any time.' },
          ],
        },
      ],
    },
    {
      tone: 'gold',
      title: '4. Data Recipients and International Transfers',
      blocks: [
        { kind: 'text', lead: '4.1. Data recipients.', text: 'Personal data may be disclosed to the following categories of recipients, solely to the extent necessary to achieve the specified purposes:' },
        {
          kind: 'list',
          items: [
            'Payment processors (Payment Service Providers - PSP)',
            'Hosting partners and cloud service providers (CDN, servers)',
            'Age verification service providers (Age Verification Providers)',
            'Accounting firms and tax advisors (to the extent necessary for settlements)',
            'Fraud-protection agencies (in case of suspected fraud)',
            'Public authorities (at the request of law enforcement or courts)',
          ],
        },
        { kind: 'text', lead: '4.2. Contractual standards.', text: 'All partners are bound by data processing agreements containing protective clauses compliant with GDPR requirements. Studio HRL Adult does not sell personal data to advertising networks or data brokers.' },
        { kind: 'text', lead: '4.3. Transfers outside the EEA.', text: 'When transferring data to third countries (outside the European Economic Area), the Studio applies Standard Contractual Clauses (SCC) approved by the European Commission, ensuring an adequate level of personal data protection. All transfers are made with additional technical security measures, including end-to-end encryption.' },
      ],
    },
    {
      tone: 'gold',
      title: '5. Rights of Data Subjects',
      blocks: [
        { kind: 'text', text: 'In accordance with the GDPR (Articles 15-22), every data subject has the following rights:' },
        {
          kind: 'cards',
          cols: 2,
          items: [
            { title: 'Right of access (Art. 15)', text: 'the right to obtain information about the data being processed and a copy of that data' },
            { title: 'Right to rectification (Art. 16)', text: 'the right to request correction of inaccurate or completion of incomplete data' },
            { title: 'Right to erasure (Art. 17)', text: 'the right to request deletion of data ("right to be forgotten"), subject to obligations arising from § 2257' },
            { title: 'Right to restriction (Art. 18)', text: 'the right to request restriction of processing in certain cases' },
            { title: 'Right to data portability (Art. 20)', text: 'the right to receive data in a structured format and to transmit it to another controller' },
            { title: 'Right to object (Art. 21)', text: 'the right to object to processing based on a legitimate interest' },
          ],
        },
        { kind: 'text', text: `To exercise the above rights, send a written request to ${EMAIL}. We will respond to the request within 30 calendar days.` },
        { kind: 'text', text: 'In addition, every person has the right to lodge a complaint with the President of the Personal Data Protection Office (UODO) or another competent supervisory authority in the Member State of their habitual residence, place of work or place of the alleged infringement.' },
      ],
    },
    {
      tone: 'gold',
      title: '6. Data Retention Period',
      blocks: [
        { kind: 'text', text: 'Personal data is stored for the following periods:' },
        { kind: 'text', lead: 'Accounting and settlement data:', text: '7 years (in accordance with the Tax Ordinance and the Accounting Act)' },
        { kind: 'text', lead: 'Verification data § 2257:', text: '7 years from the date of last use of the material (in accordance with the requirements of 18 U.S.C. § 2257)' },
        { kind: 'text', lead: 'Access logs (IP, sessions):', text: '12 months for security purposes, fraud protection and evidentiary purposes' },
        { kind: 'text', lead: 'Contact and marketing data:', text: 'Until consent is withdrawn or an objection is lodged, but no longer than 3 years from the last activity' },
        { kind: 'text', lead: 'Casting photos (unsuccessful candidates):', text: 'Permanently deleted within 48 hours of the decision not to accept' },
        { kind: 'text', text: 'After these periods the data is irreversibly deleted or anonymized, unless applicable law requires longer retention.' },
      ],
    },
    {
      tone: 'crimson',
      title: '7. Data Security',
      blocks: [
        { kind: 'text', text: 'Studio HRL Adult has implemented appropriate technical and organizational measures to ensure the security of the personal data it processes:' },
        {
          kind: 'list',
          items: [
            { lead: 'Encryption:', text: 'Sensitive data is stored in encrypted form using the AES-256 algorithm. All data transmissions take place via HTTPS/TLS 1.3.' },
            { lead: 'Access control:', text: 'Only authorized persons bound by confidentiality have access to personal data. The system is based on the principle of least privilege.' },
            { lead: 'Multi-factor authentication (MFA):', text: 'Access to systems requires confirmation of identity by at least two independent factors.' },
            { lead: 'Monitoring and audit:', text: 'All operations on personal data are logged and regularly subject to security audits.' },
            { lead: 'Backups:', text: 'Regular, encrypted backups stored in secure, geographically dispersed locations.' },
            { lead: 'Penetration testing:', text: 'Regular security tests carried out by independent auditing entities.' },
          ],
        },
      ],
    },
    {
      tone: 'gold',
      title: '8. Cookies and Tracking Technologies',
      blocks: [
        { kind: 'text', text: 'The website uses cookies and similar technologies to ensure proper functioning, traffic analysis, content personalization and marketing purposes.' },
        { kind: 'text', lead: 'Necessary cookies:', text: 'Required for basic website functionality (logging in, security, remembering settings). They cannot be disabled.' },
        { kind: 'text', lead: 'Analytics cookies:', text: 'Help us understand how users use the site (e.g. Google Analytics). They collect information in an aggregated and anonymous manner.' },
        { kind: 'text', lead: 'Functional cookies:', text: 'Allow remembering user preferences (e.g. language, region) and personalizing the experience.' },
        { kind: 'text', lead: 'Marketing cookies:', text: "Used to track activity on the site in order to display relevant ads. They require the user's explicit consent." },
        { kind: 'text', text: "The user can manage cookie settings through their web browser or the preferences panel available on the website. Disabling some cookies may limit the website's functionality." },
      ],
    },
    {
      tone: 'crimson',
      title: '9. Personal Data Breach Procedure',
      blocks: [
        { kind: 'text', text: 'In the event of a personal data breach that may result in a high risk to the rights and freedoms of natural persons, Studio HRL Adult will:' },
        {
          kind: 'list',
          items: [
            'Promptly notify the President of the Personal Data Protection Office (within 72 hours of becoming aware of the breach), in accordance with Art. 33 GDPR',
            'Notify data subjects without undue delay if the breach may involve a high risk to their rights and freedoms (Art. 34 GDPR)',
            'Document all facts relating to the breach, its effects and the remedial measures taken',
            'Carry out a detailed analysis of the incident in order to identify the causes and implement measures to prevent a recurrence',
          ],
        },
      ],
    },
    {
      tone: 'gold',
      title: '10. Changes to the Privacy Policy',
      blocks: [
        { kind: 'text', text: 'Studio HRL Adult reserves the right to make changes to this Privacy Policy. Users will be informed of any material changes by email or by a prominent notice on the website no later than 14 days before the changes take effect.' },
        { kind: 'text', text: `Continued use of the website after the changes take effect constitutes acceptance of the new version of the Privacy Policy. If you have any questions or concerns, please contact us at ${EMAIL}.` },
      ],
    },
  ],
};
