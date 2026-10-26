import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const CONTACT_EMAIL = 'hrl-adult-studio@hardbanrecordslab.online';

const legalBases = [
  ['Identity and age verification', 'Art. 6(1)(c) GDPR (§ 2257 compliance)'],
  ['Financial settlements', 'Art. 6(1)(b) GDPR (performance of a contract)'],
  ['Keeping § 2257 records', 'Art. 6(1)(c) GDPR (legal obligation)'],
];

const ageChecks = [
  'Presentation of a valid identity document',
  'KYC photograph (face + document)',
  'Written declaration of adulthood',
];

// English rendering of /rodo. The Polish original in pages/rodo.tsx is the binding version.
const RodoEn: React.FC = () => (
  <>
    <Head>
      <title>GDPR & 18 U.S.C. § 2257 | Studio HRL Adult</title>
    </Head>

    <div className="min-h-screen bg-dark text-text relative">
      <Navigation />

      <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
        <div className="section-tag">Legal compliance</div>
        <h1 className="h1-premium mb-8">GDPR / RODO & <span className="italic bg-gold-gradient bg-clip-text text-transparent">18 U.S.C. § 2257</span></h1>
        <p className="text-dim text-sm leading-loose max-w-2xl mb-6">
          Studio HRL Adult processes data in accordance with the GDPR (EU) 2016/679 and meets the requirements of 18 U.S.C. § 2257 (the Child Protection and Obscenity Enforcement Act).
        </p>
        <p className="bg-dark-3/50 border border-gold/10 p-6 text-xs text-dim leading-relaxed mb-16 max-w-3xl">
          This English version is provided for convenience only. The Polish version is the only legally binding one.
        </p>

        <div className="space-y-16">
          <section className="space-y-8">
            <div className="section-tag">GDPR compliance</div>
            <div className="bg-dark-2 border border-gold/10 p-10 space-y-8">
              <div>
                <h3 className="font-cormorant text-2xl text-gold mb-4 italic">Legal bases for processing</h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gold/20">
                      <th className="py-4 text-gold uppercase tracking-widest font-bold">Purpose of processing</th>
                      <th className="py-4 text-gold uppercase tracking-widest font-bold">Legal basis</th>
                    </tr>
                  </thead>
                  <tbody className="text-dim">
                    {legalBases.map(([purpose, basis]) => (
                      <tr key={purpose} className="border-b border-gold/5">
                        <td className="py-4">{purpose}</td>
                        <td className="py-4 italic">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-cormorant text-2xl text-gold mb-4 italic">Data Protection Officer (DPO)</h3>
                <p className="text-xs text-dim leading-loose">
                  Studio HRL Adult has appointed a Data Protection Officer. Contact: <span className="text-white">{CONTACT_EMAIL}</span>.
                  The DPO is available on business days between 9:00 and 17:00.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="section-tag">Compliance with 18 U.S.C. § 2257</div>
            <div className="bg-dark-2 border border-crimson/20 p-10 space-y-8">
              <div>
                <h3 className="font-cormorant text-2xl text-crimson mb-4 italic">Custodian of Records</h3>
                <p className="text-xs text-dim leading-loose">
                  Studio HRL Adult appoints a Custodian of Records in accordance with the requirements of 18 U.S.C. § 2257.
                  All audiovisual materials distributed by the Studio carry the appropriate notice of where the documentation is kept.
                </p>
              </div>

              <div>
                <h3 className="font-cormorant text-2xl text-crimson mb-4 italic">Age verification procedure</h3>
                <p className="text-xs text-dim leading-loose mb-6">
                  Verification of adulthood is an absolute requirement before any participation in production:
                </p>
                <ul className="space-y-4">
                  {ageChecks.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-xs text-dim italic">
                      <span className="w-1.5 h-1.5 bg-crimson rotate-45 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <div className="grain-overlay" />
    </div>
  </>
);

export default RodoEn;
